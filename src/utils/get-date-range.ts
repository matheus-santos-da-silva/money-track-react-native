import { toDateOnlyString } from "./date-only";

export const getDateRange = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const rawMonthName = firstDay.toLocaleDateString("pt-BR", { month: "long" });
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return {
    monthName: capitalize(rawMonthName),
    // Dia local (não toISOString): meia-noite local vira o dia anterior em UTC+.
    startDate: toDateOnlyString(firstDay),
    endDate: toDateOnlyString(lastDay),
  };
};
