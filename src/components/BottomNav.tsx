import { Home, Compass, Heart, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { useMemo } from 'react';

export default function BottomNav() {
  const location = useLocation();
  const { language, cart } = useApp();
  const t = translations[language];
  
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);
  
  const navItems = [
    { path: '/', icon: Home, label: t.home, key: 'home' },
    { path: '/explore', icon: Compass, label: t.explore, key: 'explore' },
    { path: '/favorites', icon: Heart, label: t.favorites, key: 'favorites' },
    { path: '/cart', icon: ShoppingCart, label: t.cart, key: 'cart' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#FFFFFF',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom, 0px))',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.key}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              color: active ? 'var(--primary)' : 'var(--secondary-text)',
              position: 'relative',
              minWidth: '60px',
              transition: 'color 0.2s ease',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              {item.key === 'cart' && cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-10px',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '0 6px',
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', fontWeight: active ? '600' : '500' }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
