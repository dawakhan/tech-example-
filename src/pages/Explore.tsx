import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { products, categories } from '../data/products';

export default function Explore() {
  const { language } = useApp();
  const t = translations[language];
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const brands = useMemo(() => {
    const brandSet = new Set(products.map(p => p.brand));
    return Array.from(brandSet);
  }, []);
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setSelectedCategory(category);
  }, [searchParams]);
  
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(p => 
        p.category === selectedCategory || p.categoryEn === selectedCategory
      );
    }
    
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    
    return result;
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);
  
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 2000000]);
    setSortBy('newest');
    setSearchParams({});
  };
  
  return (
    <div style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', minHeight: '100vh' }}>
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />
      
      <main style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>{t.explore}</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: 'var(--soft-purple)',
              color: 'var(--primary-text)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            <Filter size={18} />
            {t.filters}
          </button>
        </div>
        
        {showFilters && (
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{t.category}</div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              >
                <option value="">{t.allOrders === 'الطلبات' ? 'الكل' : 'All'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={language === 'ar' ? cat.name : cat.nameEn}>
                    {language === 'ar' ? cat.name : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{t.brand}</div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              >
                <option value="">{t.allOrders === 'الطلبات' ? 'الكل' : 'All'}</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{t.sortBy}</div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                }}
              >
                <option value="newest">{t.newest}</option>
                <option value="priceLow">{t.priceLowHigh}</option>
                <option value="priceHigh">{t.priceHighLow}</option>
              </select>
            </div>
            
            <button
              onClick={clearFilters}
              style={{
                padding: '10px',
                background: 'transparent',
                color: 'var(--primary)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {t.clearFilters}
            </button>
          </div>
        )}
        
        <div style={{ marginBottom: '16px', color: 'var(--secondary-text)', fontSize: '13px' }}>
          {filteredProducts.length} {language === 'ar' ? 'منتج' : 'products'}
        </div>
        
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-text)', marginBottom: '8px' }}>
              {t.noResults}
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
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
