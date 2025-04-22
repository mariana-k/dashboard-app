import { cn } from '../lib/helpers/utils';
import { Banknote, CreditCard, User } from 'lucide-react';
import { formatCurrency, formatDate, getTransactionIcon } from '../lib/helpers/utils';

type TransactionListProps = {
  transactions: Transaction[];
}

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: string;
}

export function TransactionList({ transactions }: TransactionListProps) {
  const getIcon = (description: string) => {
    const iconType = getTransactionIcon(description);
    switch (iconType) {
      case 'card':
        return <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-blue-600" aria-hidden="true" />;
      case 'paypal':
        return <Banknote className="w-4 h-4 md:w-5 md:h-5 text-blue-600" aria-hidden="true" />;
      default:
        return <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-3 md:space-y-4" role="feed" aria-label="Recent transactions">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg shadow-sm"
          role="article"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-50 flex items-center justify-center">
              {getIcon(transaction.description)}
            </div>
            <div>
              <p className="text-sm md:text-base font-medium text-gray-900">
                {transaction.description}
              </p>
              <p className="text-xs md:text-sm text-gray-500">{formatDate(transaction.date)}</p>
            </div>
          </div>
          <span
            className={cn(
              'text-sm md:text-base font-medium',
              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
            )}
            aria-label={`${transaction.type === 'credit' ? 'Received' : 'Sent'} ${formatCurrency(transaction.amount)}`}
          >
            {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}