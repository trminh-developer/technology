import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className={`${styles.navbar} glass-panel`}>
      <div className={styles.brand}>
        <Rocket className={styles.icon} />
        <Link to="/">NovaTech</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/services">Dịch vụ</Link></li>
        <li><Link to="/contact">Liên hệ</Link></li>
      </ul>
      <div className={styles.auth}>
        {user ? (
          <div className={styles.userMenu}>
            <Link to="/profile" className={styles.userInfo}>
              <UserIcon size={18} />
              <span>Hi, {user.email?.split('@')[0]}</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
