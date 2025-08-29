# 🚀 GOLF LOOP 배포 가이드

## 1. Supabase 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름: `golf-loop`
4. 데이터베이스 비밀번호 설정
5. 지역 선택 (Asia Northeast - Seoul 권장)

### 1.2 데이터베이스 스키마 생성
1. Supabase Dashboard > SQL Editor로 이동
2. `supabase-schema.sql` 파일의 내용을 복사하여 실행
3. 테이블 생성 완료 확인

### 1.3 API 키 확인
1. Settings > API로 이동
2. Project URL 복사
3. anon/public key 복사

## 2. 환경변수 설정

### 2.1 .env 파일 생성
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용 추가:

```env
# Supabase
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key

# Clerk (기존 설정 유지)
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## 3. Vercel 배포

### 3.1 Vercel 계정 연동
1. [Vercel](https://vercel.com)에 로그인
2. GitHub 계정 연동
3. golf-community-site 리포지토리 import

### 3.2 환경변수 설정
1. Vercel Dashboard > Settings > Environment Variables
2. 위의 환경변수들 추가
3. Production, Preview, Development 모두 체크

### 3.3 배포 설정
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

## 4. Clerk 설정 업데이트

### 4.1 도메인 추가
1. Clerk Dashboard > Domains
2. Vercel 배포 URL 추가
3. localhost:3000도 개발용으로 유지

## 5. 테스트 체크리스트

### 5.1 기본 기능
- [ ] 로그인/로그아웃
- [ ] 회원가입
- [ ] 홈페이지 로딩

### 5.2 Posts 페이지
- [ ] 게시글 목록 조회
- [ ] 게시글 작성
- [ ] 게시글 수정/삭제
- [ ] 지역별 필터링
- [ ] 검색 기능

### 5.3 Rounds 페이지
- [ ] 라운딩 목록 조회
- [ ] 라운딩 모집 작성
- [ ] 라운딩 참여/탈퇴
- [ ] 필터링 기능

### 5.4 GolfCourses 페이지
- [ ] 골프장 목록 조회
- [ ] 검색 및 필터링
- [ ] 골프장 상세 정보
- [ ] 평점 표시

### 5.5 Market 페이지
- [ ] 상품 목록 조회
- [ ] 상품 등록
- [ ] 카테고리 필터링

## 6. 성능 최적화

### 6.1 이미지 최적화
- Vercel의 자동 이미지 최적화 활용
- WebP 형식 지원

### 6.2 번들 최적화
- Code splitting 적용
- 불필요한 라이브러리 제거

## 7. 모니터링 설정

### 7.1 Vercel Analytics
- Vercel Dashboard에서 Analytics 활성화

### 7.2 Supabase 모니터링
- Supabase Dashboard에서 Usage 모니터링

---

## 🚨 주의사항

1. **환경변수 보안**: `.env` 파일은 절대 GitHub에 커밋하지 마세요
2. **API 키 관리**: 정기적으로 API 키를 업데이트하세요
3. **데이터베이스 백업**: 중요한 데이터는 정기적으로 백업하세요

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Vercel 로그
2. Supabase 로그
3. 브라우저 개발자 도구 콘솔

---

🎉 **배포 완료 후 실제 URL에서 모든 기능이 정상 작동하는지 확인하세요!**
