import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const pageName = "Home";
  const userName = "Taxad";
  
  return (
    <nav className="fixed w-full bg-gray-800 text-white px-8 flex justify-between items-center h-16 my-auto">
      <div className="flex items-center">
        <button className="text-white mr-4">
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar}/>
        </button>
        <span className="text-xl font-bold">{pageName}</span>
      </div>
      <div className="flex items-center cursor-pointer">
        <span className="mr-4">{userName}</span>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
};

export default Navbar;