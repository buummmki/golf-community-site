import React, { useState } from 'react';

const sampleRounds = [
  {
    id: 1,
    title: "주말 조조 라운딩 모집",
    golf_course: "오크밸리CC",
    date: "2024-08-03",
    time: "06:30",
    description: "조조 티타임으로 시원한 아침 라운딩 즐겨요! 초급~중급자 수준이시면 누구나 환영합니다.",
    organizer: "골프매니아",
    participants: 2,
    max_participants: 4,
    green_fee: "15만원",
    status: "모집중",
    region: "강원"
  },
  {
    id: 2,
    title: "남서울CC 4인 라운딩",
    golf_course: "남서울CC",
    date: "2024-08-05",
    time: "11:00",
    description: "남서울에서 11시 티타임, 매너 좋으신 분 1명 추가 모집해요.",
    organizer: "남서울단골",
    participants: 3,
    max_participants: 4,
    green_fee: "12만원",
    status: "모집중",
    region: "경기"
  },
  {
    id: 3,
    title: "제주 핀크스CC 골프여행",
    golf_course: "핀크스CC",
    date: "2024-08-15",
    time: "09:00",
    description: "제주도 골프여행 2박3일 일정입니다. 숙박, 렌트카 모두 준비되어 있어요.",
    organizer: "제주여행러",
    participants: 2,
    max_participants: 4,
    green_fee: "35만원",
    status: "모집중",
    region: "제주"
  },
  {
    id: 4,
    title: "평일 할인 라운딩",
    golf_course: "파인리즈CC",
    date: "2024-07-30",
    time: "13:30",
    description: "화요일 오후 평일 할인 혜택으로 저렴하게 라운딩해요.",
    organizer: "평일골퍼",
    participants: 4,
    max_participants: 4,
    green_fee: "8만원",
    status: "모집마감",
    region: "경기"
  }
];

const Rounds = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
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
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              ⛳ 라운딩 모집
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              함께 라운딩할 골프 파트너를 찾아보세요
            </p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(14, 165, 233, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.3)';
            }}
          >
            🏌️ 라운딩 모집하기
          </button>
        </div>

        {/* 통계 카드 */}
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
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⛳</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
              {sampleRounds.filter(r => r.status === '모집중').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>모집중</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏌️</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0ea5e9' }}>
              {sampleRounds.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 라운딩</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6' }}>
              {sampleRounds.reduce((total, round) => total + round.participants, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>총 참가자</div>
          </div>
        </div>

        {/* 라운딩 목록 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {sampleRounds.map((round) => (
            <div
              key={round.id}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '1rem',
                padding: '2rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}
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
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#111827',
                  flex: 1
                }}>
                  {round.title}
                </h3>
                <span style={{
                  background: round.status === '모집중' ? '#10b981' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {round.status}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gap: '0.75rem',
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🏌️</span>
                  <span style={{ fontWeight: '600' }}>{round.golf_course}</span>
                  <span style={{
                    background: '#e5e7eb',
                    color: '#374151',
                    padding: '0.1rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem'
                  }}>
                    {round.region}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📅</span>
                  <span>{new Date(round.date).toLocaleDateString('ko-KR')} {round.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💰</span>
                  <span style={{ fontWeight: '600', color: '#059669' }}>{round.green_fee}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>👥</span>
                  <span>{round.participants}/{round.max_participants}명</span>
                </div>
              </div>

              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                {round.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  👤 {round.organizer}
                </span>
                {round.status === '모집중' && (
                  <button style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    참여하기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 라운딩 모집 폼 모달 */}
        {isFormOpen && (
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
              maxWidth: '500px',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>라운딩 모집하기</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
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
                  placeholder="라운딩 제목"
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
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
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="date"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="time"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <textarea
                  placeholder="라운딩 설명"
                  rows={3}
                  style={{
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
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
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    모집하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rounds;