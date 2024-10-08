import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ethers } from "ethers";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getDaysDifference } from "../../utils/dates";
import selfsigned from 'selfsigned';
import { useRollups } from "../../useRollups";
import { useWallets } from "@web3-onboard/react";

export interface InputProps {
  dappAddress: string
}

export const Input: React.FC<InputProps> = (props) => {
  const { dappAddress } = props;

  const rollups = useRollups(dappAddress);
  const [connectedWallet] = useWallets();

  const [loading, setLoading] = useState(false);

  const provider = new ethers.providers.Web3Provider(connectedWallet.provider);

  const [commonName, setCommomName] = useState("");
  const [countryName, setCountryName] = useState("BR");
  const [notBefore, setNotBefore] = useState("");
  const [notAfter, setNotAfter] = useState("");

  const addInput = async () => {
    setLoading(true);

    const attrs = [
      { name: 'commonName', value: commonName },
      { name: 'countryName', value: countryName },
    ];

    const notBeforeDate = notBefore ? new Date(`${notBefore}T00:00:00`) : new Date();
    const notAfterDate = notAfter ? new Date(`${notAfter}T00:00:00`) : new Date();
    const daysUntilExpiration = getDaysDifference(notAfterDate, new Date());

    const { cert } = selfsigned.generate(attrs, {
      keySize: 2048, // the size for the private key in bits (default: 1024)
      days: daysUntilExpiration, // how long till expiry of the signed certificate (default: 365)
      notBeforeDate: notBeforeDate, // The date before which the certificate should not be valid (default: now)
      algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
    });

    const input = {
      action: "create",
      payload: cert
    };

    if (rollups) {
      try {
        const payload = ethers.utils.toUtf8Bytes(JSON.stringify(input));
        await rollups.inputContract.addInput(dappAddress, payload);

        setCommomName("");
        setCountryName("BR");
        setNotBefore("");
        setNotAfter("");
      } catch (e) {
        console.log(`${e}`);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 mt-10">Create New X509 Certificate</h2>

      <div className="flex flex-col max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        <div className="space-y-2">
          <label htmlFor="commom-name" className="block text-sm font-medium text-gray-700">Commom name</label>
          <input
            id="commom-name"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Commom name"
            value={commonName}
            onChange={e => setCommomName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={countryName}
            onChange={e => setCountryName(e.target.value)}
          >
            <option value="" disabled>Select a country</option>
            <option value="BR">Brazil</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="CN">China</option>
            <option value="JP">Japan</option>
            <option value="IN">India</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="not-before" className="block text-sm font-medium text-gray-700">Not Before</label>
          <input
            type="date"
            id="not-before"
            value={notBefore}
            onChange={e => setNotBefore(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="not-after" className="block text-sm font-medium text-gray-700">Not After</label>
          <input
            type="date"
            id="not-after"
            value={notAfter}
            onChange={e => setNotAfter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => addInput()}
          disabled={!rollups}
          className={`relative mt-4 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed
        transform transition-all duration-300 ease-in-out
        ${loading ? "scale-90" : "scale-100"}
      `}
        >
          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="mr-2"
            />
          )}
          Send
        </button>
      </div>
    </>
  );
};