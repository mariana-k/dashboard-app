import { Context } from 'chartjs-plugin-datalabels'

export const chartColors = {
  primary: '#4461F2',
  gray: '#1F2937',
  warning: '#F59E0B',
  grid: '#F3F4F6',
  text: '#6B7280',
  tooltip: {
    background: '#111827',
    text: '#F9FAFB',
  },
  pie: {
    entertainment: '#2B3147',
    billExpense: '#F4833B',
    investment: '#4461F2',
    others: '#1F2937',
  },
}

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8,
        padding: 20,
        color: '#6B7280',
        font: {
          size: 12,
          family: 'system-ui',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 12,
      },
      padding: 12,
      cornerRadius: 4,
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 12,
          family: 'system-ui',
        },
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#F3F4F6',
        drawBorder: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 12,
          family: 'system-ui',
        },
        padding: 8,
        stepSize: 100,
      },
      min: 0,
      max: 500,
    },
  },
  barPercentage: 0.5,
  categoryPercentage: 0.7,
}

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 12,
      },
      padding: 12,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#E5E7EB',
      },
    },
  },
}

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: 35,

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 12,
      },
      padding: 12,
      cornerRadius: 4,
    },
    datalabels: {
      color: '#ffffff',
      font: {
        weight: 'bold' as const,
        size: 10,
        family: 'system-ui',
      },
      formatter: (value: number, context: Context) => {
        const label = context?.chart?.data?.labels?.[context?.dataIndex]
        return `${value}%\n${label}`
      },
      textAlign: 'center' as const,
      anchor: 'center' as const,
      align: 'center' as const,
      clamp: true,
    },
  },
}
