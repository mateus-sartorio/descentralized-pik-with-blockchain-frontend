import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {

};

const Navbar: React.FC<NavbarProps> = (props) => {
  const pageName = "Home";
  const userName = "Taxad";
  
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button className="text-white mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path> */}
            <FontAwesomeIcon icon={faBars} />
          </svg>
        </button>
        <span className="text-xl font-bold">{pageName}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-4">{userName}</span>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
};

export default Navbar;