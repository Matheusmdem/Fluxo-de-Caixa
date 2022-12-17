import { Pencil, Trash } from 'phosphor-react'
import { useContext, useState } from 'react'
import { Header } from '../../components/Header'
import { Paginate } from '../../components/Paginate'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import {
  DeleteEditButton,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { DeleteAlertDialog } from '../../components/DeleteAlertDialog'
import { NewTransactionModal } from '../../components/NewTransactionModal'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

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
                    <AlertDialog.Trigger asChild disabled={loading}>
                      <DeleteEditButton variant="delete">
                        <Trash size={20} />
                      </DeleteEditButton>
                    </AlertDialog.Trigger>
                    <DeleteAlertDialog onDelete={transaction.id} />
                  </AlertDialog.Root>
                </td>
                <td>
                  <Dialog.Root >
                    <Dialog.Trigger asChild>
                      <DeleteEditButton variant="edit">
                        <Pencil size={20} />
                      </DeleteEditButton>
                    </Dialog.Trigger>
                    <NewTransactionModal
                      onEditTransaction={transaction}
                    />
                  </Dialog.Root>
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
