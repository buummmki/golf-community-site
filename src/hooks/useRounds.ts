import { useState, useEffect } from 'react';
import { supabase, Round, RoundParticipant, TABLES } from '../lib/supabase';
import { useAuth } from '@clerk/clerk-react';

export const useRounds = () => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, user } = useAuth();

  // 라운딩 목록 불러오기
  const fetchRounds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      setRounds(data || []);
    } catch (err) {
      console.error('라운딩 목록 불러오기 실패:', err);
      setError(err instanceof Error ? err.message : '라운딩 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 라운딩 생성
  const createRound = async (roundData: {
    title: string;
    description: string;
    golf_course: string;
    date: string;
    time: string;
    max_participants: number;
    green_fee?: string;
    region: string;
  }) => {
    if (!userId || !user) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .insert({
          ...roundData,
          author_id: userId,
          author_name: user.firstName || user.username || '익명',
          current_participants: 1, // 작성자가 첫 번째 참여자
          status: 'recruiting',
        })
        .select()
        .single();

      if (error) throw error;

      // 작성자를 참여자로 자동 추가
      await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .insert({
          round_id: data.id,
          user_id: userId,
          user_name: user.firstName || user.username || '익명',
        });

      setRounds(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('라운딩 생성 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '라운딩 생성에 실패했습니다.' 
      };
    }
  };

  // 라운딩 수정
  const updateRound = async (roundId: string, updates: Partial<Round>) => {
    if (!userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUNDS)
        .update({ 
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', roundId)
        .eq('author_id', userId) // 작성자만 수정 가능
        .select()
        .single();

      if (error) throw error;

      setRounds(prev => prev.map(round => 
        round.id === roundId ? { ...round, ...data } : round
      ));
      return { success: true, data };
    } catch (err) {
      console.error('라운딩 수정 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '라운딩 수정에 실패했습니다.' 
      };
    }
  };

  // 라운딩 삭제
  const deleteRound = async (roundId: string) => {
    if (!userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { error } = await supabase
        .from(TABLES.ROUNDS)
        .delete()
        .eq('id', roundId)
        .eq('author_id', userId); // 작성자만 삭제 가능

      if (error) throw error;

      setRounds(prev => prev.filter(round => round.id !== roundId));
      return { success: true };
    } catch (err) {
      console.error('라운딩 삭제 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '라운딩 삭제에 실패했습니다.' 
      };
    }
  };

  // 라운딩 참여
  const joinRound = async (roundId: string) => {
    if (!userId || !user) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      // 현재 라운딩 정보 확인
      const { data: roundData, error: roundError } = await supabase
        .from(TABLES.ROUNDS)
        .select('*')
        .eq('id', roundId)
        .single();

      if (roundError) throw roundError;

      if (roundData.current_participants >= roundData.max_participants) {
        return { success: false, error: '이미 정원이 마감되었습니다.' };
      }

      // 이미 참여했는지 확인
      const { data: existingParticipant } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .eq('user_id', userId)
        .single();

      if (existingParticipant) {
        return { success: false, error: '이미 참여 중인 라운딩입니다.' };
      }

      // 참여자 추가
      const { error: participantError } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .insert({
          round_id: roundId,
          user_id: userId,
          user_name: user.firstName || user.username || '익명',
        });

      if (participantError) throw participantError;

      // 참여자 수 업데이트
      const newParticipantCount = roundData.current_participants + 1;
      const { data: updatedRound, error: updateError } = await supabase
        .from(TABLES.ROUNDS)
        .update({
          current_participants: newParticipantCount,
          status: newParticipantCount >= roundData.max_participants ? 'full' : 'recruiting'
        })
        .eq('id', roundId)
        .select()
        .single();

      if (updateError) throw updateError;

      setRounds(prev => prev.map(round => 
        round.id === roundId ? updatedRound : round
      ));

      return { success: true };
    } catch (err) {
      console.error('라운딩 참여 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '라운딩 참여에 실패했습니다.' 
      };
    }
  };

  // 라운딩 탈퇴
  const leaveRound = async (roundId: string) => {
    if (!userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      // 라운딩 작성자인지 확인
      const { data: roundData } = await supabase
        .from(TABLES.ROUNDS)
        .select('author_id, current_participants')
        .eq('id', roundId)
        .single();

      if (roundData?.author_id === userId) {
        return { success: false, error: '라운딩 작성자는 탈퇴할 수 없습니다.' };
      }

      // 참여자 삭제
      const { error: deleteError } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .delete()
        .eq('round_id', roundId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // 참여자 수 업데이트
      if (roundData) {
        const newParticipantCount = roundData.current_participants - 1;
        const { data: updatedRound, error: updateError } = await supabase
          .from(TABLES.ROUNDS)
          .update({
            current_participants: newParticipantCount,
            status: 'recruiting' // 한 명이라도 빠지면 다시 모집중
          })
          .eq('id', roundId)
          .select()
          .single();

        if (updateError) throw updateError;

        setRounds(prev => prev.map(round => 
          round.id === roundId ? updatedRound : round
        ));
      }

      return { success: true };
    } catch (err) {
      console.error('라운딩 탈퇴 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '라운딩 탈퇴에 실패했습니다.' 
      };
    }
  };

  // 라운딩 참여자 목록 조회
  const getRoundParticipants = async (roundId: string) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .order('joined_at', { ascending: true });

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (err) {
      console.error('참여자 목록 조회 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '참여자 목록을 불러오는데 실패했습니다.',
        data: []
      };
    }
  };

  // 지역별 필터링
  const getRoundsByRegion = (region: string) => {
    return rounds.filter(round => round.region === region);
  };

  // 상태별 필터링
  const getRoundsByStatus = (status: 'recruiting' | 'full' | 'completed') => {
    return rounds.filter(round => round.status === status);
  };

  // 날짜별 필터링
  const getRoundsByDate = (date: string) => {
    return rounds.filter(round => round.date === date);
  };

  // 사용자가 참여 중인 라운딩 확인
  const isUserParticipating = async (roundId: string) => {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from(TABLES.ROUND_PARTICIPANTS)
        .select('*')
        .eq('round_id', roundId)
        .eq('user_id', userId)
        .single();

      return !error && !!data;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return {
    rounds,
    loading,
    error,
    fetchRounds,
    createRound,
    updateRound,
    deleteRound,
    joinRound,
    leaveRound,
    getRoundParticipants,
    getRoundsByRegion,
    getRoundsByStatus,
    getRoundsByDate,
    isUserParticipating,
  };
};