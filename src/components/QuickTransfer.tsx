import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
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
  const displayedContacts = contacts.slice(currentPage * 3, currentPage * 3 + 3)
  const hasNextPage = currentPage * 3 + 3 < contacts.length
  const hasPrevPage = currentPage > 0

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Transfer</h2>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {displayedContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`flex flex-col items-center gap-1 ${selectedContact === contact.id ? 'ring-2 ring-primary' : ''}`}
              aria-label={`Select ${contact.name}`}
            >
              <OptimizedImage
                src={contact.avatar}
                alt={contact.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
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
  )
}

export default QuickTransfer
