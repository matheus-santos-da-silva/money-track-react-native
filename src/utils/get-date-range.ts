export const getDateRange = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const rawMonthName = firstDay.toLocaleDateString("pt-BR", { month: "long" });
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return {
    monthName: capitalize(rawMonthName),
    startDate: firstDay.toISOString().split("T")[0],
    endDate: lastDay.toISOString().split("T")[0],
  };
};
