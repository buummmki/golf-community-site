import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
      WebkitOverflowScrolling: 'touch'
    }}>
            {/* Mobile Header - 네이버 스타일 */}
      <div style={{
        background: 'white',
        color: '#1f2937',
        padding: '1rem',
        paddingTop: 'calc(1rem + env(safe-area-inset-top))',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%'
        }}>
          {/* 왼쪽: 햄버거 메뉴 */}
          <div style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <svg width="20" height="20" fill="#1f2937" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>

          {/* 중앙: GOLF LOOP 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              margin: 0,
              color: '#1f2937'
            }}>GOLF LOOP</h1>
          </div>

          {/* 오른쪽: 햄버거 메뉴 */}
          <div style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <svg width="20" height="20" fill="#1f2937" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        {/* 할일 섹션 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '500'
            }}>할일 &gt;</span>
          </div>
        <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid #e5e7eb',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#3b82f6',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 0.25rem 0',
                  lineHeight: '1.3'
                }}>골프 커뮤니티에 참여하세요</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.4'
                }}>골프 후기와 정보를 공유하고 파트너를 찾아보세요</p>
              </div>
            </div>
            <button style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}>지금 시작하기</button>
            <button style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem'
            }}>×</button>
          </div>
        </div>

        {/* 골프 커뮤니티 섹션 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '500'
            }}>골프 커뮤니티 &gt;</span>
          </div>
          
          {/* 자주 쓰는 서비스 */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid #e5e7eb',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#10b981',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <span style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#1f2937'
              }}>모든 게시글 보기</span>
            </div>
          </div>

          {/* 연결하고 내역보기 */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid #e5e7eb',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#8b5cf6',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#1f2937'
                }}>연결하고 내역보기</span>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: '0.25rem 0 0 0'
                }}>내 모든 골프 활동</p>
              </div>
            </div>
          </div>
        </div>

        {/* 내 골프 정보 섹션 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.25rem',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: '#f59e0b',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.41L19 8l-9 9z"/>
              </svg>
              </div>
              <span style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#1f2937'
              }}>내 골프 정보</span>
            </div>
            
            {/* 세그먼트 버튼들 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem'
            }}>
              <button style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}>라운딩</button>
              <button style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}>골프장</button>
              <button style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}>장터</button>
            </div>
          </div>
        </div>

        {/* 추천 서비스 섹션 */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '500'
            }}>골프 LOOP를 위해 준비했어요</span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '0.75rem',
                margin: '0 auto 0.75rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 0.25rem 0'
              }}>골프 파트너 찾기</h3>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>함께 라운딩할 파트너를 찾아보세요</p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '0.75rem',
                margin: '0 auto 0.75rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 0.25rem 0'
              }}>골프장 정보</h3>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>전국 골프장 정보와 리뷰</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - 토스 스타일 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))',
        zIndex: 50
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <Link to="/" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            background: '#f3f4f6',
            minHeight: '44px',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#1f2937' }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span style={{
              fontSize: '0.6rem',
              color: '#1f2937',
              marginTop: '0.25rem',
              fontWeight: '600'
            }}>홈</span>
          </Link>

          <Link to="/posts" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            minHeight: '44px',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span style={{
              fontSize: '0.6rem',
              color: '#6b7280',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}>게시판</span>
          </Link>

          <Link to="/rounds" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            minHeight: '44px',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.006 3.006 0 0 0 16.76 6l-2.34.78A6.006 6.006 0 0 1 9 12v10h2v-5h2v5h7z"/>
            </svg>
            <span style={{
              fontSize: '0.6rem',
              color: '#6b7280',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}>라운딩</span>
                </Link>

          <Link to="/golf-courses" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            minHeight: '44px',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span style={{
              fontSize: '0.6rem',
              color: '#6b7280',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}>골프장</span>
                </Link>

          <Link to="/market" style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            minHeight: '44px',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            <span style={{
              fontSize: '0.6rem',
              color: '#6b7280',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}>전체</span>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Home;