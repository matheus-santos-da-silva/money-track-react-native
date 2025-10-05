export interface CreateCategoryDTO {
  type: "EXPENSE" | "INCOME";
  token: string;
  name: string;
  icon: string;
  created_at: string;
}
