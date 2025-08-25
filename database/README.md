# GolfLoop 데이터베이스 설정 가이드

## 📁 파일 구조

```
database/
├── schema.sql                    # 데이터베이스 스키마 (테이블 생성)
├── golf-courses-sample-data.sql  # 실제 골프장 데이터 기반 샘플 데이터
└── README.md                     # 설정 가이드 (현재 파일)

src/data/
└── sampleData.ts                 # TypeScript용 샘플 데이터
```

## 🚀 Supabase 설정 방법

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 접속
2. 새 프로젝트 생성
3. 데이터베이스 패스워드 설정

### 2. 스키마 생성
1. Supabase 대시보드 → SQL Editor 이동
2. `schema.sql` 파일 내용 복사해서 실행
3. 테이블 생성 확인

### 3. 샘플 데이터 입력
1. `golf-courses-sample-data.sql` 파일 내용 복사해서 실행
2. 데이터 입력 완료 확인

### 4. 환경변수 설정
`.env.local` 파일에 Supabase 정보 추가:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 테이블 구조

### golf_posts (게시글)
- id, title, content, golf_course, region, category
- author_id, author_name, views
- created_at, updated_at

### golf_rounds (라운딩 모집)
- id, title, description, golf_course, region
- date, time, max_participants, current_participants
- green_fee, status, author_id, author_name
- created_at, updated_at

### golf_courses (골프장 정보)
- id, name, region, address, phone
- holes, par, green_fee, description
- facilities, image_url
- created_at, updated_at

### golf_market_items (중고 장터)
- id, title, description, price, category
- condition, brand, status
- seller_id, seller_name, image_url
- created_at, updated_at

## 🎯 샘플 데이터 내용

### 실제 골프장 데이터 (출처: C:\Users\samsung\Desktop\ROOT\골프장\data\golf-courses-complete-2024.js)

**서울/경기 지역:**
- 인서울27골프클럽 (서울) - 27홀
- 한양컨트리클럽 (경기) - 36홀
- 뉴코리아 컨트리클럽 (경기) - 18홀
- 고양컨트리클럽 (경기) - 9홀
- 한원CC (경기) - 27홀

**강원도 지역:**
- 하이원컨트리클럽 (정선) - 18홀
- 오크밸리회원제골프장 (원주) - 36홀
- 용평리조트골프클럽 (평창) - 18홀
- 휘닉스 컨트리클럽 (평창) - 18홀

**인천 지역:**
- SKY72 골프클럽 (인천공항) - 18홀

*가격 정보는 개인정보 보호를 위해 제거되었으며, 실제 이용 시 각 골프장에 직접 문의하시기 바랍니다.*

### 게시글 샘플
- 골프장 후기 글
- 골프 팁 및 기술 글
- 초보자 가이드 글

### 라운딩 모집 샘플
- 주말/평일 라운딩 모집
- 골프여행 모집
- 다양한 지역 골프장

### 중고 장터 샘플
- 드라이버, 아이언, 퍼터, 웨지
- 골프백, 골프화, 골프웨어
- 다양한 브랜드 (테일러메이드, 캘러웨이, 나이키 등)

## 🔧 개발 중 사용법

1. **Supabase 설정 완료 후** 애플리케이션 실행
2. **로그인 후** 각 페이지에서 샘플 데이터 확인
3. **새 데이터 추가** 기능 테스트
4. **실시간 업데이트** 확인

## 📝 추가 기능

- 자동 생성되는 UUID 기본키
- 타임스탬프 자동 관리
- 인덱스 최적화
- RLS (Row Level Security) 준비

모든 데이터는 실제 골프장 정보를 기반으로 구성되어 있어 실제 서비스와 유사한 환경에서 테스트할 수 있습니다.
