import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Rounds from './pages/Rounds';
import GolfCourses from './pages/GolfCourses';
import Market from './pages/Market';

// 보호된 링크 컴포넌트
function ProtectedLink({ to, children, className, style }: { to: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Link to={to} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <SignInButton>
      <button className={className} style={style}>
        {children}
      </button>
    </SignInButton>
  );
}

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              로그인이 필요합니다
            </h2>
            <p className="text-gray-600 mb-8">
              이 페이지에 접근하려면 먼저 로그인해주세요.
            </p>
            <div className="space-y-4">
              <SignInButton>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                  로그인
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg text-lg font-semibold">
                  회원가입
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#059669" strokeWidth="2" fill="none"/>
              <path d="M8 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            GOLF LOOP
          </Link>

          {/* Navigation Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <Link to="/" style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#059669';
              e.currentTarget.style.background = 'rgba(5, 150, 105, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#374151';
              e.currentTarget.style.background = 'transparent';
            }}
            >
              홈
            </Link>
            <ProtectedLink to="/posts" className="nav-link" style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              게시판
            </ProtectedLink>
            <ProtectedLink to="/rounds" className="nav-link" style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              라운딩 모집
            </ProtectedLink>
            <ProtectedLink to="/golf-courses" className="nav-link" style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              골프장 정보
            </ProtectedLink>
            <ProtectedLink to="/market" className="nav-link" style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}>
              중고 장터
            </ProtectedLink>
          </div>

          {/* Auth Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {!isSignedIn ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <SignInButton>
                  <button style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 15px -3px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(5, 150, 105, 0.3)';
                  }}
                  >
                    로그인
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button style={{
                    background: 'transparent',
                    color: '#059669',
                    border: '2px solid #059669',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#059669';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#059669';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    회원가입
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
          <Route path="/rounds" element={<ProtectedRoute><Rounds /></ProtectedRoute>} />
          <Route path="/golf-courses" element={<ProtectedRoute><GolfCourses /></ProtectedRoute>} />
          <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
