import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
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
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { PaymentCard } from '../components/PaymentCard'
import { TransactionList } from '../components/TransactionList'

import { chartColors } from '../lib/helpers/chart-theme'
import { fetchCards, fetchTransactions, fetchUsers } from '../lib/helpers/api'
import QuickTransfer from '../components/QuickTransfer'
import ExpenseStatisticsChart from '../components/charts/ExpenseStatisticsChart'
import BalanceHistoryChart from '../components/charts/BalanceHistoryChart'
import { WeeklyActivityChart } from '../components/charts/WeeklyActivityChart'

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
  Filler,
  ChartDataLabels
)

const Dashboard = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  })

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })

  const { data: quickTransferContacts } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: users =>
      users.map(user => ({
        id: user.id,
        name: user.name,
        role: 'User',
        avatar: user.avatar || '/default-avatar.png',
      })),
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (cardsContainerRef.current?.offsetLeft || 0))
    setScrollLeft(cardsContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (cardsContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const weeklyActivityData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Deposit',
        data: [200, 100, 150, 250, 200, 250, 300],
        backgroundColor: chartColors.primary,
        borderRadius: 20,
        borderSkipped: false,
      },
      {
        label: 'Withdraw',
        data: [450, 300, 350, 300, 150, 400, 400],
        backgroundColor: chartColors.gray,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  }

  const expenseData = {
    labels: ['Bill Expense', 'Others', 'Investment', 'Entertainment'],
    datasets: [
      {
        data: [15, 35, 20, 30],
        backgroundColor: [
          chartColors.pie.billExpense,
          chartColors.pie.others,
          chartColors.pie.investment,
          chartColors.pie.entertainment,
        ],
        borderColor: '#ffffff',
        borderWidth: 5,
      },
    ],
  }

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
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-semibold">My Cards</h2>
            <Link to="/cards" className="text-sm lg:text-base text-blue-600 hover:text-blue-700">
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
            {cards?.map(card => (
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
            <h2 className="text-lg lg:text-xl font-semibold">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-sm lg:text-base text-blue-600 hover:text-blue-700"
            >
              See All
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm">
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {transactions && <TransactionList transactions={transactions} />}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        {/* Weekly Activity Section */}
        <div className="lg:col-span-8">
          <WeeklyActivityChart data={weeklyActivityData} />
        </div>

        {/* Expense Statistics Section */}
        <div className="lg:col-span-4">
          <ExpenseStatisticsChart data={expenseData} />
        </div>

        {/* Quick Transfer Section */}
        <div className="lg:col-span-5">
          <QuickTransfer contacts={quickTransferContacts ?? []} />
        </div>

        {/* Balance History Section */}
        <div className="lg:col-span-7">
          <BalanceHistoryChart data={balanceHistoryData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
