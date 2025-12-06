import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { ElementalBalance, Language } from '../types';
import { translations } from '../translations';

interface ElementalRadarProps {
  data: ElementalBalance;
  language: Language;
}

interface YinYangBarProps {
  value: number;
  language: Language;
}

export const ElementalRadar: React.FC<ElementalRadarProps> = ({ data, language }) => {
  const t = translations[language].charts;
  
  const chartData = [
    { subject: t.wood, A: data.wood, fullMark: 100 },
    { subject: t.fire, A: data.fire, fullMark: 100 },
    { subject: t.earth, A: data.earth, fullMark: 100 },
    { subject: t.metal, A: data.metal, fullMark: 100 },
    { subject: t.water, A: data.water, fullMark: 100 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e7e5e4" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 10, fontFamily: 'sans-serif' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Balance"
            dataKey="A"
            stroke="#6b836b"
            strokeWidth={2}
            fill="#8a9e8a"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const YinYangBar: React.FC<YinYangBarProps> = ({ value, language }) => {
  const t = translations[language].results;
  // Normalize visualization: 0-50 Yin (Blue/Cool), 50-100 Yang (Red/Warm)
  const isYang = value > 50;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs uppercase tracking-wider text-stone-500">
        <span>{t.yin}</span>
        <span>{t.balance}</span>
        <span>{t.yang}</span>
      </div>
      <div className="relative h-4 bg-stone-200 rounded-full overflow-hidden">
        <div 
            className="absolute top-0 bottom-0 w-2 h-4 rounded-full bg-stone-800 shadow-lg transition-all duration-1000 ease-out"
            style={{ left: `${Math.min(Math.max(value, 0), 100)}%`, transform: 'translateX(-50%)' }}
        />
        {/* Gradient Background */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-300 via-stone-100 to-red-300 pointer-events-none" />
      </div>
      <div className="text-center text-sm font-medium text-stone-600 pt-1">
        {value < 45 ? t.yinDominant : value > 55 ? t.yangDominant : t.ideallyBalanced}
      </div>
    </div>
  );
};