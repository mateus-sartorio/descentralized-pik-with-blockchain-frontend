import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from '../../components/Toast/Toast';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  const hexString = Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
  return hexString.toUpperCase();  // Uppercase for clarity
}

const CertificatePage: React.FC = () => {
  const location = useLocation();
  const { certificate } = location.state;

  const [copiedField, setCopiedField] = useState<'publicKey' | 'rawCertificate' | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (field: 'publicKey' | 'rawCertificate') => {
    setCopiedField(field);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Certificate Details</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Certificate Data</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Common Name:</span>
            <span>{certificate?.subject[0]?.value || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Country:</span>
            <span>{certificate?.subject[1]?.value || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Not Before:</span>
            <span>{new Date(certificate?.validFrom ?? "").toLocaleDateString() || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Not After:</span>
            <span>{new Date(certificate?.validTo ?? "").toLocaleDateString() || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Serial Number:</span>
            <span>{arrayBufferToHex(certificate?.serialNumber) || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Public Key</h2>
        <div className="relative">
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-lg text-sm overflow-auto text-center">
            {certificate?.publicKey}
          </pre>
          <CopyToClipboard text={certificate?.publicKey || ''} onCopy={() => handleCopy('publicKey')}>
            <button
              className={`absolute top-2 right-2 p-1 rounded-full transition-transform duration-200 ${copiedField === 'publicKey' ? 'transform scale-90' : 'hover:bg-gray-200'
                }`}
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-2">Raw Certificate</h2>
        <div className="relative">
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded-lg text-sm overflow-auto text-center">
            {certificate?.rawCertificate}
          </pre>
          <CopyToClipboard text={certificate?.rawCertificate || ''} onCopy={() => handleCopy('rawCertificate')}>
            <button
              className={`absolute top-2 right-2 p-1 rounded-full transition-transform duration-200 ${copiedField === 'rawCertificate' ? 'transform scale-90' : 'hover:bg-gray-200'
                }`}
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
          onClick={() => {
            // Functionality to be implemented
          }}
        >
          Inactivate Certificate
        </button>
      </div>

      <Toast message="Text copied!" show={showToast} />
    </div>
  );
};

export default CertificatePage;