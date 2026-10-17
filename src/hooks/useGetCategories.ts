import { CategoryDTO } from "../services/DTOS/finance/CategoryDTO";
import { getCategories } from "../services/GetCategoriesService";
import { useCallback, useEffect, useState } from "react";

type TransactionType = "EXPENSE" | "INCOME";

const cache: Record<TransactionType, CategoryDTO[]> = {
  INCOME: [],
  EXPENSE: [],
};

interface UseGetCategoriesDTO {
  token: string;
  type: TransactionType;
}

export const useGetCategories = ({ token, type }: UseGetCategoriesDTO) => {
  const [categories, setCategories] = useState<CategoryDTO[]>(cache[type]);
  const [loading, setLoading] = useState(!cache[type].length);
  const [categoriesError, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(
    async ({
      fetchType,
      resetCache = false,
    }: { fetchType?: TransactionType; resetCache?: boolean } = {}) => {
      const currentType = fetchType || type;
      if (!token || !currentType) return;

      if (!resetCache && cache[currentType].length > 0) {
        setCategories(cache[currentType]);

        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await getCategories({ token, type });
        if (res.success && res.categories) {
          cache[type] = res.categories;
          if (currentType === type) setCategories(res.categories);
        } else {
          setError(res.message || "Erro desconhecido ao buscar as categorias.");
        }
      } catch (error: any) {
        setError(error.message || "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    },
    [token, type]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, categoriesError, refetch: fetchCategories };
};
