import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../hooks/useMarket';
import { useAuth } from '@clerk/clerk-react';
import MarketItemForm from '../components/MarketItemForm';

const Market = () => {
  const { marketItems, loading, error, updateMarketItemStatus } = useMarket();
  const [isMarketItemFormOpen, setIsMarketItemFormOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 리퀴드 글래스 스타일 주입
  useEffect(() => {
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
    
    if (typeof document !== 'undefined') {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = liquidGlassStyles;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const handleStatusUpdate = async (itemId: string, status: '판매중' | '거래완료') => {
    const result = await updateMarketItemStatus(itemId, status);
    if (result.success) {
      alert(status === '거래완료' ? '판매완료로 변경되었습니다!' : '판매중으로 변경되었습니다!');
    } else {
      alert(result.error || '상태 변경에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
          borderRadius: '50%',
          filter: 'blur(25px)',
          animation: 'float 7s ease-in-out infinite',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)'
        }} />
        
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            animation: 'shimmer 2s infinite',
            zIndex: 1
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>중고 장터를 불러오는 중...</div>
            <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>잠시만 기다려주세요</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
          borderRadius: '50%',
          filter: 'blur(25px)',
          animation: 'float 7s ease-in-out infinite',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)'
        }} />
        
        <div style={{ 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            animation: 'shimmer 2s infinite',
            zIndex: 1
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>오류가 발생했습니다</div>
            <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(239, 68, 68, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
      `,
      paddingTop: '2rem',
      paddingBottom: '6rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '20%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 8s ease-in-out infinite reverse',
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.1))',
        borderRadius: '50%',
        filter: 'blur(25px)',
        animation: 'float 7s ease-in-out infinite',
        clipPath: 'polygon(40% 0%, 60% 0%, 100% 40%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 40%)'
      }} />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* 헤더 - 리퀴드 글래스 스타일 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          padding: '3rem',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)'
        }}>
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            animation: 'shimmer 3s infinite',
            zIndex: 1
          }} />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              lineHeight: '1.1',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
              중고 장터
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
              fontWeight: '400'
            }}>
              프리미엄 골프 용품을<br />
              합리적인 가격에 거래하세요
            </p>
          </div>
          
          {isSignedIn && (
          <button 
            onClick={() => setIsMarketItemFormOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
              }}
          >
            + 상품 등록
          </button>
          )}
          </div>
        </div>

        {/* 상품 목록 */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
        }}>
          {marketItems && marketItems.length > 0 ? (
            marketItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {/* Shimmer effect */}
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  animation: 'shimmer 3s infinite',
                  zIndex: 1
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                {/* 이미지 */}
                {item.image_url && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${item.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '1rem',
                    marginBottom: '1.5rem'
                  }} />
                )}

                {/* 상태 배지 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    background: item.status === '판매중' ? '#dcfce7' : '#fef2f2',
                    color: item.status === '판매중' ? '#166534' : '#dc2626',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                      {item.status === '판매중' ? '판매중' : '판매완료'}
                    </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {item.category}
                    </span>
                  </div>
                  
                {/* 제목 */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '1rem',
                  lineHeight: '1.4',
                  wordBreak: 'keep-all'
                }}>
                  {item.title}
                </h3>

                {/* 가격 */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#059669',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                      {item.price.toLocaleString()}원
                    </span>
                  </div>

                {/* 상품 정보 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.25rem' }}>상태</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>
                      {item.condition}
                    </div>
                  </div>
                  {item.brand && (
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.25rem' }}>브랜드</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>
                        {item.brand}
                      </div>
                    </div>
                  )}
                </div>

                {/* 설명 */}
                {item.description && (
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {item.description}
                  </p>
                )}

                {/* 하단 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingTop: '1rem'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    판매자: {item.seller_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {new Date(item.created_at).toLocaleDateString('ko-KR')}
                  </div>
                </div>

                {/* 버튼 */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}>
                  <button style={{
                    flex: 1,
                    background: item.status === '판매중' ? 'linear-gradient(135deg, #10b981, #059669)' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: item.status === '판매중' ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (item.status === '판매중') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                      {item.status === '판매중' ? '구매 문의' : '판매완료'}
                    </button>
                    {item.status === '판매중' && (
                      <button 
                        onClick={() => handleStatusUpdate(item.id, '거래완료')}
                      style={{
                        padding: '0.75rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        background: 'white',
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                        e.currentTarget.style.borderColor = '#d1d5db';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                        title="판매완료로 변경"
                      >
                        완료
                      </button>
                    )}
                </div>
                  </div>
                </div>
              ))
            ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>등록된 상품이 없습니다</div>
              <div style={{ opacity: 0.8 }}>첫 번째 상품을 등록해보세요!</div>
            </div>
          )}
        </div>
        </div>

        {/* 상품 등록 모달 */}
        <MarketItemForm 
          isOpen={isMarketItemFormOpen} 
          onClose={() => setIsMarketItemFormOpen(false)} 
        />

      {/* 하단 네비게이션 - 리퀴드 글래스 스타일 */}
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
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.5rem', fontWeight: '500' }}>홈</span>
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
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#ef4444' }}>
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: '600' }}>장터</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Market;
