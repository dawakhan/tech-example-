import { Heart } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { products } from '../data/products';

export default function Favorites() {
  const { language, favorites } = useApp();
  const t = translations[language];
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header showSearch={false} />
      
      <main style={{ padding: '16px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '700' }}>{t.myFavorites}</h2>
        
        {favoriteProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
            }}
          >
            <Heart size={48} color="var(--secondary-text)" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-text)', marginBottom: '8px' }}>
              {t.emptyFavorites}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
