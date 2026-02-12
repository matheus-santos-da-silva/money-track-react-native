import { FC } from "react";
import { styles } from "./BottomBarStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";

import HomeIcon from "../../assets/images/home-svg.svg";
import AlignLeftIcon from "../../assets/images/align-left-svg.svg";
import ChartsIcon from "../../assets/images/bar-chart-svg.svg";
import UserIcon from "../../assets/images/user-svg.svg";
import BluePlusBTN from "../../assets/images/add-transaction-button.svg";

interface ButtonFieldProps {
  userProps: {
    id: string;
    name: string;
    email?: string;
    token: string;
    month: number;
    year: number;
  };
}

type StackNavigation = {
  Menu: {
    month: number;
    year: number;
  };

  Transactions: {
    month: number;
    year: number;
  };

  Dashboard: {
    month: number;
    year: number;
  };

  Home: undefined;
  CreateExpense: undefined;
  CreateIncome: undefined;
};

export const BottomBar: FC<
  ButtonFieldProps & { onShowTypeSelector: () => void }
> = ({ userProps, onShowTypeSelector }) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const navigateTo = (screen: keyof StackNavigation) => {
    if (
      screen === "Menu" ||
      screen === "Transactions" ||
      screen === "Dashboard"
    ) {
      navigation.navigate(screen, {
        month: userProps.month,
        year: userProps.year,
      });
    } else {
      navigation.navigate(screen);
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
        <TouchableOpacity onPress={() => navigateTo("Dashboard")}>
          <ChartsIcon height="24" width="24" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("Menu")}>
          <UserIcon height="24" width="24" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
