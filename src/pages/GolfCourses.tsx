import React, { useState } from 'react';
import { useGolfCourses } from '../hooks/useGolfCourses';
import GolfCourseForm from '../components/GolfCourseForm';

const GolfCourses = () => {
  const { golfCourses, loading, error } = useGolfCourses();
  const [isGolfCourseFormOpen, setIsGolfCourseFormOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-red-600">오류가 발생했습니다: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">골프장 정보</h1>
            <p className="text-gray-600 mt-2">전국 골프장 정보를 확인하세요</p>
          </div>
          <button 
            onClick={() => setIsGolfCourseFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + 골프장 등록
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {golfCourses && golfCourses.length > 0 ? (
            golfCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {course.image_url && (
                  <img 
                    src={course.image_url} 
                    alt={course.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <span className="text-lg font-bold text-green-600">
                      {course.green_fee?.toLocaleString()}원
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">지역:</span>
                      <span className="ml-2">{course.region}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">홀수:</span>
                      <span className="ml-2">{course.holes}홀</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">파:</span>
                      <span className="ml-2">Par {course.par}</span>
                    </div>
                    {course.phone && (
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium">전화:</span>
                        <span className="ml-2">{course.phone}</span>
                      </div>
                    )}
                  </div>

                  {course.description && (
                    <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {course.facilities?.map((facility, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {facility}
                        </span>
                      ))}
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      상세보기
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">등록된 골프장이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">첫 번째 골프장을 등록해보세요!</p>
            </div>
          )}
        </div>

        {/* 골프장 등록 모달 */}
        <GolfCourseForm 
          isOpen={isGolfCourseFormOpen} 
          onClose={() => setIsGolfCourseFormOpen(false)} 
        />
      </div>
    </div>
  );
};

export default GolfCourses;
