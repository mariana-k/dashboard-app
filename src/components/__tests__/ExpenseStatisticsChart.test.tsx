import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExpenseStatisticsChart from '../charts/ExpenseStatisticsChart'
import React from 'react'

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Pie: ({ data }) => <div data-testid="mock-pie-chart" data-chart-data={JSON.stringify(data)} />,
}))

describe('ExpenseStatisticsChart', () => {
  const mockData = {
    labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
    datasets: [
      {
        data: [30, 15, 20, 35],
        backgroundColor: ['#312E81', '#F97316', '#4F46E5', '#1F2937'],
        borderColor: '#ffffff',
        borderWidth: 5,
      },
    ],
  }

  it('renders chart title correctly', () => {
    render(<ExpenseStatisticsChart data={mockData} />)
    expect(screen.getByText('Expense Statistics')).toBeInTheDocument()
  })

  it('renders chart with correct data', () => {
    render(<ExpenseStatisticsChart data={mockData} />)

    const chart = screen.getByTestId('mock-pie-chart')
    expect(chart).toBeInTheDocument()

    // Verify the data passed to the Pie component
    const chartData = JSON.parse(chart.getAttribute('data-chart-data') || '{}')
    expect(chartData).toEqual(mockData)
  })
})
