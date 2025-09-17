import React, { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '@clerk/clerk-react';
import PostForm from '../components/PostForm';
import { Post } from '../lib/supabase';

// 리퀴드 글래스 애니메이션 CSS
const liquidGlassStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
  
  @keyframes liquidFlow {
    0% { clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%); }
    25% { clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%); }
    50% { clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%); }
    75% { clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%); }
    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%); }
  }
`;

// CSS 스타일 주입
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = liquidGlassStyles;
  document.head.appendChild(styleSheet);
}

const Posts = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const {
    posts,
    loading,
    error,
    createPost,
    incrementViews,
    getPostsByRegion,
  } = usePosts();

  const regions = ['전체', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

  const filteredPosts = selectedRegion === '전체' 
    ? posts 
    : getPostsByRegion(selectedRegion);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (selectedSort) {
      case '조회순':
        return b.views - a.views;
      case '최신순':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handlePostClick = (postId: string) => {
    incrementViews(postId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}시간 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  if (loading) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(16, 185, 129, 0.3) 0%, 
              rgba(5, 150, 105, 0.2) 25%, 
              rgba(4, 120, 87, 0.1) 50%, 
              rgba(6, 95, 70, 0.05) 75%, 
              transparent 100%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            animation: 'shimmer 3s ease-in-out infinite',
            transform: 'rotate(45deg)'
          }} />
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', position: 'relative', zIndex: 2 }}>게시글을 불러오는 중...</div>
          <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white', position: 'relative', zIndex: 2 }}>잠시만 기다려주세요</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(239, 68, 68, 0.3) 0%, 
              rgba(220, 38, 38, 0.2) 25%, 
              rgba(185, 28, 28, 0.1) 50%, 
              rgba(153, 27, 27, 0.05) 75%, 
              transparent 100%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            animation: 'shimmer 3s ease-in-out infinite',
            transform: 'rotate(45deg)'
          }} />
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', position: 'relative', zIndex: 2 }}>오류가 발생했습니다</div>
          <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white', position: 'relative', zIndex: 2 }}>{error}</div>
        </div>
      </div>
    );
  }

    return (
    <div 
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(16, 185, 129, 0.3) 0%, 
            rgba(5, 150, 105, 0.2) 25%, 
            rgba(4, 120, 87, 0.1) 50%, 
            rgba(6, 95, 70, 0.05) 75%, 
            transparent 100%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)
        `,
        paddingTop: '2rem',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 리퀴드 글래스 배경 요소들 */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 10s ease-in-out infinite reverse',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(8, 145, 178, 0.05))',
        borderRadius: '50%',
        filter: 'blur(25px)',
        animation: 'float 12s ease-in-out infinite',
        clipPath: 'polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* 헤더 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          padding: '3rem',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              lineHeight: '1.1',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
              실시간 골프장 컨디션
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
              fontWeight: '400'
            }}>
              전국 골프장의 <strong style={{ fontWeight: '600' }}>실시간 그린, 페어웨이, 벙커 상태</strong>를 확인하고<br />
              라운딩 전 필수 정보를 공유해보세요
            </p>
          </div>
          
          {isSignedIn && (
            <button 
              onClick={() => setIsPostFormOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
              }}
            >
              + 후기 작성
            </button>
          )}
        </div>

        {/* 필터 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>지역:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {regions.map(region => (
            <button 
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    border: selectedRegion === region ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                    background: selectedRegion === region ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: selectedRegion === region ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>정렬:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            >
              <option value="최신순" style={{ color: 'black' }}>최신순</option>
              <option value="조회순" style={{ color: 'black' }}>조회순</option>
            </select>
        </div>
      </div>

        {/* 게시글 목록 */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
        }}>
          {sortedPosts.length === 0 ? (
          <div style={{
              gridColumn: '1 / -1',
            textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>게시글이 없습니다</div>
              <div style={{ opacity: 0.8 }}>첫 번째 후기를 작성해보세요!</div>
            </div>
          ) : (
            sortedPosts.map((post) => (
            <div
              key={post.id}
                onClick={() => handlePostClick(post.id)}
              style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '2rem',
                padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)'
              }}
              onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              >
                {/* 리퀴드 글래스 내부 효과 */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent)',
                  animation: 'shimmer 4s ease-in-out infinite',
                  transform: 'rotate(45deg)'
                }} />

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
                    <span style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                    }}>
                    {post.region}
                    </span>
                  <span style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {post.golf_course}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '1rem',
                  lineHeight: '1.4',
                  wordBreak: 'keep-all',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {post.title}
                </h3>

              <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.875rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  position: 'relative',
                  zIndex: 2
              }}>
                {post.content}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {post.author_name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                      {formatDate(post.created_at)}
                  </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {post.views}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 게시글 작성 폼 */}
      <PostForm
        isOpen={isPostFormOpen}
        onClose={() => setIsPostFormOpen(false)}
        onSubmit={createPost}
      />
    </div>
  );
};

export default Posts;