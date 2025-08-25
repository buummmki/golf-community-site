import React, { useState } from 'react';
import { useGolfCourses } from '../hooks/useGolfCourses';

interface GolfCourseFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const GolfCourseForm: React.FC<GolfCourseFormProps> = ({ isOpen, onClose }) => {
  const { createGolfCourse } = useGolfCourses();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    address: '',
    phone: '',
    holes: 18,
    par: 72,
    green_fee: 0,
    description: '',
    facilities: [] as string[],
    image_url: ''
  });

  const facilityOptions = [
    '레스토랑', '프로샵', '연습장', '클럽하우스', '사우나', '카트', '캐디', '락커룸', '주차장'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await createGolfCourse(formData);

      if (result.success) {
        setFormData({
          name: '',
          region: '',
          address: '',
          phone: '',
          holes: 18,
          par: 72,
          green_fee: 0,
          description: '',
          facilities: [],
          image_url: ''
        });
        onClose();
        alert('골프장 정보가 등록되었습니다!');
      } else {
        alert(result.error || '골프장 등록에 실패했습니다.');
      }
    } catch (error) {
      alert('골프장 등록 중 오류가 발생했습니다.');
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

  const handleFacilityChange = (facility: string) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.includes(facility)
        ? formData.facilities.filter(f => f !== facility)
        : [...formData.facilities, facility]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">골프장 등록</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  골프장명 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="골프장명을 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  지역 *
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="예: 서울, 경기, 강원"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="상세 주소를 입력하세요"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  전화번호
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="02-1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  그린피 (원)
                </label>
                <input
                  type="number"
                  name="green_fee"
                  value={formData.green_fee}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  홀 수
                </label>
                <select
                  name="holes"
                  value={formData.holes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value={9}>9홀</option>
                  <option value={18}>18홀</option>
                  <option value={27}>27홀</option>
                  <option value={36}>36홀</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파
                </label>
                <input
                  type="number"
                  name="par"
                  value={formData.par}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="72"
                  min="30"
                  max="150"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                편의시설
              </label>
              <div className="grid grid-cols-3 gap-2">
                {facilityOptions.map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityChange(facility)}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="골프장에 대한 상세 설명을 입력하세요"
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

export default GolfCourseForm;
