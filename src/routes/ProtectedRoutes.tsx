import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home/Home";
import { Menu } from "../screens/Menu/Menu";
import { Transactions } from "../screens/Transactions/Transactions";

const { Screen, Navigator } = createNativeStackNavigator();

export const ProtectedRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Menu" component={Menu} />
      <Screen name="Transactions" component={Transactions} />
    </Navigator>
  );
};
