import { getUser } from "../services/GetUserService";
import { UserDTO } from "../services/DTOS/UserDTO";
import { useEffect, useState, useCallback } from "react";

export const useGetUser = (token: string) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getUser(token);
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        setError(res.message || "Erro desconhecido ao buscar usuário.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar usuário");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, error, loading, refetch };
};
