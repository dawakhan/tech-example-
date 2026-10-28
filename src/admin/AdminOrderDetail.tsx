import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { getSeededOrders } from './seedOrders';
import { formatPrice } from '../data/products';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const seeded = getSeededOrders();
    const stored = JSON.parse(localStorage.getItem('admin_orders') || '[]');
    const allOrders = stored.length > 0 ? stored : seeded;
    const found = allOrders.find((o: any) => o.id === id);
    setOrder(found);
  }, [id]);
  
  const updateStatus = (newStatus: string) => {
    if (!order) return;
    const updatedOrder = { ...order, status: newStatus };
    const stored = JSON.parse(localStorage.getItem('admin_orders') || '[]');
    const updated = stored.map((o: any) => o.id === order.id ? updatedOrder : o);
    localStorage.setItem('admin_orders', JSON.stringify(updated));
    setOrder(updatedOrder);
  };
  
  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <header style={{ background: '#FFFFFF', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <button onClick={() => navigate('/admin/orders')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
            العودة للطلبات
          </button>
        </header>
        <main style={{ padding: '40px 20px', textAlign: 'center' }}>الطلب غير موجود</main>
      </div>
    );
  }
  
  const statusOptions = ['تم إنشاء الطلب', 'قيد المراجعة', 'تم تأكيد الطلب', 'قيد التجهيز', 'تم الشحن', 'تم التسليم', 'ملغي'];
  
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
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>تفاصيل الطلب</h1>
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
        <button
          onClick={() => navigate('/admin/orders')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            color: '#374151',
            fontSize: '14px',
          }}
        >
          <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
          العودة للطلبات
        </button>
        
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>رقم الطلب</div>
              <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'monospace' }}>{order.id}</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>رمز التتبع</div>
              <div style={{ fontSize: '14px', fontWeight: '600', fontFamily: 'monospace', color: '#8273A8' }}>{order.trackingCode}</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            {new Date(order.date).toLocaleString('ar-IQ')}
          </div>
        </div>
        
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>معلومات العميل</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div><span style={{ color: '#6b7280' }}>الاسم:</span> <span style={{ fontWeight: '600' }}>{order.customer.fullName}</span></div>
            <div><span style={{ color: '#6b7280' }}>رقم الهاتف:</span> <span>{order.customer.phone}</span></div>
            <div><span style={{ color: '#6b7280' }}>المحافظة:</span> <span>{order.customer.governorate}</span></div>
            <div><span style={{ color: '#6b7280' }}>المدينة:</span> <span>{order.customer.city}</span></div>
            <div><span style={{ color: '#6b7280' }}>العنوان:</span> <span style={{ lineHeight: '1.6' }}>{order.customer.address}</span></div>
            {order.customer.notes && (
              <div style={{ padding: '10px', background: '#f9fafb', borderRadius: '8px', marginTop: '4px' }}>
                <div style={{ color: '#6b7280', marginBottom: '4px' }}>ملاحظات:</div>
                <div>{order.customer.notes}</div>
              </div>
            )}
          </div>
        </div>
        
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>المنتجات</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: idx < order.items.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{item.product?.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>الكمية: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{formatPrice(item.product?.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#6b7280' }}>المجموع الفرعي</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#6b7280' }}>أجور التوصيل</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
              <span>الإجمالي</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
        
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>تغيير حالة الطلب</div>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </main>
    </div>
  );
}
