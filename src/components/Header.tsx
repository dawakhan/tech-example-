import { Search, Globe, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';

interface HeaderProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  showSearch?: boolean;
}

export default function Header({ onSearch, searchValue = '', showSearch = true }: HeaderProps) {
  const { language, setLanguage, cart } = useApp();
  const t = translations[language];
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: showSearch ? '12px' : '0' }}>
        <Link to="/" style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: 'var(--primary-text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Tech Example
          </h1>
        </Link>
        
        <button
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'var(--soft-purple)',
            color: 'var(--primary-text)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
          }}
          aria-label={t.language}
        >
          <Globe size={18} />
          {language === 'ar' ? 'EN' : 'عربي'}
        </button>
        
        <Link
          to="/cart"
          style={{
            position: 'relative',
            padding: '8px',
            color: 'var(--primary-text)',
          }}
          aria-label={t.cart}
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: language === 'ar' ? 'auto' : '2px',
                left: language === 'ar' ? '2px' : 'auto',
                background: 'var(--primary)',
                color: '#FFFFFF',
                borderRadius: '50%',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '600',
              }}
            >
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>
      </div>
      
      {showSearch && (
        <div style={{ position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              [language === 'ar' ? 'right' : 'left']: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--secondary-text)',
            }}
          />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 40px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              color: 'var(--primary-text)',
              outline: 'none',
            }}
          />
        </div>
      )}
    </header>
  );
}
