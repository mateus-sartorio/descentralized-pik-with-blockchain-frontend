import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our Project</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our project! This application is designed to [Brief description of what your project does].
        </p>
        <p className="text-gray-700 mb-4">
          The goal of the project is to [Explain the main goal and vision of your project]. Our team is dedicated to ensuring that users have access to [mention any features or benefits of your project].
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Features:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>[Feature 1]</li>
          <li>[Feature 2]</li>
          <li>[Feature 3]</li>
        </ul>
        <p className="text-gray-700 mb-4">
          This project is built using modern technologies like [mention any technologies like React, TypeScript, Vue, etc.]. We aim to provide a smooth and intuitive user experience.
        </p>
        <p className="text-gray-700">
          We hope you enjoy using our platform. For any questions or feedback, feel free to reach out to our team.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;