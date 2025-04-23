import { Line } from 'react-chartjs-2'
import { lineChartOptions } from '../../lib/helpers/chart-theme'

interface BalanceHistoryChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      fill: boolean
      tension: number
    }[]
  }
}

const BalanceHistoryChart = ({ data }: BalanceHistoryChartProps) => {
  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Balance History</h2>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="h-[200px]">
          <Line data={data} options={lineChartOptions} />
        </div>
      </div>
    </div>
  )
}

export default BalanceHistoryChart
