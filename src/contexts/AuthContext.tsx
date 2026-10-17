import { UserDTO } from "../services/DTOS/UserDTO";
import { LoginUser } from "../services/LoginService";
import { useGetUser } from "../hooks/useGetUser";
import { AuthFailure } from "../utils/auth-errors";
import { AuthResponseDTO } from "../services/DTOS/AuthServicesResponsesDTO";
import { SignUpProps, SignUpUser } from "../services/SignUpService";
import axios from "axios";
import { FINANCE_SERVICE_URL, USERS_SERVICE_URL } from "@env";
import { showSnackBar } from "../utils/show-snack-bar";
import { createSessionExpiredHandler } from "../utils/session-expired-handler";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserToken = {
  token: string;
};

type AuthContextProps = {
  userToken: UserToken | null;
  user: UserDTO | null;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signUp: (data: SignUpProps) => Promise<AuthResult>;
  logout: () => void;
  refreshUser: () => void;
  isLoading: boolean;
  isBootstrapping: boolean;
};

export type AuthResult = { success: boolean } & AuthFailure;

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

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
      } catch {
        setUserToken(null);
      } finally {
        setIsTokenChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  // Só a primeira verificação conta: depois de pronto, login e logout não voltam a bloquear.
  useEffect(() => {
    const hasSettled = !userToken || user !== null || userError !== null;
    if (isBootstrapping && isTokenChecked && hasSettled) {
      setIsBootstrapping(false);
    }
  }, [isBootstrapping, isTokenChecked, userToken, user, userError]);

  const isPremium = user?.isPremium ?? false;

  const authenticate = async (
    request: Promise<AuthResponseDTO>
  ): Promise<AuthResult> => {
    setIsLoading(true);
    const { success, message, status, userToken } = await request;
    setIsLoading(false);

    if (success && userToken) {
      await AsyncStorage.setItem(
        "@money-track-token!",
        JSON.stringify(userToken)
      );
      setUserToken(userToken);
      return { success: true };
    }

    return { success: false, message, status };
  };

  const login = (email: string, password: string) =>
    authenticate(LoginUser(email, password));

  const signUp = (data: SignUpProps) => authenticate(SignUpUser(data));

  const logout = async () => {
    await AsyncStorage.removeItem("@money-track-token!");
    setUserToken(null);
  };

  // 401 em qualquer chamada autenticada = token expirado/inválido: encerra a sessão.
  // É recriado a cada novo token, o que também reinicia o "avisar só uma vez".
  useEffect(() => {
    const token = userToken?.token;
    if (!token) return;

    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      createSessionExpiredHandler({
        apiUrls: [USERS_SERVICE_URL, FINANCE_SERVICE_URL],
        token,
        onSessionExpired: () => {
          showSnackBar("Sua sessão expirou. Faça login novamente.", "#de525a");
          logout();
        },
      })
    );

    return () => axios.interceptors.response.eject(interceptorId);
  }, [userToken?.token]);

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
        isBootstrapping,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
