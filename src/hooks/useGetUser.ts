import { useEffect, useState } from "react";
import { getUser } from "../services/UserService";
import { UserDTO } from "../services/DTOS/UserDTO";

export const useGetUser = (token: string) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("Chamei o useGetUser", token);

  useEffect(() => {
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
        console.log(error);
      });
  }, []);

  return { user, error };
};
