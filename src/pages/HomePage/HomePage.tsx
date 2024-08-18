import * as asn1js from "asn1js";

import { useEffect, useState } from "react";

import { Buffer } from 'buffer';
import { Certificate } from "pkijs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { fromBER } from "asn1js";
import { hexToString } from "../../utils/hex";
import { useNavigate } from "react-router-dom";

function cleanCertificate(cert: string): string {
  // Replace all escaped \\r\\n sequences with actual new line characters
  return cert.replace(/\\r\\n/g, '\n').replace(/\n/g, '\n');
}

function decodeX509Certificate(pemCert: string) {
  // Remove the "BEGIN CERTIFICATE" and "END CERTIFICATE" lines
  const base64Cert = pemCert
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\s+/g, ''); // Remove all whitespaces

  // Decode the base64 certificate
  const rawCert = Buffer.from(base64Cert, 'base64');

  // Parse the ASN.1 structure from the raw certificate
  const asn1 = fromBER(rawCert.buffer);
  if (asn1.offset === -1) {
    throw new Error("Unable to parse ASN.1 data");
  }

  // Convert to PKIjs Certificate object
  const certificate = new Certificate({ schema: asn1.result });

  // Extract the public key from the certificate
  const publicKeyInfo = certificate.subjectPublicKeyInfo;

  // Convert the public key to a PEM-encoded string
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----\n${Buffer.from(publicKeyInfo.toSchema().toBER(false)).toString('base64').match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;

  // Now, you can access the decoded certificate information
  const certInfo = {
    serialNumber: certificate.serialNumber.valueBlock.valueHex,
    issuer: certificate.issuer.typesAndValues.map(t => ({
      type: t.type,
      value: t.value.valueBlock.value
    })),
    subject: certificate.subject.typesAndValues.map(t => ({
      type: t.type,
      value: t.value.valueBlock.value
    })),
    validFrom: certificate.notBefore.value.toISOString(),
    validTo: certificate.notAfter.value.toISOString(),
    publicKey: publicKeyPem // Include the public key
  };

  return certInfo;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    const response = await fetch("http://localhost:8080/inspect/")
    const responseData = await response.json();

    console.log(responseData)

    const jsonData = hexToString(responseData.reports[0].payload)
    const objectData = JSON.parse(jsonData)

    
    const certificates = objectData.map((c: string) => cleanCertificate(c));
    
    try {
      const certificatesObject = certificates.map((c: any, index: number) => {
        return {
          id: index,
          decodedCertificate: decodeX509Certificate(c),
          rawCertificate: c
        }
      });
      console.log(certificatesObject)

      setData(certificatesObject ?? []);
    }
    catch (e) {
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => navigate('/create')}
        >
          Create Certificate
        </button>
      </div>
      {data.length > 0 && <div className="overflow-x-auto">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 rounded-tl-lg"></th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Certificate</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Common Name</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Country</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Not Before</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 rounded-tr-lg">Not After</th>
              </tr>
            </thead>
            <tbody>
              {data.map((cert, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-center text-sm text-gray-600">
                    <a className="text-blue-500 hover:underline cursor-pointer" onClick={() => {
                      navigate(`/certificate/${cert.id}`, {
                        state: {
                          certificate: {
                            subject: [{ value: cert.decodedCertificate.subject[0].value }, { value: cert.decodedCertificate.subject[1].value }],
                            validFrom: cert.decodedCertificate.validFrom,
                            validTo: cert.decodedCertificate.validTo,
                            publicKey: cert.decodedCertificate.publicKey,
                            serialNumber: cert.decodedCertificate.serialNumber,
                            rawCertificate: cert.rawCertificate, // Add this field to handle the raw certificate data
                          }
                        }
                      });
                    }}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{cert.decodedCertificate.subject[0].value}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{cert.decodedCertificate.subject[1].value}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{new Date(cert.decodedCertificate.validFrom).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600 rounded-br-lg">{new Date(cert.decodedCertificate.validTo).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      {data.length === 0 && <p>No certificates found...</p>}

    </div>
  );
};

export default HomePage;