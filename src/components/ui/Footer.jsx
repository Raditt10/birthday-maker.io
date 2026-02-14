import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white relative overflow-hidden border-t-4 border-yellow-400">
      
      {/* --- BACKGROUND PATTERNS --- */}
      {/* 1. Halftone Dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '10px 10px'}} 
      />
      
      {/* 2. Slash Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 10px,
               #fff 10px,
               #fff 11px
             )`
           }}
      ></div>

      {/* 3. Dynamic Action Lines */}
      <div className="absolute top-[20%] left-[-10%] w-[150%] h-[1px] bg-yellow-400/20 rotate-2 pointer-events-none"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-[150%] h-[2px] bg-white/10 -rotate-1 pointer-events-none"></div>

      {/* --- CONTENT --- */}
      <div className="p-8 md:p-12 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* BRAND SECTION */}
          <div className="space-y-4">
            <div>
              <h3 className="font-['Bangers'] text-4xl tracking-wide text-white transform -rotate-1 inline-block">
                HOSHIDAY.IO
              </h3>
              <p className="font-mono text-xs text-yellow-400 font-bold tracking-widest bg-zinc-900 inline-block px-2 py-0.5 transform skew-x-12 mt-1">
                V0.1.0 // BETA
              </p>
            </div>
            <p className="font-mono text-[10px] text-zinc-400 leading-relaxed max-w-xs border-l-2 border-zinc-700 pl-3">
              Advanced secure transmission protocol for creating unforgettable birthday missions. 
              Operated by automated phantom thieves.
            </p>
          </div>

           {/* SYSTEM INFO */}
           <div className="space-y-3 font-mono text-[10px]">
              <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 transform rotate-45"></div>
                  <h4 className="font-bold text-white tracking-widest">SYSTEM_STATUS</h4>
                  <div className="h-[1px] bg-zinc-700 flex-1"></div>
              </div>
              
              <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed group">
                      <span>SERVER_REGION:</span>
                      <span className="text-zinc-300 group-hover:text-yellow-400">ASIA_JAKARTA</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed group">
                      <span>ENCRYPTION:</span>
                      <span className="text-zinc-300 group-hover:text-yellow-400">AES-256</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed group">
                      <span>OPERATOR:</span>
                      <span className="text-zinc-300 group-hover:text-yellow-400">KANJIROUU</span>
                  </div>
              </div>
           </div>

           {/* LINKS */}
           <div className="space-y-3 font-mono text-[10px] md:pl-8">
              <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 transform rotate-45"></div>
                  <h4 className="font-bold text-white tracking-widest">NAVIGATION</h4>
                  <div className="h-[1px] bg-zinc-700 flex-1"></div>
              </div>
              <ul className="space-y-2 text-zinc-400">
                  <li className="hover:text-yellow-400 cursor-pointer transition-all hover:translate-x-2 duration-200 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 text-yellow-400">►</span> PRIVACY_PROTOCOL
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer transition-all hover:translate-x-2 duration-200 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 text-yellow-400">►</span> TERMS_OF_HEIST
                  </li>
                  <li className="hover:text-yellow-400 cursor-pointer transition-all hover:translate-x-2 duration-200 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 text-yellow-400">►</span> CONTACT_PHANTOM
                  </li>
              </ul>
           </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-zinc-600 gap-2">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>ALL RIGHTS RESERVED</span>
           </div>
           <div className="text-center uppercase">
              © 2026 Kanjirouu.
           </div>
        </div>
      </div>
      
      {/* Background Decor Text */}
      <div className="absolute -bottom-4 -right-4 -z-0 opacity-5 pointer-events-none text-[150px] font-['Bangers'] leading-none text-white select-none">
        THIEF
      </div>
    </footer>
  );
};

export default Footer;