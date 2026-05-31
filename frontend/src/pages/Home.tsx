import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Server, Shield, Brain, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: 'center', padding: '4rem 0', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tương lai của Công nghệ
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Kiến trúc React + Supabase Serverless siêu tốc, mượt mà và bảo mật tuyệt đối. Trải nghiệm ngay bộ giao diện Glassmorphism đỉnh cao.
        </p>
        <Link to="/services" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '14px 28px' }}>
          Khám phá Dịch vụ <ArrowRight size={20} />
        </Link>
      </section>

      {/* Features Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '2rem 0' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.3s' }}>
          <Code size={40} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
          <h3>Web Development</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Ứng dụng Web siêu mượt chuẩn SPA.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.3s' }}>
          <Brain size={40} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
          <h3>AI & Big Data</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Phân tích dữ liệu thông minh.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.3s' }}>
          <Server size={40} style={{ color: '#10b981', marginBottom: '1rem' }} />
          <h3>Cloud Server</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Lưu trữ dữ liệu an toàn trên mây.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.3s' }}>
          <Shield size={40} style={{ color: '#ef4444', marginBottom: '1rem' }} />
          <h3>Bảo mật hệ thống</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Bảo vệ hệ thống tối đa khỏi hacker.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
