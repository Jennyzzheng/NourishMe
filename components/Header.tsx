import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sage-800">
          <Leaf className="w-6 h-6" />
          <h1 className="font-serif text-xl font-medium tracking-wide">NourishMe</h1>
        </div>
        <div className="text-xs font-sans text-stone-500 tracking-widest uppercase">
          TCM Wellness Companion
        </div>
      </div>
    </header>
  );
};

export default Header;