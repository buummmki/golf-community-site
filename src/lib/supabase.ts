import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 데이터베이스 타입 정의
export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  golf_course: string
  region: string
  created_at: string
  updated_at: string
  views: number
}

// 테이블명 상수 정의 (기존 테이블과 충돌 방지)
export const TABLES = {
  POSTS: 'golf_posts',
  ROUNDS: 'golf_rounds',
  GOLF_COURSES: 'golf_courses',
  MARKET_ITEMS: 'golf_market_items',
  ROUND_PARTICIPANTS: 'golf_round_participants'
} as const

export interface Round {
  id: string
  title: string
  description: string
  golf_course: string
  date: string
  time: string
  max_participants: number
  current_participants: number
  author_id: string
  author_name: string
  status: 'recruiting' | 'full' | 'completed'
  created_at: string
  updated_at: string
}

export interface GolfCourse {
  id: string
  name: string
  region: string
  address: string
  green_fee: number
  rating: number
  created_at: string
  updated_at: string
}

export interface MarketItem {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: '새상품' | '최상' | '상' | '중' | '하'
  seller_id: string
  seller_name: string
  status: '판매중' | '거래완료'
  created_at: string
  updated_at: string
}

export interface RoundParticipant {
  round_id: string
  user_id: string
  joined_at: string
}
