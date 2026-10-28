import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { getSeededOrders } from './seedOrders';
import { formatPrice } from '../data/products';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const statusOptions = ['all', 'تم إنشاء الطلب', 'قيد المراجعة', 'تم تأكيد الطلب', 'قيد التجهيز', 'تم الشحن', 'تم التسليم', 'ملغي'];
  
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
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>الطلبات</h1>
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
          <Link to="/admin/dashboard" style={{ padding: '10px 12px' }}>نظرة عامة</Link>
          <Link to="/admin/orders" style={{ padding: '10px 12px', background: '#F0ECF7', borderRadius: '8px', fontWeight: '600' }}>الطلبات</Link>
          <Link to="/admin/dashboard" style={{ padding: '10px 12px' }}>المنتجات</Link>
          <Link to="/admin/dashboard" style={{ padding: '10px 12px' }}>إعدادات المتجر</Link>
        </div>
      )}
      
      <main style={{ padding: '16px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
            <input
              type="text"
              placeholder="بحث في الطلبات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: '#FFFFFF',
              }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: '#FFFFFF',
            }}
          >
            <option value="all">جميع الحالات</option>
            {statusOptions.slice(1).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredOrders.map(order => (
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
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{order.id}</span>
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
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{order.customer.fullName}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.customer.phone}</div>
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {order.items.length} {order.items.length === 1 ? 'منتج' : 'منتجات'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(order.date).toLocaleDateString('ar-IQ')}</span>
                <span style={{ fontSize: '16px', fontWeight: '700' }}>{formatPrice(order.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
