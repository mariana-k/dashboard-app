import { Line } from 'react-chartjs-2';
import { lineChartOptions } from '../../helpers/chart-theme';

interface BalanceHistoryChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
            fill: boolean;
            tension: number;
        }[];
    };
}

const BalanceHistoryChart = ({ data }: BalanceHistoryChartProps) => {
    return (
        <div className="h-[300px] md:h-[400px]">
            <Line data={data} options={lineChartOptions} />
        </div>
    );
};

export default BalanceHistoryChart; 