import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Rounds from './pages/Rounds';
import GolfCourses from './pages/GolfCourses';
import Market from './pages/Market';

// 보호된 링크 컴포넌트
function ProtectedLink({ to, children, className }: { to: string; children: React.ReactNode; className: string }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <SignInButton>
      <button className={className}>
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
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-green-600">
            골프 커뮤니티
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              홈
            </Link>
            <ProtectedLink to="/posts" className="text-gray-700 hover:text-green-600">
              게시판
            </ProtectedLink>
            <ProtectedLink to="/rounds" className="text-gray-700 hover:text-green-600">
              라운딩 모집
            </ProtectedLink>
            <ProtectedLink to="/golf-courses" className="text-gray-700 hover:text-green-600">
              골프장 정보
            </ProtectedLink>
            <ProtectedLink to="/market" className="text-gray-700 hover:text-green-600">
              중고 장터
            </ProtectedLink>
          </div>

          {/* 인증 버튼 */}
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <div className="flex items-center space-x-4">
                <SignInButton>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    로그인
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg">
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
      <div className="min-h-screen bg-gray-50">
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
