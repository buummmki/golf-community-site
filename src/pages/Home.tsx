import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div 
      style={{
      minHeight: '100vh',
        background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
        paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* 페이지 제목 */}
      <div style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '800',
          margin: '0 0 1rem 0',
          lineHeight: '1.2'
        }}>
          GOLF LOOP
        </h1>
            <p style={{
          fontSize: '1.25rem',
              margin: 0,
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          프리미엄 골프 커뮤니티에 오신 것을 환영합니다
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        {/* 빠른 액세스 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <Link to="/posts" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.2s',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>게시판</h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>골프 후기 & 정보</p>
            </div>
          </Link>

          <Link to="/rounds" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.2s',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.006 3.006 0 0 0 16.76 6l-2.34.78A6.006 6.006 0 0 1 9 12v10h2v-5h2v5h7z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>라운딩</h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>파트너 매칭</p>
            </div>
          </Link>

          <Link to="/golf-courses" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.2s',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>골프장</h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>정보 & 예약</p>
            </div>
          </Link>

          <Link to="/market" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              transition: 'all 0.2s',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>장터</h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>중고 거래</p>
            </div>
          </Link>
              </div>

        {/* 활동 통계 카드 */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>커뮤니티 현황</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981', marginBottom: '0.25rem' }}>1,234</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>활성 멤버</div>
              </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6', marginBottom: '0.25rem' }}>856</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>오늘 게시글</div>
              </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.25rem' }}>342</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>라운딩 매칭</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1rem' }}>
          {/* 공지사항 */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', marginBottom: '2rem' }}>공지사항</h2>
            <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '1.5rem', borderBottom: '1px solid rgba(229, 231, 235, 1)' }}>
                  <Link to="/posts" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                        <span style={{ color: '#059669', fontWeight: '600' }}>[공지]</span>
                        <span style={{ marginLeft: '0.5rem' }}>골프 커뮤니티 오픈!</span>
                      </h3>
                                             <span style={{ float: 'right', fontSize: '0.875rem', color: '#6b7280' }}>2024-07-25</span>
          </div>
                  </Link>
                </li>
                <li style={{ padding: '1.5rem' }}>
                  <Link to="/posts" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                        <span style={{ color: '#2563eb', fontWeight: '600' }}>[이벤트]</span>
                        <span style={{ marginLeft: '0.5rem' }}>첫 후기 작성 이벤트!</span>
                      </h3>
                      <span style={{ float: 'right', color: '#6b7280', fontSize: '0.875rem' }}>2024-07-24</span>
                </div>
                  </Link>
                </li>
              </ul>
                </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation - 토스 스타일 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #e2e8f0', padding: '0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))', zIndex: 50, boxShadow: '0 -2px 10px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', maxWidth: '100%', margin: '0 auto', padding: '0 1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#10b981' }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#10b981', marginTop: '0.25rem', fontWeight: '500' }}>홈</span>
          </Link>
          <Link to="/posts" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: '500' }}>게시판</span>
          </Link>
          <Link to="/rounds" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.006 3.006 0 0 0 16.76 6l-2.34.78A6.006 6.006 0 0 1 9 12v10h2v-5h2v5h7z"/>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: '500' }}>라운딩</span>
                </Link>
          <Link to="/golf-courses" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: '500' }}>골프장</span>
                </Link>
          <Link to="/market" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: '500' }}>장터</span>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Home;