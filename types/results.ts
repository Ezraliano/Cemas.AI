import { IkigaiResult } from './ikigai';
import { MBTIResult } from './mbti';

export interface CombinedResult {
  ikigai: IkigaiResult;
  mbti: MBTIResult;
  careers: string[];
  optimalWork: string[];
  blindspots: string[];
  actionPlan: { horizon: "1w" | "1m" | "3m"; steps: string[] }[];
}

export interface UserProfile {
  name: string;
  age: number;
  mainGoal: string;
  consentGiven: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}