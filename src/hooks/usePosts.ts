import { useState, useEffect } from 'react';
import { supabase, Post, TABLES } from '../lib/supabase';
import { useAuth } from '@clerk/clerk-react';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, user } = useAuth();

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
      setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 게시글 생성
  const createPost = async (postData: {
    title: string;
    content: string;
    golf_course: string;
    region: string;
  }) => {
    if (!userId || !user) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .insert({
          ...postData,
          author_id: userId,
          author_name: user.firstName || user.username || '익명',
          views: 0,
        })
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('게시글 생성 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '게시글 생성에 실패했습니다.' 
      };
    }
  };

  // 게시글 수정
  const updatePost = async (postId: string, updates: Partial<Post>) => {
    if (!userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.POSTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .eq('author_id', userId) // 작성자만 수정 가능
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, ...data } : post
      ));
      return { success: true, data };
    } catch (err) {
      console.error('게시글 수정 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '게시글 수정에 실패했습니다.' 
      };
    }
  };

  // 게시글 삭제
  const deletePost = async (postId: string) => {
    if (!userId) {
      return { success: false, error: '로그인이 필요합니다.' };
    }

    try {
      const { error } = await supabase
        .from(TABLES.POSTS)
        .delete()
        .eq('id', postId)
        .eq('author_id', userId); // 작성자만 삭제 가능

      if (error) throw error;
      
      setPosts(prev => prev.filter(post => post.id !== postId));
      return { success: true };
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.' 
      };
    }
  };

  // 조회수 증가
  const incrementViews = async (postId: string) => {
    try {
      const { error } = await supabase
        .from(TABLES.POSTS)
        .update({ views: supabase.sql`views + 1` })
        .eq('id', postId);

      if (error) throw error;

      // 로컬 상태 업데이트
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, views: post.views + 1 } : post
      ));
    } catch (err) {
      console.error('조회수 증가 실패:', err);
    }
  };

  // 지역별 필터링
  const getPostsByRegion = (region: string) => {
    return posts.filter(post => post.region === region);
  };

  // 골프장별 필터링
  const getPostsByGolfCourse = (golfCourse: string) => {
    return posts.filter(post => post.golf_course.includes(golfCourse));
  };

  // 검색
  const searchPosts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.golf_course.toLowerCase().includes(lowercaseQuery)
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    incrementViews,
    getPostsByRegion,
    getPostsByGolfCourse,
    searchPosts,
  };
};