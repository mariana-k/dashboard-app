import { Bar } from 'react-chartjs-2'
import { barChartOptions } from '../../lib/helpers/chart-theme'

interface WeeklyActivityChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderRadius: number
    }[]
  }
}

export const WeeklyActivityChart = ({ data }: WeeklyActivityChartProps) => {
  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Weekly Activity</h2>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="h-[200px]" data-testid="weekly-activity-chart">
          <Bar data={data} options={barChartOptions} />
        </div>
      </div>
    </div>
  )
}
