import { Trash } from 'phosphor-react'
import { useContext } from 'react'
import { Header } from '../../components/Header'
import { Paginate } from '../../components/Paginate'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  DeleteButton,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { DeleteAlertDialog } from '../../components/DeleteAlertDialog'



export function Transactions() {
  const { transactions, loading } = useContext(TransactionsContext)

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
                <td>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger
                      asChild
                      disabled={loading}
                    >
                      <DeleteButton>
                        <Trash size={20} />
                      </DeleteButton>
                    </AlertDialog.Trigger>
                    <DeleteAlertDialog
                      deleteId={transaction.id}
                    />
                  </AlertDialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
        <Paginate />
      </TransactionsContainer>
    </div>
  )
}
