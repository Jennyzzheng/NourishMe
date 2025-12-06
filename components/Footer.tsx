import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 text-center text-stone-400 text-xs">
      <div className="max-w-md mx-auto space-y-2">
        <p>
          NourishMe is for wellness and educational purposes only.
        </p>
        <p>
          This is not medical advice. We do not diagnose, treat, or cure any disease. 
          Always consult a healthcare professional for medical concerns.
        </p>
        <p className="mt-4 opacity-50">
          Powered by Gemini & Ancient Wisdom
        </p>
      </div>
    </footer>
  );
};

export default Footer;