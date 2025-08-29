import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  background?: 'gradient' | 'white' | 'light';
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  background = 'gradient' 
}) => {
  const getBackgroundStyle = () => {
    switch (background) {
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
          minHeight: '100vh'
        };
      case 'white':
        return {
          background: '#ffffff',
          minHeight: '100vh'
        };
      case 'light':
        return {
          background: '#f8fafc',
          minHeight: '100vh'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
          minHeight: '100vh'
        };
    }
  };

  const getTextColor = () => {
    return background === 'gradient' ? 'white' : '#1f2937';
  };

  return (
    <div style={getBackgroundStyle()}>
      <Header />
      
      {title && (
        <div style={{
          padding: '2rem 1rem',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: getTextColor(),
            marginBottom: subtitle ? '1rem' : '0',
            lineHeight: '1.2'
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '1.125rem',
              color: background === 'gradient' ? 'rgba(255, 255, 255, 0.9)' : '#6b7280',
              margin: 0,
              lineHeight: '1.6'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <main style={{
        padding: title ? '0 1rem 6rem 1rem' : '2rem 1rem 6rem 1rem',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {children}
      </main>
      
      <div style={{ height: '5rem' }}></div>
    </div>
  );
};

export default Layout;
