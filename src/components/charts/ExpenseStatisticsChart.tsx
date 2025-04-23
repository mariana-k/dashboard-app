import { Pie } from 'react-chartjs-2'
import { pieChartOptions } from '../../lib/helpers/chart-theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'

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
}

const ExpenseStatisticsChart = ({ data }: ExpenseStatisticsChartProps) => {
  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Expense Statistics</h2>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[230px] p-2">
            <Pie data={data} options={pieChartOptions} plugins={[ChartDataLabels]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseStatisticsChart
