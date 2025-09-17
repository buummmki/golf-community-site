import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

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

const Home = () => {
  const { isSignedIn } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 리퀴드 글래스 배경 요소들 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 8s ease-in-out infinite reverse',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(8, 145, 178, 0.05))',
        borderRadius: '50%',
        filter: 'blur(25px)',
        animation: 'float 10s ease-in-out infinite',
        clipPath: 'polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)'
      }} />

      {/* 페이지 제목 - 리퀴드 글래스 스타일 */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: 'white',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem 2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 리퀴드 글래스 내부 효과 */}
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
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '900',
            margin: '0 0 1.5rem 0',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff, #e2e8f0, #cbd5e1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            position: 'relative',
            zIndex: 2
          }}>
            GOLF LOOP
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            margin: 0,
            opacity: 0.9,
            lineHeight: '1.6',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 2
          }}>
            프리미엄 골프 커뮤니티에 오신 것을 환영합니다
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem', position: 'relative', zIndex: 10 }}>
        {/* 빠른 액세스 카드 - 리퀴드 글래스 스타일 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <Link to="/posts" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)'
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
            }}>
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
              
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #10b981, #059669, #047857)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative',
                zIndex: 2,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: 'white', 
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 2
              }}>게시판</h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: 0,
                position: 'relative',
                zIndex: 2
              }}>골프 후기 & 정보</p>
            </div>
          </Link>

          <Link to="/rounds" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}>
              {/* 리퀴드 글래스 내부 효과 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.1), transparent)',
                animation: 'shimmer 4s ease-in-out infinite 1s',
                transform: 'rotate(45deg)'
              }} />
              
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative',
                zIndex: 2,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.006 3.006 0 0 0 16.76 6l-2.34.78A6.006 6.006 0 0 1 9 12v10h2v-5h2v5h7z"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: 'white', 
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 2
              }}>라운딩</h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: 0,
                position: 'relative',
                zIndex: 2
              }}>파트너 매칭</p>
            </div>
          </Link>

          <Link to="/golf-courses" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}>
              {/* 리퀴드 글래스 내부 효과 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)',
                animation: 'shimmer 4s ease-in-out infinite 2s',
                transform: 'rotate(45deg)'
              }} />
              
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2, #0e7490)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative',
                zIndex: 2,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: 'white', 
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 2
              }}>골프장</h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: 0,
                position: 'relative',
                zIndex: 2
              }}>정보 & 예약</p>
            </div>
          </Link>

          <Link to="/market" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}>
              {/* 리퀴드 글래스 내부 효과 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.1), transparent)',
                animation: 'shimmer 4s ease-in-out infinite 3s',
                transform: 'rotate(45deg)'
              }} />
              
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #a855f7, #9333ea, #7c3aed)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative',
                zIndex: 2,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: 'white', 
                margin: '0 0 0.5rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                zIndex: 2
              }}>장터</h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: 0,
                position: 'relative',
                zIndex: 2
              }}>중고 거래</p>
            </div>
          </Link>
              </div>

        {/* 활동 통계 카드 - 리퀴드 글래스 스타일 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '2.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)'
        }}>
          {/* 리퀴드 글래스 내부 효과 */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            animation: 'shimmer 6s ease-in-out infinite',
            transform: 'rotate(45deg)'
          }} />
          
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '2rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 2
          }}>커뮤니티 현황</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>1,234</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>활성 멤버</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>856</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>오늘 게시글</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>342</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>라운딩 매칭</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1rem', position: 'relative', zIndex: 10 }}>
          {/* 공지사항 - 리퀴드 글래스 스타일 */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'white', 
              marginBottom: '2rem',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>공지사항</h2>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%)'
            }}>
              {/* 리퀴드 글래스 내부 효과 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                animation: 'shimmer 8s ease-in-out infinite',
                transform: 'rotate(45deg)'
              }} />
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative', zIndex: 2 }}>
                <li style={{ 
                  padding: '2rem', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <Link to="/posts" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '600', 
                        color: 'white', 
                        margin: 0, 
                        lineHeight: '1.4',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                      }}>
                        <span style={{ 
                          color: '#10b981', 
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>[공지]</span>
                        <span style={{ marginLeft: '0.75rem' }}>골프 커뮤니티 오픈!</span>
                      </h3>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        color: 'rgba(255, 255, 255, 0.7)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}>2024-07-25</span>
                    </div>
                  </Link>
                </li>
                <li style={{ 
                  padding: '2rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <Link to="/posts" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '600', 
                        color: 'white', 
                        margin: 0, 
                        lineHeight: '1.4',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                      }}>
                        <span style={{ 
                          color: '#3b82f6', 
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>[이벤트]</span>
                        <span style={{ marginLeft: '0.75rem' }}>첫 후기 작성 이벤트!</span>
                      </h3>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        color: 'rgba(255, 255, 255, 0.7)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}>2024-07-24</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation - 리퀴드 글래스 스타일 */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
        padding: '1rem 0 calc(1rem + env(safe-area-inset-bottom))', 
        zIndex: 50, 
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
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
            padding: '1rem 0.5rem', 
            borderRadius: '1.5rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#10b981' }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem', fontWeight: '600' }}>홈</span>
          </Link>
          
          <Link to="/posts" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '1rem 0.5rem', 
            borderRadius: '1.5rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', fontWeight: '500' }}>게시판</span>
          </Link>
          
          <Link to="/rounds" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '1rem 0.5rem', 
            borderRadius: '1.5rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.006 3.006 0 0 0 16.76 6l-2.34.78A6.006 6.006 0 0 1 9 12v10h2v-5h2v5h7z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', fontWeight: '500' }}>라운딩</span>
          </Link>
          
          <Link to="/golf-courses" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '1rem 0.5rem', 
            borderRadius: '1.5rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', fontWeight: '500' }}>골프장</span>
          </Link>
          
          <Link to="/market" style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '1rem 0.5rem', 
            borderRadius: '1.5rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', fontWeight: '500' }}>장터</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;