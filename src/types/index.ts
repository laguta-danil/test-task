export interface Transaction {
  id: string;
  type: 'Payment' | 'Credit';
  amount: number;
  title: string;
  description: string;
  date: string;
  isPending: boolean;
  authorizedUser?: string;
  iconColor: string;
  percentage?: string;
}

export interface CardBalance {
  limit: number;
  balance: number;
  available: number;
}

export interface DailyPoints {
  date: string;
  points: number;
}
