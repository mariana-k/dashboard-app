import {
  calculatePieChartLabelPosition,
  cn,
  formatCurrency,
  formatDate,
  getTransactionIcon,
} from '../utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class', { 'conditional-class': true })
    expect(result).toContain('base-class')
    expect(result).toContain('additional-class')
    expect(result).toContain('conditional-class')
  })

  it('handles conditional classes', () => {
    const result = cn('base-class', { 'true-class': true, 'false-class': false })
    expect(result).toContain('base-class')
    expect(result).toContain('true-class')
    expect(result).not.toContain('false-class')
  })

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
    expect(result).toContain('class3')
  })
})

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
    expect(formatCurrency(500)).toBe('$500')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toBe('$1,000')
    expect(formatCurrency(-500)).toBe('$500')
  })

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0')
  })
})

describe('formatDate', () => {
  it('formats dates correctly', () => {
    expect(formatDate('2024-03-20')).toBe('Mar 20, 2024')
    expect(formatDate('2024-01-01')).toBe('Jan 1, 2024')
  })
})

describe('calculatePieChartLabelPosition', () => {
  it('calculates correct position for pie chart labels', () => {
    const mockChart = {
      getDatasetMeta: () => ({
        data: [
          {
            x: 100,
            y: 100,
            outerRadius: 50,
          },
        ],
      }),
    }

    const position = calculatePieChartLabelPosition(30, 100, 0, mockChart)
    expect(position).toHaveProperty('x')
    expect(position).toHaveProperty('y')
    expect(typeof position.x).toBe('number')
    expect(typeof position.y).toBe('number')
  })
})

describe('getTransactionIcon', () => {
  it('returns correct icon for card transactions', () => {
    expect(getTransactionIcon('Deposit from my Card')).toBe('card')
  })

  it('returns correct icon for PayPal transactions', () => {
    expect(getTransactionIcon('Deposit Paypal')).toBe('paypal')
  })

  it('returns user icon for other transactions', () => {
    expect(getTransactionIcon('Jemi Wilson')).toBe('user')
  })
})
