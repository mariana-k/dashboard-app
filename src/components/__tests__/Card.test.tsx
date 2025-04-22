import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PaymentCard } from '../PaymentCard';
import React from 'react';

describe('Card Component', () => {
  const defaultProps = {
    balance: 5000,
    cardHolder: 'John Doe',
    number: '4242 **** **** 4242',
    expiryDate: '12/24',
  };

  it('renders card details correctly', () => {
    render(<PaymentCard {...defaultProps} />);

    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('4242 **** **** 4242')).toBeInTheDocument();
    expect(screen.getByText('12/24')).toBeInTheDocument();
  });

  it('applies dark theme by default', () => {
    render(<PaymentCard {...defaultProps} />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('bg-[#1E1E1E]');
  });

  it('applies light theme when specified', () => {
    render(<PaymentCard {...defaultProps} variant="light" />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('bg-white');
  });

  it('formats balance with proper localization', () => {
    render(<PaymentCard {...defaultProps} balance={1234567} />);
    expect(screen.getByText('$1,234,567')).toBeInTheDocument();
  });
});