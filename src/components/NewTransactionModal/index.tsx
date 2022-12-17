import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Transaction, TransactionsContext } from '../../contexts/TransactionsContext'
import { useContext } from 'react'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  type: zod.enum(['income', 'outcome']),
  category: zod.string(),
  price: zod.number(),
})

type NewTransationFormInputs = zod.infer<typeof newTransactionFormSchema>

interface EditTransaction {
  onEditTransaction?: Transaction
}

export function NewTransactionModal({ onEditTransaction }: EditTransaction) {
  const { createTransaction, editTransaction } = useContext(TransactionsContext)

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransationFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransationFormInputs) {
    const { category, description, price, type } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })
    reset()
  }

  async function handleEditTransaction(data: NewTransationFormInputs) {
    if (onEditTransaction?.id) {
      await editTransaction(data, onEditTransaction?.id)
    }
  }

  const haveAnId = onEditTransaction?.id

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <Dialog.Close asChild>
          <CloseButton>
            <X />
          </CloseButton>
        </Dialog.Close>
        <form onSubmit={haveAnId ? handleSubmit(handleEditTransaction) : handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            defaultValue={onEditTransaction?.description}
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            defaultValue={onEditTransaction?.price}
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            defaultValue={onEditTransaction?.category}
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                defaultValue={onEditTransaction?.type ?? field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />
          {haveAnId ? (
            <button type="submit" disabled={isSubmitting}>
              Atualizar
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          )}
        </form>
      </Content>
    </Dialog.Portal>
  )
}
