import { atom } from 'recoil';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const profileImageState = atom<string>({
  key: 'profileImageState',
  default: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
});

export interface Card {
  id: string;
  number: string;
  balance: number;
  cardHolder: string;
  expiryDate: string;
  type: 'visa' | 'mastercard';
}

export const cardsState = atom<Card[]>({
  key: 'cardsState',
  default: [],
});

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

export const transactionsState = atom<Transaction[]>({
  key: 'transactionsState',
  default: [],
});