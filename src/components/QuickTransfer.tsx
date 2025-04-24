import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import ContactList from './quick-transfer/ContactList'
import AmountInput from './quick-transfer/AmountInput'
import SendButton from './quick-transfer/SendButton'

interface Contact {
  id: string
  name: string
  role: string
  avatar: string
}

interface QuickTransferProps {
  contacts: Contact[]
  onTransfer?: (contactId: string, amount: number) => Promise<void>
}

const QuickTransfer = ({ contacts, onTransfer }: QuickTransferProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const amountInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedContact && amountInputRef.current) {
      amountInputRef.current.focus()
    }
  }, [selectedContact])

  const handleContactSelect = useCallback((id: string) => {
    setSelectedContact(id)
    setError(null)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value)
    setError(null)
  }, [])

  const handleTransfer = useCallback(async () => {
    if (!selectedContact) {
      setError('Please select a contact')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      await onTransfer?.(selectedContact, parseFloat(amount))
      setAmount('')
      setSelectedContact(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed')
    } finally {
      setIsLoading(false)
    }
  }, [selectedContact, amount, onTransfer])

  const isTransferDisabled = useMemo(() =>
    !selectedContact || !amount || isLoading,
    [selectedContact, amount, isLoading]
  )

  return (
    <div role="region" aria-label="Quick Transfer">
      <h2 className="text-lg lg:text-xl font-semibold mb-4">Quick Transfer</h2>
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="h-[200px]">
          <ContactList
            contacts={contacts}
            currentPage={currentPage}
            selectedContact={selectedContact}
            onContactSelect={handleContactSelect}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
          <div className="relative flex-1">
            <AmountInput
              amount={amount}
              error={error}
              isLoading={isLoading}
              onAmountChange={handleAmountChange}
              ref={amountInputRef}
            />
            <SendButton
              isLoading={isLoading}
              onClick={handleTransfer}
              disabled={isTransferDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickTransfer
