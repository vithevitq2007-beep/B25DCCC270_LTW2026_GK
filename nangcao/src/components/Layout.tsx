import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

interface LayoutProps {
  loading: boolean;
  error: string | null;
}

const Layout: React.FC<LayoutProps> = ({ loading, error }) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;
