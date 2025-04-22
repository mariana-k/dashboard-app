import { UseFormRegister, FieldValues } from 'react-hook-form'

interface FormInputProps {
  label: string
  name: string
  type?: string
  register: UseFormRegister<FieldValues>
  error?: string
  className?: string
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  className,
}: FormInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
