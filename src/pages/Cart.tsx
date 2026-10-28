import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { products, formatPrice } from '../data/products';

export default function Cart() {
  const { language, cart, updateCartQuantity, removeFromCart } = useApp();
  const t = translations[language];
  
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product!.price * item.quantity);
  }, 0);
  
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '16px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '700' }}>{t.shoppingCart}</h2>
        
        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
            }}
          >
            <ShoppingBag size={48} color="var(--secondary-text)" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-text)', marginBottom: '16px' }}>
              {t.emptyCart}
            </div>
            <Link
              to="/explore"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'var(--primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {t.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {cartItems.map(item => (
                <div
                  key={item.productId}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  <Link to={`/product/${item.productId}`} style={{ flexShrink: 0 }}>
                    <img
                      src={item.product!.image}
                      alt={language === 'ar' ? item.product!.name : item.product!.nameEn}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    />
                  </Link>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                    <Link to={`/product/${item.productId}`}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary-text)', lineHeight: '1.4' }}>
                        {language === 'ar' ? item.product!.name : item.product!.nameEn}
                      </div>
                    </Link>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-text)' }}>
                      {formatPrice(item.product!.price)}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        style={{
                          padding: '6px',
                          color: 'var(--danger)',
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--secondary-text)' }}>{t.subtotal}</span>
                <span style={{ fontWeight: '600' }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--secondary-text)' }}>{t.deliveryFee}</span>
                <span style={{ fontWeight: '600' }}>{formatPrice(deliveryFee)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                <span style={{ fontWeight: '700' }}>{t.total}</span>
                <span style={{ fontWeight: '700' }}>{formatPrice(total)}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>
                {t.estimatedDelivery}: {t.days}
              </div>
            </div>
            
            <Link
              to="/checkout"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                background: 'var(--primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '15px',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {t.proceedToCheckout}
            </Link>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
