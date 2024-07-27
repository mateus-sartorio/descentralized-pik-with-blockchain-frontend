export interface X509 {
  versionNumber: string;
  serialNumber: string;
  signatureAlgorithmID: string;
  issuerName: string;
  validityPeriod: {
    notBefore: Date;
    notAfter: Date;
  };
  subjectName: string;
  subjectPublicKeyInfo: {
    publicKeyAlgorithm: string;
    subjectPublicKey: string;
  };
  issuerUniqueIdentifier?: string;
  subjectUniqueIdentifier?: string;
  extensions?: any
}