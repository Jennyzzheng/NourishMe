export interface Recommendation {
  item: string;
  reason: string;
}

export interface ElementalBalance {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface Astrology {
  animal: string;
  element: string;
  insight: string;
}

export interface TcmAnalysis {
  pattern: string;
  visualCues: {
    face: string;
    hand: string;
    tongue: string;
  };
  astrology: Astrology;
  interpretation: string;
  foodRecommendations: Recommendation[];
  drinkRecommendations: Recommendation[];
  lifestyleRituals: string[];
  avoid: string[];
  vibeCheck: string;
  elementalBalance: ElementalBalance;
  yinYangBalance: number; // 0-100 scale, <50 Yin dominant, >50 Yang dominant
}

export enum UploadType {
  FACE = 'FACE',
  HAND = 'HAND',
  TONGUE = 'TONGUE'
}

export type Language = 'en' | 'zh';

export interface UserProfile {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  currentLocation: string;
}
