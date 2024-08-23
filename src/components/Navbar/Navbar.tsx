import { faBars, faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import configFile from "../../config.json";
import { useNavigate } from 'react-router-dom';

const config: any = configFile;

interface NavbarProps {
  pageName: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ pageName, toggleSidebar }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const connectedWalletAddress = wallet?.accounts.map(a => a.address)[0];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  
  return (
    <nav className="fixed w-full bg-gray-800 text-white px-8 flex justify-between items-center h-16 my-auto z-50">
      <div className="flex items-center">
        <button className="text-white mr-4">
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar}/>
        </button>
        <span className="text-xl font-bold">{pageName}</span>
      </div>
      <div className="flex items-center cursor-pointer" onClick={handleDropdownToggle} ref={dropdownRef}>
        <span className="mr-4">{connectedWalletAddress}</span>
        <FontAwesomeIcon icon={faUser} />

        {isDropdownOpen && (
          <div className="absolute right-2 top-16 mt-2 rounded-md shadow-lg py-2 z-50 bg-gray-800">
            <button 
              className="w-full text-sm text-center px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2" 
              onClick={() => navigate('/settings')}
            >
              <FontAwesomeIcon icon={faGear} />
              <p className="text-sm">Settings</p>
            </button>
            
            <button 
              className="w-full text-sm text-center px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2" 
              onClick={async () => {
                await disconnect(wallet!);
                navigate('/login');
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p className="text-sm">Disconnect Wallet</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;