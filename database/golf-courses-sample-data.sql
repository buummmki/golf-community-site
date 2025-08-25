-- 실제 골프장 데이터를 기반으로 한 샘플 데이터
-- 출처: C:\Users\samsung\Desktop\ROOT\골프장\data\golf-courses-complete-2024.js

-- 골프장 정보 샘플 데이터
INSERT INTO golf_courses (name, region, address, phone, holes, par, green_fee, description, facilities, image_url) VALUES
-- 서울/경기 지역
('인서울27골프클럽', '서울', '서울시 강서구', '문의 바랍니다', 27, 81, 0, '서울 시내 유일한 27홀 규모의 골프장으로 접근성이 우수합니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "카트", "주차장"]', 'https://images.unsplash.com/photo-1587174486073-ae5e5cfe23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('한양컨트리클럽', '경기', '고양시 덕양구', '문의 바랍니다', 36, 144, 0, '경기도 고양시에 위치한 명문 회원제 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "사우나", "카트", "캐디", "락커룸", "주차장"]', 'https://images.unsplash.com/photo-1535132011086-b8818f016104?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('뉴코리아 컨트리클럽', '경기', '고양시 덕양구', '문의 바랍니다', 18, 72, 0, '고양시에 위치한 18홀 규모의 회원제 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "카트", "주차장"]', 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('고양컨트리클럽', '경기', '고양시 덕양구', '문의 바랍니다', 9, 36, 0, '9홀 규모의 대중제 골프장으로 편리한 이용이 가능합니다.', '["레스토랑", "연습장", "카트", "주차장"]', 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('한원CC', '경기', '용인시 처인구', '문의 바랍니다', 27, 81, 0, '용인시에 위치한 27홀 규모의 회원제 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "사우나", "카트", "캐디", "주차장"]', 'https://images.unsplash.com/photo-1579586337278-3f436f25bb86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

-- 강원도 지역
('하이원컨트리클럽', '강원', '강원도 정선군', '문의 바랍니다', 18, 72, 0, '정선군 고한읍에 위치한 산악 골프장으로 멋진 경관을 자랑합니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "카트", "주차장"]', 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('오크밸리회원제골프장', '강원', '강원도 원주시', '문의 바랍니다', 36, 144, 0, '원주시에 위치한 36홀 규모의 회원제 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "사우나", "카트", "캐디", "락커룸", "주차장"]', 'https://images.unsplash.com/photo-1535132011086-b8818f016104?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('용평리조트골프클럽', '강원', '강원도 평창군', '문의 바랍니다', 18, 72, 0, '평창군 대관령면에 위치한 리조트형 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "카트", "주차장"]', 'https://images.unsplash.com/photo-1587174486073-ae5e5cfe23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('휘닉스 컨트리클럽', '강원', '강원도 평창군', '문의 바랍니다', 18, 72, 0, '평창군 봉평면에 위치한 회원제 골프장입니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "사우나", "카트", "주차장"]', 'https://images.unsplash.com/photo-1579586337278-3f436f25bb86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

-- 인천 지역
('SKY72 골프클럽', '인천', '인천시 중구', '문의 바랍니다', 18, 72, 0, '인천공항 근처에 위치한 대중제 골프장으로 접근성이 뛰어납니다.', '["레스토랑", "프로샵", "연습장", "클럽하우스", "카트", "주차장"]', 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- 게시글 샘플 데이터
INSERT INTO golf_posts (title, content, golf_course, region, category, author_id, author_name, views) VALUES
('오크밸리CC 7월 25일 후기', '오늘 오크밸리에서 라운딩했는데 그린 상태가 정말 좋았습니다. 날씨도 좋고 스코어도 만족스러웠어요!', '오크밸리회원제골프장', '강원', 'review', 'user_001', '골프사랑', 123),

('남서울CC 그린 상태 좋아요', '남서울CC에서 라운딩했는데 그린이 정말 빨랐습니다. 퍼팅할 때 주의하세요!', '남서울CC', '경기', 'review', 'user_002', '버디왕', 98),

('하이원컨트리클럽 후기', '하이원에서 라운딩했습니다. 산악 골프장이라 경치가 정말 좋네요. 다만 거리가 좀 멀어요.', '하이원컨트리클럽', '강원', 'review', 'user_003', '산악골퍼', 87),

('SKY72 골프클럽 추천', '인천공항 근처라 접근성이 좋고 가격도 합리적입니다. 해외 출장 전후에 라운딩하기 좋아요.', 'SKY72 골프클럽', '인천', 'review', 'user_004', '출장골퍼', 156),

('드라이버 선택 팁', '드라이버 선택할 때 가장 중요한 것은 본인의 스윙스피드에 맞는 샤프트를 고르는 것입니다.', '', '', 'tip', 'user_005', '골프코치김', 234),

('퍼팅 연습 방법', '집에서도 할 수 있는 퍼팅 연습 방법을 소개합니다. 일정한 리듬으로 연습하는 것이 중요해요.', '', '', 'tip', 'user_006', '퍼팅마스터', 189),

('초보자 골프 클럽 세팅', '초보자분들께 추천하는 골프 클럽 세팅에 대해 알려드립니다.', '', '', 'tip', 'user_007', '골프샘', 145);

-- 라운딩 모집 샘플 데이터
INSERT INTO golf_rounds (title, description, golf_course, region, date, time, max_participants, current_participants, green_fee, status, author_id, author_name) VALUES
('이번 주말 한양CC 라운딩 모집', '토요일 오전 한양컨트리클럽에서 함께 라운딩하실 분 모집합니다. 초급자도 환영!', '한양컨트리클럽', '경기', '2024-08-31', '08:00', 4, 2, 0, 'recruiting', 'user_008', '주말골퍼'),

('오크밸리 라운딩 파트너 구해요', '다음 주 화요일 오크밸리에서 라운딩 예정입니다. 중급자 이상 선호합니다.', '오크밸리회원제골프장', '강원', '2024-09-03', '07:30', 4, 1, 0, 'recruiting', 'user_009', '강원골퍼'),

('SKY72 조인 구합니다', '이번 금요일 SKY72에서 라운딩합니다. 편하게 라운딩해요!', 'SKY72 골프클럽', '인천', '2024-08-30', '14:00', 3, 2, 0, 'recruiting', 'user_010', '평일골퍼'),

('하이원 1박2일 골프여행', '하이원에서 1박2일 골프여행 함께하실 분들 모집합니다.', '하이원컨트리클럽', '강원', '2024-09-07', '08:00', 4, 4, 0, 'full', 'user_011', '여행골퍼'),

('용평리조트 가을 라운딩', '가을 단풍 시즌 용평리조트에서 라운딩 어떠세요?', '용평리조트골프클럽', '강원', '2024-09-15', '09:00', 4, 3, 0, 'recruiting', 'user_012', '단풍골퍼');

-- 중고 장터 샘플 데이터
INSERT INTO golf_market_items (title, description, price, category, condition, brand, status, seller_id, seller_name, image_url) VALUES
('테일러메이드 M6 드라이버', '테일러메이드 M6 드라이버 판매합니다. 사용감 적고 상태 좋습니다. 10.5도, S샤프트입니다.', 280000, 'driver', 'good', '테일러메이드', 'available', 'user_013', '클럽매니아', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('캘러웨이 아이언 세트', '캘러웨이 아페스 아이언 5-9번, PW 세트입니다. 중고지만 관리 잘 했습니다.', 450000, 'iron', 'excellent', '캘러웨이', 'available', 'user_014', '아이언킹', 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('오디세이 퍼터', '오디세이 화이트핫 퍼터 팝니다. 33인치, 그립 새로 감았습니다.', 120000, 'putter', 'good', '오디세이', 'available', 'user_015', '퍼팅장인', 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('타이틀리스트 골프백', '타이틀리스트 카트백 판매합니다. 깔끔한 디자인이고 수납공간 넉넉합니다.', 180000, 'bag', 'good', '타이틀리스트', 'available', 'user_016', '백마니아', 'https://images.unsplash.com/photo-1587174486073-ae5e5cfe23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('나이키 골프화', '나이키 에어 줌 골프화 새상품급입니다. 사이즈 270mm, 한 번만 신었어요.', 80000, 'shoes', 'excellent', '나이키', 'available', 'user_017', '골프화수집', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('핑 웨지 세트', '핑 웨지 52도, 56도 세트입니다. 스핀 성능 좋고 상태 양호합니다.', 160000, 'wedge', 'good', '핑', 'sold', 'user_018', '웨지마스터', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('아디다스 골프웨어', '아디다스 골프 폴로셔츠와 바지 세트입니다. XL 사이즈, 거의 안 입었어요.', 65000, 'wear', 'excellent', '아디다스', 'available', 'user_019', '웨어러버', 'https://images.unsplash.com/photo-1594736797933-d0ac6b8f5b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),

('볼마커 세트', '프리미엄 볼마커 10개 세트입니다. 선물용으로도 좋아요.', 25000, 'accessory', 'new', '기타', 'available', 'user_020', '악세사리샵', 'https://images.unsplash.com/photo-1579586337278-3f436f25bb86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
