import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DatePicker = ({ day, month, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when dropdown is open (mobile only)
  useEffect(() => {
    if (isOpen) {
      // Only prevent scroll on mobile (screen size < 640px)
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const handleSelect = (d, m) => {
      // Jika user klik bulan, update bulan tapi pertahankan hari (atau set 1 jika belum ada)
      // Jika user klik hari, update hari
      onDateChange({ 
          day: d || day || 1, 
          month: m || month || 1 
      });
  };

  const formatDate = () => {
    if (day && month) {
      return `${String(day).padStart(2, '0')} / ${String(month).padStart(2, '0')}`;
    }
    return 'DD / MM';
  };

  return (
    <div className="relative w-full">
      {/* TRIGGER BUTTON - DARK THEME */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        className={`
            w-full p-3 sm:p-4 font-bold font-sans text-lg sm:text-xl text-center
            border-2 transition-all rounded-none
            ${isOpen 
                ? 'bg-black text-yellow-400 border-yellow-400 shadow-[4px_4px_0_#facc15]' 
                : 'bg-zinc-800 text-white border-zinc-600 hover:border-zinc-500'
            }
        `}
      >
        {formatDate()}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Mobile only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] sm:hidden"
            />

            {/* Dropdown - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 500, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 500, scale: 0.95 }}
              className="fixed bottom-0 left-0 right-0 max-h-[60vh] bg-black border-t-2 border-yellow-400 z-[70] p-4 shadow-[0_-8px_0_rgba(255,255,255,0.2)] rounded-t-xl overflow-y-auto sm:absolute sm:top-full sm:bottom-auto sm:left-0 sm:right-auto sm:max-h-96 sm:w-96 sm:border-t-0 sm:border-2 sm:rounded-none sm:mt-2 sm:shadow-[8px_8px_0_rgba(255,255,255,0.2)]"
            >
              
              {/* Header Visual */}
              <div className="text-xs font-mono font-bold text-yellow-400 mb-3 uppercase tracking-widest">
                  SELECT DATE
              </div>

              {/* MONTH SELECTOR */}
              <div className="mb-4 mt-4">
                <label className="block font-mono text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Target Month</label>
                <div className="grid grid-cols-4 gap-2">
                  {monthNames.map((name, i) => {
                    const mValue = i + 1;
                    const isSelected = month === mValue;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleSelect(day, mValue)}
                        className={`
                            p-2 text-xs font-bold border-2 transition-all
                            ${isSelected 
                                ? 'bg-yellow-400 text-black border-yellow-400' 
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                            }
                        `}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DAY SELECTOR */}
              <div className="mb-6">
                <label className="block font-mono text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Target Day</label>
                <div className="grid grid-cols-7 gap-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-zinc-800">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                     const isSelected = day === d;
                     return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => handleSelect(d, month)}
                          className={`
                            p-1.5 text-sm font-bold border transition-all
                            ${isSelected 
                                ? 'bg-yellow-400 text-black border-yellow-400' 
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                            }
                          `}
                        >
                          {d}
                        </button>
                     );
                  })}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-white text-black font-['Bangers'] text-xl py-2 border-2 border-black hover:bg-gray-200 transition-colors"
              >
                CONFIRM DATE
              </button>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;