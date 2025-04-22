import { cn } from '../lib/helpers/utils'

interface CardProps {
  balance: number
  cardHolder: string
  number: string
  expiryDate: string
  variant?: 'dark' | 'light'
}

export function PaymentCard({
  balance,
  cardHolder,
  number,
  expiryDate,
  variant = 'dark',
}: CardProps) {
  return (
    <div
      className={cn(
        'relative h-[13.75rem] w-[21.25rem] rounded-[1.25rem] p-6 pb-8 shrink-0',
        variant === 'dark'
          ? 'bg-[#1E1E1E] text-white'
          : 'bg-white text-gray-900 border border-gray-100'
      )}
      role="article"
      aria-label="Credit card"
    >
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <p className={cn('text-sm mb-1', variant === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
            Balance
          </p>
          <p className="text-2xl font-semibold">${balance.toLocaleString()}</p>
        </div>

        <div className="mt-auto">
          <p
            className={cn(
              'text-lg tracking-[0.25rem] mb-6',
              variant === 'dark' ? 'text-white' : 'text-gray-900'
            )}
            aria-label={`Card number: ${number}`}
          >
            {number}
          </p>

          <div className="flex justify-between items-end">
            <div>
              <p
                className={cn(
                  'text-xs mb-1',
                  variant === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}
              >
                CARD HOLDER
              </p>
              <p className="text-sm">{cardHolder}</p>
            </div>
            <div>
              <p
                className={cn(
                  'text-xs mb-1',
                  variant === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}
              >
                VALID THRU
              </p>
              <p className="text-sm">{expiryDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex gap-1" aria-hidden="true">
        <div
          className={cn(
            'h-4 w-4 rounded-full',
            variant === 'dark' ? 'bg-white/70' : 'bg-gray-400/70'
          )}
        />
        <div
          className={cn('h-4 w-4 rounded-full', variant === 'dark' ? 'bg-white' : 'bg-gray-400')}
        />
      </div>
    </div>
  )
}
