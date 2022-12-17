import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface TransactionsProviderProps {
  children: ReactNode
}

export interface Transaction {
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

interface EditTransactionInput {
  id: number;
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
  deleteTransaction: (id: number) => Promise<void>
  editTransaction: (data: CreateTransactionInput, id: number) => Promise<void>
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
    const response = await api.get('/transactions')

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

  async function editTransaction(data: CreateTransactionInput, id: number) {
    const { category, description, price, type } = data

    await api.put(`/transactions/${id}`, {
      description,
      price,
      category,
      type,
    })

    const copyTransaction = [...transactions]
    const transactionIndex = copyTransaction.findIndex((item) => item.id === id)

    if (transactionIndex >= 0) {
      copyTransaction[transactionIndex].category = data.category
      copyTransaction[transactionIndex].description = data.description
      copyTransaction[transactionIndex].price = data.price
      copyTransaction[transactionIndex].type = data.type
    }

    setTransactions(copyTransaction)
  }

  async function deleteTransaction(id: number) {
    setLoading(true)

    const deletedTransaction = transactions.filter(transaction => {
      return transaction.id !== id
    })
    await api.delete(`/transactions/${id}`)

    setTransactions(deletedTransaction)
    fetchTotalTransactions()
    setLoading(false)
  }

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        transactions,
        totalTransactions,
        fetchTransactions,
        createTransaction,
        editTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
