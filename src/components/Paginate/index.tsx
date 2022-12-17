import { useContext, useState } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { MoreLessButton, PaginateButton, PaginateRoot } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CaretLeft, CaretRight } from 'phosphor-react'

const pageFormSchema = zod.object({
  page: zod.string(),
})

type pageFormInputs = zod.infer<typeof pageFormSchema>

export function Paginate() {
  const { totalTransactions, fetchTransactions, loading } =
    useContext(TransactionsContext)
  const [currentPage, setCurrentPage] = useState('')

  const { control, handleSubmit } = useForm<pageFormInputs>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      page: '',
    },
  })

  function handleChangePage(data: pageFormInputs) {
    fetchTransactions(data)
    setCurrentPage(data.page)
  }

  function decreasePages() {
    const newPage =
      Number(currentPage) === totalPages
        ? Number(currentPage) - 2
        : Number(currentPage) - 1

    if (newPage > maxSide) {
      setCurrentPage(String(newPage))
    }
  }

  function increasePages() {
    const newPage = Math.max(Number(currentPage) + 1, 3)

    if (newPage < totalPages) {
      setCurrentPage(String(newPage))
    }
  }

  const maxItens = 3
  const maxSide = (maxItens - 1) / 2

  const totalPages = Math.ceil(totalTransactions.length / 10)
  const firstPage = Math.max(Number(currentPage) - maxSide, 1)
  const finalPage = Math.max(
    Number(currentPage) === totalPages ? firstPage - 1 : firstPage,
    1,
  )

  const increaseButtonDisabled =
    totalPages <= 3 || Number(currentPage) >= totalPages - 1
  const decreaseButtonDisabled =
    totalPages <= 3 || Number(currentPage) <= maxSide + 1

  return (
    <form onSubmit={handleSubmit(handleChangePage)}>
      <Controller
        control={control}
        name="page"
        render={({ field }) => (
          <PaginateRoot
            onValueChange={field.onChange}
            value={field.value}
            disabled={loading}
          >
            <ul>
              <li>
                <PaginateButton value="" type="submit">
                  All
                </PaginateButton>
              </li>
              <li>
                <MoreLessButton
                  type="button"
                  onClick={() => decreasePages()}
                  disabled={decreaseButtonDisabled}
                >
                  <CaretLeft size={32} />
                </MoreLessButton>
              </li>
              {Array.from({ length: Math.min(maxItens, totalPages) })
                .map((_, index) => index + finalPage)
                .map((page) => {
                  return (
                    <li key={page}>
                      <PaginateButton value={String(page)} type="submit">
                        {page}
                      </PaginateButton>
                    </li>
                  )
                })}
              <li>
                <MoreLessButton
                  type="button"
                  onClick={() => increasePages()}
                  disabled={increaseButtonDisabled}
                >
                  <CaretRight size={32} />
                </MoreLessButton>
              </li>
            </ul>
          </PaginateRoot>
        )}
      />
    </form>
  )
}
