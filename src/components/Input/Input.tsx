import React, { useState } from "react";
import { ethers } from "ethers";
import { useRollups } from "../../useRollups";
import { useWallets } from "@web3-onboard/react";
import { X509 } from "../../types/X509";

export interface InputProps {
  dappAddress: string
}

export const Input: React.FC<InputProps> = (props) => {
  const { dappAddress } = props;

  const rollups = useRollups(dappAddress);
  const [connectedWallet] = useWallets();

  const provider = new ethers.providers.Web3Provider(connectedWallet.provider);

  const [ versionNumber, setVersionNumber ] = useState("");
  const [ serialNumber, setSerialNumber ] = useState("");
  const [ signatureAlgorithmID, setSignatureAlgorithmID ] = useState("");
  const [ issuerName, setIssuerName ] = useState("");
  const [ notBefore, setNotBefore ] = useState("");
  const [ notAfter, setNotAfter ] = useState("");
  const [ subjectName, setSubjectName ] = useState("");
  const [ publicKeyAlgorithm, setPublicKeyAlgorithm ] = useState("");
  const [ subjectPublicKey, setSubjectPublicKey ] = useState("");
  const [ issuerUniqueIdentifier, setIssuerUniqueIdentifier ] = useState("");
  const [ subjectUniqueIdentifier, setSubjectUniqueIdentifier ] = useState("");

  const addInput = async () => {
    const certificate: X509 = {
      versionNumber,
      serialNumber,
      signatureAlgorithmID,
      issuerName,
      subjectName,
      subjectPublicKeyInfo: {
        publicKeyAlgorithm,
        subjectPublicKey
      },
      validityPeriod: {
        notAfter: new Date(notAfter),
        notBefore: new Date(notBefore)
      },
      issuerUniqueIdentifier,
      subjectUniqueIdentifier
    }

    if (rollups) {
      try {
        const payload = ethers.utils.toUtf8Bytes(JSON.stringify(certificate));
        await rollups.inputContract.addInput(dappAddress, payload);
      } catch (e) {
        console.log(`${e}`);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Create New X509 Certificate</h2>

      <div className="space-y-2">
        <label htmlFor="version-number" className="block text-sm font-medium text-gray-700">Version Number</label>
        <input
          type="text"
          placeholder="Version number"
          id="version-number"
          value={versionNumber}
          onChange={e => setVersionNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="serial-number" className="block text-sm font-medium text-gray-700">Serial Number</label>
        <input
          type="text"
          placeholder="Serial number"
          id="serial-number"
          value={serialNumber}
          onChange={e => setSerialNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signature-algorithm" className="block text-sm font-medium text-gray-700">Signature Algorithm</label>
        <input
          type="text"
          placeholder="Signature algorithm"
          id="signature-algorithm"
          value={signatureAlgorithmID}
          onChange={e => setSignatureAlgorithmID(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="issuer-name" className="block text-sm font-medium text-gray-700">Issuer Name</label>
        <input
          type="text"
          placeholder="Issuer name"
          id="issuer-name"
          value={issuerName}
          onChange={e => setIssuerName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

      <div className="space-y-2">
        <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700">Subject Name</label>
        <input
          type="text"
          placeholder="Subject name"
          id="subject-name"
          value={subjectName}
          onChange={e => setSubjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="public-key-algorithm" className="block text-sm font-medium text-gray-700">Public Key Algorithm</label>
        <input
          type="text"
          placeholder="Public key algorithm"
          id="public-key-algorithm"
          value={publicKeyAlgorithm}
          onChange={e => setPublicKeyAlgorithm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject-public-key" className="block text-sm font-medium text-gray-700">Subject Public Key</label>
        <input
          type="text"
          placeholder="Subject public key"
          id="subject-public-key"
          value={subjectPublicKey}
          onChange={e => setSubjectPublicKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="issuer-unique-identifier" className="block text-sm font-medium text-gray-700">Issuer Unique Identifier</label>
        <input
          type="text"
          placeholder="Issuer unique identifier"
          id="issuer-unique-identifier"
          value={issuerUniqueIdentifier}
          onChange={e => setIssuerUniqueIdentifier(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject-unique-identifier" className="block text-sm font-medium text-gray-700">Subject Unique Identifier</label>
        <input
          type="text"
          placeholder="Subject unique identifier"
          id="subject-unique-identifier"
          value={subjectUniqueIdentifier}
          onChange={e => setSubjectUniqueIdentifier(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={() => addInput()}
        disabled={!rollups}
        className={`mt-4 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        Send
      </button>
    </div>
  );
};