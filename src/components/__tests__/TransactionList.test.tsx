import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TransactionList } from '../TransactionList'
import React from 'react'

const mockTransactions = [
  {
    id: '1',
    type: 'credit' as const,
    amount: 1000,
    description: 'Salary',
    date: '2024-03-20',
    category: 'income',
  },
  {
    id: '2',
    type: 'debit' as const,
    amount: 500,
    description: 'Groceries',
    date: '2024-03-19',
    category: 'food',
  },
]

describe('TransactionList Component', () => {
  it('renders transactions correctly', () => {
    render(<TransactionList transactions={mockTransactions} />)

    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('+$1,000')).toBeInTheDocument()
    expect(screen.getByText('-$500')).toBeInTheDocument()
  })

  it('applies correct styling for credit transactions', () => {
    render(<TransactionList transactions={mockTransactions} />)
    const creditAmount = screen.getByText('+$1,000')
    expect(creditAmount).toHaveClass('text-green-600')
  })

  it('applies correct styling for debit transactions', () => {
    render(<TransactionList transactions={mockTransactions} />)
    const debitAmount = screen.getByText('-$500')
    expect(debitAmount).toHaveClass('text-red-600')
  })

  it('formats dates correctly', () => {
    render(<TransactionList transactions={mockTransactions} />)
    expect(screen.getByText('Mar 20, 2024')).toBeInTheDocument()
    expect(screen.getByText('Mar 19, 2024')).toBeInTheDocument()
  })
})
