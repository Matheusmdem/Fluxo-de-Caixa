import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface TransactionsProviderProps {
  children: ReactNode
}

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface Filters {
  query?: string;
  page?: string;
}

interface TransactionContextType {
  loading: boolean;
  transactions: Transaction[]
  totalTransactions: Transaction[]
  fetchTransactions: (filters?: Filters) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalTransactions, setTotalTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(filters?: Filters) {
    setLoading(true)
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        _page: filters?.page,
        q: filters?.query,
      },
    })

    setTransactions(response.data)
    setLoading(false)
  }

  async function fetchTotalTransactions() {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTotalTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
    fetchTotalTransactions()
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { category, description, price, type } = data

    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
    fetchTotalTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        transactions,
        totalTransactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
