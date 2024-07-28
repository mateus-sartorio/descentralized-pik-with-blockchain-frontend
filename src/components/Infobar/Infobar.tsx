import React from "react";

interface InfobarProps {
  dappAddress: string;
  setDappAddress: React.Dispatch<React.SetStateAction<string>>
}

export const Infobar: React.FC<InfobarProps> = (props) => {
  const { dappAddress, setDappAddress } = props;

  return (
    <div className="bg-white py-4 px-6 border border-gray-200 rounded-lg shadow-sm w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Dapp Address</h2>
      <input
        type="text"
        value={dappAddress}
        onChange={(e) => setDappAddress(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};