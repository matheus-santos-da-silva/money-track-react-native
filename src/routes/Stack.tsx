import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../screens/Login/Login";
import { SignUp } from "../screens/SignUp/SignUp";
import { SafeAreaView } from "react-native";

const StackNavigator = createNativeStackNavigator();

export const Stack: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
        <StackNavigator.Screen name="Login" component={Login} />
        <StackNavigator.Screen name="SignUp" component={SignUp} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
