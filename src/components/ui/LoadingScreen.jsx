import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- 1. CHROMA KEY LOGIC (Tetap dipertahankan) ---
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    const processFrame = () => {
      if (video.paused || video.ended) {
         animationFrameId = requestAnimationFrame(processFrame);
         return;
      }

      // Sync size
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw & Chroma Key
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Optimization: Loop with slightly less checks if possible
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Simple Green Screen Logic
          if (g > 100 && g > r * 1.4 && g > b * 1.4) {
            data[i + 3] = 0; // Alpha 0
          }
        }
        ctx.putImageData(frame, 0, 0);
      } catch (e) {
        // Silent catch
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', processFrame);
    return () => {
        cancelAnimationFrame(animationFrameId);
        video.removeEventListener('play', processFrame);
    };
  }, []);

  // --- 2. PROGRESS SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 5));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono"
    >
        {/* --- BACKGROUND EFFECTS --- */}
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
             }} 
        />
        
        {/* Vignette (Gelap di pinggir) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#000_100%)] pointer-events-none" />

        {/* --- HIDDEN VIDEO SOURCE --- */}
        <video 
            ref={videoRef}
            src="/loading.mp4" 
            autoPlay loop muted playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute opacity-0 pointer-events-none w-1 h-1"
        />

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-6">
            
            {/* CANVAS CONTAINER WITH SCANLINE */}
            <div className="relative w-full aspect-video flex items-center justify-center">
                {/* The Character/Video */}
                <canvas 
                    ref={canvasRef}
                    className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {/* Scanline Effect (Garis berjalan turun) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
            </div>

            {/* TEXT & LOADING BAR */}
            <div className="w-full max-w-md space-y-2 mt-24">
                <div className="flex justify-between items-end">
                    <h2 className="font-['Bangers'] text-4xl text-white tracking-wider animate-pulse">
                        GENERATE...
                    </h2>
                    <span className="text-xs text-yellow-400 font-bold mb-1">
                        {Math.floor(progress)}%
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-4 border-2 border-white bg-gray-900 relative overflow-hidden shadow-[4px_4px_0_#000]">
                    {/* Animated Fill */}
                    <motion.div 
                        className="h-full bg-white relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    >
                        {/* Striped Texture on Bar */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 5px, transparent 5px, transparent 10px)' }} />
                    </motion.div>
                </div>

                {/* Random Tech Text */}
                <div className="flex justify-between text-[10px] text-gray-500 uppercase mt-2">
                    <span>Mem: {240 + Math.floor(progress * 10)}MB / 1024MB</span>
                    <span className="animate-bounce">Encrypting...</span>
                </div>
            </div>
        </div>

        {/* --- DECORATIVE CORNERS (HUD STYLE) --- */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-white/20"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-white/20"></div>

    </motion.div>,
    document.body
  );
};

export default LoadingScreen;