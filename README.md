# 🏌️‍♂️ GolfLoop - 골프 커뮤니티 플랫폼

현대적이고 완전한 기능을 갖춘 골프 애호가들을 위한 커뮤니티 플랫폼입니다.

## ✨ 주요 기능

### 🎯 **4가지 핵심 서비스**
- **📝 게시판**: 골프 후기, 팁, 질문 등 자유로운 소통
- **👥 라운딩 모집**: 함께 라운딩할 파트너 찾기
- **🏌️ 골프장 정보**: 전국 골프장 정보 및 리뷰
- **🛒 중고 장터**: 골프 용품 거래 플랫폼

### 🔐 **사용자 인증**
- **Clerk**: 간편하고 안전한 소셜 로그인
- 회원가입, 로그인, 프로필 관리

### 💾 **실시간 데이터베이스**
- **Supabase**: PostgreSQL 기반 실시간 데이터베이스
- 즉시 반영되는 게시글, 댓글, 라운딩 모집

### 🎨 **현대적 UI/UX**
- **풀스크린 히어로 섹션**: 강력한 첫인상
- **글래스모피즘 디자인**: 트렌디한 시각 효과
- **완전 반응형**: 모바일부터 데스크톱까지

## 🛠️ 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** (수동 유틸리티 클래스)
- **React Router DOM** (클라이언트 사이드 라우팅)

### 인증
- **Clerk** (사용자 인증 및 관리)

### 데이터베이스
- **Supabase** (PostgreSQL + 실시간 기능)

### 개발 도구
- **Create React App**
- **PostCSS**
- **ESLint** + **TypeScript**

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/golf-community-site.git
cd golf-community-site
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
```bash
# .env.local.example을 .env.local로 복사
cp .env.local.example .env.local

# .env.local 파일을 열어서 실제 API 키로 수정
```

필요한 환경변수:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 데이터베이스 설정
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `database/schema.sql` 실행
3. `database/golf-courses-sample-data.sql` 실행 (선택사항)

### 5. 인증 설정
1. [Clerk](https://clerk.dev)에서 새 애플리케이션 생성
2. Publishable Key를 `.env.local`에 추가

### 6. 개발 서버 실행
```bash
npm start
```

http://localhost:3000에서 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
golf-community/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── PostForm.tsx     # 게시글 작성 모달
│   │   ├── RoundForm.tsx    # 라운딩 모집 모달
│   │   ├── GolfCourseForm.tsx # 골프장 등록 모달
│   │   └── MarketItemForm.tsx # 상품 등록 모달
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home.tsx         # 홈페이지
│   │   ├── Posts.tsx        # 게시판
│   │   ├── Rounds.tsx       # 라운딩 모집
│   │   ├── GolfCourses.tsx  # 골프장 정보
│   │   └── Market.tsx       # 중고 장터
│   ├── hooks/               # 커스텀 훅
│   │   ├── usePosts.ts      # 게시글 관리
│   │   ├── useRounds.ts     # 라운딩 관리
│   │   ├── useGolfCourses.ts # 골프장 관리
│   │   └── useMarket.ts     # 마켓 관리
│   ├── lib/
│   │   └── supabase.ts      # Supabase 클라이언트
│   └── data/
│       └── sampleData.ts    # 샘플 데이터
├── database/
│   ├── schema.sql           # 데이터베이스 스키마
│   ├── golf-courses-sample-data.sql # 샘플 데이터
│   └── README.md            # 데이터베이스 설정 가이드
└── public/                  # 정적 파일
```

## 🎯 주요 기능 상세

### 🏠 홈페이지
- **풀스크린 히어로 섹션**: 강력한 임팩트의 첫인상
- **그라데이션 배경**: 현대적인 시각 효과
- **글래스모피즘 카드**: 트렌디한 디자인
- **CTA 버튼**: 명확한 행동 유도

### 📝 게시판
- 카테고리별 게시글 (일반, 후기, 팁, 질문)
- 실시간 조회수 카운트
- 골프장별, 지역별 필터링
- 마크다운 지원 (계획)

### 👥 라운딩 모집
- 날짜/시간 기반 모집
- 실시간 참여자 수 관리
- 자동 모집 상태 변경 (모집중 → 모집완료)
- 지역별 필터링

### 🏌️ 골프장 정보
- 전국 골프장 데이터베이스
- 홀수, 파, 편의시설 정보
- 사용자 리뷰 및 평점 (계획)
- 이미지 갤러리

### 🛒 중고 장터
- 카테고리별 상품 분류
- 상태별 필터링 (새상품, 최상, 상, 중, 하)
- 판매상태 관리 (판매중, 판매완료)
- 브랜드별 검색

## 🔧 개발 정보

### 데이터베이스 테이블
- `golf_posts`: 게시글
- `golf_rounds`: 라운딩 모집
- `golf_courses`: 골프장 정보
- `golf_market_items`: 중고 장터 상품

### API 엔드포인트
- Supabase 자동 생성 REST API
- 실시간 구독 (Real-time subscriptions)
- Row Level Security (RLS) 준비

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든 연락주세요!

---

**GolfLoop** - 골프 애호가들의 완벽한 커뮤니티 🏌️‍♂️⛳