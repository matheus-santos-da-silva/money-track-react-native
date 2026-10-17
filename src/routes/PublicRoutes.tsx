import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login/Login";
import { SignUp } from "../screens/SignUp/SignUp";
import { Welcome } from "../screens/Welcome/Welcome";
import { ProfileCompletion } from "../screens/ProfileCompletion/ProfileCompletion";

const { Screen, Navigator } = createNativeStackNavigator();

export const PublicRoutes: React.FC = () => {
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ProfileCompletion" component={ProfileCompletion} />
    </Navigator>
  );
};
