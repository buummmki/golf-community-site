import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (postData: {
    title: string;
    content: string;
    golf_course: string;
    region: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
  isOpen: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    golf_course: '',
    region: '경기',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regions = ['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '인천', '서울'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.golf_course.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(formData);

      if (result.success) {
      setFormData({ title: '', content: '', golf_course: '', region: '경기' });
        onClose();
      alert('게시글이 성공적으로 등록되었습니다!');
      } else {
        alert(result.error || '게시글 등록에 실패했습니다.');
      }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            골프장 후기 작성
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
              placeholder="골프장 후기 제목을 입력하세요"
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

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              후기 내용 *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
              placeholder="골프장 컨디션, 그린 상태, 추천 팁 등을 자세히 작성해주세요&#10;&#10;예시:&#10;그린: ★★★★★ (5/5) - 완벽한 스피드&#10;페어웨이: ★★★★☆ (4/5) - 상태 양호&#10;날씨: 맑음, 미풍&#10;&#10;TIP: 14번 홀에서 주의사항..."
                rows={8}
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

export default PostForm;
