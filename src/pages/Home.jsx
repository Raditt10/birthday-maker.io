import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MangaLayout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/ui/LoadingScreen';
import SearchBar from '../components/ui/SearchBar';
import Footer from '../components/ui/Footer';
import CustomToast from '../components/ui/Warning';
import DatePicker from '../components/ui/DatePicker';
import { CHARACTERS } from '../data/characters';

// --- KOMPONEN: MISSION BRIEFING (DENGAN VIDEO BACKGROUND) ---
const MissionBriefing = ({ onStart }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // --- LOGIC CHROMA KEY (Sama seperti LoadingScreen) ---
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrameId;

    const processFrame = () => {
      if (!video || !canvas || video.paused || video.ended) {
         animationFrameId = requestAnimationFrame(processFrame);
         return;
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      // Sync size
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw original frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Chroma Key Logic (Green Screen Removal)
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Threshold adjustment for green screen
          if (g > 90 && g > r * 1.4 && g > b * 1.4) {
            data[i + 3] = 0; // Set Alpha to 0
          }
        }
        ctx.putImageData(frame, 0, 0);
      } catch (e) {
        // Ignore cross-origin issues
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    if (video) {
        video.addEventListener('play', processFrame);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if(video) video.removeEventListener('play', processFrame);
    };
  }, []);

  const steps = [
    { id: "01", title: "IDENTIFY TARGET", desc: "Input the codename (name) of your target." },
    { id: "02", title: "SET TIMEFRAME", desc: "Specify the exact date of the event." },
    { id: "03", title: "SELECT AGENT", desc: "Choose a Phantom Thief to deliver the message." },
    { id: "04", title: "SEND CARD", desc: "Execute the mission and share the link." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full h-full flex flex-col justify-center overflow-hidden py-10"
    >
      
      {/* --- VIDEO BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen">
         {/* Hidden Source Video */}
         <video 
            ref={videoRef}
            src="/loading.mp4" 
            autoPlay loop muted playsInline
            crossOrigin="anonymous"
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlay={() => setIsVideoLoaded(true)}
            className="absolute opacity-0 w-1 h-1"
         />
         {/* Canvas Output */}
         <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover opacity-60"
         />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
          <div className="mb-6 border-l-[8px] border-yellow-400 pl-4">
             <span className="bg-black text-yellow-400 font-mono text-[10px] px-2 py-0.5 font-bold tracking-widest uppercase transform -skew-x-12 inline-block mb-1 shadow-[2px_2px_0_#fff]">
                Top Secret
             </span>
             <h2 className="font-['Bangers'] text-5xl sm:text-6xl text-white leading-none drop-shadow-[4px_4px_0_#000]">
               MISSION<br/>BRIEFING
             </h2>
          </div>

          <div className="space-y-4 mb-8 bg-black/40 p-4 border border-zinc-700 backdrop-blur-sm">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group cursor-default"
              >
                <div className="font-['Bangers'] text-3xl text-zinc-600 group-hover:text-yellow-400 transition-colors">
                  {step.id}
                </div>
                <div>
                  <h4 className="font-['Bangers'] text-xl text-white group-hover:text-yellow-400 transition-colors tracking-wide">
                    {step.title}
                  </h4>
                  <p className="font-mono text-[10px] sm:text-xs text-zinc-400 group-hover:text-zinc-200 border-l border-zinc-600 pl-2 mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-400 text-black font-['Bangers'] text-2xl sm:text-3xl py-4 border-2 border-black shadow-[4px_4px_0_#fff] hover:shadow-[6px_6px_0_#fff] hover:bg-yellow-300 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ACCEPT MISSION <span className="text-xl">►</span>
            </span>
            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-300 skew-x-12 origin-left"></div>
          </motion.button>

          <div className="mt-4 text-center opacity-50">
             <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                // By accepting, you agree to the Phantom Thieves Protocol //
             </p>
          </div>
      </div>
    </motion.div>
  );
};


// --- MAIN COMPONENT: HOME ---
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State Form
  const [formData, setFormData] = useState({ name: '', day: '', month: '', character: 'gojo' });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('GENERATE...');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  // State untuk Intro/Briefing
  const [showIntro, setShowIntro] = useState(true);

  // --- LOGIC PENGEMBALIAN DATA & INTRO SKIP ---
  useEffect(() => {
    const state = location.state;

    // Jika ada state (artinya user kembali dari halaman lain), kita SKIP intro
    // dan langsung tampilkan form dengan data yang tersimpan.
    if (state) {
      setShowIntro(false); // Skip intro jika kembali dari Roster

      setFormData(prev => {
        // 1. Prioritaskan data yang dikirim balik (savedFormData)
        const baseData = state.savedFormData ? { ...state.savedFormData } : { ...prev };

        // 2. Jika ada karakter baru, update
        if (state.selectedCharacter) {
          baseData.character = state.selectedCharacter;
        }

        return baseData;
      });
    }
  }, [location.state]);

  const filteredCharacters = CHARACTERS.filter(char => 
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    char.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { showToast("TARGET NAME IS REQUIRED!"); return; }
    if (!formData.day) { showToast("MISSING DAY PARAMETER!"); return; }
    if (!formData.month) { showToast("MISSING MONTH PARAMETER!"); return; }
    
    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    if (day < 1 || day > 31) { showToast("INVALID DAY!"); return; }
    if (month < 1 || month > 12) { showToast("INVALID MONTH!"); return; }

    setLoadingText('INFILTRATING...');
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/mission/${formData.name}/${formData.day}/${formData.month}/${formData.character}`, { state: { fromLoading: true } });
    }, 2000);
  };

  const handleDisplayAll = () => {
    setLoadingText('ACCESSING DATABASE...');
    setIsLoading(true);
    setTimeout(() => {
        // Kirim formData saat ini agar tidak hilang saat kembali
        navigate('/characters', { state: { formData: formData } }); 
    }, 1500);
  }

  // Animasi Varian
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full selection:bg-yellow-400 selection:text-black"
    >
      <MangaLayout 
        sidePanelContent={
          <div className="w-full h-full flex flex-col items-center justify-center relative z-20">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1, rotate: [-1, 1, -1] }}
               transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
               className="text-center transform md:scale-110"
            >
              <h1 className="font-['Bangers'] text-6xl xs:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[4px_4px_0_#000] leading-[0.85] tracking-tighter stroke-black">
                BIRTHDAY<br/><span className="text-yellow-400">MAKER</span>
              </h1>
              <div className="mt-4 transform -skew-x-12 inline-block">
                  <span className="font-mono bg-white text-black text-xs md:text-sm font-bold px-3 py-1 border-2 border-black shadow-[4px_4px_0_#000]">
                    v0.1.0 // PHANTOM THIEVES
                  </span>
              </div>
            </motion.div>
          </div>
        }
      >
      
      <div className="w-full max-w-xl mx-auto relative px-5 py-8 lg:py-0 min-h-[500px] flex flex-col justify-center">
        {/* Background Decor */}
        <div className="absolute -top-6 -right-2 -z-10 opacity-10 select-none pointer-events-none">
           <span className="font-['Bangers'] text-[120px] leading-none text-white">02</span>
        </div>

        {/* --- KONTEN BERUBAH: BRIEFING ATAU FORM --- */}
        <AnimatePresence mode="wait">
          
          {/* JIKA SHOW INTRO TRUE -> TAMPILKAN BRIEFING */}
          {showIntro ? (
            <MissionBriefing key="intro" onStart={() => setShowIntro(false)} />
          ) : (
            
            /* JIKA SHOW INTRO FALSE -> TAMPILKAN FORM */
            <motion.div
               key="form"
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4 }}
            >
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-8 border-l-[6px] sm:border-l-[10px] border-yellow-400 pl-4">
                   <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">confidential data</span>
                   <h2 className="font-['Bangers'] text-5xl sm:text-6xl text-white leading-none drop-shadow-md">
                     TARGET<br/>DETAILS
                   </h2>
                </motion.div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* INPUT: NAME */}
                  <div className="group relative">
                    <label className="block font-['Bangers'] text-xl text-zinc-300 mb-1 ml-1">CODENAME / NAME</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Ex: Ryuji Sakamoto"
                        value={formData.name} // Value disinkronkan dengan state
                        className="w-full bg-zinc-800 text-white border-2 border-zinc-600 p-3 sm:p-4 font-bold font-sans text-lg focus:border-yellow-400 focus:bg-black focus:shadow-[4px_4px_0_#facc15] focus:outline-none transition-all placeholder:text-zinc-500 rounded-none"
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-400 text-black text-[9px] font-bold font-mono px-1.5 py-0.5 transform -skew-x-12 pointer-events-none">
                          REQUIRED
                      </div>
                    </div>
                  </div>

                  {/* INPUT: DATE */}
                  <div>
                    <label className="block font-['Bangers'] text-xl text-zinc-300 mb-1 ml-1">DATE OF BIRTH</label>
                    <DatePicker 
                      day={parseInt(formData.day) || ''}
                      month={parseInt(formData.month) || ''}
                      onDateChange={(dateObj) => setFormData({...formData, day: dateObj.day, month: dateObj.month})}
                    />
                  </div>

                  {/* INPUT: CHARACTER SELECT */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="block font-['Bangers'] text-xl text-zinc-300 ml-1">SELECT THIEF</label>
                        <span className="text-[10px] font-mono font-bold text-yellow-400 bg-black px-2 py-0.5 border border-yellow-400">
                            {filteredCharacters.length} MATCHES
                        </span>
                    </div>
                    
                    <div className="mb-3">
                         <SearchBar 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                         />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-zinc-800">
                      {filteredCharacters.map((char) => (
                        <div 
                          key={char.id}
                          onClick={() => setFormData({...formData, character: char.id})}
                          className={`
                            cursor-pointer border-2 p-2 relative transition-all group overflow-hidden
                            ${formData.character === char.id 
                                ? 'border-yellow-400 bg-black text-white shadow-[4px_4px_0_#facc15] transform -translate-y-1' 
                                : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-700'
                            }
                          `}
                        >
                          {char.img ? (
                            <div 
                              className={`w-full h-20 bg-cover bg-center mb-2 transition-all border border-black ${formData.character === char.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                              style={{ backgroundImage: `url('${char.img}')` }}
                            />
                          ) : (
                            <div className="w-full h-20 bg-zinc-900 mb-2 border border-zinc-700" />
                          )}
                          
                          <div className="font-['Bangers'] text-lg leading-none truncate pr-2">{char.name}</div>
                          <div className="font-mono text-[9px] uppercase truncate opacity-70">{char.desc}</div>
                          
                          {formData.character === char.id && (
                            <div className="absolute top-0 right-0 bg-yellow-400 text-black w-6 h-6 flex items-center justify-center font-bold text-xs border-l-2 border-b-2 border-black z-10">
                                ★
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                       type="button"
                       onClick={handleDisplayAll}
                       className="mt-4 w-full py-3 border border-dashed border-zinc-600 text-zinc-500 font-mono text-[10px] sm:text-xs font-bold uppercase hover:text-white hover:border-white hover:bg-zinc-800 transition-colors tracking-widest"
                    >
                       + Access Full Database +
                    </button>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="w-full bg-yellow-400 text-black font-['Bangers'] text-3xl sm:text-4xl py-4 sm:py-5 border-2 sm:border-4 border-black shadow-[4px_4px_0_#fff] hover:shadow-[8px_8px_0_#fff] active:translate-y-1 active:shadow-none transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      SEND CARD <span className="text-xl">►</span>
                    </span>
                    <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-300 skew-x-12 origin-left"></div>
                  </motion.button>

                </form>

                <motion.div initial={{opacity:0}} animate={{opacity:0.4}} className="mt-8 text-center text-white/50">
                     <p className="font-mono text-[10px]">/// SECURE CONNECTION ESTABLISHED ///</p>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
            {isLoading && <LoadingScreen text={loadingText} />}
        </AnimatePresence>

        <CustomToast 
            isVisible={toast.show} 
            message={toast.message} 
            onClose={() => setToast({...toast, show: false})} 
        />
      </div>
      </MangaLayout>
      
      <div className="bg-black border-t-2 sm:border-t-4 border-yellow-400 relative z-30">
         <Footer />
      </div>
    </motion.div>
  );
};

export default Home;