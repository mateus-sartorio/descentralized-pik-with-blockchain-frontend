import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
        <div className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="p-4 mt-16">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Layout;