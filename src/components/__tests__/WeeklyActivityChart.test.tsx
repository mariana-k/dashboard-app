import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { WeeklyActivityChart } from '../charts/WeeklyActivityChart'
import React from 'react'

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: ({ data }) => <div data-testid="mock-bar-chart" data-chart-data={JSON.stringify(data)} />,
}))

describe('WeeklyActivityChart', () => {
  const mockData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Deposit',
        data: [200, 100, 150, 250, 200, 250, 300],
        backgroundColor: '#4F46E5',
        borderRadius: 20,
        borderSkipped: false,
      },
      {
        label: 'Withdraw',
        data: [450, 300, 350, 300, 150, 400, 400],
        backgroundColor: '#E5E7EB',
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  }

  it('renders chart container with correct height classes', () => {
    render(<WeeklyActivityChart data={mockData} />)
    const container = screen.getByTestId('weekly-activity-chart')
    expect(container).toHaveClass('h-[200px]')
  })

  it('renders chart title correctly', () => {
    render(<WeeklyActivityChart data={mockData} />)
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })

  it('renders chart with correct data', () => {
    render(<WeeklyActivityChart data={mockData} />)

    const chart = screen.getByTestId('mock-bar-chart')
    expect(chart).toBeInTheDocument()

    // Verify the data passed to the Bar component
    const chartData = JSON.parse(chart.getAttribute('data-chart-data') || '{}')
    expect(chartData).toEqual(mockData)
  })
})
