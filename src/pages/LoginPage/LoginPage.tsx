import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { Network } from "../../components/Network/Network";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "../../config.json";
import { useNavigate } from 'react-router-dom';

const config: any = configFile;

const LoginPage: React.FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const navigate = useNavigate();
  
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 6) + 1;
  }

  useEffect(() => {
    if(wallet) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="relative h-screen w-full">
      <img
        src={`${process.env.PUBLIC_URL}/images/cartesi-background-${generateRandomNumber()}.webp`}
        alt="Login"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex">
        <div className="w-1/2"></div>
        <div className="w-1/2 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 flex w-full h-full">
        <div className="w-1/2 flex items-center justify-center"></div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-transparent">
          <div className="flex flex-row gap-4 items-center mb-6 text-white">
            <FontAwesomeIcon icon={faMoneyCheck} className="text-4xl" />
            <h1 className="text-3xl font-bold">Certificate Hub</h1>
          </div>
          <p className="text-white text-center mb-20">
            Manage your certificates securely in a decentralized way with the blockchain.
          </p>
          
          <Network />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;