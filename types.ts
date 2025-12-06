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

export interface TcmAnalysis {
  pattern: string;
  visualCues: {
    face: string;
    hand: string;
    tongue: string;
  };
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