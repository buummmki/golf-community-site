import React, { useState } from 'react';
import { useMarket } from '../hooks/useMarket';
import { useAuth } from '@clerk/clerk-react';
import MarketItemForm from '../components/MarketItemForm';

const Market = () => {
  const { marketItems, loading, error, updateMarketItemStatus } = useMarket();
  const [isMarketItemFormOpen, setIsMarketItemFormOpen] = useState(false);
  const { isSignedIn } = useAuth();

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
        background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>중고 장터를 불러오는 중...</div>
          <div style={{ fontSize: '1rem', opacity: 0.8 }}>잠시만 기다려주세요</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>오류가 발생했습니다</div>
          <div style={{ fontSize: '1rem', opacity: 0.8 }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
      paddingTop: '2rem',
      paddingBottom: '6rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* 헤더 */}
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
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
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
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
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
                  color: '#1f2937',
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
                  background: '#f8fafc',
                  borderRadius: '0.75rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>상태</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                      {item.condition}
                    </div>
                  </div>
                  {item.brand && (
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>브랜드</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                        {item.brand}
                      </div>
                    </div>
                  )}
                  </div>

                {/* 설명 */}
                  {item.description && (
                  <p style={{
                    color: '#6b7280',
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
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '1rem'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    판매자: {item.seller_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
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
    </div>
  );
};

export default Market;
