export type Likert = 1 | 2 | 3 | 4 | 5;
export type IkigaiDomain = "passion" | "mission" | "profession" | "vocation";

export interface IkigaiQuestion {
  id: string;
  domain: IkigaiDomain;
  text: string;
}

export interface IkigaiScores {
  passion: number;
  mission: number;
  profession: number;
  vocation: number;
}

export interface IkigaiResult {
  scores: IkigaiScores;
  insights: string[];
}