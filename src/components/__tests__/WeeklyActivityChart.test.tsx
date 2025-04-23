import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { WeeklyActivityChart } from '../charts/WeeklyActivityChart'
import React from 'react'

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-bar-chart" />,
}))

describe('WeeklyActivityChart', () => {
  const mockData = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: 'Deposit',
        data: [100, 200, 300],
        backgroundColor: '#4F46E5',
        borderRadius: 8,
      },
      {
        label: 'Withdraw',
        data: [150, 250, 350],
        backgroundColor: '#1F2937',
        borderRadius: 8,
      },
    ],
  }

  it('renders chart container with correct height classes', () => {
    render(<WeeklyActivityChart data={mockData} />)
    const container = screen.getByTestId('weekly-activity-chart')
    expect(container).toHaveClass('h-[200px] ')
  })

  it('renders chart with correct data', () => {
    render(<WeeklyActivityChart data={mockData} />)
    const chart = screen.getByTestId('weekly-activity-chart')
    expect(chart).toBeInTheDocument()
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument()
  })
})
