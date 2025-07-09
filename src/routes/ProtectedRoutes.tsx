import React from "react";
import { Home } from "../screens/Home/Home";
import { Menu } from "../screens/Menu/Menu";
import { Transactions } from "../screens/Transactions/Transactions";
import { CreateIncome } from "../screens/Create-Income/CreateIncome";
import { CreateExpense } from "../screens/Create-Expense/CreateExpense";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

export const ProtectedRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Menu" component={Menu} />
      <Screen name="Transactions" component={Transactions} />
      <Screen name="CreateExpense" component={CreateExpense} />
      <Screen name="CreateIncome" component={CreateIncome} />
    </Navigator>
  );
};
