import { ChartOptions } from 'chart.js'

export const chartColors = {
  primary: '#4F46E5',
  gray: '#1F2937',
  warning: '#F59E0B',
  grid: '#F3F4F6',
  text: '#6B7280',
  tooltip: {
    background: '#111827',
    text: '#F9FAFB',
  },
  pie: {
    entertainment: '#2C3E50',
    billExpense: '#F97316',
    investment: '#4F46E5',
    others: '#1F2937',
  },
}

const commonOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        color: chartColors.text,
        font: {
          size: 12,
          family: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: chartColors.tooltip.background,
      titleColor: chartColors.tooltip.text,
      bodyColor: chartColors.tooltip.text,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      type: 'category',
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: chartColors.text,
        font: {
          size: 12,
          family: 'system-ui, -apple-system, sans-serif',
        },
      },
    },
    y: {
      type: 'linear',
      border: {
        display: false,
        dash: [4, 4],
      },
      grid: {
        color: chartColors.grid,
        drawTicks: false,
      },
      ticks: {
        color: chartColors.text,
        font: {
          size: 12,
          family: 'system-ui, -apple-system, sans-serif',
        },
        padding: 8,
      },
      beginAtZero: true,
    },
  },
}

export const barChartOptions: ChartOptions<'bar'> = {
  ...commonOptions,
  datasets: {
    bar: {
      categoryPercentage: 0.8,
      barPercentage: 0.5,
    },
  },
}

export const lineChartOptions: ChartOptions<'line'> = {
  ...commonOptions,
  elements: {
    line: {
      tension: 0.4,
    },
  },
}

export const pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
}
