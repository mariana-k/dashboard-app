import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import QuickTransfer from '../QuickTransfer'
import React from 'react'

describe('QuickTransfer', () => {
  const mockContacts = [
    { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', role: 'user' },
    { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', role: 'user' },
  ]

  it('renders transfer form with correct elements', () => {
    render(<QuickTransfer contacts={mockContacts} />)

    expect(screen.getByText('Quick Transfer')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Write Amount')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('displays contact list correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)

    mockContacts.forEach(contact => {
      expect(screen.getByText(contact.name)).toBeInTheDocument()
    })
  })

  it('handles amount input correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)
    const amountInput = screen.getByPlaceholderText('Write Amount')

    fireEvent.change(amountInput, { target: { value: '100' } })
    expect(amountInput).toHaveValue('100')
  })

  it('handles contact selection correctly', () => {
    render(<QuickTransfer contacts={mockContacts} />)
    const firstContactButton = screen.getByRole('button', {
      name: `Select ${mockContacts[0].name}`,
    })

    fireEvent.click(firstContactButton)
    expect(firstContactButton).toHaveClass('ring-2 ring-primary')
  })
})
