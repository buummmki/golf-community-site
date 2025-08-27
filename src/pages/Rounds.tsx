import React, { useState, useEffect } from 'react';
import { useRounds } from '../hooks/useRounds';
import { useAuth } from '@clerk/clerk-react';
import RoundForm from '../components/RoundForm';
import { Round } from '../lib/supabase';

const Rounds = () => {
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [isRoundFormOpen, setIsRoundFormOpen] = useState(false);
  const [userParticipations, setUserParticipations] = useState<Set<string>>(new Set());
  const { isSignedIn, userId } = useAuth();
  
  const {
    rounds,
    loading,
    error,
    createRound,
    joinRound,
    leaveRound,
    getRoundsByRegion,
    getRoundsByStatus,
    isUserParticipating,
  } = useRounds();

  const regions = ['전체', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '인천', '서울'];
  const statuses = ['전체', '모집중', '모집완료', '완료'];

  // 사용자 참여 상태 확인
  useEffect(() => {
    if (!userId || rounds.length === 0) return;

    const checkUserParticipations = async () => {
      const participationPromises = rounds.map(async (round) => {
        const isParticipating = await isUserParticipating(round.id);
        return { roundId: round.id, isParticipating };
      });

      const results = await Promise.all(participationPromises);
      const participatingRounds = new Set(
        results.filter(result => result.isParticipating).map(result => result.roundId)
      );
      
      setUserParticipations(participatingRounds);
    };

    checkUserParticipations();
  }, [rounds, userId, isUserParticipating]);

  const filteredRounds = rounds.filter(round => {
    const regionMatch = selectedRegion === '전체' || round.region === selectedRegion;
    const statusMatch = selectedStatus === '전체' || 
      (selectedStatus === '모집중' && round.status === 'recruiting') ||
      (selectedStatus === '모집완료' && round.status === 'full') ||
      (selectedStatus === '완료' && round.status === 'completed');
    
    // 과거 날짜 필터링 (완료된 라운딩만 표시)
    const roundDate = new Date(round.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isUpcoming = roundDate >= today;
    
    return regionMatch && statusMatch && (isUpcoming || round.status === 'completed');
  });

  const sortedRounds = [...filteredRounds].sort((a, b) => {
    // 상태별 우선순위: 모집중 > 모집완료 > 완료
    const statusPriority = { recruiting: 3, full: 2, completed: 1 };
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[b.status] - statusPriority[a.status];
    }
    
    // 같은 상태면 날짜순
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const handleJoinRound = async (roundId: string) => {
    if (!isSignedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    const result = await joinRound(roundId);
    if (result.success) {
      setUserParticipations(prev => new Set([...prev, roundId]));
      alert('라운딩 참여 신청이 완료되었습니다!');
    } else {
      alert(result.error || '라운딩 참여에 실패했습니다.');
    }
  };

  const handleLeaveRound = async (roundId: string) => {
    const result = await leaveRound(roundId);
    if (result.success) {
      setUserParticipations(prev => {
        const newSet = new Set(prev);
        newSet.delete(roundId);
        return newSet;
      });
      alert('라운딩 참여를 취소했습니다.');
    } else {
      alert(result.error || '라운딩 탈퇴에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    
    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? '오후' : '오전';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    
    return `${ampm} ${displayHour}:${minutes}`;
  };

  const getStatusBadge = (round: Round) => {
    const statusInfo = {
      recruiting: { text: '모집중', color: '#10b981', bgColor: '#dcfce7' },
      full: { text: '모집완료', color: '#f59e0b', bgColor: '#fef3c7' },
      completed: { text: '완료', color: '#6b7280', bgColor: '#f3f4f6' }
    };

    const info = statusInfo[round.status];
    
    return (
      <span style={{
        background: info.bgColor,
        color: info.color,
        padding: '0.25rem 0.75rem',
        borderRadius: '1rem',
        fontSize: '0.75rem',
        fontWeight: '600'
      }}>
        {info.text}
      </span>
    );
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
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>라운딩 모집을 불러오는 중...</div>
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
              라운딩 모집
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
              fontWeight: '400'
            }}>
              완벽한 골프 파트너를 찾아<br />
              즐거운 라운딩을 함께하세요
            </p>
          </div>
          
          {isSignedIn && (
            <button 
              onClick={() => setIsRoundFormOpen(true)}
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
              + 모집 작성
            </button>
          )}
        </div>

        {/* 필터 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '1rem' }}>상태:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    border: selectedStatus === status ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.3)',
                    background: selectedStatus === status ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: selectedStatus === status ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 라운딩 목록 */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
        }}>
          {sortedRounds.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>라운딩 모집이 없습니다</div>
              <div style={{ opacity: 0.8 }}>첫 번째 라운딩을 모집해보세요!</div>
            </div>
          ) : (
            sortedRounds.map((round) => (
              <div
                key={round.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* 헤더 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {round.region}
                    </span>
                    {getStatusBadge(round)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'right' }}>
                    <div>{formatDate(round.date)}</div>
                    <div>{formatTime(round.time)}</div>
                  </div>
                </div>

                {/* 제목 및 골프장 */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {round.title}
                </h3>
                
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#059669',
                  marginBottom: '1rem'
                }}>
                  📍 {round.golf_course}
                </div>

                {/* 설명 */}
                {round.description && (
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
                    {round.description}
                  </p>
                )}

                {/* 정보 */}
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
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>참여인원</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                      {round.current_participants} / {round.max_participants}명
                    </div>
                  </div>
                  {round.green_fee && (
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>그린피</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                        {round.green_fee}
                      </div>
                    </div>
                  )}
                </div>

                {/* 하단 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '1rem'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    모집자: {round.author_name}
                  </div>
                  
                  {isSignedIn && round.status === 'recruiting' && (
                    <div>
                      {userParticipations.has(round.id) ? (
                        <button
                          onClick={() => handleLeaveRound(round.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ef4444',
                            borderRadius: '0.5rem',
                            background: 'white',
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          참여 취소
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinRound(round.id)}
                          disabled={round.current_participants >= round.max_participants}
                          style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            background: round.current_participants >= round.max_participants ? '#9ca3af' : '#10b981',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: round.current_participants >= round.max_participants ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {round.current_participants >= round.max_participants ? '정원 마감' : '참여하기'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 라운딩 작성 폼 */}
      <RoundForm
        isOpen={isRoundFormOpen}
        onClose={() => setIsRoundFormOpen(false)}
        onSubmit={createRound}
      />
    </div>
  );
};

export default Rounds;