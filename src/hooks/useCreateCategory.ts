import { useState } from "react";
import { CategoryDTO } from "../services/DTOS/finance/CategoryDTO";
import { createCategory } from "../services/CreateCategoryService";
import { CreateCategoryDTO } from "../services/DTOS/finance/CreateCategoryDTO";

export const useCreateCategory = () => {
  const [category, setCategory] = useState<CategoryDTO>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (data: CreateCategoryDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await createCategory(data);

      if (res.success && res.category) {
        setCategory(res.category);
        return res.category;
      } else {
        setError(res.message || "Erro desconhecido ao criar a categoria.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    category,
    error,
    loading,
  };
};
