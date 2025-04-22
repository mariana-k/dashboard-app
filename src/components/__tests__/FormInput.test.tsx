import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormInput } from '../settings/FormInput'

describe('FormInput', () => {
  const mockRegister = jest.fn().mockReturnValue({})

  it('renders with label and input', () => {
    render(<FormInput label="Test Label" name="test" register={mockRegister} />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies custom type', () => {
    render(<FormInput label="Password" name="password" type="password" register={mockRegister} />)

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })

  it('displays error message when provided', () => {
    render(
      <FormInput
        label="Test Label"
        name="test"
        register={mockRegister}
        error="This field is required"
      />
    )

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  it('applies custom className', () => {
    render(
      <FormInput label="Test Label" name="test" register={mockRegister} className="custom-class" />
    )

    expect(screen.getByText('Test Label').parentElement).toHaveClass('custom-class')
  })
})
