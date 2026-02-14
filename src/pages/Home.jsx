import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MangaLayout from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/ui/LoadingScreen';
import SearchBar from '../components/ui/SearchBar';
import Footer from '../components/ui/Footer';
import CustomToast from '../components/ui/Warning';
import DatePicker from '../components/ui/DatePicker'; // Pastikan DatePicker juga support dark mode style
import { CHARACTERS } from '../data/characters';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', day: '', month: '', character: 'gojo' });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('GENERATE...');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    if (location.state?.selectedCharacter) {
      setFormData(prev => ({
        ...prev,
        character: location.state.selectedCharacter
      }));
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
    
    // Validasi Angka
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
    setTimeout(() => { navigate('/characters'); }, 1500);
  }

  // Animasi Halaman
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
        // --- VISUAL SIDE CONTENT (JUDUL) ---
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
      
      {/* --- FORM CONTENT --- */}
      <div className="w-full max-w-xl mx-auto relative px-5 py-8 lg:py-0">
        
        {/* Decorative Number Background */}
        <div className="absolute -top-6 -right-2 -z-10 opacity-10 select-none pointer-events-none">
           <span className="font-['Bangers'] text-[120px] leading-none text-white">01</span>
        </div>

        {/* Section Header */}
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
                // STYLE INPUT: Dark theme, border light/yellow
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
              // Pastikan komponen DatePicker Anda menggunakan class yang fleksibel atau tema gelap
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
            
            {/* Search Bar Wrapper agar konsisten */}
            <div className="mb-3">
                 <SearchBar 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                 />
            </div>
            
            {/* Character Grid - DARK THEME */}
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
                  {/* Gambar Karakter */}
                  {char.img ? (
                    <div 
                      className={`w-full h-20 bg-cover bg-top mb-2 transition-all border border-black ${formData.character === char.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
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

          {/* SUBMIT BUTTON - STYLE PERSONA 5 */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full bg-yellow-400 text-black font-['Bangers'] text-3xl sm:text-4xl py-4 sm:py-5 border-2 sm:border-4 border-black shadow-[4px_4px_0_#fff] hover:shadow-[8px_8px_0_#fff] active:translate-y-1 active:shadow-none transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              SEND CARD <span className="text-xl">►</span>
            </span>
            {/* Slash Effect */}
            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-300 skew-x-12 origin-left"></div>
          </motion.button>

        </form>

        <motion.div initial={{opacity:0}} animate={{opacity:0.4}} className="mt-8 text-center text-white/50">
             <p className="font-mono text-[10px]">/// SECURE CONNECTION ESTABLISHED ///</p>
        </motion.div>
        
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
      
      {/* Footer di luar layout untuk memastikan di paling bawah */}
      <div className="bg-black border-t-2 sm:border-t-4 border-yellow-400 relative z-30">
         <Footer />
      </div>
    </motion.div>
  );
};

export default Home;