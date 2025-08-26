import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  golf_course: string;
  region: string;
  created_at: string;
  views: number;
  likes: number;
  comments: number;
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: "오크밸리CC 7월 25일 라운딩 후기",
    content: "오늘 오크밸리에서 라운딩했는데 그린 상태가 정말 좋았습니다. 날씨도 완벽했고 동반자분들과 즐거운 시간을 보냈네요. 특히 14번 홀 파3에서 온그린 성공! 추천합니다.",
    author: "골프사랑",
    golf_course: "오크밸리CC",
    region: "강원",
    created_at: "2024-07-25",
    views: 123,
    likes: 15,
    comments: 8
  },
  {
    id: 2,
    title: "남서울CC 그린 상태 좋아요",
    content: "며칠 전 남서울CC에서 라운딩했는데 그린 컨디션이 훌륭했습니다. 캐디분들도 친절하시고 코스 관리가 잘 되어 있네요. 다음에 또 오고 싶어요.",
    author: "버디왕",
    golf_course: "남서울CC",
    region: "경기",
    created_at: "2024-07-24",
    views: 98,
    likes: 12,
    comments: 5
  },
  {
    id: 3,
    title: "골프 초보 드라이버 추천 부탁드려요",
    content: "골프 시작한 지 3개월 된 초보입니다. 드라이버 구매를 고려 중인데 초보자에게 추천할 만한 제품이 있을까요? 예산은 50만원 정도로 생각하고 있습니다.",
    author: "초보골퍼",
    golf_course: "-",
    region: "서울",
    created_at: "2024-07-23",
    views: 156,
    likes: 8,
    comments: 23
  },
  {
    id: 4,
    title: "제주 핀크스CC 후기 - 경치가 환상적!",
    content: "제주도 여행 겸 핀크스에서 라운딩했습니다. 바다가 보이는 코스에서 치는 기분이 정말 색달랐어요. 조금 비싸긴 하지만 한 번쯤은 꼭 경험해볼 만합니다.",
    author: "제주도사랑",
    golf_course: "핀크스CC",
    region: "제주",
    created_at: "2024-07-22",
    views: 201,
    likes: 25,
    comments: 12
  },
  {
    id: 5,
    title: "골프 레슨 효과가 정말 좋네요",
    content: "프로에게 레슨 받기 시작한 지 2달째인데 스코어가 많이 개선됐습니다. 특히 아이언 샷이 안정적이 되었어요. 혼자 연습할 때와는 차원이 다르네요.",
    author: "레슨생",
    golf_course: "-",
    region: "부산",
    created_at: "2024-07-21",
    views: 89,
    likes: 18,
    comments: 15
  }
];

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* 헤더 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #059669, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              🏌️ 골프 커뮤니티
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              골프에 관한 모든 이야기를 나누어보세요
            </p>
          </div>
          <button 
            onClick={() => setIsPostFormOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #059669, #10b981)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
            }}
          >
            ✏️ 글쓰기
          </button>
        </div>

        {/* 통계 카드들 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
              {samplePosts.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 게시글</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
              {samplePosts.reduce((total, post) => total + post.views, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 조회수</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>
              {samplePosts.reduce((total, post) => total + post.likes, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 좋아요</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
              {samplePosts.reduce((total, post) => total + post.comments, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 댓글</div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {samplePosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '1rem',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => setSelectedPost(post)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#111827',
                  flex: 1,
                  marginRight: '1rem'
                }}>
                  {post.title}
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexShrink: 0
                }}>
                  {post.golf_course !== '-' && (
                    <span style={{
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {post.golf_course}
                    </span>
                  )}
                  <span style={{
                    background: '#e5e7eb',
                    color: '#374151',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem'
                  }}>
                    {post.region}
                  </span>
                </div>
              </div>

              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                {post.content}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  <span style={{ fontWeight: '600', color: '#374151' }}>
                    👤 {post.author}
                  </span>
                  <span>📅 {new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  <span>👁️ {post.views}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 글쓰기 폼 모달 */}
        {isPostFormOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>새 글 작성</h2>
                <button
                  onClick={() => setIsPostFormOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <textarea
                  placeholder="내용을 입력하세요"
                  rows={6}
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="골프장명"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="지역"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsPostFormOpen(false)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    작성완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 게시글 상세 모달 */}
        {selectedPost && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '2rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#111827'
                  }}>
                    {selectedPost.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    marginBottom: '1rem'
                  }}>
                    <span>👤 {selectedPost.author}</span>
                    <span>📅 {new Date(selectedPost.created_at).toLocaleDateString('ko-KR')}</span>
                    <span>👁️ {selectedPost.views}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div style={{
                background: '#f9fafb',
                padding: '2rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                lineHeight: '1.8',
                fontSize: '1.1rem',
                color: '#374151'
              }}>
                {selectedPost.content}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f3f4f6',
                borderRadius: '0.5rem'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    ❤️ 좋아요 {selectedPost.likes}
                  </button>
                  <button style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    💬 댓글 {selectedPost.comments}
                  </button>
                </div>
                {selectedPost.golf_course !== '-' && (
                  <span style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    📍 {selectedPost.golf_course} ({selectedPost.region})
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;