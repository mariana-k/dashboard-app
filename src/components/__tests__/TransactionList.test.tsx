import { render, screen } from '@testing-library/react';
import { TransactionList } from '../transaction-list';

describe('TransactionList Component', () => {
  const mockTransactions = [
    {
      id: '1',
      description: 'Payment received',
      amount: 500,
      date: '2024-02-28',
      type: 'credit' as const,
      category: 'Income',
    },
    {
      id: '2',
      description: 'Card payment',
      amount: -100,
      date: '2024-02-27',
      type: 'debit' as const,
      category: 'Shopping',
    },
  ];

  it('renders all transactions', () => {
    render(<TransactionList transactions={mockTransactions} />);
    
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.getByText('Card payment')).toBeInTheDocument();
  });

  it('displays correct amount formatting for credit transactions', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('+$500')).toBeInTheDocument();
  });

  it('displays correct amount formatting for debit transactions', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('-$100')).toBeInTheDocument();
  });

  it('uses correct icon based on transaction description', () => {
    render(<TransactionList transactions={mockTransactions} />);
    const cardIcon = document.querySelector('[aria-hidden="true"]');
    expect(cardIcon).toBeInTheDocument();
  });
});