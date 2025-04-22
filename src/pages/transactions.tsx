import { useQuery } from '@tanstack/react-query'

import { TransactionList } from '../components/TransactionList'
import { fetchTransactions } from '../lib/helpers/api'

const Transactions = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading transactions...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold">All Transactions</h2>
      </div>
      {transactions && <TransactionList transactions={transactions} />}
    </div>
  )
}

export default Transactions
