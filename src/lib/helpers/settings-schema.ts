import { z } from 'zod'

export const settingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Please use format DD/MM/YYYY'),
  presentAddress: z.string().min(5, 'Address must be at least 5 characters'),
  permanentAddress: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().regex(/^\d{5}$/, 'Please enter a valid 5-digit postal code'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
})

export type SettingsFormData = z.infer<typeof settingsSchema>
