-- GolfLoop 골프 커뮤니티 데이터베이스 스키마

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS golf_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    golf_course TEXT,
    region TEXT,
    category TEXT DEFAULT 'general',
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 라운딩 모집 테이블
CREATE TABLE IF NOT EXISTS golf_rounds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    golf_course TEXT NOT NULL,
    region TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    max_participants INTEGER NOT NULL DEFAULT 4,
    current_participants INTEGER DEFAULT 1,
    green_fee INTEGER DEFAULT 0,
    status TEXT DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'full', 'completed')),
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 골프장 정보 테이블
CREATE TABLE IF NOT EXISTS golf_courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    holes INTEGER DEFAULT 18,
    par INTEGER DEFAULT 72,
    green_fee INTEGER DEFAULT 0,
    description TEXT,
    facilities TEXT[], -- JSON array of facilities
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 중고 장터 테이블
CREATE TABLE IF NOT EXISTS golf_market_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    brand TEXT,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold')),
    seller_id TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 라운딩 참여자 테이블 (확장 기능용)
CREATE TABLE IF NOT EXISTS golf_round_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    round_id UUID REFERENCES golf_rounds(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_golf_posts_created_at ON golf_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_golf_posts_author_id ON golf_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_golf_posts_region ON golf_posts(region);

CREATE INDEX IF NOT EXISTS idx_golf_rounds_date ON golf_rounds(date);
CREATE INDEX IF NOT EXISTS idx_golf_rounds_status ON golf_rounds(status);
CREATE INDEX IF NOT EXISTS idx_golf_rounds_region ON golf_rounds(region);

CREATE INDEX IF NOT EXISTS idx_golf_courses_region ON golf_courses(region);
CREATE INDEX IF NOT EXISTS idx_golf_courses_name ON golf_courses(name);

CREATE INDEX IF NOT EXISTS idx_golf_market_items_category ON golf_market_items(category);
CREATE INDEX IF NOT EXISTS idx_golf_market_items_status ON golf_market_items(status);
CREATE INDEX IF NOT EXISTS idx_golf_market_items_created_at ON golf_market_items(created_at DESC);

-- RLS (Row Level Security) 정책 (필요시 활성화)
-- ALTER TABLE golf_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE golf_rounds ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE golf_courses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE golf_market_items ENABLE ROW LEVEL SECURITY;
