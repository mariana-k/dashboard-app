import { Bar } from 'react-chartjs-2';
import { barChartOptions } from '../../helpers/chart-theme';

interface WeeklyActivityChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
            borderRadius: number;
        }[];
    };
}

export const WeeklyActivityChart = ({ data }: WeeklyActivityChartProps) => {
    return (
        <div data-testid="weekly-activity-chart" className="h-[300px] md:h-[400px]">
            <Bar data={data} options={barChartOptions} />
        </div>
    );
}; 