import React from 'react';
import { Code, Server, Shield, Brain } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Dịch vụ của chúng tôi</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Code size={48} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Thiết kế Website</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Thiết kế website đa ngành nghề, chuẩn SEO, UI/UX hiện đại bắt kịp xu hướng tương lai.</p>
          <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>Xem chi tiết</button>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Brain size={48} color="#8b5cf6" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI & Big Data</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Tích hợp trí tuệ nhân tạo, tự động hóa quy trình và xử lý dữ liệu lớn (Big Data).</p>
          <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>Xem chi tiết</button>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Server size={48} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Cloud Server</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Giải pháp máy chủ ảo, lưu trữ đám mây an toàn, tốc độ cao và mở rộng dễ dàng.</p>
          <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>Xem chi tiết</button>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Shield size={48} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bảo mật hệ thống</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Đánh giá, tư vấn và thiết lập hàng rào bảo mật nhiều lớp chống lại các cuộc tấn công mạng.</p>
          <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>Xem chi tiết</button>
        </div>

      </div>
    </div>
  );
};

export default Services;
