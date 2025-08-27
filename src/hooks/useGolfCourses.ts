import { useState, useEffect } from 'react';
import { supabase, GolfCourse, TABLES } from '../lib/supabase';

export const useGolfCourses = () => {
  const [golfCourses, setGolfCourses] = useState<GolfCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 골프장 목록 불러오기
  const fetchGolfCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(TABLES.GOLF_COURSES)
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      setGolfCourses(data || []);
    } catch (err) {
      console.error('골프장 목록 불러오기 실패:', err);
      setError(err instanceof Error ? err.message : '골프장 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 지역별 골프장 조회
  const getGolfCoursesByRegion = (region: string) => {
    return golfCourses.filter(course => course.region === region);
  };

  // 가격대별 골프장 조회
  const getGolfCoursesByPriceRange = (minPrice: number, maxPrice: number) => {
    return golfCourses.filter(course => 
      course.green_fee && course.green_fee >= minPrice && course.green_fee <= maxPrice
    );
  };

  // 평점별 골프장 조회
  const getGolfCoursesByRating = (minRating: number) => {
    return golfCourses.filter(course => course.rating >= minRating);
  };

  // 골프장 검색
  const searchGolfCourses = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return golfCourses.filter(course => 
      course.name.toLowerCase().includes(lowercaseQuery) ||
      course.address?.toLowerCase().includes(lowercaseQuery) ||
      course.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  // 시설별 골프장 조회
  const getGolfCoursesByFacility = (facility: string) => {
    return golfCourses.filter(course => 
      course.facilities?.includes(facility)
    );
  };

  // 골프장 상세 정보 조회
  const getGolfCourseById = (id: string) => {
    return golfCourses.find(course => course.id === id);
  };

  // 인기 골프장 조회 (평점 기준)
  const getPopularGolfCourses = (limit: number = 5) => {
    return [...golfCourses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  // 신규 골프장 조회 (최근 등록순)
  const getNewGolfCourses = (limit: number = 5) => {
    return [...golfCourses]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  };

  // 골프장 평점 업데이트 (관리자 기능)
  const updateGolfCourseRating = async (courseId: string, newRating: number) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.GOLF_COURSES)
        .update({ rating: newRating })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;

      setGolfCourses(prev => prev.map(course => 
        course.id === courseId ? { ...course, rating: newRating } : course
      ));

      return { success: true, data };
    } catch (err) {
      console.error('골프장 평점 업데이트 실패:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : '평점 업데이트에 실패했습니다.' 
      };
    }
  };

  // 사용 가능한 지역 목록 조회
  const getAvailableRegions = () => {
    const regions = new Set(golfCourses.map(course => course.region));
    return Array.from(regions).sort();
  };

  // 사용 가능한 시설 목록 조회
  const getAvailableFacilities = () => {
    const facilities = new Set<string>();
    golfCourses.forEach(course => {
      course.facilities?.forEach(facility => facilities.add(facility));
    });
    return Array.from(facilities).sort();
  };

  // 가격대 통계 조회
  const getPriceStatistics = () => {
    const prices = golfCourses
      .map(course => course.green_fee)
      .filter((price): price is number => price !== null && price !== undefined);

    if (prices.length === 0) {
      return { min: 0, max: 0, average: 0 };
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const average = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);

    return { min, max, average };
  };

  useEffect(() => {
    fetchGolfCourses();
  }, []);

  return {
    golfCourses,
    loading,
    error,
    fetchGolfCourses,
    getGolfCoursesByRegion,
    getGolfCoursesByPriceRange,
    getGolfCoursesByRating,
    searchGolfCourses,
    getGolfCoursesByFacility,
    getGolfCourseById,
    getPopularGolfCourses,
    getNewGolfCourses,
    updateGolfCourseRating,
    getAvailableRegions,
    getAvailableFacilities,
    getPriceStatistics,
  };
};