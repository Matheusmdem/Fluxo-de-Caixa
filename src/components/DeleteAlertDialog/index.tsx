import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Action, Cancel, Content, Description, Overlay } from './styles'

interface DeleteTransaction {
  onDelete: number
}

export function DeleteAlertDialog({ onDelete }: DeleteTransaction) {
  const { deleteTransaction } = useContext(TransactionsContext)

  function handleDeleteTransaction(id: number) {
    deleteTransaction(id)
  }

  return (
    <AlertDialog.Portal>
      <Overlay />
      <Content>
        <AlertDialog.Title>Você tem certeza?</AlertDialog.Title>
        <Description>
          Essa ação não pode ser defeita. Isso irá deletar permanentemente seu
          dado do banco!
        </Description>
        <div className="actionButtons">
          <Cancel>Cancelar</Cancel>
          <Action onClick={() => handleDeleteTransaction(onDelete)}>
            Deletar
          </Action>
        </div>
      </Content>
    </AlertDialog.Portal>
  )
}
