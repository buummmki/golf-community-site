import React, { useState } from 'react';
import { useRounds } from '../hooks/useRounds';
import RoundForm from '../components/RoundForm';

const Rounds = () => {
  const { rounds, loading, error, joinRound } = useRounds();
  const [isRoundFormOpen, setIsRoundFormOpen] = useState(false);

  const handleJoinRound = async (roundId: string) => {
    const result = await joinRound(roundId);
    if (result.success) {
      alert('라운딩 참여 신청이 완료되었습니다!');
    } else {
      alert(result.error || '참여 신청에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="text-center text-red-600">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">라운딩 모집</h1>
            <p className="text-gray-600 mt-2">함께 라운딩할 파트너를 찾아보세요</p>
          </div>
          <button 
            onClick={() => setIsRoundFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + 라운딩 모집하기
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rounds && rounds.length > 0 ? (
            rounds.map((round) => (
              <div key={round.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{round.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    round.status === 'recruiting' 
                      ? 'bg-green-100 text-green-800' 
                      : round.status === 'full'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {round.status === 'recruiting' ? '모집중' : 
                     round.status === 'full' ? '모집완료' : '완료'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">골프장:</span>
                    <span className="ml-2">{round.golf_course}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">날짜:</span>
                    <span className="ml-2">{new Date(round.date).toLocaleDateString('ko-KR')} {round.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">인원:</span>
                    <span className="ml-2">{round.current_participants}/{round.max_participants}명</span>
                  </div>
                  <p className="text-gray-700 text-sm">{round.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">작성자: {round.author_name}</span>
                  {round.status === 'recruiting' && (
                    <button 
                      onClick={() => handleJoinRound(round.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      참여하기
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">모집 중인 라운딩이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">첫 번째 라운딩을 모집해보세요!</p>
            </div>
          )}
        </div>

        {/* 라운딩 모집 모달 */}
        <RoundForm 
          isOpen={isRoundFormOpen} 
          onClose={() => setIsRoundFormOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Rounds;
