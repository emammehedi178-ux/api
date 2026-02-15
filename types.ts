export type GameType = 'Free Fire' | 'Valorant' | 'CS2' | 'LOL' | 'Dota 2' | 'PUBG Mobile' | 'Other';
export type PaymentMethod = 'Bkash' | 'Nagad' | 'Rocket';

export interface RegistrationData {
  id?: string;
  timestamp?: string;
  teamName: string;
  gameName: GameType;
  leaderName: string;
  leaderPhone: string;
  leaderEmail?: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  discordUsername?: string;
  ingameId?: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  agreedToRules: boolean;
}

export interface FormErrors {
  teamName?: string;
  leaderName?: string;
  leaderPhone?: string;
  player2?: string;
  player3?: string;
  player4?: string;
  transactionId?: string;
  agreedToRules?: string;
}

export enum Tabs {
  GENERAL = 'general',
  MAPS = 'maps',
  PRIZE = 'prize',
  RULES = 'rules'
}