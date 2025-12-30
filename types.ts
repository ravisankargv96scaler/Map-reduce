export interface KeyValuePair {
  id: string;
  key: string;
  value: number;
}

export interface Bucket {
  key: string;
  values: KeyValuePair[];
}

export enum Phase {
  Concept = 'Concept',
  Map = 'Map',
  Shuffle = 'Shuffle',
  Reduce = 'Reduce',
  Simulation = 'Simulation',
  Quiz = 'Quiz',
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}
