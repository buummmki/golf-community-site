import React, { useState } from 'react';

interface RoundFormProps {
  onSubmit: (roundData: {
    title: string;
    description: string;
    golf_course: string;
    date: string;
    time: string;
    max_participants: number;
    green_fee?: string;
    region: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
  isOpen: boolean;
}

const RoundForm: React.FC<RoundFormProps> = ({ onSubmit, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    golf_course: '',
    date: '',
    time: '',
    max_participants: 4,
    green_fee: '',
    region: '경기',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regions = ['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '인천', '서울'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.golf_course.trim() || !formData.date || !formData.time) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 날짜 유효성 검사 (과거 날짜 불허)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert('과거 날짜는 선택할 수 없습니다.');
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit({
        ...formData,
      green_fee: formData.green_fee || undefined,
      });

      if (result.success) {
        setFormData({
          title: '',
          description: '',
          golf_course: '',
          date: '',
          time: '',
          max_participants: 4,
        green_fee: '',
        region: '경기',
        });
        onClose();
      alert('라운딩 모집이 성공적으로 등록되었습니다!');
      } else {
        alert(result.error || '라운딩 모집 등록에 실패했습니다.');
      }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'max_participants' ? parseInt(value) || 4 : value 
    }));
  };

  // 오늘 날짜를 YYYY-MM-DD 형식으로 반환
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            라운딩 모집 작성
          </h2>
            <button
              onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
            >
              ×
            </button>
          </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                제목 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              placeholder="예: 주말 조조 라운딩 모집"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
              onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
              />
            </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                골프장명 *
                </label>
                <input
                  type="text"
                  name="golf_course"
                  value={formData.golf_course}
                  onChange={handleChange}
                placeholder="예: 스카이힐CC"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
                />
              </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                지역 *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  날짜 *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                min={getTodayDate()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
                />
              </div>

              <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  시간 *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
              />
            </div>

              <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                모집인원 *
                </label>
                <select
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
                onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
                >
                  <option value={2}>2명</option>
                  <option value={3}>3명</option>
                  <option value={4}>4명</option>
                <option value={8}>8명</option>
                </select>
              </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              그린피 (선택)
                </label>
                <input
              type="text"
                  name="green_fee"
                  value={formData.green_fee}
                  onChange={handleChange}
              placeholder="예: 12만원"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
              onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
            />
            </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              상세 설명 (선택)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              placeholder="라운딩에 대한 상세 정보를 입력하세요&#10;&#10;예시:&#10;- 조조 티타임으로 시원한 아침 라운딩&#10;- 초급~중급자 수준 환영&#10;- 매너 있는 분만 신청 부탁드립니다&#10;- 카트비 별도"
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#10b981'; }}
              onBlur={(e) => { e.target.style.borderColor = '#d1d5db'; }}
              />
            </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                background: 'white',
                color: '#374151',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              >
                취소
              </button>
              <button
                type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '0.5rem',
                background: isSubmitting ? '#9ca3af' : '#10b981',
                color: 'white',
                fontWeight: '500',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default RoundForm;
