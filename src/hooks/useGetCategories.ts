import { CategoryDTO } from "../services/DTOS/finance/CategoryDTO";
import { getCategories } from "../services/GetCategoriesService";
import { useEffect, useState } from "react";

interface useGetCategoriesDTO {
  token: string;
  type?: "EXPENSE" | "INCOME";
}

export const useGetCategories = ({ token, type }: useGetCategoriesDTO) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [categoriesError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    getCategories({ token, type })
      .then((res) => {
        if (res.success && res.categories) {
          setCategories(res.categories);
        } else {
          setError(res.message || "Erro desconhecido ao buscar as categorias.");
        }
      })
      .catch((error) => {
        setError(error.message || "Erro desconhecido.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, type]);

  return { categories, loading, categoriesError };
};
