// 실제 골프장 데이터를 기반으로 한 샘플 데이터
// C:\Users\samsung\Desktop\ROOT\골프장\data\golf-courses-complete-2024.js 참조

export const sampleGolfCourses = [
  {
    name: '인서울27골프클럽',
    region: '서울',
    address: '서울시 강서구',
    phone: '문의 바랍니다',
    holes: 27,
    par: 81,
    green_fee: 0,
    description: '서울 시내 유일한 27홀 규모의 골프장으로 접근성이 우수합니다.',
    facilities: ['레스토랑', '프로샵', '연습장', '클럽하우스', '카트', '주차장'],
    image_url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cfe23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: '한양컨트리클럽',
    region: '경기',
    address: '고양시 덕양구',
    phone: '문의 바랍니다',
    holes: 36,
    par: 144,
    green_fee: 0,
    description: '경기도 고양시에 위치한 명문 회원제 골프장입니다.',
    facilities: ['레스토랑', '프로샵', '연습장', '클럽하우스', '사우나', '카트', '캐디', '락커룸', '주차장'],
    image_url: 'https://images.unsplash.com/photo-1535132011086-b8818f016104?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: '오크밸리회원제골프장',
    region: '강원',
    address: '강원도 원주시',
    phone: '문의 바랍니다',
    holes: 36,
    par: 144,
    green_fee: 0,
    description: '원주시에 위치한 36홀 규모의 회원제 골프장입니다.',
    facilities: ['레스토랑', '프로샵', '연습장', '클럽하우스', '사우나', '카트', '캐디', '락커룸', '주차장'],
    image_url: 'https://images.unsplash.com/photo-1535132011086-b8818f016104?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'SKY72 골프클럽',
    region: '인천',
    address: '인천시 중구',
    phone: '문의 바랍니다',
    holes: 18,
    par: 72,
    green_fee: 0,
    description: '인천공항 근처에 위치한 대중제 골프장으로 접근성이 뛰어납니다.',
    facilities: ['레스토랑', '프로샵', '연습장', '클럽하우스', '카트', '주차장'],
    image_url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: '하이원컨트리클럽',
    region: '강원',
    address: '강원도 정선군',
    phone: '문의 바랍니다',
    holes: 18,
    par: 72,
    green_fee: 0,
    description: '정선군 고한읍에 위치한 산악 골프장으로 멋진 경관을 자랑합니다.',
    facilities: ['레스토랑', '프로샵', '연습장', '클럽하우스', '카트', '주차장'],
    image_url: 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const samplePosts = [
  {
    title: '오크밸리CC 7월 25일 후기',
    content: '오늘 오크밸리에서 라운딩했는데 그린 상태가 정말 좋았습니다. 날씨도 좋고 스코어도 만족스러웠어요!',
    golf_course: '오크밸리회원제골프장',
    region: '강원',
    category: 'review',
    author_id: 'user_001',
    author_name: '골프사랑',
    views: 123
  },
  {
    title: '남서울CC 그린 상태 좋아요',
    content: '남서울CC에서 라운딩했는데 그린이 정말 빨랐습니다. 퍼팅할 때 주의하세요!',
    golf_course: '남서울CC',
    region: '경기',
    category: 'review',
    author_id: 'user_002',
    author_name: '버디왕',
    views: 98
  },
  {
    title: '드라이버 선택 팁',
    content: '드라이버 선택할 때 가장 중요한 것은 본인의 스윙스피드에 맞는 샤프트를 고르는 것입니다.',
    golf_course: '',
    region: '',
    category: 'tip',
    author_id: 'user_005',
    author_name: '골프코치김',
    views: 234
  }
];

export const sampleRounds = [
  {
    title: '이번 주말 한양CC 라운딩 모집',
    description: '토요일 오전 한양컨트리클럽에서 함께 라운딩하실 분 모집합니다. 초급자도 환영!',
    golf_course: '한양컨트리클럽',
    region: '경기',
    date: '2024-08-31',
    time: '08:00',
    max_participants: 4,
    current_participants: 2,
    green_fee: 0,
    status: 'recruiting' as const,
    author_id: 'user_008',
    author_name: '주말골퍼'
  },
  {
    title: 'SKY72 조인 구합니다',
    description: '이번 금요일 SKY72에서 라운딩합니다. 편하게 라운딩해요!',
    golf_course: 'SKY72 골프클럽',
    region: '인천',
    date: '2024-08-30',
    time: '14:00',
    max_participants: 3,
    current_participants: 2,
    green_fee: 0,
    status: 'recruiting' as const,
    author_id: 'user_010',
    author_name: '평일골퍼'
  }
];

export const sampleMarketItems = [
  {
    title: '테일러메이드 M6 드라이버',
    description: '테일러메이드 M6 드라이버 판매합니다. 사용감 적고 상태 좋습니다. 10.5도, S샤프트입니다.',
    price: 280000,
    category: 'driver',
    condition: 'good',
    brand: '테일러메이드',
    status: 'available' as const,
    seller_id: 'user_013',
    seller_name: '클럽매니아',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '캘러웨이 아이언 세트',
    description: '캘러웨이 아페스 아이언 5-9번, PW 세트입니다. 중고지만 관리 잘 했습니다.',
    price: 450000,
    category: 'iron',
    condition: 'excellent',
    brand: '캘러웨이',
    status: 'available' as const,
    seller_id: 'user_014',
    seller_name: '아이언킹',
    image_url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '나이키 골프화',
    description: '나이키 에어 줌 골프화 새상품급입니다. 사이즈 270mm, 한 번만 신었어요.',
    price: 80000,
    category: 'shoes',
    condition: 'excellent',
    brand: '나이키',
    status: 'available' as const,
    seller_id: 'user_017',
    seller_name: '골프화수집',
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];
