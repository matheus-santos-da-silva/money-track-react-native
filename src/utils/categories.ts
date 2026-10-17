export const CATEGORY_NAME_MIN_LENGTH = 3;
export const CATEGORY_NAME_MAX_LENGTH = 20;

export interface CategoryOption {
  value: string;
  label: string;
}

export const CATEGORY_ICONS: CategoryOption[] = [
  { value: "food", label: "Alimentação" },
  { value: "transport", label: "Transporte" },
  { value: "home", label: "Casa" },
  { value: "leisure", label: "Lazer" },
  { value: "travel", label: "Viagem" },
  { value: "investment", label: "Investimento" },
  { value: "education", label: "Educação" },
  { value: "subscriptions", label: "Assinaturas" },
  { value: "health", label: "Saúde" },
  { value: "wage", label: "Salário" },
  { value: "extraincome", label: "Renda extra" },
];

export const CATEGORY_COLORS: CategoryOption[] = [
  { value: "#C2410C", label: "Laranja" },
  { value: "#B45309", label: "Âmbar" },
  { value: "#A16207", label: "Mostarda" },
  { value: "#4D7C0F", label: "Oliva" },
  { value: "#15803D", label: "Verde" },
  { value: "#0F766E", label: "Verde-água" },
  { value: "#0E7490", label: "Ciano" },
  { value: "#1D4ED8", label: "Azul" },
  { value: "#4338CA", label: "Índigo" },
  { value: "#6D28D9", label: "Violeta" },
  { value: "#A21CAF", label: "Magenta" },
  { value: "#BE185D", label: "Rosa" },
  { value: "#BE123C", label: "Vermelho" },
  { value: "#78350F", label: "Marrom" },
  { value: "#475569", label: "Cinza" },
  { value: "#1F2937", label: "Grafite" },
];

export interface CategoryForm {
  name: string;
  icon: string;
  color: string;
}

// O ícone salvo tem o formato `${cor}-${icone}`.
export const parseCategoryIcon = (value?: string) => {
  const [color = "", icon = ""] = value ? value.split("-") : [];
  return { color, icon };
};

export const formatCategoryIcon = (color: string, icon: string) =>
  `${color}-${icon}`;

// Uma cor fora da paleta (de antes da troca) entra no início, para não se perder ao editar.
export const colorOptions = (current: string): CategoryOption[] => {
  const isInPalette = CATEGORY_COLORS.some(
    (option) => option.value.toLowerCase() === current.toLowerCase()
  );

  if (!current || isInPalette) return CATEGORY_COLORS;

  return [{ value: current, label: "Cor atual" }, ...CATEGORY_COLORS];
};

export const categoryNameError = (name: string) => {
  const length = name.trim().length;
  return name !== "" && length < CATEGORY_NAME_MIN_LENGTH
    ? `Use pelo menos ${CATEGORY_NAME_MIN_LENGTH} caracteres.`
    : null;
};

const isNameValid = (name: string) => {
  const length = name.trim().length;
  return (
    length >= CATEGORY_NAME_MIN_LENGTH && length <= CATEGORY_NAME_MAX_LENGTH
  );
};

export const canSaveCategory = (
  form: CategoryForm,
  original?: CategoryForm
) => {
  if (!isNameValid(form.name) || !form.icon || !form.color) return false;
  if (!original) return true;

  return (
    form.name.trim() !== original.name ||
    form.icon !== original.icon ||
    form.color !== original.color
  );
};

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export const matchesCategorySearch = (name: string, query: string) =>
  normalize(name).includes(normalize(query));
