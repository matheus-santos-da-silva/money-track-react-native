export const formatAmount = (amount: number) => {
  return amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Valor em reais para exibição; oculto quando o usuário esconde os valores.
export const formatCurrency = (amount: number, isHidden = false) =>
  isHidden ? "R$ ••••" : `R$ ${formatAmount(amount)}`;

// "− R$ 251,90" ou "+ R$ 3.100,00": o sinal distingue saída de entrada sem depender da cor.
export const formatSignedCurrency = (amount: number) =>
  `${amount < 0 ? "−" : "+"} R$ ${formatAmount(Math.abs(amount))}`;
