import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  return (
  <div className="min-h-screen bg-gray-100 flex">
    <Sidebar/>
      <div className="flex-1">
        <Navbar/>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
  </div>
  );
};

export default Layout;