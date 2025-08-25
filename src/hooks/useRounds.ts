import { useState, useEffect } from 'react'
import { supabase, Round, TABLES } from '../lib/supabase'

export function useRounds() {
  const [rounds, setRounds] = useState<Round[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 라운딩 모집글 목록 가져오기
  const fetchRounds = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRounds(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // 라운딩 모집글 작성
  const createRound = async (roundData: Omit<Round, 'id' | 'created_at' | 'updated_at' | 'current_participants'>) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .insert([{
          ...roundData,
          current_participants: 1, // 작성자 포함
          status: 'recruiting'
        }])
        .select()

      if (error) throw error
      
      if (data && data[0]) {
        setRounds(prev => [data[0], ...prev])
      }
      return { success: true, data: data ? data[0] : null }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 라운딩 참여 신청
  const joinRound = async (roundId: string) => {
    try {
      // 현재 참여자 수 확인
      const { data: currentRound, error: fetchError } = await supabase
        .from(TABLES.ROUNDS)
        .select('current_participants, max_participants')
        .eq('id', roundId)
        .single()

      if (fetchError) throw fetchError

      if (currentRound.current_participants >= currentRound.max_participants) {
        return { success: false, error: '모집 인원이 가득 찼습니다.' }
      }

      // 참여자 수 증가
      const newParticipants = currentRound.current_participants + 1
      const newStatus = newParticipants >= currentRound.max_participants ? 'full' : 'recruiting'

      const { error } = await supabase
        .from(TABLES.ROUNDS)
        .update({ 
          current_participants: newParticipants,
          status: newStatus
        })
        .eq('id', roundId)

      if (error) throw error

      // 로컬 상태 업데이트
      setRounds(prev => prev.map(round => 
        round.id === roundId 
          ? { ...round, current_participants: newParticipants, status: newStatus } 
          : round
      ))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 라운딩 모집 취소
  const deleteRound = async (roundId: string) => {
    try {
      const { error } = await supabase
        .from(TABLES.ROUNDS)
        .delete()
        .eq('id', roundId)

      if (error) throw error
      
      setRounds(prev => prev.filter(round => round.id !== roundId))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  useEffect(() => {
    fetchRounds()
  }, [])

  return { rounds, loading, error, fetchRounds, createRound, joinRound, deleteRound }
}
