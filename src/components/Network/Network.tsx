import { FC } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "../../config.json";

import { useNavigate } from 'react-router-dom';

const config: any = configFile;

export const Network: FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full max-w-lg mx-auto">
      {!wallet && (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/metamask-logo.png`}
            alt="Metamask logo"
            className="w-14 mx-auto mb-2"
          />
          <h2 className="text-xl font-bold mb-4 text-center">Connect your MetaMask Wallet</h2>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={async () => {
              await connect();
              navigate('/home');
            }}
          >
            {connecting ? "Connecting..." : "Connect"}
          </button>
        </>
      )}
      {wallet && (
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Switch Chain</label>
          {settingChain ? (
            <span className="block text-gray-600 text-sm">Switching chain...</span>
          ) : (
            <select
              onChange={({ target: { value } }) => {
                if (config[value] !== undefined) {
                  setChain({ chainId: value });
                } else {
                  alert("No deploy on this chain");
                }
              }}
              value={connectedChain?.id}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {chains.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={async () => {
              await disconnect(wallet);
              navigate('/login');
            }}
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};