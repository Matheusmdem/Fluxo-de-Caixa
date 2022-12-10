import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import {
  Paginate,
  PaginateButton,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'

const pageFormSchema = zod.object({
  page: zod.string()
})

type pageFormInputs = zod.infer<typeof pageFormSchema>

export function Transactions() {
  const { transactions, fetchTransactions } = useContext(TransactionsContext)

  const {
    control,
    handleSubmit,
  } = useForm<pageFormInputs>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      page: ""
    }
  })


  function handleChangePage(data: pageFormInputs) {
    fetchTransactions(data)
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>

        <form onSubmit={handleSubmit(handleChangePage)} >
          <Controller
            control={control}
            name="page"
            render={({ field }) => (
              <Paginate
                onValueChange={field.onChange}
                value={field.value}
              >
                <PaginateButton value='' type='submit'>
                  All
                </PaginateButton>
                <PaginateButton value='1' type='submit'>
                  1
                </PaginateButton>
                <PaginateButton value='2' type='submit'>
                  2
                </PaginateButton>
              </Paginate>
            )}
          />
        </form>
      </TransactionsContainer>
    </div>
  )
}
