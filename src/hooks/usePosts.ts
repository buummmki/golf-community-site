import { useState, useEffect } from 'react'
import { supabase, Post, TABLES } from '../lib/supabase'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // 게시글 작성
  const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views'>) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .insert([{
          ...postData,
          views: 0
        }])
        .select()

      if (error) throw error
      
      // 새 게시글을 목록에 추가
      if (data && data[0]) {
        setPosts(prev => [data[0], ...prev])
      }
      return { success: true, data: data ? data[0] : null }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 게시글 삭제
  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from(TABLES.POSTS)
        .delete()
        .eq('id', postId)

      if (error) throw error
      
      // 목록에서 제거
      setPosts(prev => prev.filter(post => post.id !== postId))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 조회수 증가
  const incrementViews = async (postId: string) => {
    try {
      // 현재 조회수를 가져온 후 +1 증가
      const { data: currentPost, error: fetchError } = await supabase
        .from(TABLES.POSTS)
        .select('views')
        .eq('id', postId)
        .single()

      if (fetchError) throw fetchError

      const { error } = await supabase
        .from(TABLES.POSTS)
        .update({ views: (currentPost?.views || 0) + 1 })
        .eq('id', postId)

      if (error) throw error
    } catch (err) {
      console.error('Failed to increment views:', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, loading, error, fetchPosts, createPost, deletePost, incrementViews }
}
