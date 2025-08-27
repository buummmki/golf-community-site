import React, { useState } from 'react';

interface GolfCourse {
  id: number;
  name: string;
  region: string;
  address: string;
  phone: string;
  holes: number;
  par: number;
  green_fee: number;
  rating: number;
  description: string;
  facilities: string[];
  distance?: string;
}

const sampleGolfCourses: GolfCourse[] = [
  {
    id: 1,
    name: "스카이힐 컨트리클럽",
    region: "경기",
    address: "경기도 성남시 분당구",
    phone: "031-111-2222",
    holes: 18,
    par: 72,
    green_fee: 120000,
    rating: 4.8,
    description: "수도권 최고의 전망을 자랑하는 명문 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "레스토랑", "프로샵"],
    distance: "2.5km"
  },
  {
    id: 2,
    name: "베어크릭 골프클럽",
    region: "경기",
    address: "경기도 파주시 광탄면",
    phone: "031-333-4444",
    holes: 18,
    par: 72,
    green_fee: 95000,
    rating: 4.6,
    description: "자연 친화적인 코스 설계가 돋보이는 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "사우나"],
    distance: "12.3km"
  },
  {
    id: 3,
    name: "오크밸리 컨트리클럽",
    region: "강원",
    address: "강원도 원주시 지정면",
    phone: "033-555-6666",
    holes: 27,
    par: 108,
    green_fee: 140000,
    rating: 4.9,
    description: "천혜의 자연환경과 최고급 시설을 갖춘 리조트형 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "호텔", "스파", "레스토랑"],
    distance: "45.2km"
  },
  {
    id: 4,
    name: "남서울 컨트리클럽",
    region: "경기",
    address: "경기도 성남시 수정구",
    phone: "031-777-8888",
    holes: 18,
    par: 72,
    green_fee: 110000,
    rating: 4.7,
    description: "도심 접근성이 뛰어난 프리미엄 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "레스토랑"],
    distance: "5.8km"
  },
  {
    id: 5,
    name: "핀크스 골프클럽",
    region: "제주",
    address: "제주특별자치도 서귀포시",
    phone: "064-999-0000",
    holes: 18,
    par: 72,
    green_fee: 180000,
    rating: 4.9,
    description: "바다 전망이 환상적인 제주 대표 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "오션뷰 레스토랑", "프로샵"],
    distance: "320km"
  },
  {
    id: 6,
    name: "스카이72 오션코스",
    region: "인천",
    address: "인천광역시 중구 운서동",
    phone: "032-111-1111",
    holes: 18,
    par: 72,
    green_fee: 130000,
    rating: 4.5,
    description: "인천공항 인근의 대규모 골프 리조트",
    facilities: ["드라이빙레인지", "클럽하우스", "호텔", "컨벤션센터"],
    distance: "25.4km"
  },
  {
    id: 7,
    name: "레이크사이드 컨트리클럽",
    region: "경기",
    address: "경기도 용인시 처인구",
    phone: "031-222-3333",
    holes: 18,
    par: 72,
    green_fee: 85000,
    rating: 4.4,
    description: "호수 전망이 아름다운 가성비 좋은 골프장",
    facilities: ["드라이빙레인지", "클럽하우스", "레스토랑"],
    distance: "18.7km"
  },
  {
    id: 8,
    name: "베어즈베스트 골프클럽",
    region: "경기",
    address: "경기도 화성시 봉담읍",
    phone: "031-444-5555",
    holes: 18,
    par: 72,
    green_fee: 105000,
    rating: 4.3,
    description: "잭 니클라우스 설계의 챔피언십 코스",
    facilities: ["드라이빙레인지", "클럽하우스", "아카데미"],
    distance: "22.1km"
  }
];

const GolfCourses = () => {
  const [activeTab, setActiveTab] = useState('region');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<GolfCourse[]>([]);
  const [showResults, setShowResults] = useState(false);

  const regions = [
    { name: '서울', icon: '🏙️', count: 3 },
    { name: '경기', icon: '🌆', count: 5 },
    { name: '인천', icon: '🌊', count: 1 },
    { name: '강원', icon: '⛰️', count: 1 },
    { name: '충청', icon: '🌾', count: 0 },
    { name: '전라', icon: '🌺', count: 0 },
    { name: '경상', icon: '🏔️', count: 0 },
    { name: '제주', icon: '🌴', count: 1 }
  ];

  const searchByRegion = (region: string) => {
    const results = sampleGolfCourses.filter(course => course.region === region);
    setFilteredCourses(results);
    setSelectedRegion(region);
    setShowResults(true);
  };

  const searchByName = () => {
    if (!searchQuery.trim()) return;
    const results = sampleGolfCourses.filter(course => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(results);
    setShowResults(true);
  };

  const resetSearch = () => {
    setFilteredCourses([]);
    setShowResults(false);
    setSearchQuery('');
    setSelectedRegion('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065f46 0%, #059669 25%, #10b981 75%, #34d399 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* 페이지 헤더 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '3rem 2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            textWrap: 'balance',
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
            원하는 조건으로 <strong style={{ fontWeight: '600' }}>완벽한 골프장</strong>을 찾아보세요
          </p>
          </div>

        {/* 검색 탭 */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '0.5rem',
          marginBottom: '2rem',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('region')}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              borderRadius: '1rem',
              background: activeTab === 'region' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              color: activeTab === 'region' ? '#065f46' : 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            지역별 찾기
          </button>
          <button 
            onClick={() => setActiveTab('name')}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              borderRadius: '1rem',
              background: activeTab === 'name' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              color: activeTab === 'name' ? '#065f46' : 'rgba(255, 255, 255, 0.8)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            골프장명으로
          </button>
        </div>

        {/* 지역별 검색 */}
        {activeTab === 'region' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              지역을 선택하세요
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {regions.map((region) => (
                <div
                  key={region.name}
                  onClick={() => searchByRegion(region.name)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    padding: '2rem 1.5rem',
                    borderRadius: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {region.icon}
                  </div>
                  <div style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    {region.name}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.95rem'
                  }}>
                    {region.count}개 골프장
                    </div>
                    </div>
              ))}
                    </div>
                      </div>
                    )}

        {/* 골프장명 검색 */}
        {activeTab === 'name' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              골프장명을 입력하세요
            </h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchByName()}
                placeholder="골프장명을 입력하세요"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '1rem',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#1f2937'
                }}
              />
              <button
                onClick={searchByName}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 147, 30, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                검색
              </button>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '600',
                marginRight: '0.5rem'
              }}>
                인기 검색어:
              </span>
              {['스카이힐', '베어크릭', '오크밸리', '핀크스'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchQuery(keyword);
                    searchByName();
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '1.25rem',
                    fontSize: '0.9rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {keyword}
                </button>
              ))}
            </div>
                  </div>
        )}

        {/* 검색 결과 */}
        {showResults && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                검색 결과 ({filteredCourses.length}개)
              </h3>
              <button
                onClick={resetSearch}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                검색 초기화
              </button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    height: '200px',
                    background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: 'white'
                  }}>
                    🏌️‍♂️
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.75rem'
                    }}>
                      {course.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#6b7280'
                    }}>
                      <span>📍</span>
                      <span>{course.address}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#ffa726',
                      fontWeight: '600'
                    }}>
                      <span>⭐</span>
                      <span>{course.rating} (리뷰)</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      color: '#059669',
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}>
                      <span>💰</span>
                      <span>평일 {course.green_fee.toLocaleString()}원</span>
                    </div>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}>
                      {course.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      {course.facilities.slice(0, 3).map((facility, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.8rem'
                          }}
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      <button style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '2px solid #059669',
                        background: 'white',
                        color: '#059669',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#059669';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#059669';
                      }}
                      >
                        상세보기
                      </button>
                      <button style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: 'none',
                        background: '#059669',
                        color: 'white',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#047857';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#059669';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        예약하기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 추천 골프장 */}
        {!showResults && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              추천 골프장
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {sampleGolfCourses.slice(0, 6).map((course) => (
                <div
                  key={course.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    height: '200px',
                    background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: 'white'
                  }}>
                    🏌️‍♂️
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.75rem'
                    }}>
                      {course.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#6b7280'
                    }}>
                      <span>📍</span>
                      <span>{course.address}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#ffa726',
                      fontWeight: '600'
                    }}>
                      <span>⭐</span>
                      <span>{course.rating} (리뷰)</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      color: '#059669',
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}>
                      <span>💰</span>
                      <span>평일 {course.green_fee.toLocaleString()}원</span>
                    </div>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}>
                      {course.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      {course.facilities.slice(0, 3).map((facility, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.8rem'
                          }}
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem'
                    }}>
                      <button style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '2px solid #059669',
                        background: 'white',
                        color: '#059669',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#059669';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#059669';
                      }}
                      >
                      상세보기
                    </button>
                      <button style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: 'none',
                        background: '#059669',
                        color: 'white',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#047857';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#059669';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        예약하기
                      </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default GolfCourses;
