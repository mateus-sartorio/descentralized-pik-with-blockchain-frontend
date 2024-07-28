import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to map paths to page names
  const getPageName = (path: string) => {
    switch (path) {
      case '/home':
        return 'Home';
      case '/create':
        return 'Create Certificate';
      case '/settings':
        return 'Settings';
      case '/about':
        return 'About';
      default:
        return 'Home';
    }
  };

  const pageName = getPageName(location.pathname);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          
        <div className="flex-1">
          <Navbar toggleSidebar={toggleSidebar} pageName={pageName}/>
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