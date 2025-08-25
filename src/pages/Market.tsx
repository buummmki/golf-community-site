import React, { useState } from 'react';
import { useMarket } from '../hooks/useMarket';
import MarketItemForm from '../components/MarketItemForm';

const Market = () => {
  const { marketItems, loading, error, updateMarketItemStatus } = useMarket();
  const [isMarketItemFormOpen, setIsMarketItemFormOpen] = useState(false);

  const handleStatusUpdate = async (itemId: string, status: '판매중' | '거래완료') => {
    const result = await updateMarketItemStatus(itemId, status);
    if (result.success) {
      alert(status === '거래완료' ? '판매완료로 변경되었습니다!' : '판매중으로 변경되었습니다!');
    } else {
      alert(result.error || '상태 변경에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-red-600">오류가 발생했습니다: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">중고 장터</h1>
            <p className="text-gray-600 mt-2">골프 용품을 사고 팔아보세요</p>
          </div>
          <button 
            onClick={() => setIsMarketItemFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + 상품 등록
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {marketItems && marketItems.length > 0 ? (
            marketItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {item.image_url && (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === '판매중' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === '판매중' ? '판매중' : '판매완료'}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xl font-bold text-green-600">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>

                  <div className="space-y-1 mb-3 text-sm text-gray-600">
                    <div>카테고리: {item.category}</div>
                    <div>상태: {item.condition}</div>
                    {item.brand && <div>브랜드: {item.brand}</div>}
                  </div>

                  {item.description && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{item.description}</p>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>판매자: {item.seller_name}</span>
                    <span>{new Date(item.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {item.status === '판매중' ? '구매 문의' : '판매완료'}
                    </button>
                    {item.status === '판매중' && (
                      <button 
                        onClick={() => handleStatusUpdate(item.id, '거래완료')}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                        title="판매완료로 변경"
                      >
                        완료
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">등록된 상품이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-2">첫 번째 상품을 등록해보세요!</p>
            </div>
          )}
        </div>

        {/* 상품 등록 모달 */}
        <MarketItemForm 
          isOpen={isMarketItemFormOpen} 
          onClose={() => setIsMarketItemFormOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Market;
