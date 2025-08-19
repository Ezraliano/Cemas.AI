export type MBTILikert = 1 | 2 | 3 | 4 | 5;

export interface MBTIQuestion {
  id: string;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  reverse?: boolean;
}

export interface MBTIResult {
  type: string;
  dimensions: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  strengths: string[];
  weaknesses: string[];
  workStyle: string[];
  description: string;
}