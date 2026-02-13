import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ text = "INITIALIZING..." }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Fake System Logs for atmosphere
  const logs = [
    "CONNECTING_TO_SERVER...",
    "BYPASSING_FIREWALL...",
    "DECRYPTING_PACKETS...",
    "SYNCING_MISSION_DATA...",
    "LOADING_ASSETS...",
    "RENDERING_TARGET...",
    "ESTABLISHING_SECURE_LINE...",
    "ACCESS_GRANTED."
  ];

  // --- 1. CHROMA KEY LOGIC ---
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

      // Sync size only if changed
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

        // Chroma Key Logic (Green Screen)
        // Optimization: Loop increment by 4
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Threshold adjustment for better cutout
          if (g > 90 && g > r * 1.4 && g > b * 1.4) {
            data[i + 3] = 0; // Set Alpha to 0
          }
        }
        ctx.putImageData(frame, 0, 0);
      } catch (e) {
        // Cross-origin issues or context lost
        console.warn("Canvas processing error", e);
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

  // --- 2. PROGRESS & LOG SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Random increment speed
        return prev + Math.random() * 8; 
      });
    }, 200);

    const logInterval = setInterval(() => {
        setLogIndex(prev => (prev + 1) % logs.length);
    }, 400);
    
    // Fail-safe: show content after 1.5s even if video fails
    const timer = setTimeout(() => setIsVideoLoaded(true), 1500);
    
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
      clearTimeout(timer);
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] bg-neutral-900 flex flex-col items-center justify-center overflow-hidden font-mono cursor-wait"
    >
        {/* --- BACKGROUND LAYERS --- */}
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_100%)] pointer-events-none" />

        {/* Scrolling Code Background (Decorative) */}
        <div className="absolute top-0 left-0 p-4 opacity-20 text-[10px] text-green-500 font-mono hidden md:block select-none pointer-events-none">
            {logs.map((log, i) => (
                <div key={i} className={i === logIndex ? "text-white font-bold" : ""}>
                    {`> SYS_PROCESS_${i+102}: ${log}`}
                </div>
            ))}
        </div>


        {/* --- HIDDEN VIDEO SOURCE --- */}
        {/* Pastikan file loading.mp4 ada di folder public Anda */}
        <video 
            ref={videoRef}
            src="/loading.mp4" 
            autoPlay loop muted playsInline
            crossOrigin="anonymous"
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlay={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(true)} // Handle error gracefully
            className="absolute opacity-0 pointer-events-none w-1 h-1"
        />

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">
            
            {/* CANVAS DISPLAY */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-6">
                <canvas 
                    ref={canvasRef}
                    className={`w-full h-full object-contain transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,0,0.3)] ${isVideoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                />
                
                {/* Fallback Loader if video hasn't loaded yet or failed */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-t-yellow-400 border-r-transparent border-b-white border-l-transparent rounded-full animate-spin"></div>
                  </div>
                )}
            </div>

            {/* TEXT & BAR */}
            <div className="w-full space-y-3">
                <div className="flex justify-between items-end border-b-2 border-white/20 pb-1">
                    <h2 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest leading-none drop-shadow-[2px_2px_0_#000]">
                      <span className="animate-pulse">{text}</span>
                    </h2>
                    <span className="font-mono text-xl text-yellow-400 font-bold">
                        {Math.floor(progress)}<span className="text-xs align-top">%</span>
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-6 border-4 border-black bg-gray-800 relative shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                    <motion.div 
                        className="h-full bg-yellow-400 relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    >
                        {/* Striped Texture */}
                        <div className="absolute inset-0 opacity-30" 
                             style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 5px, transparent 5px, transparent 10px)' }} 
                        />
                    </motion.div>
                </div>

                {/* Status Log Footer */}
                <div className="flex justify-between text-[10px] md:text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mt-2">
                    <span>Mem: {Math.floor(progress * 12.4)} MB</span>
                    <span className="text-yellow-400 animate-pulse">{logs[logIndex]}</span>
                </div>
            </div>
        </div>

    </motion.div>,
    document.body
  );
};

export default LoadingScreen;