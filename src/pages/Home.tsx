import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, HeadphonesIcon, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { products, categories } from '../data/products';
import heroBanner from '../assets/hero-banner.png';

export default function Home() {
  const { language } = useApp();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />
      
      <main style={{ padding: '16px', maxWidth: '100%' }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            borderRadius: 'var(--radius)',
            marginBottom: '24px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            minHeight: '200px',
          }}
        >
          <img
            src={heroBanner}
            alt={t.heroTitle}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(1.1) saturate(1.1) hue-rotate(-5deg)',
              opacity: 0.85,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(238,245,255,0.75) 40%, rgba(238,245,255,0.5) 100%)',
            }}
          />
          <div style={{ position: 'relative', padding: '24px 20px', zIndex: 1 }}>
            <h2
              style={{
                margin: '0 0 10px',
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--deep-navy)',
                lineHeight: '1.3',
              }}
            >
              {t.heroTitle}
            </h2>
            <p
              style={{
                margin: '0 0 20px',
                color: 'var(--primary-text)',
                fontSize: '14px',
                lineHeight: '1.6',
                maxWidth: '280px',
              }}
            >
              {t.heroSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                to="/explore"
                style={{
                  padding: '12px 24px',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {t.shopNow}
                {language === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </Link>
              <Link
                to="/explore"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.9)',
                  color: 'var(--primary-text)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {t.discoverProducts}
              </Link>
            </div>
          </div>
        </section>
        
        {/* Categories - Circular */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--primary-text)',
            }}
          >
            {t.categories}
          </h3>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
            }}
          >
            {categories.map(cat => {
              const catProduct = products.find(p => p.category === cat.name || p.categoryEn === cat.nameEn);
              return (
                <Link
                  key={cat.id}
                  to={`/explore?category=${encodeURIComponent(language === 'ar' ? cat.name : cat.nameEn)}`}
                  style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    width: '80px',
                  }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: 'var(--bg-alt)',
                      border: '2px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {catProduct && (
                      <img
                        src={catProduct.image}
                        alt={language === 'ar' ? cat.name : cat.nameEn}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--primary-text)',
                      textAlign: 'center',
                      lineHeight: '1.3',
                      minHeight: '28px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {language === 'ar' ? cat.name : cat.nameEn}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h3
              style={{
                margin: '0 0 16px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--primary-text)',
              }}
            >
              {t.featured}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
            >
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
        
        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--primary-text)',
                }}
              >
                {t.bestSellers}
              </h3>
              <Link
                to="/explore"
                style={{
                  fontSize: '13px',
                  color: 'var(--primary)',
                  fontWeight: '600',
                }}
              >
                {language === 'ar' ? 'اكتشف الكل' : 'Discover All'}
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
            >
              {bestSellers.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
        
        {/* Special Offers / Discounts */}
        {products.some(p => p.oldPrice) && (
          <section style={{ marginBottom: '28px' }}>
            <h3
              style={{
                margin: '0 0 16px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--primary-text)',
              }}
            >
              {language === 'ar' ? 'التخفيضات' : 'Discounts'}
            </h3>
            <div
              style={{
                background: 'linear-gradient(135deg, #1A1D23 0%, #2C3038 100%)',
                borderRadius: 'var(--radius)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>
                  {language === 'ar' ? 'عروض خاصة' : 'Special Offers'}
                </div>
                <div style={{ fontSize: '13px', color: '#B0B3B8', lineHeight: '1.5' }}>
                  {language === 'ar' ? 'استفد من تخفيضاتنا المميزة على مجموعة مختارة من المنتجات' : 'Take advantage of our special discounts on selected products'}
                </div>
              </div>
              <Link
                to="/explore"
                style={{
                  padding: '12px 28px',
                  background: '#FFFFFF',
                  color: '#1A1D23',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                {language === 'ar' ? 'تسوق التخفيضات' : 'Shop Discounts'}
              </Link>
            </div>
          </section>
        )}
        
        {/* About Us Section */}
        <section style={{ marginBottom: '16px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--primary-text)',
            }}
          >
            {language === 'ar' ? 'معلومات عنا' : 'About Us'}
          </h3>
          <div
            style={{
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Truck size={24} color="var(--primary)" />
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--primary-text)', lineHeight: '1.3' }}>
                  {t.trustDelivery}
                </div>
              </div>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <HeadphonesIcon size={24} color="var(--primary)" />
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--primary-text)', lineHeight: '1.3' }}>
                  {t.trustSupport}
                </div>
              </div>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={24} color="var(--primary)" />
                <div style={{ fontSize: '10px', fontWeight: '600', color: 'var(--primary-text)', lineHeight: '1.3' }}>
                  {t.trustQuality}
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: 'var(--primary-text)' }}>
                {language === 'ar' ? 'التوصيل' : 'Delivery'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--secondary-text)', lineHeight: '1.6' }}>
                {language === 'ar' ? '• توصيل لبغداد: 5,000 د.ع' : '• Baghdad: 5,000 IQD'}
                <br />
                {language === 'ar' ? '• توصيل لباقي المحافظات: 6,000 د.ع' : '• Other Governorates: 6,000 IQD'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: 'var(--primary-text)' }}>
                {language === 'ar' ? 'جودتنا الأفضل' : 'Our Quality'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--secondary-text)', lineHeight: '1.6' }}>
                {language === 'ar' 
                  ? 'نختار أفضل المنتجات الأصلية بأعلى معايير الجودة لنضمن رضاكم التام.' 
                  : 'We select the best original products with highest quality standards to ensure your complete satisfaction.'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: 'var(--primary-text)' }}>
                {language === 'ar' ? 'خدمة متميزة' : 'Premium Service'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--secondary-text)', lineHeight: '1.6' }}>
                {language === 'ar'
                  ? 'فريقنا جاهز لخدمتكم ودعمكم في كل خطوة من خطوات الشراء.'
                  : 'Our team is ready to serve and support you at every step of your shopping experience.'}
              </div>
            </div>
          </div>
        </section>
        
        {/* Instagram Link */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--light-blue-bg) 0%, #FFFFFF 100%)',
            borderRadius: 'var(--radius)',
            padding: '16px',
            border: '1px solid var(--border)',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          <a
            href="instagram://user?username=techexample.iq"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'instagram://user?username=techexample.iq';
              setTimeout(() => {
                window.open('https://www.instagram.com/techexample.iq/', '_blank', 'noopener,noreferrer');
              }, 500);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--primary-text)',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="var(--primary)" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="var(--primary)" strokeWidth="2"/>
              <circle cx="17" cy="7" r="1" fill="var(--primary)"/>
            </svg>
            {language === 'ar' ? 'تابعنا على انستغرام' : 'Follow us on Instagram'}
          </a>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}
