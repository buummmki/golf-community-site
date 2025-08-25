import { useState, useEffect } from 'react'
import { supabase, GolfCourse, TABLES } from '../lib/supabase'

export function useGolfCourses() {
  const [golfCourses, setGolfCourses] = useState<GolfCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 골프장 목록 가져오기
  const fetchGolfCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.GOLF_COURSES)
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      setGolfCourses(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // 골프장 추가
  const createGolfCourse = async (courseData: Omit<GolfCourse, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.GOLF_COURSES)
        .insert([courseData])
        .select()

      if (error) throw error
      
      if (data && data[0]) {
        setGolfCourses(prev => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)))
      }
      return { success: true, data: data ? data[0] : null }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 골프장 삭제
  const deleteGolfCourse = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from(TABLES.GOLF_COURSES)
        .delete()
        .eq('id', courseId)

      if (error) throw error
      
      setGolfCourses(prev => prev.filter(course => course.id !== courseId))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  useEffect(() => {
    fetchGolfCourses()
  }, [])

  return { golfCourses, loading, error, fetchGolfCourses, createGolfCourse, deleteGolfCourse }
}
