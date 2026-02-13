import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Footer from '../components/ui/Footer';
import LoadingScreen from '../components/ui/LoadingScreen';

// --- SHARE MODAL COMPONENT (Re-styled) ---
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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white border-4 border-black p-6 w-full max-w-sm shadow-[12px_12px_0_#fff]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
          <div>
            <h2 className="font-['Bangers'] text-4xl leading-none">TOP SECRET</h2>
            <p className="font-mono text-xs font-bold bg-black text-white inline-block px-1">CLASSIFIED DATA</p>
          </div>
          <button onClick={onClose} className="font-mono font-bold text-xl hover:text-red-600 border-2 border-transparent hover:border-black px-2 transition-all">X</button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="p-3 border-4 border-black bg-white shadow-[6px_6px_0_#000]">
             <QRCodeSVG value={url} size={160} />
          </div>
          
          <div className="w-full">
            <p className="font-mono text-[10px] font-bold mb-1 uppercase text-gray-500 tracking-widest">Mission Access Link:</p>
            <div className="flex gap-0">
              <input 
                readOnly 
                value={url} 
                className="flex-1 border-4 border-r-0 border-black px-3 py-2 font-mono text-xs bg-gray-100 text-gray-600 outline-none"
              />
              <button 
                onClick={handleCopy}
                className={`border-4 border-black px-4 font-black font-mono text-sm transition-all ${copied ? 'bg-black text-white' : 'bg-yellow-400 hover:bg-yellow-300'}`}
              >
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- GIFT BOX COMPONENT (Enhanced) ---
const GiftBox = ({ character, name, onOpen, isLocked = true }) => {
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
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER TEXT */}
      <div className="text-center mb-8 relative">
        <h1 className="relative font-['Bangers'] text-5xl md:text-7xl text-white leading-none drop-shadow-[4px_4px_0_#000]">
          SPECIAL DROP
        </h1>
        <div className="relative inline-block bg-yellow-400 border-2 border-black px-4 py-1 transform -rotate-2 mt-2 shadow-[4px_4px_0_#000]">
           <p className="font-mono text-xs md:text-sm font-bold text-black tracking-widest uppercase">Target: {name}</p>
        </div>
      </div>

      {/* GIFT BOX */}
      <motion.div
        onClick={handleOpen}
        className={`relative ${isLocked ? "cursor-not-allowed opacity-90 grayscale-[0.5]" : "cursor-pointer"}`}
        animate={isOpening ? { rotateX: 180, opacity: 0, scale: 1.5 } : { y: [0, -15, 0] }}
        transition={isOpening ? { duration: 0.8 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={!isLocked ? { scale: 1.05, rotate: 2 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          {/* BOX BODY */}
          <div className={`absolute inset-0 border-[6px] border-black shadow-[12px_12px_0_rgba(0,0,0,0.5)] ${
            isLocked ? 'bg-zinc-600' : 'bg-red-600'
          }`} />
          
          {/* PATTERN ON BOX */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '10px 10px' }}>
          </div>

          {/* RIBBONS */}
          <div className={`absolute left-1/2 top-0 bottom-0 w-10 border-x-[3px] border-black/20 -translate-x-1/2 ${
            isLocked ? 'bg-zinc-400' : 'bg-yellow-400'
          }`} />
          <div className={`absolute top-1/2 left-0 right-0 h-10 border-y-[3px] border-black/20 -translate-y-1/2 ${
            isLocked ? 'bg-zinc-400' : 'bg-yellow-400'
          }`} />
          
          {/* INTERACTIVE INDICATOR */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             {isLocked ? (
                <div className="bg-black text-white p-2 border-2 border-white rounded-lg shadow-lg">
                    <span className="text-3xl">🔒</span>
                </div>
             ) : (
                <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center shadow-lg animate-bounce">
                    <span className="font-['Bangers'] text-black text-xl">OPEN</span>
                </div>
             )}
          </div>
        </div>
      </motion.div>

      {/* FOOTER HINT */}
      <div className="mt-10 text-center">
        {isLocked ? (
           <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 border-2 border-black">
              <span className="animate-pulse">●</span>
              <span className="font-mono text-xs font-bold uppercase">Unlock scheduled for birthday</span>
           </div>
        ) : (
           <p className="font-mono text-sm text-yellow-300 bg-black/50 px-2">Tap box to retrieve contents</p>
        )}
      </div>
    </motion.div>
  );
};

// --- VOICE NOTE COMPONENT (Tactical Style) ---
const VoiceNotePlayer = ({ characterName, name }) => {
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
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-lg mx-auto p-4"
    >
      <div className="bg-white border-4 border-black p-1 shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
        <div className="border-2 border-black border-dashed p-6 bg-yellow-50 flex flex-col items-center gap-6 relative overflow-hidden">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 font-['Bangers'] text-9xl text-yellow-200 opacity-50 -rotate-12 select-none pointer-events-none">
                AUDIO
            </div>

            <div className="text-center z-10">
                <h2 className="font-black font-mono text-xl uppercase border-b-4 border-yellow-400 inline-block mb-2">Incoming Transmission</h2>
                <p className="font-mono text-sm text-gray-600">Sender: <span className="font-bold text-black uppercase">{characterName}</span></p>
            </div>

            <motion.button
                onClick={handlePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-24 rounded-full border-4 border-black flex items-center justify-center transition-colors z-10 ${
                    isPlaying ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'
                }`}
            >
                <span className="text-4xl ml-1">{isPlaying ? '⏸' : '▶'}</span>
            </motion.button>

            <audio 
                ref={audioRef} 
                onEnded={() => setIsPlaying(false)}
                src={voiceFiles[characterName]}
            />

            <div className="w-full bg-black h-4 rounded-full overflow-hidden border-2 border-black z-10 relative">
                 {/* Fake visualizer bar */}
                <div className={`h-full bg-yellow-400 transition-all duration-1000 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`} />
            </div>
            
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">
                {isPlaying ? 'DECRYPTING AUDIO_FILE_01...' : 'WAITING FOR INPUT...'}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- MANGA TIME BOX ---
const MangaTimeBox = ({ val, label, urgent }) => (
    <div className="flex flex-col gap-1 w-full group">
        <div className={`
            relative flex items-center justify-center aspect-square md:aspect-[4/3]
            border-4 border-black transition-transform group-hover:-translate-y-1
            ${urgent ? 'bg-red-600 text-white' : 'bg-white text-black'}
            shadow-[4px_4px_0_rgba(0,0,0,1)]
        `}>
            {urgent && (
                <div className="absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 bg-yellow-400 border border-black rounded-full animate-ping" />
            )}
            <span className="font-['Bangers'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none mt-1">
            {val < 10 ? `0${val}` : val}
            </span>
            
            {/* Decorative Lines */}
            <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-current opacity-50"></div>
            <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-current opacity-50"></div>
        </div>
        <div className="bg-black text-white font-mono text-[10px] md:text-xs font-bold text-center py-1 uppercase tracking-widest border-2 border-black">
            {label}
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---
const CountdownMission = () => {
  const { name, day, month, character } = useParams();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [bgPhase, setBgPhase] = useState('calm');
  const [giftOpened, setGiftOpened] = useState(false);
  const [isCleaningData, setIsCleaningData] = useState(false);

  // Character Config
  const CHARACTER_CONFIG = {
    gojo: { img: '/avatar/Gojo_satoru.webp', filter: 'grayscale(100%) contrast(110%) brightness(0.8)', name: 'AGENT GOJO' },
    leon: { img: '/avatar/Leon_scott_keneddy.webp', filter: 'grayscale(100%) contrast(120%) brightness(0.7)', name: 'AGENT LEON' },
    levi: { img: '/avatar/levi_ackermen.webp', filter: 'grayscale(100%) contrast(120%) brightness(0.8)', name: 'CAPTAIN LEVI' },
    vanguard: { img: '/comicpanel.webp', filter: 'grayscale(100%) sepia(100%) hue-rotate(90deg)', name: 'AGENT VANGUARD' },
    chrono: { img: '/comicpanel.webp', filter: 'grayscale(100%)', name: 'AGENT CHRONO' },
    neon: { img: '/comicpanel2.webp', filter: 'grayscale(100%) contrast(120%)', name: 'AGENT NEON' }
  };
  
  const activeChar = CHARACTER_CONFIG[character] || CHARACTER_CONFIG['gojo'];

  const getPhaseData = (days) => {
    if (days === 0 && !isBirthday) return { phase: 'critical', dialog: "HOUR ZERO APPROACHING. POSITIONS!" };
    if (days > 100) return { phase: 'calm', dialog: "Long haul ahead. Conserve stamina." };
    if (days > 30)  return { phase: 'intense', dialog: "Target in sight. Lock focus." };
    if (days > 0)   return { phase: 'critical', dialog: "CRITICAL! Time is running out!" };
    return { phase: 'finished', dialog: "Mission Complete." };
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

  const location = useLocation();
  const isFromLoading = location.state?.fromLoading;
  const phaseData = timeLeft ? getPhaseData(timeLeft.totalDays) : { dialog: "..." };

  // Use the LoadingScreen component we defined earlier
  if (!timeLeft) return <LoadingScreen text="SYNCING MISSION DATA..." />;
  if (isCleaningData) return <LoadingScreen text="CLEANING DATA..." />;

  const containerVariants = {
    initial: isFromLoading ? { opacity: 0 } : { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0 }
  };

  const handleReturnHome = () => {
    setIsCleaningData(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 font-sans">
      <motion.button
        onClick={handleReturnHome}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ x: 5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-3 left-3 md:top-6 md:left-6 z-50 group origin-top-left"
      >
        <div className="relative bg-yellow-400 border-2 md:border-4 border-black px-4 py-1.5 md:px-6 md:py-2 shadow-[2px_2px_0_#000] md:shadow-[6px_6px_0_#000] hover:shadow-[4px_4px_0_#000] md:hover:shadow-[8px_8px_0_#000] transition-all transform -skew-x-12">
          <div className="hidden md:block absolute top-0 right-0 w-3 h-3 bg-black transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-2 h-2 bg-black transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="flex items-center gap-2 md:gap-3 transform skew-x-12">
            <div className="bg-black text-white rounded-full w-5 h-5 md:w-8 md:h-8 flex items-center justify-center border-2 border-white/20 group-hover:rotate-180 transition-transform duration-500">
              <span className="font-mono font-bold text-xs md:text-lg mb-0.5">{'<'}</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-['Bangers'] text-lg md:text-2xl tracking-widest text-black group-hover:text-red-600 transition-colors">
                RETURN TO CREATE AGAIN
              </span>
              <span className="font-mono text-[7px] md:text-[9px] font-bold bg-black text-white px-1 mt-0.5 md:mt-1">
                SYSTEM.NAV
              </span>
            </div>
          </div>
        </div>
      </motion.button>
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-screen"
      >
        
        {/* --- LEFT PANEL: MISSION BRIEF (Desktop: Col 1-5, Mobile: Order 2) --- */}
        <div className="lg:col-span-5 order-2 lg:order-1 bg-white border-r-0 lg:border-r-8 border-black flex flex-col relative z-20">
            {/* Sticky Header Strip */}
            <div className="bg-black text-white p-4 flex justify-end items-center sticky top-0 z-30 shadow-md">
                <div className="font-mono text-xs font-bold text-gray-400 tracking-widest">
                    CASE_FILE_#{day}{month}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12 flex flex-col h-full justify-center">
                
                {/* Stamp / Title */}
                <div className="mb-8 border-4 border-black inline-block p-4 transform -rotate-1 self-start shadow-[8px_8px_0_#000] bg-white">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest bg-black text-white px-1 mb-1 inline-block">Target Identity</p>
                    <h1 className="font-['Bangers'] text-6xl md:text-7xl leading-none text-black uppercase break-all">
                        {name}
                    </h1>
                </div>

                {/* Status Report Box */}
                <div className="bg-gray-50 border-l-8 border-black p-6 mb-10 relative shadow-inner">
                    <div className="absolute -top-3 left-4 bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                        Agent Report // {activeChar.name}
                    </div>
                    <p className="font-serif italic font-bold text-2xl md:text-3xl text-gray-800 leading-tight">
                        "{phaseData.dialog}"
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${timeLeft.totalDays === 0 ? 'bg-red-600 animate-ping' : 'bg-green-500'}`}></div>
                        <span className="font-mono text-xs font-bold text-gray-500 uppercase">
                            {timeLeft.totalDays === 0 ? 'STATUS: CRITICAL' : 'STATUS: MONITORING'}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    <button 
                        onClick={() => setShowShare(true)}
                        className="group w-full relative bg-yellow-400 h-16 border-4 border-black transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_#000] active:translate-y-0 active:shadow-none"
                    >
                        <div className="absolute inset-0 flex items-center justify-center font-['Bangers'] text-2xl tracking-wide gap-2 group-hover:gap-4 transition-all z-10">
                            <span>RECRUIT AGENTS</span>
                            <span className="text-xl">➔</span>
                        </div>
                        {/* Striped pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)] pointer-events-none"></div>
                    </button>
                    <p className="text-center font-mono text-[10px] text-gray-400 mt-3 uppercase">
                        Secure line encrypted • Do not distribute to civilians
                    </p>
                </div>
            </div>
        </div>

        {/* --- RIGHT PANEL: VISUAL & COUNTDOWN (Desktop: Col 6-12, Mobile: Order 1) --- */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative bg-neutral-900 overflow-hidden min-h-[50vh] flex flex-col">
            
            {/* Dynamic Background Image */}
            <AnimatePresence mode='wait'>
                <motion.div 
                    key={bgPhase}
                    className="absolute inset-0 bg-cover bg-center"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 1 }}
                    style={{ 
                        backgroundImage: `url('${activeChar.img}')`,
                        filter: `${bgPhaseColors[bgPhase]} ${character === 'vanguard' ? 'hue-rotate(90deg)' : ''}`
                    }}
                />
            </AnimatePresence>

            {/* Overlays for Texture/Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_1px,transparent_1px)] bg-[length:4px_4px] opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            
            {/* Content Layer */}
            <div className="relative z-10 flex-grow flex flex-col justify-center items-center p-6 md:p-12 w-full">
                
                {/* Main Interactive Content (Gift/Audio) */}
                <div className="w-full flex-grow flex items-center justify-center">
                    {isBirthday && giftOpened ? (
                        <VoiceNotePlayer characterName={character} name={name} />
                    ) : isBirthday && !giftOpened ? (
                        <GiftBox character={character} name={name} onOpen={() => setGiftOpened(true)} isLocked={false} />
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="scale-75 md:scale-100 mb-8 md:mb-0">
                                <GiftBox character={character} name={name} onOpen={() => {}} isLocked={true} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Countdown Timer (Only visible before birthday) */}
                {!isBirthday && (
                    <div className="w-full max-w-3xl mx-auto mt-4 md:mt-8">
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            <MangaTimeBox val={timeLeft.totalDays} label="DAYS" urgent={timeLeft.totalDays < 7} />
                            <MangaTimeBox val={timeLeft.hours} label="HOURS" />
                            <MangaTimeBox val={timeLeft.minutes} label="MINS" />
                            <MangaTimeBox val={timeLeft.seconds} label="SECS" urgent={true} />
                        </div>
                    </div>
                )}
            </div>
        </div>

      </motion.div>

      <AnimatePresence>
        {showShare && <ShareModal url={window.location.href} onClose={() => setShowShare(false)} />}
      </AnimatePresence>

      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
};

export default CountdownMission;