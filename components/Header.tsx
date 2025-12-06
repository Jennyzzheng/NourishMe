import React from 'react';
import { Leaf } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = translations[language].header;

  return (
    <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-sage-800">
          <Leaf className="w-6 h-6" />
          <h1 className="font-serif text-xl font-medium tracking-wide">{t.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-xs font-sans text-stone-500 tracking-widest uppercase hidden sm:block">
            {t.subtitle}
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium border-l border-stone-300 pl-4 ml-2">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`transition-colors ${language === 'en' ? 'text-stone-800 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    EN
                </button>
                <span className="text-stone-300">/</span>
                <button 
                    onClick={() => setLanguage('zh')}
                    className={`transition-colors ${language === 'zh' ? 'text-stone-800 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    中文
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;