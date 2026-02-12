import React from 'react';

const MangaLayout = ({ children, sidePanelContent }) => {
  return (
    <div className="flex flex-col min-h-screen w-full md:flex-row border-0 md:border-4 border-black bg-white">
      {/* Panel Kiri (Konten Utama) */}
      <div className="flex-1 bg-white p-6 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black relative z-10 flex flex-col justify-center order-2 md:order-1 min-h-[50vh]">
        {children}
      </div>
      
      {/* Panel Kanan (Visual/Illustration) */}
      <div className="relative h-[40vh] md:h-auto md:flex-1 bg-black overflow-hidden order-1 md:order-2 border-b-4 md:border-b-0 border-black group">
        {/* Background Image with Scale Effect */}
        <div 
          className="absolute inset-0 opacity-60 bg-cover bg-center grayscale contrast-125 mix-blend-screen transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: "url('/comicpanel2.webp')" }}
        />
        
        {/* Professional Gradients & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black opacity-80" />

        {/* Content */}
        <div className="relative z-10 h-full w-full flex items-center justify-center p-8">
           {sidePanelContent}
        </div>
      </div>
    </div>
  );
};

export default MangaLayout;