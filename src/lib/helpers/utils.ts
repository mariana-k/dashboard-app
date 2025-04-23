import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Chart, ChartType } from 'chart.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const calculatePieChartLabelPosition = (
  value: number,
  total: number,
  currentAngle: number,
  chart:
    | Partial<Chart<ChartType>>
    | {
      getDatasetMeta: (index: number) => {
        data: { x: number; y: number; outerRadius: number }[]
      }
    }
): { x: number; y: number } => {
  const sliceAngle = (value / total) * 2 * Math.PI
  const middleAngle = currentAngle + sliceAngle / 2

  if (!chart.getDatasetMeta) throw new Error('Invalid chart object')
  const chartElement = chart.getDatasetMeta(0).data[0]
  const radius = (chartElement as unknown as { outerRadius: number }).outerRadius * 0.65

  return {
    x: chartElement.x + Math.cos(middleAngle) * radius,
    y: chartElement.y + Math.sin(middleAngle) * radius,
  }
}

export const getTransactionIcon = (description: string): string => {
  if (description.toLowerCase().includes('card')) {
    return 'card'
  }
  if (description.toLowerCase().includes('paypal')) {
    return 'paypal'
  }
  return 'user'
}

export const maskCardNumber = (cardNumber: string): string => {
  // Remove any spaces from the card number
  const cleaned = cardNumber.replace(/\s/g, '')
  // Keep first 4 and last 4 digits, mask the rest
  const masked = cleaned.slice(0, 4) + ' **** **** ' + cleaned.slice(-4)
  return masked
}
