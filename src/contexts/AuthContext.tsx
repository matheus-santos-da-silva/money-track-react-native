import { UserDTO } from "../services/DTOS/UserDTO";
import { LoginUser } from "../services/LoginService";
import { useGetUser } from "../hooks/useGetUser";
import { SignUpProps, SignUpUser } from "../services/SignUpService";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserToken = {
  token: string;
};

type AuthContextProps = {
  userToken: UserToken | null;
  user: UserDTO | null;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (data: SignUpProps) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => void;
  isLoading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    user,
    error: userError,
    refetch,
  } = useGetUser(userToken?.token ?? "");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("@money-track-token!");
        if (userToken) {
          setUserToken(JSON.parse(userToken));
        } else {
          setUserToken(null);
        }
      } catch (error) {
        setError("Erro ao verificar autenticação");
      }
    };

    checkAuthStatus();
  }, []);

  const isPremium =
    user?.plan === "PREMIUM" ||
    (user?.plan === "FREE" && new Date(user.trialEndsAt) >= new Date());

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    const { success, message, userToken } = await LoginUser(email, password);
    setIsLoading(false);
    if (success && userToken) {
      await AsyncStorage.setItem(
        "@money-track-token!",
        JSON.stringify(userToken),
      );
      setUserToken(userToken);
      return success;
    } else {
      setError(message || "Erro de rede ou desconhecido");
      return success;
    }
  };

  const signUp = async ({
    email,
    name,
    password,
  }: SignUpProps): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    const { success, message, userToken } = await SignUpUser({
      email,
      name,
      password,
    });
    setIsLoading(false);
    if (success && userToken) {
      await AsyncStorage.setItem(
        "@money-track-token!",
        JSON.stringify(userToken),
      );
      setUserToken(userToken);
      return success;
    } else {
      setError(message || "Erro de rede ou desconhecido");
      return success;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@money-track-token!");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        isPremium,
        refreshUser: refetch,
        login,
        signUp,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
