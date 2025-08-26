import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Premium Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1.5rem',
            borderRadius: '9999px',
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <span style={{
              color: '#86efac',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Premium Golf Community
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: '900',
            marginBottom: '2rem',
            lineHeight: '0.9',
            color: 'white',
            textShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              background: 'linear-gradient(to right, #ffffff, #bbf7d0, #6ee7b7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              GOLF
            </div>
            <div style={{
              background: 'linear-gradient(to right, #34d399, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: '-1rem'
            }}>
              LOOP
            </div>
            </h1>
            
            {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem auto',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '300',
            lineHeight: '1.6'
          }}>
            <span style={{ fontWeight: '600', color: '#86efac' }}>프리미엄 골프 커뮤니티</span>에서<br />
            새로운 골프 경험을 시작하세요
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: '#86efac',
                marginBottom: '0.5rem'
              }}>1,000+</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>활성 멤버</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: '#6ee7b7',
                marginBottom: '0.5rem'
              }}>500+</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>골프장 정보</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: '#5eead4',
                marginBottom: '0.5rem'
              }}>24/7</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>커뮤니티 활동</div>
            </div>
          </div>

            {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
              {isSignedIn ? (
                <>
                  <Link
                    to="/posts"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#000000',
                    background: 'linear-gradient(to right, #34d399, #10b981, #059669)',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(52, 211, 153, 0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(52, 211, 153, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(52, 211, 153, 0.5)';
                  }}
                >
                  <span>커뮤니티 입장</span>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  </Link>
                  <Link
                    to="/rounds"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>라운딩 매칭</span>
                  </Link>
                </>
              ) : (
                <>
                  <SignInButton>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#000000',
                    background: 'linear-gradient(to right, #34d399, #10b981, #059669)',
                    borderRadius: '1rem',
                    border: 'none',
                    boxShadow: '0 25px 50px -12px rgba(52, 211, 153, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(52, 211, 153, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(52, 211, 153, 0.5)';
                  }}
                  >
                    <span>지금 시작하기</span>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </button>
                  </SignInButton>
                  <Link
                    to="/golf-courses"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>골프장 둘러보기</span>
                  </Link>
                </>
              )}
            </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.border = '1px solid rgba(52, 211, 153, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #34d399, #10b981)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>라운딩 매칭</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>AI 기반 매칭 시스템으로 완벽한 골프 파트너를 찾아보세요</p>
            </div>

            <div style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.border = '1px solid rgba(110, 231, 183, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #6ee7b7, #14b8a6)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>프리미엄 골프장</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>전국 최고급 골프장 정보와 실시간 예약 서비스를 제공합니다</p>
              </div>

            <div style={{
              padding: '2rem',
              borderRadius: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.border = '1px solid rgba(94, 234, 212, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #5eead4, #06b6d4)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>프리미엄 장터</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>검증된 고급 골프 용품만을 거래하는 안전한 마켓플레이스</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Scroll Down</span>
            <div style={{
              width: '1.5rem',
              height: '2.5rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '9999px',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '0.25rem',
                height: '0.75rem',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '9999px',
                marginTop: '0.5rem',
                animation: 'bounce 1s infinite'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1rem'
      }}>
        {/* 공지사항 */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '2rem'
          }}>공지사항</h2>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(229, 231, 235, 1)'
              }}>
                <Link to="/posts" style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                  <span style={{
                    color: '#059669',
                    fontWeight: '600'
                  }}>[공지]</span>
                  <span style={{ marginLeft: '0.5rem' }}>골프 커뮤니티 오픈!</span>
                  <span style={{
                    float: 'right',
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>2024-07-25</span>
                </Link>
              </li>
              <li style={{ padding: '1.5rem' }}>
                <Link to="/posts" style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                  <span style={{
                    color: '#2563eb',
                    fontWeight: '600'
                  }}>[이벤트]</span>
                  <span style={{ marginLeft: '0.5rem' }}>첫 후기 작성 이벤트!</span>
                  <span style={{
                    float: 'right',
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>2024-07-24</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* 최신 후기 */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#ffffff'
            }}>최신 후기</h2>
            <Link to="/posts" style={{
              color: '#86efac',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              더보기 →
            </Link>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>지역</th>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>골프장명</th>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>제목</th>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>작성자</th>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>날짜</th>
                  <th style={{
                    padding: '0.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>조회수</th>
                </tr>
              </thead>
              <tbody style={{ background: '#ffffff' }}>
                <tr style={{ borderBottom: '1px solid rgba(229, 231, 235, 1)' }}>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>강원</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>오크밸리CC</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link to="/posts" style={{
                      fontSize: '0.875rem',
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}>
                      오크밸리CC 7월 25일 후기
                    </Link>
                  </td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>골프사랑</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>2024-07-25</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>123</td>
                </tr>
                <tr>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>경기</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>남서울CC</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link to="/posts" style={{
                      fontSize: '0.875rem',
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}>
                      남서울CC 그린 상태 좋아요
                    </Link>
                  </td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#111827'
                  }}>버디왕</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>2024-07-24</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;