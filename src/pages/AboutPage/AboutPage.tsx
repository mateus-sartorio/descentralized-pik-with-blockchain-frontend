import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          {/* Image Placeholder */}
          <img src={`${process.env.PUBLIC_URL}/images/ethereum.png`} alt="Blockchain Security" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white tracking-wide">About Certificate Hub</h1>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-10 space-y-6">
          <p className="text-lg text-gray-700">
            Welcome to <strong>Certificate Hub</strong>, your go-to solution for managing X509 certificates in a decentralized and user-friendly environment. Our mission is to simplify the complexities of digital certification through a streamlined interface, allowing you to create and verify certificates without relying on centralized authorities.
          </p>

          <p className="text-lg text-gray-700">
            Unlike traditional systems that depend on hierarchical certification authorities, Certificate Hub leverages the Ethereum blockchain. This decentralized approach enables seamless certificate management, allowing you to track and validate certificates directly on the blockchain. Every certificate’s history is transparent and immutable, ensuring trust and security.
          </p>

          <p className="text-lg text-gray-700">
            Our platform is powered by the <strong>Cartesi machine</strong>, offering a unique opportunity to explore and interact with blockchain technologies hands-on. Whether you're creating new certificates or verifying existing ones, our solution ensures that certificate management remains minimalistic yet powerful.
          </p>

          <div className="flex justify-center">
            <img src={`${process.env.PUBLIC_URL}/images/cartesi-background-1.webp`} alt="Blockchain and Certificates" className="rounded-lg shadow-md w-3/4" />
          </div>

          <p className="text-lg text-gray-700">
            Explore the future of certificate management with Certificate Hub and experience the security and efficiency that decentralized technology can bring to your organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;