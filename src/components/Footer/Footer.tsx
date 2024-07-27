import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Certificate Hub</h1>
        
        <p className="mb-8 max-w-2xl mx-auto">
          Certificate Hub is a platform for managing and verifying digital certificates seamlessly, leveraging the power of Cartesi for secure and efficient blockchain integration.
        </p>

        <div className="mb-8 flex flex-row gap-10 justify-center">
          <Link
            to="/about"
            className="mb-2 text-lg hover:text-gray-400 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <p>About us</p>
          </Link>

          <a
            href="https://github.com/mateus-sartorio/descentralized-pik-with-blockchain-frontend"
            className="mb-2 text-lg hover:text-gray-400 flex items-center justify-center gap-2"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
            <p>GitHub</p>
          </a>

          <a
            href="https://cartesi.io/"
            className={`mb-2 text-lg flex items-center justify-center gap-2 ${styles['container']}`}
            target="_blank"
          >
            <img
              src={`${process.env.PUBLIC_URL}/cartesi-logo.svg`}
              alt="Cartesi logo"
              className={`${styles['cartesi-logo']}`}
            />
            <p>Learn more about Cartesi</p>
          </a>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p>&copy; 2024 Certificate Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;