import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Screen Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-emerald-800 via-green-700 to-teal-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjciLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-green-900/20"></div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl" style={{textWrap: 'balance'}}>
                GolfLoop와 함께하는
              </span>
              <span className="block bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                완벽한 골프 라이프
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90 drop-shadow-lg" style={{textWrap: 'balance'}}>
              골프 애호가들이 모여 정보를 공유하고 함께 라운딩하는 프리미엄 골프 커뮤니티
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isSignedIn ? (
                <>
                  <Link
                    to="/posts"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 ease-out border border-green-400/30"
                  >
                    <span className="relative z-10">게시판 둘러보기</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    to="/rounds"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 ease-out"
                  >
                    <span className="relative z-10 drop-shadow-sm">라운딩 찾기</span>
                  </Link>
                </>
              ) : (
                <>
                  <SignInButton>
                    <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 ease-out border border-green-400/30">
                      <span className="relative z-10">로그인하고 시작하기</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </SignInButton>
                  <Link
                    to="/golf-courses"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl bg-white/20 rounded-xl border border-white/30 shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 ease-out"
                  >
                    <span className="relative z-10 drop-shadow-sm">골프장 정보 보기</span>
                  </Link>
                </>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">🏌️‍♂️</div>
                <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-sm">라운딩 매칭</h3>
                <p className="text-white/80 drop-shadow-sm">함께 라운딩할 파트너를 쉽게 찾아보세요</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">🏌️</div>
                <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-sm">골프장 정보</h3>
                <p className="text-white/80 drop-shadow-sm">전국 골프장 정보와 리뷰를 확인하세요</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-sm">중고 장터</h3>
                <p className="text-white/80 drop-shadow-sm">골프 용품을 합리적인 가격에 거래하세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 공지사항 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">공지사항</h2>
          <div className="bg-white rounded-lg shadow-md">
            <ul className="divide-y divide-gray-200">
              <li className="px-6 py-4 hover:bg-gray-50">
                <Link to="/posts" className="block">
                  <span className="text-green-600 font-semibold">[공지]</span>
                  <span className="ml-2">골프 커뮤니티 오픈!</span>
                  <span className="float-right text-gray-500 text-sm">2024-07-25</span>
                </Link>
              </li>
              <li className="px-6 py-4 hover:bg-gray-50">
                <Link to="/posts" className="block">
                  <span className="text-blue-600 font-semibold">[이벤트]</span>
                  <span className="ml-2">첫 후기 작성 이벤트!</span>
                  <span className="float-right text-gray-500 text-sm">2024-07-24</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* 최신 후기 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">최신 후기</h2>
            <Link to="/posts" className="text-green-600 hover:text-green-700">
              더보기 →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지역</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">골프장명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">강원</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">오크밸리CC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <Link to="/posts">오크밸리CC 7월 25일 후기</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">골프사랑</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-07-25</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">123</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">경기</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">남서울CC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <Link to="/posts">남서울CC 그린 상태 좋아요</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">버디왕</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-07-24</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;