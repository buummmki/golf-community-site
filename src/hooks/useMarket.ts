import { useState, useEffect } from 'react'
import { supabase, MarketItem, TABLES } from '../lib/supabase'

export function useMarket() {
  const [marketItems, setMarketItems] = useState<MarketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 중고 장터 상품 목록 가져오기
  const fetchMarketItems = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.MARKET_ITEMS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMarketItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // 상품 등록
  const createMarketItem = async (itemData: Omit<MarketItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.MARKET_ITEMS)
        .insert([itemData])
        .select()

      if (error) throw error
      
      if (data && data[0]) {
        setMarketItems(prev => [data[0], ...prev])
      }
      return { success: true, data: data ? data[0] : null }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 상품 삭제
  const deleteMarketItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from(TABLES.MARKET_ITEMS)
        .delete()
        .eq('id', itemId)

      if (error) throw error
      
      setMarketItems(prev => prev.filter(item => item.id !== itemId))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  // 상품 상태 업데이트 (판매중/판매완료)
  const updateMarketItemStatus = async (itemId: string, status: 'available' | 'sold') => {
    try {
      const { error } = await supabase
        .from(TABLES.MARKET_ITEMS)
        .update({ status })
        .eq('id', itemId)

      if (error) throw error

      setMarketItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status } : item
      ))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  useEffect(() => {
    fetchMarketItems()
  }, [])

  return { marketItems, loading, error, fetchMarketItems, createMarketItem, deleteMarketItem, updateMarketItemStatus }
}
