import React from 'react';
import { TcmAnalysis, Language } from '../types';
import { ElementalRadar, YinYangBar } from './Charts';
import { Sparkles, Utensils, Coffee, Sun, AlertCircle, MoonStar } from 'lucide-react';
import { translations } from '../translations';

interface AnalysisResultProps {
  data: TcmAnalysis;
  onReset: () => void;
  language: Language;
}

const Card: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-sm border border-stone-100 ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      {icon && <span className="text-sage-600">{icon}</span>}
      <h3 className="font-serif text-lg text-stone-800">{title}</h3>
    </div>
    {children}
  </div>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onReset, language }) => {
  const t = translations[language].results;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Top Summary */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-block px-4 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold tracking-widest uppercase mb-2">
          {t.analyzingBadge}
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
          {t.patternPrefix} <br/><span className="italic text-sage-700">{data.pattern}</span>
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {data.interpretation}
        </p>
        <div className="pt-4">
            <div className="inline-block px-6 py-3 bg-stone-900 text-stone-50 rounded-xl text-sm italic">
                 ✨ "{data.vibeCheck}"
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Visuals & Data */}
        <div className="space-y-6 md:col-span-1">
          {/* Astrology Card */}
          <Card title={t.astrology} icon={<MoonStar className="w-5 h-5"/>} className="bg-stone-50 border-stone-200">
            <div className="flex justify-between items-center mb-3">
                <div className="text-center flex-1 border-r border-stone-200">
                    <span className="text-xs text-stone-400 uppercase tracking-widest block">{t.zodiac}</span>
                    <span className="font-serif text-lg text-stone-800">{data.astrology.animal}</span>
                </div>
                <div className="text-center flex-1">
                    <span className="text-xs text-stone-400 uppercase tracking-widest block">{t.element}</span>
                    <span className="font-serif text-lg text-stone-800">{data.astrology.element}</span>
                </div>
            </div>
            <p className="text-xs text-stone-500 italic leading-relaxed text-center">
                "{data.astrology.insight}"
            </p>
          </Card>

          <Card title={t.visualFindings} icon={<Sparkles className="w-5 h-5"/>}>
            <div className="space-y-4 text-sm text-stone-600">
              <div>
                <span className="font-semibold text-stone-800 block mb-1">{t.faceAnalysis}</span>
                <p className="leading-relaxed bg-stone-50 p-3 rounded-lg">{data.visualCues.face}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-800 block mb-1">{t.palmReading}</span>
                <p className="leading-relaxed bg-stone-50 p-3 rounded-lg">{data.visualCues.hand}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-800 block mb-1">{t.tongueDiagnosis}</span>
                <p className="leading-relaxed bg-stone-50 p-3 rounded-lg">{data.visualCues.tongue}</p>
              </div>
            </div>
          </Card>
          
          <Card title={t.elementalBalance}>
            <ElementalRadar data={data.elementalBalance} language={language} />
          </Card>

           <Card title={t.yinYang}>
            <YinYangBar value={data.yinYangBalance} language={language} />
          </Card>
        </div>

        {/* Column 2 & 3: Recommendations */}
        <div className="md:col-span-2 space-y-6">
            
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title={t.healingFoods} icon={<Utensils className="w-5 h-5"/>} className="h-full">
              <ul className="space-y-4">
                {data.foodRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex flex-col border-b border-stone-100 last:border-0 pb-3 last:pb-0">
                    <span className="font-medium text-stone-800 text-lg">{rec.item}</span>
                    <span className="text-xs text-stone-500 mt-1">{rec.reason}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title={t.elixirsTeas} icon={<Coffee className="w-5 h-5"/>} className="h-full">
               <ul className="space-y-4">
                {data.drinkRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex flex-col border-b border-stone-100 last:border-0 pb-3 last:pb-0">
                    <span className="font-medium text-stone-800 text-lg">{rec.item}</span>
                    <span className="text-xs text-stone-500 mt-1">{rec.reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <Card title={t.dailyRituals} icon={<Sun className="w-5 h-5"/>} className="bg-sage-50/50 border-sage-100">
                <ul className="list-disc list-inside space-y-2 text-stone-700 text-sm">
                    {data.lifestyleRituals.map((ritual, idx) => (
                        <li key={idx} className="leading-relaxed">{ritual}</li>
                    ))}
                </ul>
             </Card>

             <Card title={t.reduceAvoid} icon={<AlertCircle className="w-5 h-5"/>} className="bg-orange-50/50 border-orange-100">
                <ul className="list-disc list-inside space-y-2 text-stone-700 text-sm">
                    {data.avoid.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                </ul>
             </Card>
          </div>

        </div>
      </div>

      <div className="flex justify-center pt-12">
        <button 
          onClick={onReset}
          className="text-stone-400 hover:text-stone-800 underline underline-offset-4 text-sm transition-colors"
        >
          {t.startNew}
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;