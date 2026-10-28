import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus, Truck } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { getProductById, products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, addToCart, toggleFavorite, isFavorite } = useApp();
  const t = translations[language];
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
        <Header showSearch={false} />
        <main style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', color: 'var(--primary-text)' }}>Product not found</div>
        </main>
        <BottomNav />
      </div>
    );
  }
  
  const fav = isFavorite(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/cart');
  };
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '16px' }}>
        <button
          onClick={() => navigate(-1)}
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
          {language === 'ar' ? 'رجوع' : 'Back'}
        </button>
        
        <div
          style={{
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            marginBottom: '16px',
          }}
        >
          <div style={{ width: '100%', height: '280px', overflow: 'hidden', background: '#f9f9f9', position: 'relative' }}>
            <img
              src={product.image}
              alt={language === 'ar' ? product.name : product.nameEn}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              style={{
                position: 'absolute',
                top: '12px',
                [language === 'ar' ? 'left' : 'right']: '12px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Heart
                size={22}
                fill={fav ? 'var(--primary)' : 'none'}
                color={fav ? 'var(--primary)' : 'var(--secondary-text)'}
              />
            </button>
          </div>
          
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--secondary-text)', marginBottom: '6px' }}>
                {product.brand}
              </div>
              <h1 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '700', lineHeight: '1.4', color: 'var(--primary-text)' }}>
                {language === 'ar' ? product.name : product.nameEn}
              </h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary-text)' }}>
                  {product.price.toLocaleString('en-US')} {language === 'ar' ? 'د.ع' : 'IQD'}
                </span>
                {product.oldPrice && (
                  <span style={{ fontSize: '14px', color: 'var(--secondary-text)', textDecoration: 'line-through' }}>
                    {product.oldPrice.toLocaleString('en-US')} {language === 'ar' ? 'د.ع' : 'IQD'}
                  </span>
                )}
              </div>
            </div>
            
            <div
              style={{
                padding: '10px 12px',
                background: product.inStock ? 'rgba(76, 175, 80, 0.08)' : 'rgba(211, 47, 47, 0.08)',
                borderRadius: 'var(--radius-sm)',
                color: product.inStock ? '#2E7D32' : '#C62828',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {product.inStock ? t.inStock : t.outOfStock}
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>{t.quantity}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: product.inStock ? 1 : 0.5,
                  }}
                >
                  <Minus size={18} />
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '16px', fontWeight: '600' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: product.inStock ? 1 : 0.5,
                  }}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: product.inStock ? 'transparent' : '#ccc',
                  color: product.inStock ? 'var(--primary-text)' : '#666',
                  border: product.inStock ? '1px solid var(--primary)' : '1px solid #ccc',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                }}
              >
                <ShoppingCart size={20} />
                {t.addToCart}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: product.inStock ? 'var(--primary)' : '#ccc',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                }}
              >
                {t.buyNow}
              </button>
            </div>
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
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <Truck size={24} color="var(--primary)" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{t.deliveryInfo}</div>
            <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>
              {t.estimatedDelivery}: {t.days} • {t.deliveryFee}: 5,000 {language === 'ar' ? 'د.ع' : 'IQD'}
            </div>
          </div>
        </div>
        
        {product.description && (
          <div
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '700' }}>{t.description}</h3>
            <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6' }}>
              {language === 'ar' ? product.description : product.descriptionEn}
            </p>
          </div>
        )}
        
        {product.specs.length > 0 && (
          <div
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '700' }}>{t.specifications}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '10px',
                    borderBottom: idx < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <span style={{ color: 'var(--secondary-text)', fontSize: '13px' }}>
                    {language === 'ar' ? spec.label : spec.labelEn}
                  </span>
                  <span style={{ fontWeight: '500', fontSize: '13px' }}>
                    {language === 'ar' ? spec.value : spec.valueEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {relatedProducts.length > 0 && (
          <section>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '700' }}>{t.relatedProducts}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
