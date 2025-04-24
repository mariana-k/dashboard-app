import { ChevronRight, ChevronLeft } from 'lucide-react'
import { OptimizedImage } from '../OptimizedImage'
import { useMemo } from 'react'

interface Contact {
    id: string
    name: string
    role: string
    avatar: string
}

interface ContactListProps {
    contacts: Contact[]
    currentPage: number
    selectedContact: string | null
    onContactSelect: (id: string) => void
    onPageChange: (page: number) => void
    isLoading?: boolean
}

const ContactList = ({
    contacts,
    currentPage,
    selectedContact,
    onContactSelect,
    onPageChange,
    isLoading,
}: ContactListProps) => {
    const displayedContacts = useMemo(() =>
        contacts.slice(currentPage * 3, currentPage * 3 + 3),
        [contacts, currentPage]
    )

    const hasNextPage = useMemo(() =>
        currentPage * 3 + 3 < contacts.length,
        [contacts.length, currentPage]
    )

    const hasPrevPage = useMemo(() =>
        currentPage > 0,
        [currentPage]
    )

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onContactSelect(id)
        }
    }

    return (
        <div
            className="flex items-center gap-4"
            role="listbox"
            aria-label="Contact list"
            aria-orientation="horizontal"
        >
            {hasPrevPage && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Show previous contacts"
                    disabled={isLoading}
                >
                    <ChevronLeft className="w-4 h-4 text-gray-600" aria-hidden="true" />
                </button>
            )}
            {displayedContacts.map(contact => (
                <button
                    key={contact.id}
                    onClick={() => onContactSelect(contact.id)}
                    onKeyDown={(e) => handleKeyDown(e, contact.id)}
                    className={`flex flex-col items-center ${selectedContact === contact.id ? 'ring-2 ring-primary' : ''
                        } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary`}
                    role="option"
                    aria-selected={selectedContact === contact.id}
                    aria-label={`Select ${contact.name}, ${contact.role}`}
                    disabled={isLoading}
                    tabIndex={0}
                >
                    <OptimizedImage
                        src={contact.avatar}
                        alt={`${contact.name}'s avatar`}
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
                    onClick={() => onPageChange(currentPage + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Show next contacts"
                    disabled={isLoading}
                >
                    <ChevronRight className="w-4 h-4 text-gray-600" aria-hidden="true" />
                </button>
            )}
        </div>
    )
}

export default ContactList
