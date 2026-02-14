import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Terima prop onClick
const BackButton = ({ to = "/", label = "RETURN", onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      // Jika ada onClick manual (seperti dari CharacterRoster), jalankan itu
      onClick(e);
    } else {
      // Jika tidak ada, jalankan navigasi default
      navigate(to);
    }
  };

  return (
    <motion.button
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick} // Gunakan handler di sini
      className="fixed top-6 left-4 md:left-8 z-50 group flex items-center gap-2"
    >
      <div className="bg-black text-white border-2 border-white p-2 md:p-3 shadow-[4px_4px_0_#000] group-hover:bg-yellow-400 group-hover:text-black group-hover:border-black group-hover:shadow-[4px_4px_0_#fff] transition-all">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="font-['Bangers'] text-xl md:text-2xl tracking-widest text-white drop-shadow-[2px_2px_0_#000] group-hover:text-yellow-400 transition-colors hidden sm:block">
        {label}
      </span>
    </motion.button>
  );
};

export default BackButton;