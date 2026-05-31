import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h2>Hồ sơ cá nhân</h2>
      <div style={{ marginTop: '2rem' }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  );
};

export default Profile;
