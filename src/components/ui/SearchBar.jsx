import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "SEARCH CHARACTERS..." }) => {
  return (
    <div className="relative mb-4 group">
       {/* Decorative Label */}
       <div className="absolute -top-3 left-3 bg-black text-white px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest z-10">
          FILTER_DB
       </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border-2 border-black p-3 font-mono text-sm uppercase focus:outline-none focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all placeholder:text-gray-400"
      />
      
      {/* Search Icon / Decor */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
