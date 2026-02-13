import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-12 bg-zinc-900 text-white relative overflow-hidden">
      
      {/* Manga Speed Lines Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent,
               transparent 20px,
               #fff 20px,
               #fff 21px
             )`
           }}
      ></div>

      {/* Dynamic White Action Lines */}
      <div className="absolute top-[20%] left-[-10%] w-[150%] h-[1px] bg-white/10 rotate-2 pointer-events-none"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-[150%] h-[2px] bg-white/5 -rotate-1 pointer-events-none"></div>
      <div className="absolute top-[-50%] right-[30%] w-[1px] h-[200%] bg-white/5 rotate-[15deg] pointer-events-none"></div>

      <div className="p-6 md:p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-['Bangers'] text-3xl md:text-4xl tracking-wide text-white drop-shadow-md">
                HOSHIDAY.IO
              </h3>
              <p className="font-mono text-xs text-zinc-500 tracking-wider">
                V0.1.0 // DEMO RELEASE
              </p>
            </div>
            <p className="font-mono text-[10px] text-zinc-400 leading-relaxed max-w-xs">
              Advanced secure transmission protocol for creating unforgettable birthday missions. 
              Operated by automated agent systems.
            </p>
          </div>

           {/* About Section */}
           <div className="space-y-2 font-mono text-[10px]">
              <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-zinc-300 bg-zinc-900 pr-2">ABOUT</h4>
                  <div className="h-[1px] bg-zinc-700 flex-1"></div>
              </div>
              
              <div className="flex flex-col gap-2 relative md:left-0">
                  <div className="flex justify-between text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed">
                     <span>REGION:</span>
                     <span className="text-zinc-300">INDONESIA</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed">
                     <span>LANGUAGE:</span>
                     <span className="text-zinc-300">ENGLISH</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 hover:text-white transition-colors cursor-default border-b border-zinc-800 pb-1 border-dashed">
                     <span>VERSION:</span>
                     <span className="text-zinc-300">V0.1.0 DEMO</span>
                  </div>
              </div>
           </div>

           {/* Protocols */}
           <div className="space-y-2 font-mono text-[10px] md:pl-12">
              <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-zinc-300 bg-zinc-900 pr-2">PROTOCOLS</h4>
                  <div className="h-[1px] bg-zinc-700 flex-1"></div>
              </div>
              <ul className="space-y-1 text-zinc-500">
                 <li className="hover:text-yellow-400 cursor-pointer transition-colors hover:translate-x-1 duration-200">PRIVACY_POLICY</li>
                 <li className="hover:text-yellow-400 cursor-pointer transition-colors hover:translate-x-1 duration-200">TERMS_OF_USE</li>
                 <li className="hover:text-yellow-400 cursor-pointer transition-colors hover:translate-x-1 duration-200">CONTACT_ADMIN</li>
              </ul>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex justify-center items-center font-mono text-[10px] text-zinc-600">
           <div className="text-center">
              © 2026 Kanjirouu. ALL RIGHTS RESERVED.
           </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 opacity-5 pointer-events-none text-9xl font-['Bangers'] leading-none text-white select-none">
        DOCS
      </div>
    </footer>
  );
};

export default Footer;