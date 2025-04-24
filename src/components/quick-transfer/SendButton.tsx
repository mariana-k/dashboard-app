import { Send, Loader2 } from 'lucide-react'

interface SendButtonProps {
  isLoading: boolean
  onClick: () => void
  disabled?: boolean
}

const SendButton = ({ isLoading, onClick, disabled }: SendButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 h-full px-4 bg-gray-900 text-white rounded-full flex items-center gap-1.5 font-medium hover:bg-gray-950 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
      disabled={isLoading || disabled}
      aria-label={isLoading ? 'Sending transfer...' : 'Send transfer'}
      aria-busy={isLoading}
      role="button"
      tabIndex={0}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : (
        <>
          <span className="text-sm">Send</span>
          <Send className="w-4 h-4 rotate-[35deg]" aria-hidden="true" />
        </>
      )}
    </button>
  )
}

export default SendButton
