import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CustomToast = ({ message, isVisible, onClose, type = 'error' }) => {
  // Cegah error saat SSR (Server Side Rendering)
  if (typeof document === 'undefined') return null;

  // Auto close timer (opsional, jika user tidak klik close)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Hilang otomatis setelah 4 detik
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // Konfigurasi tema berdasarkan tipe
  const theme = {
    error: {
      color: 'bg-red-600',
      border: 'border-red-600',
      icon: '☠️',
      title: 'SYSTEM FAILURE',
      sub: 'CRITICAL ERROR'
    },
    success: {
      color: 'bg-green-500',
      border: 'border-green-500',
      icon: '⚡',
      title: 'MISSION UPDATE',
      sub: 'SUCCESS'
    }
  };

  const activeTheme = theme[type] || theme.error;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
           key="custom-toast"
           initial={{ opacity: 0, x: 100, scale: 0.9 }}
           animate={{ opacity: 1, x: 0, scale: 1 }}
           exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
           // Layout: Fixed di pojok kanan bawah
           className="fixed bottom-6 right-6 z-[10000] max-w-[90vw] w-80 md:w-96"
        >
           {/* --- COMIC BUBBLE CONTAINER --- */}
           <div className="relative bg-white border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
              
              {/* Header Strip */}
              <div className={`${activeTheme.color} border-b-4 border-black p-2 flex justify-between items-center`}>
                 <div className="flex items-center gap-2">
                    <span className="bg-black text-white font-mono text-[10px] font-bold px-1 py-0.5">
                       {activeTheme.title}
                    </span>
                 </div>
                 <button 
                    onClick={onClose}
                    className="bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-xs px-2 border-2 border-transparent hover:border-black transition-colors"
                 >
                    X
                 </button>
              </div>

              {/* Body Content */}
              <div className="p-4 flex gap-4 items-start relative">
                 {/* Decorative Background Pattern */}
                 <div className="absolute inset-0 opacity-5 pointer-events-none" 
                      style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }} 
                 />

                 {/* Icon Box */}
                 <div className={`flex-shrink-0 w-12 h-12 ${activeTheme.color} border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0_#000]`}>
                    {activeTheme.icon}
                 </div>

                 {/* Message Text */}
                 <div className="flex-1 min-w-0">
                    <h4 className={`font-['Bangers'] text-xl leading-none text-black mb-1 uppercase`}>
                       {activeTheme.sub}
                    </h4>
                    <p className="font-mono text-xs md:text-sm text-gray-600 font-bold leading-tight break-words">
                       {message}
                    </p>
                 </div>
              </div>

              {/* Progress Bar Animation */}
              <motion.div 
                 initial={{ width: "100%" }}
                 animate={{ width: "0%" }}
                 transition={{ duration: 4, ease: "linear" }}
                 className={`h-2 ${activeTheme.color} border-t-2 border-black`}
              />
           </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CustomToast;