import { useState } from "react";
import { updateCategory } from "../services/UpdateCategoryService";
import { UpdateCategoryDTO } from "../services/DTOS/finance/UpdateCategoryDTO";

export const useUpdateCategory = () => {
  const [updateCategoryLoading, setUpdateCategoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (data: UpdateCategoryDTO) => {
    setUpdateCategoryLoading(true);
    setError(null);

    try {
      const res = await updateCategory(data);

      if (res.success) {
        return res.success;
      } else {
        setError(res.message || "Erro desconhecido ao atualizar a categoria.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
      return null;
    } finally {
      setUpdateCategoryLoading(false);
    }
  };

  return {
    update,
    error,
    updateCategoryLoading,
  };
};
