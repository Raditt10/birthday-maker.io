import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// --- SHARE MODAL COMPONENT ---
const ShareModal = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, rotate: -2 }} animate={{ scale: 1, rotate: 0 }}
        className="bg-white border-4 border-black p-6 md:p-8 max-w-sm w-full shadow-[8px_8px_0_rgba(255,255,255,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
          <h2 className="font-['Bangers'] text-3xl">TOP SECRET DATA</h2>
          <button onClick={onClose} className="font-mono font-bold text-xl hover:text-red-600">X</button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="p-4 border-4 border-black bg-white shadow-[4px_4px_0_#000]">
             <QRCodeSVG value={url} size={150} />
          </div>
          
          <div className="w-full">
            <p className="font-mono text-xs font-bold mb-1 uppercase text-gray-500">Mission Link:</p>
            <div className="flex gap-2">
              <input 
                readOnly 
                value={url} 
                className="flex-1 border-2 border-black px-2 py-1 font-mono text-sm bg-gray-100"
              />
              <button 
                onClick={handleCopy}
                className={`border-2 border-black px-3 font-bold font-mono transition-all ${copied ? 'bg-black text-white' : 'bg-yellow-400 hover:bg-yellow-300'}`}
              >
                {copied ? 'OK!' : 'COPY'}
              </button>
            </div>
          </div>
          
          <p className="font-mono text-[10px] text-center text-gray-500 italic">
            "Scan this code to recruit more agents for the celebration."
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- OPTIMIZED PLACEHOLDER COMPONENTS ---
const PlaceholderWish = ({ name }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center p-4 md:p-8 border-4 border-white bg-black/60 backdrop-blur-md"
  >
    <h1 className="font-['Bangers'] text-4xl md:text-6xl text-white mb-2 leading-none">MISSION ACCOMPLISHED!</h1>
    <p className="font-mono text-lg md:text-2xl font-bold text-yellow-400 mb-4 tracking-tighter">HAPPY BIRTHDAY, {name}!</p>
    <div className="font-['Bangers'] text-7xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse">BOOM!</div>
  </motion.div>
);

const PlaceholderShare = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-black text-white font-['Bangers'] text-xl py-4 border-2 border-black hover:bg-white hover:text-black transition-all active:scale-95 shadow-[6px_6px_0_rgba(0,0,0,0.2)]"
  >
    GET LINK & BARCODE COUNTDOWN
  </button>
);

const CountdownMission = () => {
  const { name, day, month, character } = useParams();
  const [showShare, setShowShare] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [bgPhase, setBgPhase] = useState('calm');

  // Character Config
  const CHARACTER_CONFIG = {
    gojo: { img: '/avatar/Gojo_satoru.webp', filter: 'grayscale(100%) contrast(110%) brightness(0.8)', name: 'AGENT GOJO' },
    leon: { img: '/avatar/Leon_scott_keneddy.webp', filter: 'grayscale(100%) contrast(120%) brightness(0.7)', name: 'AGENT LEON' },
    levi: { img: '/avatar/levi_ackermen.webp', filter: 'grayscale(100%) contrast(120%) brightness(0.8)', name: 'CAPTAIN LEVI' },
    // Fallbacks for old links
    vanguard: { img: '/comicpanel.webp', filter: 'grayscale(100%) sepia(100%) hue-rotate(90deg)', name: 'AGENT VANGUARD' },
    chrono: { img: '/comicpanel.webp', filter: 'grayscale(100%)', name: 'AGENT CHRONO' },
    neon: { img: '/comicpanel2.webp', filter: 'grayscale(100%) contrast(120%)', name: 'AGENT NEON' }
  };
  // Fallback to 'gojo' if character not found or old link uses 'chrono'
  const activeChar = CHARACTER_CONFIG[character] || CHARACTER_CONFIG['gojo'];

  const getPhaseData = (days) => {
    if (days === 0 && !isBirthday) return { phase: 'critical', dialog: "Tinggal hitungan jam! Semuanya siap di posisi?!" };
    if (days > 100) return { phase: 'calm', dialog: "Perjalanan masih panjang. Hemat energimu." };
    if (days > 30)  return { phase: 'intense', dialog: "Target mulai terlihat di radar. Fokus!" };
    if (days > 0)   return { phase: 'critical', dialog: "YABAI! Waktunya hampir habis! KEMERIAHAN MAKSIMAL!" };
    return { phase: 'finished', dialog: "Misi Selesai." };
  };

  const bgPhaseColors = {
    calm: 'grayscale(100%) brightness(0.4)',
    intense: 'grayscale(100%) contrast(120%) brightness(0.5)',
    critical: 'grayscale(100%) contrast(150%) sepia(40%) brightness(0.3)',
    finished: 'grayscale(0%)'
  };

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day));
      if (now > target) target.setFullYear(now.getFullYear() + 1);
      
      const isToday = now.getDate() === parseInt(day) && now.getMonth() === parseInt(month) - 1;
      setIsBirthday(isToday);

      const diff = target - now;
      const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      setTimeLeft({
        totalDays: daysLeft,
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });

      setBgPhase(getPhaseData(daysLeft).phase);
    };
    
    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [day, month]);

  if (!timeLeft) return <div className="h-screen bg-black flex items-center justify-center text-white font-mono animate-pulse">SYNCHRONIZING...</div>;

  const location = useLocation();
  const isFromLoading = location.state?.fromLoading;

  const comicVariants = {
    initial: isFromLoading 
      ? { opacity: 1, x: '0%', scale: 1 } 
      : { x: '50%', opacity: 0, scale: 0.9 },
    animate: { 
      x: '0%', 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] } 
    },
    exit: { 
      x: '-50%', 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.4, 0.0, 1, 1] } 
    }
  };

  const phaseData = getPhaseData(timeLeft.totalDays);

  return (
    <motion.div 
      variants={comicVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-screen md:h-screen md:flex-row bg-white overflow-x-hidden md:overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
    >
      
      {/* --- PANEL VISUAL (TOP on Mobile, RIGHT on Desktop) --- */}
      <AnimatePresence mode='wait'>
        <motion.div 
            key={bgPhase}
            className="relative flex-1 flex flex-col justify-center overflow-hidden min-h-[45vh] md:min-h-screen order-1 md:order-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
        >
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000 scale-105"
              style={{ 
                backgroundImage: `url('${activeChar.img}')`,
                filter: `${bgPhaseColors[bgPhase]} ${character === 'vanguard' ? 'hue-rotate(90deg)' : ''}`
              }}
            >
                <div className="absolute inset-0 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-color-dodge animate-pulse"></div>
            </div>
            
            <div className="absolute inset-0 z-[1] opacity-25 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)',
                backgroundSize: '4px 4px'
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

            <div className="relative z-20 p-4 md:p-12 w-full mt-auto mb-8 md:my-auto">
            {isBirthday ? (
                <PlaceholderWish name={name} />
            ) : (
                <div className="w-full max-w-4xl mx-auto">
                    <div className="grid grid-cols-4 gap-2 md:gap-4 px-2">
                        <MangaTimeBox val={timeLeft.totalDays} label="DAYS" urgent={timeLeft.totalDays < 7} />
                        <MangaTimeBox val={timeLeft.hours} label="HRS" />
                        <MangaTimeBox val={timeLeft.minutes} label="MIN" />
                        <MangaTimeBox val={timeLeft.seconds} label="SEC" urgent={true} />
                    </div>
                </div>
            )}
            </div>
        </motion.div>
      </AnimatePresence>

      {/* --- PANEL INFO (BOTTOM on Mobile, LEFT on Desktop) --- */}
      <div className="relative z-30 flex-none w-full md:w-[380px] lg:w-[450px] bg-white border-t-8 md:border-t-0 md:border-r-8 border-black p-6 md:p-10 flex flex-col justify-between order-2 md:order-1 min-h-[50vh] h-auto md:h-screen">
        <div className="space-y-6">
            <Link to="/" className="group inline-flex items-center text-black font-mono font-black text-xs md:text-sm no-underline mb-2">
              <span className="bg-black text-white px-2 py-1 mr-2 group-hover:bg-red-600 transition-colors">← ABORT</span> MISSION_LOG
            </Link>
            
            <div className="overflow-hidden">
              <div className="font-mono text-[10px] font-bold tracking-[0.3em] bg-black text-white inline-block px-2 py-0.5 mb-2">TARGET_NAME</div>
              <h2 className="font-['Bangers'] text-5xl md:text-7xl leading-none text-black uppercase break-all">
                {name}
              </h2>
            </div>
            
            <div className="w-full h-2 bg-black"></div>

            <div className="bg-gray-50 border-l-8 border-black p-4 md:p-6 shadow-inner">
              <div className="font-mono text-[10px] font-bold tracking-widest text-gray-400 mb-2 underline uppercase">
                 INCOMING_MSG // {activeChar.name}
              </div>
              <p className="italic font-black text-lg md:text-2xl leading-tight text-black">
                 "{phaseData.dialog}"
              </p>
            </div>
        </div>
        
        <div className="pt-6">
           <PlaceholderShare onClick={() => setShowShare(true)} />
           <div className="mt-4 flex justify-between font-mono text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
             <span>System: Active</span>
             <span>Ref: 00-BDAY-2026</span>
           </div>
        </div>

        <AnimatePresence>
          {showShare && <ShareModal url={window.location.href} onClose={() => setShowShare(false)} />}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

const MangaTimeBox = ({ val, label, urgent }) => (
  <div className={`
    relative flex flex-col items-center justify-center py-3 md:py-6 px-1 border-2 md:border-4 
    ${urgent ? 'bg-black text-white border-white' : 'bg-black/70 text-white border-white backdrop-blur-md'}
    shadow-[4px_4px_0_rgba(255,255,255,0.2)] transition-transform active:scale-95
  `}>
    <div className="font-['Bangers'] text-3xl sm:text-4xl md:text-6xl lg:text-8xl leading-none mb-1">
      {val < 10 ? `0${val}` : val}
    </div>
    <div className="font-mono text-[9px] md:text-xs font-bold tracking-[0.2em] border-t border-white/30 pt-1 w-[80%] text-center opacity-80 uppercase">
        {label}
    </div>
    {urgent && (
      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] md:text-[10px] px-1 font-bold animate-bounce border border-black">
        !
      </div>
    )}
  </div>
);

export default CountdownMission;