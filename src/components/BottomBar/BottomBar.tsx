import { styles } from "./BottomBarStyles";
import { FC, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";

import HomeIcon from "../../assets/images/home-svg.svg";
import AlignLeftIcon from "../../assets/images/align-left-svg.svg";
import ChartsIcon from "../../assets/images/bar-chart-svg.svg";
import UserIcon from "../../assets/images/user-svg.svg";
import BluePlusBTN from "../../assets/images/add-transaction-button.svg";
import { CreateTransactionTypeSelector } from "../CreateTransactionTypeSelector/CreateTransactionTypeSelector";

interface ButtonFieldProps {
  userProps: {
    id: string;
    name: string;
    token: string;
    month: number;
    year: number;
  };
}

type StackNavigation = {
  Menu: {
    id: string;
    name: string;
    token: string;
    month: number;
    year: number;
  };
  Transactions: {
    id: string;
    name: string;
    token: string;
    month: number;
    year: number;
  };
  CreateExpense: {
    token: string;
    user_id: string;
  };
  CreateIncome: {
    token: string;
    user_id: string;
  };
  Home: undefined;
};

export const BottomBar: FC<
  ButtonFieldProps & { onShowTypeSelector: () => void }
> = ({ userProps, onShowTypeSelector }) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const navigateTo = <type extends keyof StackNavigation>(screen: type) => {
    if (
      screen !== "Home" &&
      screen !== "CreateExpense" &&
      screen !== "CreateIncome"
    ) {
      navigation.navigate(screen, {
        id: userProps.id,
        name: userProps.name,
        token: userProps.token,
        month: userProps.month,
        year: userProps.year,
      });
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.bottomMenu}>
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => navigateTo("Home")}>
          <HomeIcon height="24" width="24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("Transactions")}>
          <AlignLeftIcon height="24" width="24" />
        </TouchableOpacity>
      </View>

      <View style={styles.svgContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={onShowTypeSelector}>
          <BluePlusBTN height="70" width="70" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconGroup}>
        <ChartsIcon height="24" width="24" />
        <TouchableOpacity onPress={() => navigateTo("Menu")}>
          <UserIcon height="24" width="24" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
