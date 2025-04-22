import { User, Card, Transaction } from '../../store/atoms'

export async function fetchUser(): Promise<User> {
  const response = await fetch('https://dummyjson.com/users/1')
  const data = await response.json()
  return {
    id: data.id.toString(),
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    avatar: data.image,
  }
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://dummyjson.com/users?limit=5')
  const data = await response.json()
  return data.users.map(
    (user: { id: number; firstName: string; lastName: string; email: string; image: string }) => ({
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatar: user.image,
    })
  )
}

export async function fetchCards(): Promise<Card[]> {
  // Simulated API call
  return [
    {
      id: '1',
      number: '3778 **** **** 1234',
      balance: 5756.0,
      cardHolder: 'Eddy Cusuma',
      expiryDate: '12/22',
      type: 'visa',
    },
    {
      id: '2',
      number: '3778 **** **** 1234',
      balance: 5756.0,
      cardHolder: 'Eddy Cusuma',
      expiryDate: '12/22',
      type: 'mastercard',
    },
  ]
}

export async function fetchTransactions(): Promise<Transaction[]> {
  // Simulated API call
  return [
    {
      id: '1',
      description: 'Deposit from my Card',
      amount: -850,
      date: '28 January 2021',
      type: 'debit',
      category: 'Transfer',
    },
    {
      id: '2',
      description: 'Deposit Paypal',
      amount: 2500,
      date: '25 January 2021',
      type: 'credit',
      category: 'Transfer',
    },
    {
      id: '3',
      description: 'Jemi Wilson',
      amount: 5400,
      date: '21 January 2021',
      type: 'credit',
      category: 'Transfer',
    },
  ]
}
