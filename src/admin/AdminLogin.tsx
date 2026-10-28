import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'sheta.01@gmail.com' && password === '12345678910') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin/orders');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '60px', height: '60px', background: '#F0ECF7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={28} color="#1A1D23" />
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '700' }}>لوحة إدارة Tech Example</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>تسجيل الدخول</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>
          
          {error && <div style={{ color: '#EF4444', fontSize: '13px', textAlign: 'center' }}>{error}</div>}
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#1A1D23',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
