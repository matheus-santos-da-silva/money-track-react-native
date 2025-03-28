import { UserDTO } from "./UserDTO";

export interface UserServiceResponseDTO {
  success: boolean;
  message?: string;
  user?: UserDTO;
}
