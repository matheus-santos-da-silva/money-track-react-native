import { CategoryDTO } from "./finance/CategoryDTO";

export interface GetCategoriesResponseDTO {
  success: boolean;
  message?: string;
  categories?: CategoryDTO[];
}
