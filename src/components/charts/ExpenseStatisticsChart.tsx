import { Pie } from 'react-chartjs-2'
import { pieChartOptions } from '../../lib/helpers/chart-theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Loader2 } from 'lucide-react'
import { ChartOptions } from 'chart.js'

interface ExpenseStatisticsChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
      borderColor: string
      borderWidth: number
    }[]
  }
  isLoading?: boolean
  error?: string
}

const ExpenseStatisticsChart = ({ data, isLoading, error }: ExpenseStatisticsChartProps) => {
  const chartOptions: ChartOptions<'pie'> = {
    ...pieChartOptions,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      ...pieChartOptions.plugins,
    },
  }

  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Expense Statistics</h2>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[230px] p-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            ) : (
              <Pie data={data} options={chartOptions} plugins={[ChartDataLabels]} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseStatisticsChart
