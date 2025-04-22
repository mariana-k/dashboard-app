import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PaymentCard } from '../components/PaymentCard';
import { TransactionList } from '../components/TransactionList';

import { chartColors, barChartOptions, lineChartOptions, pieChartOptions } from '../lib/helpers/chart-theme';
import { fetchCards, fetchTransactions, fetchUsers } from '@/lib/helpers/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<ChartJS<'pie'> | null>(null);

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const { data: quickTransferContacts } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: (users) => users.map(user => ({
      id: user.id,
      name: user.name,
      role: 'User',
      avatar: user.avatar,
    })),
  });

  const displayedContacts = quickTransferContacts
    ? quickTransferContacts.slice(currentPage * 3, (currentPage * 3) + 3)
    : [];

  const hasNextPage = quickTransferContacts && currentPage * 3 + 3 < quickTransferContacts.length;
  const hasPrevPage = currentPage > 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (cardsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(cardsContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (cardsContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const weeklyActivityData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Deposit',
        data: [200, 100, 150, 250, 200, 250, 300],
        backgroundColor: chartColors.primary,
        borderRadius: 8,
      },
      {
        label: 'Withdraw',
        data: [450, 300, 350, 300, 150, 400, 400],
        backgroundColor: chartColors.gray,
        borderRadius: 8,
      },
    ],
  };

  const customBarChartOptions = {
    ...barChartOptions,
    categoryPercentage: 0.8,
    barPercentage: 0.5,
  };

  const expenseData = {
    labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
    datasets: [
      {
        data: [30, 15, 20, 35],
        backgroundColor: [
          chartColors.pie.entertainment,
          chartColors.pie.billExpense,
          chartColors.pie.investment,
          chartColors.pie.others,
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        offset: [20, 35, 25, 30],
      },
    ],
  };

  const balanceHistoryData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        label: 'Balance',
        data: [200, 400, 300, 750, 250, 400, 600],
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}1A`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold">My Cards</h2>
            <Link to="/cards" className="text-sm md:text-base text-blue-600 hover:text-blue-700">
              See All
            </Link>
          </div>
          <div
            ref={cardsContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-none min-h-[220px]"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {cards?.map((card) => (
              <PaymentCard
                key={card.id}
                balance={card.balance}
                cardHolder={card.cardHolder}
                number={card.number}
                expiryDate={card.expiryDate}
                variant={card.id === '1' ? 'dark' : 'light'}
              />
            ))}
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Recent Transactions</h2>
            <Link to="/transactions" className="text-sm md:text-base text-blue-600 hover:text-blue-700">
              See All
            </Link>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {transactions && <TransactionList transactions={transactions} />}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Weekly Activity Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Weekly Activity</h2>
          <div className="h-[300px] md:h-[400px]">
            <Bar data={weeklyActivityData} options={customBarChartOptions} />
          </div>
        </div>

        {/* Expense Statistics Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Expense Statistics</h2>
          <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="w-full max-w-[280px] aspect-square">
              <Pie
                ref={pieChartRef}
                data={expenseData}
                options={pieChartOptions}
                plugins={[{
                  id: 'customLabels',
                  afterDraw: (chart) => {
                    const { ctx, data } = chart;
                    ctx.save();
                    const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
                    let currentAngle = -0.5 * Math.PI;

                    data.datasets[0].data.forEach((value: number, index: number) => {
                      const sliceAngle = (value / total) * 2 * Math.PI;
                      const middleAngle = currentAngle + sliceAngle / 2;
                      const radius = (chart.getDatasetMeta(0).data[0] as any).outerRadius * 0.65;

                      const x = chart.getDatasetMeta(0).data[0].x + Math.cos(middleAngle) * radius;
                      const y = chart.getDatasetMeta(0).data[0].y + Math.sin(middleAngle) * radius;

                      ctx.font = '600 12px system-ui';
                      ctx.fillStyle = '#fff';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      const label = `${value}% ${data?.labels?.[index]}`;
                      ctx.fillText(label, x, y);

                      currentAngle += sliceAngle;
                    });
                    ctx.restore();
                  }
                }]}
              />
            </div>
          </div>
        </div>

        {/* Quick Transfer Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Transfer</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {displayedContacts.map((contact) => (
                <button key={contact.id} className="flex flex-col items-center gap-1">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <p className="text-xs md:text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.role}</p>
                  </div>
                </button>
              ))}
              <div className="flex gap-2">
                {hasPrevPage && (
                  <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Show previous contacts"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                {hasNextPage && (
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Show next contacts"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write Amount"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <button className="px-4 md:px-6 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 text-sm md:text-base">
                Send
                <span className="rotate-45">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Balance History Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Balance History</h2>
          <div className="h-[300px] md:h-[400px]">
            <Line data={balanceHistoryData} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;