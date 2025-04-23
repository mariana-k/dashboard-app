import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import QuickTransfer from '../QuickTransfer'
import React from 'react'

describe('QuickTransfer', () => {
  const mockContacts = [
    { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', role: 'User' },
    { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', role: 'User' },
  ]

  it('renders transfer form with correct elements', () => {
    render(<QuickTransfer contacts={mockContacts} />)

    expect(screen.getByText('Quick Transfer')).toBeInTheDocument()
    expect(screen.getByLabelText('Write Amount')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('displays contact list correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)

    mockContacts.forEach(contact => {
      const nameElement = screen.getByText(contact.name)
      expect(nameElement).toBeInTheDocument()
      expect(nameElement.nextElementSibling).toHaveTextContent(contact.role)

      const contactButton = nameElement.closest('button')
      expect(contactButton).toBeInTheDocument()
      expect(contactButton).toHaveAttribute('aria-label', `Select ${contact.name}`)
    })
  })

  it('handles amount input correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)
    const amountInput = screen.getByLabelText('Write Amount')

    fireEvent.change(amountInput, { target: { value: '100' } })
    expect(amountInput).toHaveValue('100')
  })

  it('handles contact selection correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)
    const firstContact = screen.getByText(mockContacts[0].name)
    const contactButton = firstContact.closest('button')

    if (!contactButton) throw new Error('Contact button not found')

    fireEvent.click(contactButton)
    expect(contactButton).toHaveClass('ring-2')
    expect(contactButton).toHaveClass('ring-primary')
  })
})
