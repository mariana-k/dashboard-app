import { forwardRef, useMemo } from 'react'

interface AmountInputProps {
    amount: string
    error: string | null
    isLoading: boolean
    onAmountChange: (value: string) => void
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(({
    amount,
    error,
    isLoading,
    onAmountChange
}, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Allow empty input, numbers, and one decimal point with up to 2 decimal places
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            onAmountChange(value)
        }
    }

    const inputClassName = useMemo(() =>
        `w-full px-3 py-2 rounded-full bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400 pr-24 ${error ? 'border-red-500' : ''
        }`,
        [error]
    )

    const numericValue = useMemo(() =>
        amount ? parseFloat(amount) : 0,
        [amount]
    )

    return (
        <div className="flex items-center gap-2 mt-12">
            <label
                htmlFor="amount"
                className="text-sm text-gray-500 whitespace-nowrap font-medium"
            >
                Write Amount
            </label>
            <div className="relative flex-1">
                <input
                    ref={ref}
                    id="amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className={inputClassName}
                    disabled={isLoading}
                    aria-invalid={!!error}
                    aria-describedby={error ? "amount-error" : undefined}
                    aria-label="Transfer amount"
                    role="spinbutton"
                    aria-valuemin={0}
                    aria-valuenow={numericValue}
                />
            </div>
            {error && (
                <p
                    id="amount-error"
                    className="mt-2 text-sm text-red-500"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    )
})

AmountInput.displayName = 'AmountInput'

export default AmountInput
