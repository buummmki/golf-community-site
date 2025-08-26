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
    title: "🔥 오크밸리CC 오늘 그린 컨디션 최고!",
    content: "📍 오크밸리CC 실시간 후기 (8/26 오전)\n🌿 그린: ⭐⭐⭐⭐⭐ (5/5) - 완벽한 스피드, 볼마크 거의 없음\n🏌️ 페어웨이: ⭐⭐⭐⭐ (4/5) - 잔디 상태 양호, 약간 건조\n⛳ 벙커: ⭐⭐⭐⭐⭐ (5/5) - 모래 부드럽고 관리 완벽\n☀️ 날씨: 맑음, 무풍\n💡 TIP: 14번 홀 파3에서 핀 위치가 뒤쪽이니 조금 더 치세요!",
    author: "실시간골퍼",
    golf_course: "오크밸리CC",
    region: "강원",
    created_at: "2024-08-26",
    views: 89,
    likes: 12,
    comments: 6
  },
  {
    id: 2,
    title: "남서울CC 어제 vs 오늘 컨디션 비교",
    content: "🔍 남서울CC 2일 연속 라운딩 후기\n\n어제(8/25):\n🌿 그린: ⭐⭐⭐ - 약간 딱딱함\n🏌️ 페어웨이: ⭐⭐⭐⭐ - 양호\n\n오늘(8/26):\n🌿 그린: ⭐⭐⭐⭐⭐ - 완벽! 어제 살수한 효과\n🏌️ 페어웨이: ⭐⭐⭐⭐ - 여전히 좋음\n\n✅ 추천: 화요일 이후가 컨디션 최고인 것 같아요!",
    author: "컨디션마니아",
    golf_course: "남서울CC",
    region: "경기",
    created_at: "2024-08-26",
    views: 134,
    likes: 18,
    comments: 9
  },
  {
    id: 3,
    title: "⚠️ 주의! 스카이72 오션코스 그린 너무 빨라요",
    content: "📍 스카이72 오션코스 긴급 후기 (8/26 오후)\n\n🚨 그린 스피드 경고!\n🌿 그린: ⭐⭐ (2/5) - 스피드 13+ 미친듯이 빠름\n🏌️ 페어웨이: ⭐⭐⭐⭐ (4/5) - 상태 좋음\n⛳ 벙커: ⭐⭐⭐ (3/5) - 모래 조금 굳음\n\n💡 조심하세요:\n- 내리막 퍼팅은 거의 터치만\n- 핀 아래쪽으로 절대 가지 마세요\n- 특히 9번, 18번 홀 주의!\n\n점수보다 재미를 위해 가시는 분들께 추천드려요 😅",
    author: "그린마스터",
    golf_course: "스카이72 오션코스",
    region: "인천",
    created_at: "2024-08-26",
    views: 203,
    likes: 31,
    comments: 15
  },
  {
    id: 4,
    title: "핀크스CC 바람 정보 + 컨디션 (실시간)",
    content: "📍 제주 핀크스CC 현재 상황 (8/26 14:00)\n\n🌪️ 바람: 서풍 15m/s (매우 강함)\n🌿 그린: ⭐⭐⭐⭐ (4/5) - 상태 좋지만 바람 영향\n🏌️ 페어웨이: ⭐⭐⭐⭐⭐ (5/5) - 완벽\n🌊 바다뷰: 환상적 (날씨 맑음)\n\n💡 바람 대응 팁:\n- 해안가 홀(6,7,8번)에서 2클럽 더\n- 그린 주변 어프로치 조심\n- 15번 홀 바람 정면으로 받음\n\n경치는 정말 최고지만 바람 때문에 스코어는... 😂",
    author: "제주골퍼",
    golf_course: "핀크스CC",
    region: "제주",
    created_at: "2024-08-26",
    views: 176,
    likes: 22,
    comments: 11
  },
  {
    id: 5,
    title: "레이크사이드CC 새벽 조조 후기 (안개주의)",
    content: "📍 레이크사이드CC 조조 라운딩 (8/26 06:30)\n\n🌫️ 안개: 7시까지 짙음 (시야 50m)\n🌿 그린: ⭐⭐⭐⭐⭐ (5/5) - 이슬 제거 후 완벽\n🏌️ 페어웨이: ⭐⭐⭐⭐ (4/5) - 약간 젖었지만 양호\n🌡️ 온도: 22도 (쾌적)\n\n💡 조조 라운딩 팁:\n- 7시 30분 이후 티오프 추천\n- 이슬 때문에 공이 안 굴러감\n- 그린 주변은 한 클럽 더\n- 8시부터는 완전 최고!\n\n아침 골프의 짜릿함을 느끼고 싶다면 강추! 🌅",
    author: "조조러버",
    golf_course: "레이크사이드CC",
    region: "경기",
    created_at: "2024-08-26",
    views: 145,
    likes: 19,
    comments: 8
  },
  {
    id: 6,
    title: "베어즈베스트CC 비 온 뒤 상태 어때요?",
    content: "📍 베어즈베스트CC 우천 후 상황 (8/25 저녁 비)\n\n💧 배수: ⭐⭐⭐⭐ (4/5) - 배수 빠름, 고인 물 거의 없음\n🌿 그린: ⭐⭐⭐ (3/5) - 약간 무거움, 하지만 플레이 가능\n🏌️ 페어웨이: ⭐⭐⭐ (3/5) - 일부 구간 진흙\n⛳ 벙커: ⭐⭐ (2/5) - 물 고임, 피하는 게 좋음\n\n📝 현재 상황:\n- 카트 이용 일부 제한\n- 워킹 라운딩 추천\n- 내일(8/27) 오후엔 완전 회복 예상\n\n급하지 않으시면 하루 더 기다리시는 게... 🤔",
    author: "우천골퍼",
    golf_course: "베어즈베스트CC",
    region: "경기",
    created_at: "2024-08-26",
    views: 112,
    likes: 14,
    comments: 7
  },
  {
    id: 7,
    title: "🏆 이번 주 최고 컨디션 골프장 TOP 3",
    content: "📊 8/19~8/26 일주일간 컨디션 분석\n\n🥇 1위: 오크밸리CC\n- 그린: ⭐⭐⭐⭐⭐ 일주일 내내 완벽\n- 페어웨이: ⭐⭐⭐⭐ 안정적\n- 종합점수: 94/100\n\n🥈 2위: 남서울CC\n- 그린: ⭐⭐⭐⭐ 화수목 최고\n- 페어웨이: ⭐⭐⭐⭐ 꾸준함\n- 종합점수: 89/100\n\n🥉 3위: 핀크스CC\n- 그린: ⭐⭐⭐⭐ 바람만 없으면...\n- 경치: ⭐⭐⭐⭐⭐ 압도적\n- 종합점수: 87/100\n\n📈 다음 주 예상 1위는 어디일까요?",
    author: "컨디션분석가",
    golf_course: "종합분석",
    region: "전국",
    created_at: "2024-08-26",
    views: 267,
    likes: 45,
    comments: 23
  },
  {
    id: 8,
    title: "골든비치CC 새 그린 오픈! 첫 라운딩 후기",
    content: "📍 골든비치CC 신규 그린 오픈 (8/26)\n\n🆕 새 그린 상태:\n🌿 그린: ⭐⭐⭐⭐⭐ (5/5) - 완전 새것! 부드럽고 빠름\n🏌️ 페어웨이: ⭐⭐⭐⭐ (4/5) - 기존 상태 유지\n⛳ 벙커: ⭐⭐⭐⭐⭐ (5/5) - 새 모래 투입\n\n✨ 신규 그린 특징:\n- 벤트그래스 100% 새로 심음\n- 스피드는 중간 정도 (11-12)\n- 브레이크 크지 않음\n- 볼마크 복구 필수!\n\n🎉 오픈 기념 그린피 20% 할인 중!\n이번 주 안에 가보세요! 정말 새것의 기분 좋음 😍",
    author: "신규오픈",
    golf_course: "골든비치CC",
    region: "경기",
    created_at: "2024-08-26",
    views: 198,
    likes: 28,
    comments: 12
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
              🌿 실시간 골프장 컨디션
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              <strong>지금 이 순간</strong> 골프장 상태를 공유하고 확인하세요! ⭐ 그린/페어웨이/벙커 실시간 리포트
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
🌿 컨디션 후기 작성
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
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
              {samplePosts.filter(post => post.created_at === '2024-08-26').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>오늘 컨디션 후기</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
              {samplePosts.filter(post => post.title.includes('⭐⭐⭐⭐⭐')).length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>5성급 골프장</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>
              {samplePosts.filter(post => post.title.includes('⚠️') || post.title.includes('주의')).length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>주의 알림</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
              {samplePosts.filter(post => post.golf_course !== '-' && post.golf_course !== '종합분석').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>리포트된 골프장</div>
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
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>🌿 골프장 컨디션 후기 작성</h2>
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
                  placeholder="🌿 제목 (예: 오크밸리CC 오늘 그린 컨디션 최고!)"
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <textarea
                  placeholder="📍 상세 컨디션 후기를 작성해주세요&#10;&#10;🌿 그린: ⭐⭐⭐⭐⭐ (5/5) - 스피드, 볼마크 상태 등&#10;🏌️ 페어웨이: ⭐⭐⭐⭐ (4/5) - 잔디 상태, 건조/습도&#10;⛳ 벙커: ⭐⭐⭐⭐⭐ (5/5) - 모래 상태&#10;☀️ 날씨: 맑음/흐림/비 등&#10;💡 TIP: 특정 홀 주의사항이나 팁"
                  rows={8}
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    resize: 'vertical',
                    lineHeight: '1.6'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="골프장명 (예: 오크밸리CC)"
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
                    placeholder="지역 (예: 강원)"
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
                    🌿 컨디션 후기 등록
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