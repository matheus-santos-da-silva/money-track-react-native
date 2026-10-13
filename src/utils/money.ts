// Somar valores em reais com float acumula erro (0.1 + 0.2 = 0.30000000000000004).
// Os cálculos são feitos em centavos inteiros e só voltam a reais no final.

export const toCents = (amount: number): number => Math.round(amount * 100);

export const fromCents = (cents: number): number => cents / 100;

export const sumAmounts = (amounts: number[]): number =>
  fromCents(amounts.reduce((total, amount) => total + toCents(amount), 0));

export const subtractAmounts = (a: number, b: number): number =>
  fromCents(toCents(a) - toCents(b));
