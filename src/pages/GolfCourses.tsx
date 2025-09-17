import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGolfCourses } from '../hooks/useGolfCourses';
import { GolfCourse } from '../lib/supabase';

const GolfCourses = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedPriceRange, setSelectedPriceRange] = useState('전체');
  const [selectedRating, setSelectedRating] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
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
  
  const {
    golfCourses,
    loading,
    error,
    getGolfCoursesByRegion,
    getGolfCoursesByPriceRange,
    getGolfCoursesByRating,
    searchGolfCourses,
    getAvailableRegions,
    getPriceStatistics,
  } = useGolfCourses();

  const regions = ['전체', ...getAvailableRegions()];
  const priceRanges = ['전체', '5만원 이하', '5-10만원', '10-15만원', '15만원 이상'];
  const ratings = ['전체', '4.5점 이상', '4.0점 이상', '3.5점 이상'];

  // 필터링된 골프장 목록
  const getFilteredGolfCourses = () => {
    let filtered = golfCourses;

    // 검색어 필터링
    if (searchQuery.trim()) {
      filtered = searchGolfCourses(searchQuery.trim());
    }

    // 지역 필터링
    if (selectedRegion !== '전체') {
      filtered = filtered.filter(course => course.region === selectedRegion);
    }

    // 가격대 필터링
    if (selectedPriceRange !== '전체') {
      switch (selectedPriceRange) {
        case '5만원 이하':
          filtered = filtered.filter(course => course.green_fee && course.green_fee <= 50000);
          break;
        case '5-10만원':
          filtered = filtered.filter(course => course.green_fee && course.green_fee > 50000 && course.green_fee <= 100000);
          break;
        case '10-15만원':
          filtered = filtered.filter(course => course.green_fee && course.green_fee > 100000 && course.green_fee <= 150000);
          break;
        case '15만원 이상':
          filtered = filtered.filter(course => course.green_fee && course.green_fee > 150000);
          break;
      }
    }

    // 평점 필터링
    if (selectedRating !== '전체') {
      switch (selectedRating) {
        case '4.5점 이상':
          filtered = filtered.filter(course => course.rating >= 4.5);
          break;
        case '4.0점 이상':
          filtered = filtered.filter(course => course.rating >= 4.0);
          break;
        case '3.5점 이상':
          filtered = filtered.filter(course => course.rating >= 3.5);
          break;
      }
    }

    return filtered.sort((a, b) => b.rating - a.rating);
  };

  const filteredCourses = getFilteredGolfCourses();
  const priceStats = getPriceStatistics();

  const formatPrice = (price: number) => {
    return `${(price / 10000).toFixed(0)}만원`;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            style={{
              color: index < fullStars ? '#fbbf24' : 
                     index === fullStars && hasHalfStar ? '#fbbf24' : '#e5e7eb',
              fontSize: '0.875rem'
            }}
          >
            {index < fullStars ? '★' : 
             index === fullStars && hasHalfStar ? '☆' : '☆'}
          </span>
        ))}
        <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.25rem' }}>
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
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
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))',
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
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>골프장 정보를 불러오는 중...</div>
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
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
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
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))',
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
                골프장 정보
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.25rem',
                lineHeight: '1.6',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
                fontWeight: '400'
              }}>
                전국 프리미엄 골프장 정보와<br />
                실시간 예약 서비스를 확인하세요
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ color: 'white', fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {golfCourses.length}개
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                등록된 골프장
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
          <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
          marginBottom: '2rem'
        }}>
          {/* 검색바 */}
          <div style={{ marginBottom: '2rem' }}>
              <input
                type="text"
              placeholder="골프장명, 지역, 설명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                width: '100%',
                  padding: '1rem 1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                  fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
            />
          </div>

          {/* 필터 버튼들 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {/* 지역 필터 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>지역:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {regions.map(region => (
              <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.75rem',
                      border: selectedRegion === region ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                      background: selectedRegion === region ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: selectedRegion === region ? '600' : '400',
                  cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {region}
              </button>
                ))}
              </div>
            </div>

            {/* 가격대 필터 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>가격대:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {priceRanges.map(range => (
                <button
                    key={range}
                    onClick={() => setSelectedPriceRange(range)}
                  style={{
                    padding: '0.5rem 1rem',
                      borderRadius: '0.75rem',
                      border: selectedPriceRange === range ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                      background: selectedPriceRange === range ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: selectedPriceRange === range ? '600' : '400',
                    cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {range}
                </button>
              ))}
            </div>
                  </div>

            {/* 평점 필터 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>평점:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ratings.map(rating => (
              <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                style={{
                      padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                      border: selectedRating === rating ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                      background: selectedRating === rating ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: selectedRating === rating ? '600' : '400',
                  cursor: 'pointer',
                      transition: 'all 0.2s ease'
                }}
              >
                    {rating}
              </button>
                ))}
              </div>
            </div>
          </div>

          {/* 통계 정보 */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.75rem',
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              검색 결과: <span style={{ color: 'white', fontWeight: '600' }}>{filteredCourses.length}개</span>
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              평균 그린피: <span style={{ color: 'white', fontWeight: '600' }}>{formatPrice(priceStats.average)}</span>
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              가격 범위: <span style={{ color: 'white', fontWeight: '600' }}>{formatPrice(priceStats.min)} ~ {formatPrice(priceStats.max)}</span>
            </div>
          </div>
        </div>

        {/* 골프장 목록 */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
        }}>
          {filteredCourses.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>검색 결과가 없습니다</div>
              <div style={{ opacity: 0.8 }}>다른 조건으로 검색해보세요</div>
            </div>
          ) : (
            filteredCourses.map((course) => (
                <div
                  key={course.id}
                onClick={() => setSelectedCourse(course)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
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
                {/* 헤더 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {course.region}
                  </span>
                  {renderStars(course.rating)}
                  </div>

                {/* 골프장명 */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {course.name}
                </h3>

                {/* 설명 */}
                {course.description && (
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
                    {course.description}
                  </p>
                )}

                {/* 정보 */}
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
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.25rem' }}>홀/파</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>
                      {course.holes}홀 / {course.par}파
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.25rem' }}>그린피</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#22c55e' }}>
                      {course.green_fee ? formatPrice(course.green_fee) : '문의'}
                    </div>
                  </div>
                </div>

                {/* 시설 정보 */}
                {course.facilities && course.facilities.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>편의시설</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {course.facilities.slice(0, 3).map((facility, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                          }}
                        >
                          {facility}
                        </span>
                      ))}
                      {course.facilities.length > 3 && (
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.75rem',
                          alignSelf: 'center'
                        }}>
                          +{course.facilities.length - 3}개 더
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 하단 */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingTop: '1rem',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  📍 {course.address}
                </div>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>

      {/* 골프장 상세 모달 */}
      {selectedCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                {selectedCourse.name}
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                  style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {selectedCourse.region}
                </span>
                {renderStars(selectedCourse.rating)}
              </div>
              
              {selectedCourse.description && (
                <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {selectedCourse.description}
                </p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>홀/파</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                    {selectedCourse.holes}홀 / {selectedCourse.par}파
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>그린피</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#059669' }}>
                    {selectedCourse.green_fee ? formatPrice(selectedCourse.green_fee) : '문의'}
                  </div>
                </div>
                    </div>

              {selectedCourse.address && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>주소</div>
                  <div style={{ fontSize: '1rem', color: '#1f2937' }}>📍 {selectedCourse.address}</div>
                    </div>
              )}

              {selectedCourse.phone && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>연락처</div>
                  <div style={{ fontSize: '1rem', color: '#1f2937' }}>📞 {selectedCourse.phone}</div>
                    </div>
              )}

              {selectedCourse.facilities && selectedCourse.facilities.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>편의시설</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedCourse.facilities.map((facility, index) => (
                        <span
                          key={index}
                          style={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                          }}
                        >
                          {facility}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              </div>
            </div>
            </div>
          )}

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
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: '0.5rem', fontWeight: '600' }}>골프장</span>
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

export default GolfCourses;