import { CategoryDTO } from "./CategoryDTO";

export interface CreateCategoryResponseDTO {
  success: boolean;
  message?: string;
  category?: CategoryDTO;
}
