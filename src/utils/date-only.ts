// A data de uma transação é um DIA de calendário, não um instante. O app envia
// "AAAA-MM-DD" e o servidor devolve o dia gravado às 12:00 UTC
// ("2026-10-05T12:00:00.000Z"). Estas funções evitam toISOString()/getters locais em
// valores de servidor, que erram o dia conforme o fuso do aparelho.

const pad = (value: number) => String(value).padStart(2, "0");

// Dia LOCAL de um Date no formato AAAA-MM-DD (o que o backend espera).
export const toDateOnlyString = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Dia (AAAA-MM-DD) de uma data vinda do servidor, como string ISO ou Date.
export const dateOnlyKey = (value: string | Date): string => {
  if (typeof value === "string") return value.slice(0, 10);

  return `${value.getUTCFullYear()}-${pad(value.getUTCMonth() + 1)}-${pad(
    value.getUTCDate(),
  )}`;
};

// Date local à meia-noite do dia do servidor: serve para exibir e para o seletor de data.
export const parseDateOnly = (value: string | Date): Date => {
  const [year, month, day] = dateOnlyKey(value).split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Hoje, no dia local do aparelho.
export const todayKey = (now = new Date()): string => toDateOnlyString(now);
