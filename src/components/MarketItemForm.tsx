import React, { useState } from 'react';
import { useMarket } from '../hooks/useMarket';
import { useAuth } from '@clerk/clerk-react';

interface MarketItemFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarketItemForm: React.FC<MarketItemFormProps> = ({ isOpen, onClose }) => {
  const { createMarketItem } = useMarket();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'driver',
    condition: 'good',
    brand: '',
    image_url: ''
  });

  const categoryOptions = [
    { value: 'driver', label: '드라이버' },
    { value: 'iron', label: '아이언' },
    { value: 'putter', label: '퍼터' },
    { value: 'wedge', label: '웨지' },
    { value: 'bag', label: '골프백' },
    { value: 'shoes', label: '골프화' },
    { value: 'wear', label: '골프웨어' },
    { value: 'accessory', label: '악세서리' },
    { value: 'other', label: '기타' }
  ];

  const conditionOptions = [
    { value: 'new', label: '새상품' },
    { value: 'excellent', label: '최상' },
    { value: 'good', label: '상' },
    { value: 'fair', label: '중' },
    { value: 'poor', label: '하' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const result = await createMarketItem({
        ...formData,
        seller_id: user.id,
        seller_name: user.firstName || user.username || '익명',
        status: 'available'
      });

      if (result.success) {
        setFormData({
          title: '',
          description: '',
          price: 0,
          category: 'driver',
          condition: 'good',
          brand: '',
          image_url: ''
        });
        onClose();
        alert('상품이 등록되었습니다!');
      } else {
        alert(result.error || '상품 등록에 실패했습니다.');
      }
    } catch (error) {
      alert('상품 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">상품 등록</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상품명 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="상품명을 입력하세요"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리 *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상태 *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {conditionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  브랜드
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: 테일러메이드, 캘러웨이"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  가격 (원) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상품 설명 *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="상품에 대한 상세 설명을 입력하세요"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketItemForm;
