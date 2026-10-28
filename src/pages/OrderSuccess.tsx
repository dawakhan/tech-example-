import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';

export default function OrderSuccess() {
  const { language } = useApp();
  const t = translations[language];
  const location = useLocation();
  const navigate = useNavigate();
  const { orderRef, trackingCode } = location.state || {};
  
  if (!orderRef) {
    navigate('/');
    return null;
  }
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
          <CheckCircle size={80} color="#4CAF50" style={{ margin: '0 auto 20px' }} />
          <h1 style={{ margin: '0 0 12px', fontSize: '22px', fontWeight: '700', color: 'var(--primary-text)' }}>
            {t.thankYou}
          </h1>
          <p style={{ margin: '0 0 24px', color: 'var(--secondary-text)', fontSize: '15px' }}>
            {t.orderSuccess}
          </p>
        </div>
        
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '20px',
            textAlign: language === 'ar' ? 'right' : 'left',
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', color: 'var(--secondary-text)', marginBottom: '6px' }}>
              {t.orderNumber}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-text)', fontFamily: 'monospace' }}>
              {orderRef}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--secondary-text)', marginBottom: '6px' }}>
              {language === 'ar' ? 'رمز التتبع:' : 'Tracking Code:'}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', fontFamily: 'monospace' }}>
              {trackingCode}
            </div>
          </div>
          <p style={{ margin: '16px 0 0', fontSize: '13px', color: 'var(--secondary-text)', lineHeight: '1.6' }}>
            {t.keepTrackingCode}
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => navigate('/track', { state: { orderRef, trackingCode } })}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: '600',
            }}
          >
            {t.trackOrder}
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '14px',
              background: 'transparent',
              color: 'var(--primary-text)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: '600',
            }}
          >
            {t.continueShopping}
          </button>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
