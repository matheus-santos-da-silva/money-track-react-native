export interface UpdateCategoryDTO {
  category_id: string;
  type: "EXPENSE" | "INCOME";
  token: string;
  name?: string;
  icon?: string;
}
