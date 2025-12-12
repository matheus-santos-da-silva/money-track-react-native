import { useState } from "react";
import { DeleteCategory } from "../services/DeleteCategoryService";
import { DeleteCategoryDTO } from "../services/DTOS/DeleteCategoryDTO";

export const useDeleteCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteCategory = async (data: DeleteCategoryDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await DeleteCategory(data);

      if (res.success) {
        return res.success;
      } else {
        setError(res.message || "Erro desconhecido ao deletar a categoria.");
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
    deleteCategory,
    error,
    loading,
  };
};
