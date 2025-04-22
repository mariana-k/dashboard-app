interface FormButtonProps {
    type?: 'submit' | 'button';
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const FormButton = ({ type = 'button', disabled, className, children }: FormButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}; 