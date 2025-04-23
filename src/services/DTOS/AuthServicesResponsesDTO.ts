import { UserToken } from "../../contexts/AuthContext";

export interface AuthResponseDTO {
  success: boolean;
  message?: string;
  userToken?: UserToken;
}
