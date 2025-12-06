import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;

  return (
    <footer className="py-8 px-6 text-center text-stone-400 text-xs">
      <div className="max-w-md mx-auto space-y-2">
        <p>
          {t.disclaimer1}
        </p>
        <p>
          {t.disclaimer2}
        </p>
        <p className="mt-4 opacity-50">
          {t.poweredBy}
        </p>
      </div>
    </footer>
  );
};

export default Footer;