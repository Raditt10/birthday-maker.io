import React from 'react';

const MangaLayout = ({ children, sidePanelContent }) => {
  return (
    // WRAPPER UTAMA: Dark Mode Base
    <div className="flex flex-col lg:flex-row min-h-[100dvh] w-full bg-zinc-900 text-white overflow-x-hidden">
      
      {/* --- PANEL KANAN (VISUAL / JUDUL) --- */}
      {/* Mobile: Order 1 (Muncul Pertama/Atas) */}
      {/* Desktop: Order 2 (Muncul Kanan) */}
      <div className="relative order-1 lg:order-2 w-full h-[40vh] lg:h-auto lg:w-[45%] lg:flex-1 overflow-hidden border-b-4 lg:border-b-0 lg:border-l-4 border-yellow-400 bg-black group">
        
        {/* Background Image (Zoom Effect) */}
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center grayscale contrast-125 mix-blend-screen transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: "url('/comicpanel2.webp')" }} // Pastikan gambar ada
        />
        
        {/* Gradients & Overlay untuk keterbacaan */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black opacity-80" />

        {/* Comic Texture Lines (Halftone Pattern) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '40px 100%' }} />

        {/* Konten Panel Samping (Judul) */}
        <div className="relative z-10 h-full w-full flex items-center justify-center p-6">
           {sidePanelContent}
        </div>
      </div>

      {/* --- PANEL KIRI (FORM UTAMA) --- */}
      {/* Mobile: Order 2 (Muncul Bawah) */}
      {/* Desktop: Order 1 (Muncul Kiri) */}
      <div className="relative order-2 lg:order-1 w-full lg:w-[55%] flex flex-col justify-center bg-zinc-900 min-h-[60vh] lg:min-h-screen">
        
        {/* Konten Form */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
            {children}
        </div>

        {/* Hiasan Background di Form */}
         <div className="absolute inset-0 -z-0 opacity-[0.03]" 
             style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}
        />

      </div>

    </div>
  );
};

export default MangaLayout;