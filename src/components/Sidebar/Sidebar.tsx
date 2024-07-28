import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyCheck, faRightFromBracket, faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons';
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "../../config.json";
import { useNavigate } from 'react-router-dom';

const config: any = configFile;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const navigate = useNavigate();

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-30`} style={{ marginTop: '4rem' }}>
      <div className="h-full flex flex-col justify-between">
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/home"
            onClick={toggleSidebar}
            className="flex items-center space-x-2 cursor-pointer text-lg hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faHouse} />
            <p>Home</p>
          </Link>

          <Link
            to="/create"
            onClick={toggleSidebar}
            className="flex items-center space-x-2 cursor-pointer text-lg hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faMoneyCheck} />
            <p>Create Certificate</p>
          </Link>

          <Link
            to="/settings"
            onClick={toggleSidebar}
            className="flex items-center space-x-2 cursor-pointer text-lg hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGear} />
            <p>Settings</p>
          </Link>

          <Link
            to="/about"
            onClick={toggleSidebar}
            className="flex items-center space-x-2 cursor-pointer text-lg hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <p>About</p>
          </Link>
        </nav>

        <div
          className="flex items-center justify-center space-x-2 py-2 mx-4 mb-4 bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
          onClick={async () => {
            await disconnect(wallet!);
            navigate('/login');
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className="text-lg">Disconnect Wallet</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;