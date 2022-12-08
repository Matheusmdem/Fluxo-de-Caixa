import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SumamryCard, SummaryContainer } from "./styles";


export function Summary() {
  return (
    <SummaryContainer>
      <SumamryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SumamryCard>

      <SumamryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SumamryCard>

      <SumamryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={30} color="#fff" />
        </header>
        <strong>R$ 17.400,00</strong>
      </SumamryCard>
    </SummaryContainer>
  )
}