export type CowStatus = 'Active' | 'In Treatment' | 'Deceased';
export type CowSex = 'Male' | 'Female';

export interface CowEvent {
  date: string;
  type: string;
  description: string;
}

export interface Cow {
  id: string;
  sex: CowSex;
  pen: string;
  status: CowStatus;
  lastEventDate: string;
  weight?: number;
  dailyWeightGain?: number;
  events: CowEvent[];
}
