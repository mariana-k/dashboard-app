import { Card, Transaction } from '../store/atoms';


export async function fetchCards(): Promise<Card[]> {
  // Simulated API call
  return [
    {
      id: '1',
      number: '3778 **** **** 1234',
      balance: 5756.00,
      cardHolder: 'Eddy Cusuma',
      expiryDate: '12/22',
      type: 'visa',
    },
    {
      id: '2',
      number: '3778 **** **** 1234',
      balance: 5756.00,
      cardHolder: 'Eddy Cusuma',
      expiryDate: '12/22',
      type: 'mastercard',
    },
  ];
}

export async function fetchTransactions(): Promise<Transaction[]> {
  // Simulated API call
  return [
    {
      id: '1',
      description: 'Deposit from my Card',
      amount: -850,
      date: '28 January 2021',
      type: 'debit',
      category: 'Transfer',
    },
    {
      id: '2',
      description: 'Deposit Paypal',
      amount: 2500,
      date: '25 January 2021',
      type: 'credit',
      category: 'Transfer',
    },
    {
      id: '3',
      description: 'Jemi Wilson',
      amount: 5400,
      date: '21 January 2021',
      type: 'credit',
      category: 'Transfer',
    },
  ];
}