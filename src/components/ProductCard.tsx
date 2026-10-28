import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Product } from '../data/products';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, addToCart, toggleFavorite, isFavorite } = useApp();
  const t = translations[language];
  const fav = isFavorite(product.id);
  
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  
  return (
    <div
      style={{
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          [language === 'ar' ? 'left' : 'right']: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
        aria-label={fav ? t.removeFromFavorites : t.addToFavorites}
      >
        <Heart
          size={20}
          fill={fav ? 'var(--primary)' : 'none'}
          color={fav ? 'var(--primary)' : 'var(--secondary-text)'}
        />
      </button>
      
      {discount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            [language === 'ar' ? 'right' : 'left']: '10px',
            background: 'var(--primary)',
            color: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 2,
          }}
        >
          -{discount}%
        </div>
      )}
      
      <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
        <div style={{ width: '100%', height: '140px', overflow: 'hidden', background: '#f9f9f9' }}>
          <img
            src={product.image}
            alt={language === 'ar' ? product.name : product.nameEn}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minHeight: '120px' }}>
        <Link to={`/product/${product.id}`}>
          <div style={{ fontSize: '11px', color: 'var(--secondary-text)', fontWeight: '500' }}>
            {product.brand}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--primary-text)',
              lineHeight: '1.3',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '34px',
              fontFamily: 'var(--font-ar)',
            }}
          >
            {language === 'ar' ? product.name : product.nameEn}
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)', fontFamily: language === 'ar' ? 'var(--font-ar)' : 'var(--font-en)' }}>
            {product.price.toLocaleString('en-US')} {language === 'ar' ? 'د.ع' : 'IQD'}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: '11px',
                color: 'var(--secondary-text)',
                textDecoration: 'line-through',
                fontFamily: language === 'ar' ? 'var(--font-ar)' : 'var(--font-en)',
              }}
            >
              {product.oldPrice.toLocaleString('en-US')} {language === 'ar' ? 'د.ع' : 'IQD'}
            </span>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id);
          }}
          disabled={!product.inStock}
          style={{
            width: '100%',
            padding: '8px',
            background: product.inStock ? 'var(--primary)' : '#ccc',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            opacity: product.inStock ? 1 : 0.6,
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-ar)',
          }}
        >
          <ShoppingCart size={16} />
          {product.inStock ? t.addToCart : t.outOfStock}
        </button>
      </div>
    </div>
  );
}
