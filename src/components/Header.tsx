import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{
      background: 'white',
      color: '#1f2937',
      padding: '1rem',
      paddingTop: 'calc(1rem + env(safe-area-inset-top))',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* 왼쪽: GOLF LOOP 로고 */}
        <Link to="/" style={{ textDecoration: 'none' }}>
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
        </Link>

        {/* 중앙: 네비게이션 메뉴 (데스크톱) */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <Link to="/posts" style={{
            color: '#1f2937',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            게시판
          </Link>
          <Link to="/rounds" style={{
            color: '#1f2937',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            라운딩
          </Link>
          <Link to="/golf-courses" style={{
            color: '#1f2937',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            골프장
          </Link>
          <Link to="/market" style={{
            color: '#1f2937',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            장터
          </Link>
        </div>

        {/* 오른쪽: 메뉴 버튼 및 로그인 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* 데스크톱 로그인 버튼 */}
          <div style={{ display: 'none' }}>
            {!isSignedIn ? (
              <SignInButton>
                <button style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#059669'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#10b981'; }}>
                  로그인
                </button>
              </SignInButton>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton>
                  <button style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}>
                    로그아웃
                  </button>
                </SignOutButton>
              </div>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <div style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}>
            <svg width="20" height="20" fill="#1f2937" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            
            {/* 드롭다운 메뉴 */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb',
                minWidth: '200px',
                zIndex: 50,
                marginTop: '0.5rem'
              }}>
                <Link to="/" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onClick={() => setIsMenuOpen(false)}>홈</Link>
                <Link to="/posts" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onClick={() => setIsMenuOpen(false)}>게시판</Link>
                <Link to="/rounds" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onClick={() => setIsMenuOpen(false)}>라운딩모집</Link>
                <Link to="/golf-courses" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onClick={() => setIsMenuOpen(false)}>골프장정보</Link>
                <Link to="/market" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onClick={() => setIsMenuOpen(false)}>중고 장터</Link>
                
                {/* 구분선 */}
                <div style={{
                  borderTop: '2px solid #e5e7eb',
                  margin: '0.5rem 0'
                }}></div>
                
                {/* 로그인/로그아웃 섹션 */}
                {!isSignedIn ? (
                  <SignInButton>
                    <button style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem 1rem',
                      color: '#059669',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    onClick={() => setIsMenuOpen(false)}>
                      로그인
                    </button>
                  </SignInButton>
                ) : (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <UserButton afterSignOutUrl="/" />
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.875rem',
                        color: '#1f2937'
                      }}>내 프로필</span>
                    </div>
                    <SignOutButton>
                      <button style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        color: '#dc2626',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      onClick={() => setIsMenuOpen(false)}>
                        로그아웃
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
