import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { SignUpUser } from "../services/SignUpService";
import { LoginUser } from "../services/LoginService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserToken = {
  token: string;
};

type AuthContextProps = {
  user: UserToken | null;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("@money-track-token!");
        if (userToken) {
          setUser(JSON.parse(userToken));
        } else {
          setUser(null);
        }
      } catch (error) {
        setError("Erro ao verificar autenticação");
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    const { success, message, userToken } = await LoginUser(email, password);
    setIsLoading(false);
    if (success && userToken) {
      await AsyncStorage.setItem(
        "@money-track-token!",
        JSON.stringify(userToken)
      );
      setUser(userToken);
      return success;
    } else {
      setError(message || "Erro de rede ou desconhecido");
      return success;
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    const { success, message, userToken } = await SignUpUser(email, password);
    setIsLoading(false);
    if (success && userToken) {
      await AsyncStorage.setItem(
        "@money-track-token!",
        JSON.stringify(userToken)
      );
      setUser(userToken);
      return success;
    } else {
      setError(message || "Erro de rede ou desconhecido");
      return success;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@money-track-token!");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
