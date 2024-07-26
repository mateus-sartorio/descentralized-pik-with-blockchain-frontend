import { FC } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import configFile from "./config.json";

const config: any = configFile;

export const Network: FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full max-w-lg mx-auto">
      {!wallet && (
        <button
          onClick={() => connect()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          {connecting ? "Connecting..." : "Connect"}
        </button>
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
            onClick={() => disconnect(wallet)}
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};