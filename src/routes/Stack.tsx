import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const Stack: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.token ? <ProtectedRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};
