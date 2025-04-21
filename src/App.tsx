import React from 'react';
import { Card } from './components/card';
import { TransactionList } from './components/transaction-list';
import { Layout } from './components/layout';

function App() {
  return (
    <div><Layout><Card balance={5756.00} cardHolder={'Eddy Cusuma'} number={'3778 **** **** 1234'} expiryDate={'12/22'} /><TransactionList transactions={[
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
    ]} /></Layout></div>
  );
}

export default App;