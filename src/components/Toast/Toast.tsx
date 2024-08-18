// Toast.tsx
import React from 'react';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      className={`fixed bottom-4 left-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-transform transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
    >
      {message}
    </div>
  );
};

export default Toast;