import { Pie } from 'react-chartjs-2';
import { pieChartOptions } from '../../lib/helpers/chart-theme';
import { calculatePieChartLabelPosition } from '../../lib/helpers/utils';

interface ExpenseStatisticsChartProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
            borderColor: string;
            borderWidth: number;
            offset: number[];
        }[];
    };
}

const ExpenseStatisticsChart = ({ data }: ExpenseStatisticsChartProps) => {
    return (
        <div data-testid="expense-statistics-chart" className="relative h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="w-full max-w-[280px] aspect-square">
                <Pie
                    data={data}
                    options={pieChartOptions}
                    plugins={[{
                        id: 'customLabels',
                        afterDraw: (chart) => {
                            const { ctx, data } = chart;
                            ctx.save();
                            const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
                            let currentAngle = -0.5 * Math.PI;

                            data.datasets[0].data.forEach((value: number, index: number) => {
                                const { x, y } = calculatePieChartLabelPosition(value, total, currentAngle, chart);

                                ctx.font = '600 12px system-ui';
                                ctx.fillStyle = '#fff';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                const label = `${value}% ${data.labels ? data.labels[index] : 'N/A'}`;
                                ctx.fillText(label, x, y);

                                currentAngle += (value / total) * 2 * Math.PI;
                            });
                            ctx.restore();
                        }
                    }]}
                />
            </div>
        </div>
    );
};

export default ExpenseStatisticsChart; 