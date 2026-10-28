import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Package, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { formatPrice } from '../data/products';

export default function OrderTracking() {
  const { language } = useApp();
  const t = translations[language];
  const location = useLocation();
  const [orderRef, setOrderRef] = useState(location.state?.orderRef || '');
  const [trackingCode, setTrackingCode] = useState(location.state?.trackingCode || '');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');
  
  const handleTrack = () => {
    setError('');
    setOrder(null);
    
    const orders = JSON.parse(localStorage.getItem('techexample_orders') || '[]');
    const found = orders.find((o: any) => 
      o.id === orderRef && o.trackingCode === trackingCode
    );
    
    if (found) {
      setOrder(found);
    } else {
      setError(t.orderNotFound);
    }
  };
  
  const statuses = language === 'ar' 
    ? ['تم إنشاء الطلب', 'قيد المراجعة', 'تم تأكيد الطلب', 'قيد التجهيز', 'تم الشحن', 'تم التسليم']
    : ['Order Created', 'Under Review', 'Confirmed', 'Preparing', 'Shipped', 'Delivered'];
  
  const getStatusIndex = (status: string) => {
    if (language === 'ar') {
      return statuses.indexOf(status);
    }
    const arStatus = order?.status || '';
    return statusesAr.indexOf(arStatus);
  };
  
  const statusesAr = ['تم إنشاء الطلب', 'قيد المراجعة', 'تم تأكيد الطلب', 'قيد التجهيز', 'تم الشحن', 'تم التسليم'];
  const currentIndex = getStatusIndex(order?.status);
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '16px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '700' }}>{t.orderTracking}</h2>
        
        {!order && (
          <div
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.enterOrderRef}
              </label>
              <input
                type="text"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="TE-12345678"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.enterTrackingCode}
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="TRK-XXXXXXXX"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              />
            </div>
            {error && <div style={{ color: 'var(--danger)', fontSize: '13px' }}>{error}</div>}
            <button
              onClick={handleTrack}
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Search size={18} />
              {t.track}
            </button>
          </div>
        )}
        
        {order && (
          <>
            <div
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>{t.orderNumber}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'monospace' }}>{order.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>{t.orderDate}</div>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>
                    {new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US')}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--secondary-text)', marginBottom: '4px' }}>{t.total}</div>
                <div style={{ fontSize: '18px', fontWeight: '700' }}>{formatPrice(order.total)}</div>
              </div>
            </div>
            
            <div
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>{t.status}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {statusesAr.map((status, idx) => {
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isCompleted ? 'var(--primary)' : 'var(--border)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isCompleted ? <CheckCircle size={18} /> : <Package size={18} />}
                        </div>
                        {idx < statusesAr.length - 1 && (
                          <div
                            style={{
                              width: '2px',
                              height: '40px',
                              background: isCompleted && idx < currentIndex ? 'var(--primary)' : 'var(--border)',
                            }}
                          />
                        )}
                      </div>
                      <div style={{ paddingBottom: idx < statusesAr.length - 1 ? '20px' : '0', paddingTop: '4px' }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: isCurrent ? '700' : '600',
                            color: isCompleted ? 'var(--primary-text)' : 'var(--secondary-text)',
                          }}
                        >
                          {language === 'ar' ? status : 
                            status === 'تم إنشاء الطلب' ? 'Order Created' :
                            status === 'قيد المراجعة' ? 'Under Review' :
                            status === 'تم تأكيد الطلب' ? 'Confirmed' :
                            status === 'قيد التجهيز' ? 'Preparing' :
                            status === 'تم الشحن' ? 'Shipped' : 'Delivered'
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>{t.productsLabel}</div>
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--secondary-text)', flex: 1 }}>
                    {language === 'ar' ? item.product?.name : item.product?.nameEn} x{item.quantity}
                  </span>
                  <span style={{ fontWeight: '500', marginLeft: '8px' }}>
                    {formatPrice(item.product?.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                padding: '16px',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>{t.deliveryAddress}</div>
              <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--primary-text)' }}>
                <div style={{ fontWeight: '600' }}>{order.customer?.fullName}</div>
                <div style={{ color: 'var(--secondary-text)' }}>{order.customer?.phone}</div>
                <div style={{ color: 'var(--secondary-text)' }}>
                  {order.customer?.governorate}, {order.customer?.city}
                </div>
                <div style={{ color: 'var(--secondary-text)' }}>{order.customer?.address}</div>
                {order.customer?.notes && (
                  <div style={{ marginTop: '8px', padding: '8px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                    {order.customer?.notes}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
