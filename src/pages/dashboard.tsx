

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
import { Card } from '../components/card';
import { TransactionList } from '../components/transaction-list';
import { fetchCards, fetchTransactions } from '../lib/api';

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

export function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });



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
              <Card
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
    </div>
  );
}