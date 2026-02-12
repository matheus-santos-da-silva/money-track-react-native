import { FC } from "react";
import { Home } from "../screens/Home/Home";
import { Menu } from "../screens/Menu/Menu";
import { Plans } from "../screens/Plans/Plans";
import { Dashboard } from "../screens/Dashboard/Dashboard";
import { EditProfile } from "../screens/EditProfile/EditProfile";
import { EditPassword } from "../screens/EditPassword/EditPassword";
import { Transactions } from "../screens/Transactions/Transactions";
import { CreateIncome } from "../screens/Create-Income/CreateIncome";
import { CreateExpense } from "../screens/Create-Expense/CreateExpense";
import { CategoriesList } from "../screens/CategoryList/CategoriesList";
import { HandleCategory } from "../screens/HandleCategory/HandleCategory";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

export const ProtectedRoutes: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Menu" component={Menu} />
      <Screen name="Transactions" component={Transactions} />
      <Screen name="CreateExpense" component={CreateExpense} />
      <Screen name="CreateIncome" component={CreateIncome} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="EditPassword" component={EditPassword} />
      <Screen name="CategoriesList" component={CategoriesList} />
      <Screen name="HandleCategory" component={HandleCategory} />
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Plans" component={Plans} />
    </Navigator>
  );
};
