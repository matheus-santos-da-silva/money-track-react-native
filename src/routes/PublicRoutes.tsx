import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login/Login";
import { SignUp } from "../screens/SignUp/SignUp";
import { ProfileCompletion } from "../screens/ProfileCompletion/ProfileCompletion";

const { Screen, Navigator } = createNativeStackNavigator();

export const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ProfileCompletion" component={ProfileCompletion} />
    </Navigator>
  );
};
