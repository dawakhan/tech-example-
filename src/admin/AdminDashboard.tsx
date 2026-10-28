import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, Menu, X } from 'lucide-react';
import { getSeededOrders } from './seedOrders';
import { formatPrice } from '../data/products';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const seeded = getSeededOrders();
    const stored = JSON.parse(localStorage.getItem('admin_orders') || '[]');
    if (stored.length === 0) {
      localStorage.setItem('admin_orders', JSON.stringify(seeded));
      setOrders(seeded);
    } else {
      setOrders(stored);
    }
  }, []);
  
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'تم إنشاء الطلب' || o.status === 'قيد المراجعة').length,
    confirmed: orders.filter(o => o.status === 'تم تأكيد الطلب').length,
    preparing: orders.filter(o => o.status === 'قيد التجهيز' || o.status === 'تم الشحن').length,
    delivered: orders.filter(o => o.status === 'تم التسليم').length,
  };
  
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding: '8px' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>لوحة إدارة Tech Example</h1>
        </div>
        <Link to="/" style={{ fontSize: '13px', color: '#8273A8' }}>العودة للمتجر</Link>
      </header>
      
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid #e5e7eb',
            zIndex: 100,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Link to="/admin/dashboard" style={{ padding: '10px 12px', background: '#F0ECF7', borderRadius: '8px', fontWeight: '600' }}>نظرة عامة</Link>
          <Link to="/admin/orders" style={{ padding: '10px 12px' }}>الطلبات</Link>
          <Link to="/admin/dashboard" style={{ padding: '10px 12px' }}>المنتجات</Link>
          <Link to="/admin/dashboard" style={{ padding: '10px 12px' }}>إعدادات المتجر</Link>
        </div>
      )}
      
      <main style={{ padding: '16px', maxWidth: '100%' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '700' }}>نظرة عامة</h2>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Package size={20} color="#8273A8" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>إجمالي الطلبات</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.total}</div>
          </div>
          
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Clock size={20} color="#f59e0b" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>قيد الانتظار</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.pending}</div>
          </div>
          
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <CheckCircle size={20} color="#3b82f6" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>تم التأكيد</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.confirmed}</div>
          </div>
          
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Truck size={20} color="#8b5cf6" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>قيد التجهيز/شحن</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.preparing}</div>
          </div>
          
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #e5e7eb', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <CheckCircle size={20} color="#10b981" />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>تم التسليم</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stats.delivered}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>أحدث الطلبات</h3>
          <Link to="/admin/orders" style={{ fontSize: '13px', color: '#8273A8', fontWeight: '600' }}>عرض الكل</Link>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {orders.slice(0, 5).map(order => (
            <Link
              key={order.id}
              to={`/admin/orders/${order.id}`}
              style={{
                background: '#FFFFFF',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>{order.id}</span>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: order.status === 'تم التسليم' ? '#dcfce7' : order.status === 'تم الشحن' ? '#e0e7ff' : order.status === 'ملغي' ? '#fee2e2' : '#fef3c7',
                    color: order.status === 'تم التسليم' ? '#166534' : order.status === 'تم الشحن' ? '#3730a3' : order.status === 'ملغي' ? '#991b1b' : '#92400e',
                  }}
                >
                  {order.status}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#374151' }}>{order.customer.fullName}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#6b7280' }}>{new Date(order.date).toLocaleDateString('ar-IQ')}</span>
                <span style={{ fontWeight: '700' }}>{formatPrice(order.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
