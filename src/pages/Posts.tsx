import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostForm from '../components/PostForm';

const Posts = () => {
  const { posts, loading, error } = usePosts();
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-red-600">오류가 발생했습니다: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
            <p className="text-gray-600 mt-2">골프에 관한 모든 이야기를 나누어보세요</p>
          </div>
          <button 
            onClick={() => setIsPostFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + 글쓰기
          </button>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex space-x-4">
                    <span>골프장: {post.golf_course}</span>
                    <span>지역: {post.region}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span>작성자: {post.author_name}</span>
                    <span>조회수: {post.views}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 게시글이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">첫 번째 게시글을 작성해보세요!</p>
            </div>
          )}
        </div>

        {/* 글쓰기 모달 */}
        <PostForm 
          isOpen={isPostFormOpen} 
          onClose={() => setIsPostFormOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Posts;
