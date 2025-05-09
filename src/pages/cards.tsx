import { useQuery } from '@tanstack/react-query'
import { PaymentCard } from '../components/PaymentCard'
import { fetchCards } from '../lib/helpers/api'

const Cards = () => {
  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">My Cards</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
  )
}

export default Cards
