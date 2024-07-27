import React from "react";
import { Link } from 'react-router-dom';

interface SidebarProps {

};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const pageName = "Home";
  const userName = "Taxad";
  
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-transform transform ${true ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:bg-transparent md:transform-none z-50`}>
      <div className="w-64 bg-gray-900 h-full text-white">
        <nav className="flex flex-col p-4">
          <Link to="/" className="mb-2" onClick={() => {}}>Home Page</Link>
          <Link to="/create" className="mb-2" onClick={() => {}}>Create Page</Link>
          <button className="mt-auto p-2 bg-red-600 rounded" onClick={() => { /* Handle disconnect logic */ }}>Disconnect</button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;