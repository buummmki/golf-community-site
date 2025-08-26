import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, useAuth } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 border border-white/10 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-green-400/20 rotate-12 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border border-emerald-400/10 -rotate-12"></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-xl mb-8">
            <span className="text-green-300 text-sm font-semibold tracking-wide uppercase">Premium Golf Community</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            <span className="block bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent drop-shadow-2xl">
              GOLF
            </span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl -mt-4">
              REVOLUTION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto text-white/90 font-light leading-relaxed">
            <span className="font-semibold text-green-300">프리미엄 골프 커뮤니티</span>에서<br />
            새로운 골프 경험을 시작하세요
          </p>

          {/* Interactive Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">1,000+</div>
              <div className="text-white/70 text-sm uppercase tracking-wide">활성 멤버</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-300 mb-2">500+</div>
              <div className="text-white/70 text-sm uppercase tracking-wide">골프장 정보</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">24/7</div>
              <div className="text-white/70 text-sm uppercase tracking-wide">커뮤니티 활동</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {isSignedIn ? (
              <>
                <Link
                  to="/posts"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl shadow-2xl hover:shadow-green-400/50 hover:scale-105 transform transition-all duration-300 ease-out"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>커뮤니티 입장</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-300 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/rounds"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white backdrop-blur-xl bg-white/10 rounded-2xl border-2 border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transform transition-all duration-300 ease-out"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span>라운딩 매칭</span>
                  </span>
                </Link>
              </>
            ) : (
              <>
                <SignInButton>
                  <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl shadow-2xl hover:shadow-green-400/50 hover:scale-105 transform transition-all duration-300 ease-out">
                    <span className="relative z-10 flex items-center gap-3">
                      <span>지금 시작하기</span>
                      <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-300 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </SignInButton>
                <Link
                  to="/golf-courses"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white backdrop-blur-xl bg-white/10 rounded-2xl border-2 border-white/30 shadow-2xl hover:bg-white/20 hover:scale-105 transform transition-all duration-300 ease-out"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>골프장 둘러보기</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">라운딩 매칭</h3>
                <p className="text-white/80 leading-relaxed">AI 기반 매칭 시스템으로 완벽한 골프 파트너를 찾아보세요</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-emerald-400/50 transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">프리미엄 골프장</h3>
                <p className="text-white/80 leading-relaxed">전국 최고급 골프장 정보와 실시간 예약 서비스를 제공합니다</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-teal-400/50 transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">프리미엄 장터</h3>
                <p className="text-white/80 leading-relaxed">검증된 고급 골프 용품만을 거래하는 안전한 마켓플레이스</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm font-medium uppercase tracking-wide">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
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