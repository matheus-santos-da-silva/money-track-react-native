import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NavigationContainer } from "@react-navigation/native";

export const Stack: FC = () => {
  const { userToken } = useAuth();

  return (
    <NavigationContainer>
      {userToken ? <ProtectedRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};
