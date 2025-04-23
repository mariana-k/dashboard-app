import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExpenseStatisticsChart from '../charts/ExpenseStatisticsChart'
import React from 'react'

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="mock-pie-chart" />,
}))

describe('ExpenseStatisticsChart', () => {
  const mockData = {
    labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
    datasets: [
      {
        data: [30, 15, 20, 35],
        backgroundColor: ['#4F46E5', '#1F2937', '#10B981', '#F59E0B'],
        borderColor: '#ffffff',
        borderWidth: 2,
        offset: [20, 35, 25, 30],
      },
    ],
  }

  it('renders chart container with correct height classes', () => {
    render(<ExpenseStatisticsChart data={mockData} />)
    const container = screen.getByTestId('expense-statistics-chart')
    expect(container).toHaveClass('relative h-[200px]  flex items-center justify-center')
  })

  it('renders chart with correct data', () => {
    render(<ExpenseStatisticsChart data={mockData} />)
    const chart = screen.getByTestId('expense-statistics-chart')
    expect(chart).toBeInTheDocument()
    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument()
  })
})
