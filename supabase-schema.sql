-- Golf Posts 테이블 생성
CREATE TABLE IF NOT EXISTS golf_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id VARCHAR(100) NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  golf_course VARCHAR(100) NOT NULL,
  region VARCHAR(20) NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Golf Rounds 테이블 생성
CREATE TABLE IF NOT EXISTS golf_rounds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  golf_course VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 4,
  current_participants INTEGER DEFAULT 1,
  author_id VARCHAR(100) NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  green_fee VARCHAR(50),
  region VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'full', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Golf Courses 테이블 생성
CREATE TABLE IF NOT EXISTS golf_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region VARCHAR(20) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  holes INTEGER DEFAULT 18,
  par INTEGER DEFAULT 72,
  green_fee INTEGER,
  rating DECIMAL(2,1) DEFAULT 0.0,
  description TEXT,
  facilities TEXT[], -- 배열로 저장
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Round Participants 테이블 생성 (라운딩 참여자)
CREATE TABLE IF NOT EXISTS golf_round_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  round_id UUID REFERENCES golf_rounds(id) ON DELETE CASCADE,
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(round_id, user_id)
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_golf_posts_region ON golf_posts(region);
CREATE INDEX IF NOT EXISTS idx_golf_posts_golf_course ON golf_posts(golf_course);
CREATE INDEX IF NOT EXISTS idx_golf_posts_created_at ON golf_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_golf_posts_author_id ON golf_posts(author_id);

CREATE INDEX IF NOT EXISTS idx_golf_rounds_date ON golf_rounds(date);
CREATE INDEX IF NOT EXISTS idx_golf_rounds_region ON golf_rounds(region);
CREATE INDEX IF NOT EXISTS idx_golf_rounds_status ON golf_rounds(status);
CREATE INDEX IF NOT EXISTS idx_golf_rounds_author_id ON golf_rounds(author_id);

CREATE INDEX IF NOT EXISTS idx_golf_courses_region ON golf_courses(region);
CREATE INDEX IF NOT EXISTS idx_golf_courses_rating ON golf_courses(rating DESC);

CREATE INDEX IF NOT EXISTS idx_golf_round_participants_round_id ON golf_round_participants(round_id);
CREATE INDEX IF NOT EXISTS idx_golf_round_participants_user_id ON golf_round_participants(user_id);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE golf_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE golf_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE golf_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE golf_round_participants ENABLE ROW LEVEL SECURITY;

-- Posts 정책
CREATE POLICY "Posts are viewable by everyone" ON golf_posts FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts" ON golf_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own posts" ON golf_posts FOR UPDATE USING (author_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can delete their own posts" ON golf_posts FOR DELETE USING (author_id = auth.jwt() ->> 'sub');

-- Rounds 정책
CREATE POLICY "Rounds are viewable by everyone" ON golf_rounds FOR SELECT USING (true);
CREATE POLICY "Users can create their own rounds" ON golf_rounds FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own rounds" ON golf_rounds FOR UPDATE USING (author_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can delete their own rounds" ON golf_rounds FOR DELETE USING (author_id = auth.jwt() ->> 'sub');

-- Golf Courses 정책 (읽기 전용, 관리자만 수정 가능)
CREATE POLICY "Golf courses are viewable by everyone" ON golf_courses FOR SELECT USING (true);
CREATE POLICY "Only admins can modify golf courses" ON golf_courses FOR ALL USING (false); -- 관리자 정책은 별도 설정

-- Round Participants 정책
CREATE POLICY "Participants are viewable by everyone" ON golf_round_participants FOR SELECT USING (true);
CREATE POLICY "Users can join rounds" ON golf_round_participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can leave their own participations" ON golf_round_participants FOR DELETE USING (user_id = auth.jwt() ->> 'sub');

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 설정
CREATE TRIGGER update_golf_posts_updated_at BEFORE UPDATE ON golf_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_golf_rounds_updated_at BEFORE UPDATE ON golf_rounds 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_golf_courses_updated_at BEFORE UPDATE ON golf_courses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입 (골프장 정보)
INSERT INTO golf_courses (name, region, address, phone, holes, par, green_fee, rating, description, facilities) VALUES
('스카이힐 컨트리클럽', '경기', '경기도 성남시 분당구', '031-111-2222', 18, 72, 120000, 4.8, '수도권 최고의 전망을 자랑하는 명문 골프장', ARRAY['드라이빙레인지', '클럽하우스', '레스토랑', '프로샵']),
('베어크릭 골프클럽', '경기', '경기도 파주시 광탄면', '031-333-4444', 18, 72, 95000, 4.6, '자연 친화적인 코스 설계가 돋보이는 골프장', ARRAY['드라이빙레인지', '클럽하우스', '사우나']),
('오크밸리 컨트리클럽', '강원', '강원도 원주시 지정면', '033-555-6666', 18, 72, 150000, 4.9, '산악지형을 활용한 챌린징한 코스', ARRAY['드라이빙레인지', '클럽하우스', '레스토랑', '숙박시설']),
('레이크사이드 골프클럽', '충북', '충청북도 충주시', '043-777-8888', 18, 72, 85000, 4.4, '호수 전망이 아름다운 평원형 코스', ARRAY['드라이빙레인지', '클럽하우스']),
('스카이72', '인천', '인천광역시 중구 운서동', '032-999-0000', 72, 288, 80000, 4.7, '세계 최대 규모의 72홀 골프장', ARRAY['드라이빙레인지', '클럽하우스', '레스토랑', '프로샵', '호텔'])
ON CONFLICT DO NOTHING;

-- 샘플 데이터 삽입 (게시글)
INSERT INTO golf_posts (title, content, author_id, author_name, golf_course, region) VALUES
('오크밸리CC 오늘 그린 컨디션 최고', '오크밸리CC 실시간 후기 (오늘 오전)

그린: ★★★★★ (5/5) - 완벽한 스피드, 볼마크 거의 없음
페어웨이: ★★★★☆ (4/5) - 잔디 상태 양호, 약간 건조
벙커: ★★★★★ (5/5) - 모래 부드럽고 관리 완벽
날씨: 맑음, 무풍

TIP: 14번 홀 파3에서 핀 위치가 뒤쪽이니 조금 더 치세요.', 'sample_user_1', '실시간골퍼', '오크밸리CC', '강원'),

('남서울CC 어제 vs 오늘 컨디션 비교', '남서울CC 2일 연속 라운딩 후기

어제:
그린: ★★★☆☆ - 약간 딱딱함
페어웨이: ★★★★☆ - 양호

오늘:
그린: ★★★★★ - 완벽! 어제 살수한 효과
페어웨이: ★★★★☆ - 여전히 좋음

추천: 화요일 이후가 컨디션 최고인 것 같습니다.', 'sample_user_2', '컨디션마니아', '남서울CC', '경기'),

('주의! 스카이72 오션코스 그린 스피드 경고', '스카이72 오션코스 긴급 후기 (오늘 오후)

그린 스피드 경고!
그린: ★★☆☆☆ (2/5) - 스피드 13+ 매우 빠름
페어웨이: ★★★★☆ (4/5) - 상태 좋음
벙커: ★★★☆☆ (3/5) - 모래 조금 굳음

주의사항:
- 내리막 퍼팅은 거의 터치만
- 핀 아래쪽으로 절대 가지 마세요
- 특히 9번, 18번 홀 주의

점수보다 재미를 위해 가시는 분들께 추천합니다.', 'sample_user_3', '그린마스터', '스카이72 오션코스', '인천')
ON CONFLICT DO NOTHING;

-- 샘플 데이터 삽입 (라운딩 모집)
INSERT INTO golf_rounds (title, golf_course, date, time, description, author_id, author_name, max_participants, green_fee, region) VALUES
('주말 조조 라운딩 모집', '오크밸리CC', CURRENT_DATE + INTERVAL '3 days', '06:30', '조조 티타임으로 시원한 아침 라운딩 즐겨요! 초급~중급자 수준이시면 누구나 환영합니다.', 'sample_user_4', '골프매니아', 4, '15만원', '강원'),
('남서울CC 4인 라운딩', '남서울CC', CURRENT_DATE + INTERVAL '5 days', '11:00', '남서울에서 11시 티타임, 매너 좋으신 분 1명 추가 모집해요.', 'sample_user_5', '남서울단골', 4, '12만원', '경기'),
('제주 핀크스CC 골프여행', '핀크스CC', CURRENT_DATE + INTERVAL '15 days', '09:00', '제주도 골프여행 2박3일 일정입니다. 숙박, 렌트카 모두 준비되어 있어요.', 'sample_user_6', '제주여행러', 4, '35만원', '제주')
ON CONFLICT DO NOTHING;
