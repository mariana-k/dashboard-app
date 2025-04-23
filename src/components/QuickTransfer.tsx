import { useState } from 'react'
import { ChevronRight, ChevronLeft, Send } from 'lucide-react'
import { OptimizedImage } from './OptimizedImage'

interface Contact {
  id: string
  name: string
  role: string
  avatar: string
}

interface QuickTransferProps {
  contacts: Contact[]
}

const QuickTransfer = ({ contacts }: QuickTransferProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [amount, setAmount] = useState('525.50')
  const displayedContacts = contacts.slice(currentPage * 3, currentPage * 3 + 3)
  const hasNextPage = currentPage * 3 + 3 < contacts.length
  const hasPrevPage = currentPage > 0

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty input, numbers, and one decimal point with up to 2 decimal places
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
    }
  }

  return (
    <div>
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Quick Transfer</h2>
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="h-[200px]">
          <div className="flex items-center gap-4">
            {hasPrevPage && (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Show previous contacts"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
            )}
            {displayedContacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`flex flex-col items-center ${selectedContact === contact.id ? 'ring-2 ring-primary' : ''}`}
                aria-label={`Select ${contact.name}`}
              >
                <OptimizedImage
                  src={contact.avatar}
                  alt={contact.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover mb-1.5"
                />
                <p className="text-sm font-semibold">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.role}</p>
              </button>
            ))}
            {hasNextPage && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Show next contacts"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 pt-6">
            <label
              htmlFor="amount"
              className="text-sm text-gray-500 whitespace-nowrap font-medium"
            >
              Write Amount
            </label>
            <div className="relative flex-1 max-w-[200px]">
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full px-3 py-2 rounded-full bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400 pr-24"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-gray-900 text-white rounded-full flex items-center gap-1.5 font-medium hover:bg-gray-950 transition-colors shadow-lg">
                <span className="text-sm">Send</span>
                <Send className="w-4 h-4 rotate-[35deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickTransfer
