import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Footer from '../components/ui/Footer';
import LoadingScreen from '../components/ui/LoadingScreen';
import BackButton from '../components/ui/BackButton';

// --- PERSONA 5 CONSTANTS ---
const P5_BLACK = "#101010";

// --- UTILS: JAGGED EDGE SVG ---
const JaggedEdge = ({ className }) => (
  <div className={`overflow-hidden w-full h-3 sm:h-4 ${className}`}>
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
      <polygon points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 100,10 0,10" fill="currentColor" />
    </svg>
  </div>
);

// --- P5 STAR ICON ---
const P5Star = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

// --- CALLING CARD (SHARE MODAL) ---
const CallingCardModal = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ rotate: -10, scale: 0.5, y: 100 }} 
        animate={{ rotate: -2, scale: 1, y: 0 }}
        exit={{ rotate: 10, scale: 0.5, y: 100 }}
        className="relative w-full max-w-[320px] sm:max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Card Body */}
        <div className="bg-black p-1 shadow-[10px_10px_0_rgba(0,0,0,0.8)] sm:shadow-[20px_20px_0_rgba(0,0,0,0.8)] transform skew-x-[-3deg]">
          <div className="bg-black border-2 sm:border-4 border-white p-4 sm:p-6 flex flex-col items-center relative overflow-hidden">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20" 
                 style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '10px 10px'}}>
            </div>

            {/* Calling Card Header */}
            <div className="bg-yellow-400 text-black font-['Bangers'] text-xl sm:text-4xl px-3 py-1 -rotate-2 border-2 border-black absolute -top-3 sm:-top-4 -left-3 sm:-left-4 shadow-[3px_3px_0_#fff]">
              TAKE YOUR HEART
            </div>

            <h2 className="text-white font-mono font-bold mt-5 sm:mt-6 mb-3 text-center tracking-widest uppercase text-xs sm:text-base">
              SECRET INVITATION LINK
            </h2>

            <div className="bg-white p-2 transform rotate-1 border-2 sm:border-4 border-black mb-4">
              <QRCodeSVG value={url} size={130} fgColor={P5_BLACK} bgColor="#ffffff" className="sm:w-[150px] sm:h-[150px]" />
            </div>

            <div className="w-full flex flex-col gap-2">
              <input 
                readOnly 
                value={url} 
                className="w-full bg-neutral-900 border border-white text-yellow-400 font-mono text-xs p-2 outline-none text-center"
              />
              <button 
                onClick={handleCopy}
                className={`w-full py-2 font-black font-sans uppercase border-2 border-white transition-all text-sm ${copied ? 'bg-white text-black' : 'bg-black text-white active:bg-yellow-400 active:text-black'}`}
              >
                {copied ? 'STOLEN!' : 'COPY LINK'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Close Button X */}
        <button onClick={onClose} className="absolute -top-10 -right-2 text-white font-['Bangers'] text-4xl drop-shadow-[4px_4px_0_#000] active:scale-90 transition-transform">
          X
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- P5 GIFT BOX ---
const PhantomGiftBox = ({ character, name, onOpen, isLocked = true }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isLocked) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <motion.div 
      className="relative group scale-90 sm:scale-100"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-64 text-center z-10 px-2 pointer-events-none">
        <div className="bg-black text-white px-2 py-1 transform -skew-x-12 border-2 border-yellow-400 shadow-[4px_4px_0_#000]">          
            <p className="font-['Bangers'] text-lg sm:text-xl tracking-wider transform skew-x-12 truncate">TARGET: {name}</p>
        </div>
      </div>

      <motion.div
        onClick={handleOpen}
        className={`relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 flex items-center justify-center ${isLocked ? "cursor-not-allowed grayscale" : "cursor-pointer"}`}
        animate={isOpening ? { rotate: [0, -10, 10, -10, 0], scale: 1.2, opacity: 0 } : { y: [0, -10, 0] }}
        transition={isOpening ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={!isLocked ? { scale: 1.05, rotate: -2 } : {}}
      >
        <div className={`w-full h-full bg-black border-2 sm:border-4 border-white relative shadow-[6px_6px_0_#000] sm:shadow-[10px_10px_0_#000] transform rotate-3`}>
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'repeating-linear-gradient(135deg, #333, #333 10px, transparent 10px, transparent 20px)'}} />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-full h-6 sm:h-8 bg-yellow-400 border-y-2 border-black absolute transform -rotate-3"></div>
             <div className="h-full w-6 sm:w-8 bg-yellow-400 border-x-2 border-black absolute transform -rotate-3"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
             {isLocked ? (
                <div className="bg-white p-2 border-2 border-black transform rotate-45 shadow-[4px_4px_0_#000]">
                   <div className="transform -rotate-45 font-black text-black text-2xl">🔒</div>
                </div>
             ) : (
                <div className="bg-yellow-400 text-black px-3 py-2 font-['Bangers'] text-xl border-2 border-black transform -rotate-6 animate-pulse shadow-[5px_5px_0_#000]">
                   OPEN ME!
                </div>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- P5 VOICE PLAYER ---
const PhantomAudio = ({ characterName, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const voiceFiles = {
    gojo: '/voices/gojo_birthday.mp3',
    leon: '/voices/leon_birthday.mp3',
    levi: '/voices/levi_birthday.mp3',
    eren_jaeger: '/voices/eren_jaeger_birthday.mp3'
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm sm:max-w-lg mx-auto p-2 sm:p-4">
      <div className="bg-black p-1 transform -rotate-1 shadow-[6px_6px_0_#000] sm:shadow-[10px_10px_0_#000]">
        <div className="border-2 border-white p-4 bg-neutral-900 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-between opacity-20 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className={`w-1 bg-yellow-400 h-full transform skew-x-12`} />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-white font-['Bangers'] text-2xl mb-4 tracking-wide text-center">
                    CONFIDENTIAL AUDIO
                </h3>
                
                <motion.button
                    onClick={handlePlay}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 flex items-center justify-center border-4 border-white transition-all ${isPlaying ? 'bg-yellow-400' : 'bg-black'} shadow-[4px_4px_0_#fff]`}
                >
                    {isPlaying ? (
                        <div className="flex gap-2"><div className="w-2 h-6 bg-white" /><div className="w-2 h-6 bg-white" /></div>
                    ) : (
                         <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    )}
                </motion.button>
                
                <div className="mt-4 w-full bg-gray-800 h-2 skew-x-[-20deg] border border-gray-600">
                    <motion.div 
                        className="h-full bg-yellow-400"
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 10, ease: "linear" }}
                    />
                </div>
                
                <p className="mt-2 text-yellow-400 font-mono text-[10px] font-bold bg-black px-2">
                    SENDER: {characterName.toUpperCase()}
                </p>
                <audio ref={audioRef} onEnded={() => setIsPlaying(false)} src={voiceFiles[characterName]} />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- P5 CLOCK COMPONENT (RESPONSIVE) ---
const PersonaClock = ({ val, label, urgent }) => (
    <div className={`relative group transform ${urgent ? 'scale-105' : ''}`}>
        <div className={`
            bg-black text-white border-2 sm:border-4 border-white
            p-2 sm:p-4 min-w-[65px] xs:min-w-[75px] sm:min-w-[100px]
            flex flex-col items-center justify-center
            shadow-[4px_4px_0_#000] sm:shadow-[8px_8px_0_#000]
            ${urgent ? 'animate-pulse border-yellow-400 text-yellow-400' : ''}
        `}
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
        >
            <span className="font-['Bangers'] text-3xl sm:text-6xl md:text-7xl leading-none tracking-tighter drop-shadow-md">
                {val < 10 ? `0${val}` : val}
            </span>
            <span className="bg-white text-black font-black font-sans text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 uppercase tracking-widest transform -skew-x-12 mt-1">
                {label}
            </span>
        </div>
    </div>
);

// --- MAIN PAGE ---
const CountdownMission = () => {
  const { name, day, month, character } = useParams();
  const [showShare, setShowShare] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  // Character Data
  const CHARACTER_CONFIG = {
    gojo: { img: '/avatar/Gojo_satoru.webp', name: 'SATORU GOJO' },
    leon: { img: '/avatar/Leon_scott_keneddy.webp', name: 'LEON KENNEDY' },
    levi: { img: '/avatar/levi_ackermen.webp', name: 'LEVI ACKERMAN' },
    vanguard: { img: '/comicpanel.webp', name: 'VANGUARD' },
    chrono: { img: '/comicpanel.webp', name: 'CHRONO' },
    neon: { img: '/comicpanel2.webp', name: 'NEON' }
  };
  
  const activeChar = CHARACTER_CONFIG[character] || CHARACTER_CONFIG['gojo'];

  const getPhaseData = (days) => {
    if (days === 0 && !isBirthday) return { dialog: "IT'S SHOWTIME! THE MOMENT IS NOW!" };
    if (days > 100) return { dialog: "Still a long way to go. Don't let your guard down." };
    if (days > 30)  return { dialog: "The deadline approaches. Prepare yourself." };
    if (days > 0)   return { dialog: "Only a few days left! Are you ready to steal the show?" };
    return { dialog: "Mission Complete. Happy Birthday." };
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
    };
    
    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [day, month]);

  const phaseData = timeLeft ? getPhaseData(timeLeft.totalDays) : { dialog: "..." };

  if (!timeLeft) return <LoadingScreen text="INFILTRATING..." />;

  // --- HANDLE BACK BUTTON ---
  // Kita inject fungsi back ke button jika ingin ada efek loading, 
  // tapi BackButton di halaman ini sudah default link to="/" yang oke.
  // Jika ingin custom back, bisa gunakan onClick dan logic loading.

  return (
    <div className="flex flex-col min-h-[100dvh] bg-zinc-900 font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      
      {/* --- BACKGROUND GRAPHICS --- */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      </div>

      <BackButton to="/" label="BACK" />

      {/* --- MAIN LAYOUT: Mobile Stacked, Desktop Grid --- */}
      <motion.div 
        className="flex-grow flex flex-col lg:grid lg:grid-cols-12 relative z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      >
        
        {/* --- RIGHT PANEL (VISUALS) - Show FIRST on Mobile --- */}
        <div className="lg:col-span-7 lg:order-2 relative flex flex-col items-center justify-center min-h-[45vh] sm:min-h-[50vh] lg:min-h-screen p-4 pt-16 lg:p-8 overflow-hidden">
            
            {/* Character Background Splash */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center mix-blend-luminosity grayscale contrast-125" 
                    style={{backgroundImage: `url('${activeChar.img}')`}}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900 lg:bg-gradient-to-l"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl px-2">
                
                {/* Visualizer / Gift Area */}
                <div className="mb-6 sm:mb-10 flex justify-center">
                    {isBirthday ? (
                         giftOpened ? (
                             <PhantomAudio characterName={character} name={name} />
                         ) : (
                             <PhantomGiftBox character={character} name={name} onOpen={() => setGiftOpened(true)} isLocked={false} />
                         )
                    ) : (
                        <PhantomGiftBox character={character} name={name} isLocked={true} />
                    )}
                </div>

                {/* --- COUNTDOWN ALIGNMENT FIX --- */}
                {!isBirthday && (
                    <div className="w-full flex justify-center mt-4">
                        {/* Logic:
                            - Mobile (default): grid grid-cols-2 -> 2 kotak atas, 2 kotak bawah
                            - Desktop (sm/lg): flex flex-row -> semua sejajar
                        */}
                        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:items-center sm:justify-center sm:gap-6 lg:gap-8 transform -rotate-2">
                            
                            <PersonaClock val={timeLeft.totalDays} label="DAYS" />
                            <PersonaClock val={timeLeft.hours} label="HRS" />
                            
                            {/* Divider only on larger screens */}
                            <div className="hidden sm:block w-px h-16 sm:h-20 bg-yellow-400 transform rotate-12 mx-2"></div>
                            
                            <PersonaClock val={timeLeft.minutes} label="MIN" />
                            <PersonaClock val={timeLeft.seconds} label="SEC" urgent={true} />
                            
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* --- LEFT PANEL (TEXT/ACTION) - Show SECOND on Mobile --- */}
        <div className="lg:col-span-5 lg:order-1 flex flex-col justify-center p-4 pb-20 sm:p-8 lg:p-12 relative z-20 space-y-6 sm:space-y-10">
            
            {/* CHARACTER DIALOGUE BOX */}
            <div className="relative mt-4 sm:mt-0">
                <div className="w-20 h-20 sm:w-32 sm:h-32 absolute -top-8 sm:-top-16 -left-2 sm:left-0 z-20 drop-shadow-lg transform -rotate-6">
                     <img src={`/chibi/chibi_${character}.webp`} alt={character} className="w-full h-full object-contain filter grayscale contrast-125" />
                </div>

                <div className="bg-black border-2 sm:border-4 border-white p-4 pt-10 sm:pt-14 sm:pl-28 shadow-[5px_5px_0_rgba(0,0,0,0.5)] sm:shadow-[10px_10px_0_#000] transform -rotate-1 relative z-10">
                    <div className="text-gray-400 font-mono text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-widest border-b border-gray-600 pb-1">
                        PHANTOM THIEF // {activeChar.name}
                    </div>
                    <p className="text-white font-['Bangers'] text-xl sm:text-3xl tracking-wide leading-tight">
                        "{phaseData.dialog}"
                    </p>
                    <P5Star className="absolute right-2 bottom-2 w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
            </div>

            {/* TARGET INFO */}
            <div>
                <div className="inline-block bg-white text-black px-3 py-0.5 transform skew-x-[-10deg] border-2 border-black mb-2">
                    <span className="font-mono font-black text-xs uppercase transform skew-x-[10deg]">Current Target</span>
                </div>
                <h1 className="font-['Bangers'] text-5xl xs:text-6xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] drop-shadow-[3px_3px_0_#000] transform -rotate-2 break-words">
                    {name}
                </h1>
            </div>

            {/* ACTION BUTTON */}
            <button 
                onClick={() => setShowShare(true)}
                className="group relative w-full h-16 sm:h-20 bg-black border-2 sm:border-4 border-black overflow-hidden shadow-[4px_4px_0_#fff] active:translate-y-1 active:shadow-none transition-all"
            >
                <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12 origin-bottom-left"></div>
                <div className="relative z-10 flex items-center justify-center h-full gap-3">
                    <span className="font-['Bangers'] text-2xl sm:text-3xl text-white group-hover:text-black tracking-widest transition-colors">
                        SEND CALLING CARD
                    </span>
                    <P5Star className="w-5 h-5 text-white group-hover:text-black group-hover:rotate-180 transition-all duration-500" />
                </div>
            </button>
        </div>

      </motion.div>

      <AnimatePresence>
        {showShare && <CallingCardModal url={window.location.href} onClose={() => setShowShare(false)} />}
      </AnimatePresence>

      <div className="relative z-50 bg-black text-white border-t-2 sm:border-t-4 border-yellow-400 mt-auto">
         <JaggedEdge className="text-yellow-400 -mt-2 sm:-mt-3 absolute top-0 w-full" />
         <Footer />
      </div>
    </div>
  );
};

export default CountdownMission;