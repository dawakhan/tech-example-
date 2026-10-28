import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations, iraqiGovernorates, iraqiGovernoratesEn } from '../i18n/translations';
import { products, formatPrice } from '../data/products';

export default function Checkout() {
  const { language, cart, clearCart } = useApp();
  const t = translations[language];
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    governorate: '',
    city: '',
    address: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;
  
  const governorates = language === 'ar' ? iraqiGovernorates : iraqiGovernoratesEn;
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.requiredField;
    if (!formData.phone.trim()) newErrors.phone = t.requiredField;
    if (!formData.governorate) newErrors.governorate = t.requiredField;
    if (!formData.city.trim()) newErrors.city = t.requiredField;
    if (!formData.address.trim()) newErrors.address = t.requiredField;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderRef = 'TE-' + Date.now().toString().slice(-8);
      const trackingCode = 'TRK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const order = {
        id: orderRef,
        trackingCode,
        date: new Date().toISOString(),
        customer: formData,
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        status: 'تم إنشاء الطلب',
        statusEn: 'Order Created',
      };
      
      const orders = JSON.parse(localStorage.getItem('techexample_orders') || '[]');
      orders.push(order);
      localStorage.setItem('techexample_orders', JSON.stringify(orders));
      
      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { orderRef, trackingCode } });
    }, 1200);
  };
  
  if (cartItems.length === 0) {
    return (
      <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
        <Header showSearch={false} />
        <main style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '16px' }}>{t.emptyCart}</div>
          <button onClick={() => navigate('/cart')} style={{ color: 'var(--primary)', fontWeight: '600' }}>
            {t.continueShopping}
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '16px' }}>
        <button
          onClick={() => navigate('/cart')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            color: 'var(--primary-text)',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {language === 'ar' ? <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} /> : <ArrowLeft size={20} />}
          {language === 'ar' ? 'رجوع للسلة' : 'Back to Cart'}
        </button>
        
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '700' }}>{t.checkout}</h2>
        
        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.fullName} *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.fullName ? '1px solid var(--danger)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              />
              {errors.fullName && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.phoneNumber} *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="07XXXXXXXXX"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.phone ? '1px solid var(--danger)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              />
              {errors.phone && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.governorate} *
              </label>
              <select
                value={formData.governorate}
                onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.governorate ? '1px solid var(--danger)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              >
                <option value="">{language === 'ar' ? 'اختر المحافظة' : 'Select Governorate'}</option>
                {governorates.map((gov, idx) => (
                  <option key={idx} value={gov}>{gov}</option>
                ))}
              </select>
              {errors.governorate && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.governorate}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.city} *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.city ? '1px solid var(--danger)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              />
              {errors.city && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.city}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.fullAddress} *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: errors.address ? '1px solid var(--danger)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              {errors.address && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>{errors.address}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                {t.notes}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
          
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
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{t.orderSummary}</div>
            {cartItems.map(item => (
              <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--secondary-text)', flex: 1 }}>
                  {language === 'ar' ? item.product!.name : item.product!.nameEn} x{item.quantity}
                </span>
                <span style={{ fontWeight: '500', marginLeft: '8px' }}>
                  {formatPrice(item.product!.price * item.quantity)}
                </span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--secondary-text)' }}>{t.subtotal}</span>
              <span style={{ fontWeight: '600' }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--secondary-text)' }}>{t.deliveryFee}</span>
              <span style={{ fontWeight: '600' }}>{formatPrice(deliveryFee)}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>
              {t.estimatedDelivery}: {t.days}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
              <span style={{ fontWeight: '700' }}>{t.total}</span>
              <span style={{ fontWeight: '700' }}>{formatPrice(total)}</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '14px',
              background: isProcessing ? '#ccc' : 'var(--primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
            }}
          >
            {isProcessing ? t.processingOrder : t.placeOrder}
          </button>
        </form>
      </main>
      
      {isProcessing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              padding: '40px 60px',
              borderRadius: 'var(--radius)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--border)',
                borderTop: '3px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{t.processingOrder}</div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <BottomNav />
    </div>
  );
}
