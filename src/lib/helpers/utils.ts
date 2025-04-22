import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const calculatePieChartLabelPosition = (
  value: number,
  total: number,
  currentAngle: number,
  chart: any
): { x: number; y: number } => {
  const sliceAngle = (value / total) * 2 * Math.PI;
  const middleAngle = currentAngle + sliceAngle / 2;
  const radius = (chart.getDatasetMeta(0).data[0] as any).outerRadius * 0.65;

  return {
    x: chart.getDatasetMeta(0).data[0].x + Math.cos(middleAngle) * radius,
    y: chart.getDatasetMeta(0).data[0].y + Math.sin(middleAngle) * radius,
  };
};

export const getTransactionIcon = (description: string): string => {
  if (description.toLowerCase().includes('card')) {
    return 'card';
  }
  if (description.toLowerCase().includes('paypal')) {
    return 'paypal';
  }
  return 'user';
}; 