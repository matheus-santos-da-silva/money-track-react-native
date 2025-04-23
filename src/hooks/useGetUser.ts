import { useEffect, useState } from "react";
import { getUser } from "../services/GetUserService";
import { UserDTO } from "../services/DTOS/UserDTO";

export const useGetUser = (token: string) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getUser(token)
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          setError(res.message || "Erro desconhecido ao buscar usuário.");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [token]);

  return { user, error };
};
