import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User as UserIcon, Mail, Shield, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Đang tải dữ liệu...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Cover Photo */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', marginTop: '50px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--card-bg)', border: '4px solid var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <UserIcon size={64} color="var(--text-muted)" />
            </div>
            <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
              <Camera size={18} />
            </button>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{user.username || 'Người dùng'}</h2>
            <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
              {user.role}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="form-group">
            <label><UserIcon size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/>Tên đăng nhập</label>
            <div className="form-control" style={{ opacity: 0.7 }}>{user.username}</div>
          </div>
          <div className="form-group">
            <label><Mail size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/>Email</label>
            <div className="form-control" style={{ opacity: 0.7 }}>{user.email || 'Chưa cập nhật'}</div>
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label><Shield size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/>Bảo mật (Đổi mật khẩu)</label>
            <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary-color)' }}>
              Yêu cầu đổi mật khẩu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
