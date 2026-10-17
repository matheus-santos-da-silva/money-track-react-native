import { FC } from "react";
import { Colors } from "../../styles/colors";
import { SvgProps } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { BAR_HEIGHT, styles } from "./BottomBarStyles";
import { Text, TouchableOpacity, View } from "react-native";

import HomeIcon from "../../assets/images/icons/home.svg";
import ListIcon from "../../assets/images/icons/list.svg";
import PlusIcon from "../../assets/images/icons/plus.svg";
import UserIcon from "../../assets/images/icons/user.svg";
import BarChartIcon from "../../assets/images/icons/bar-chart.svg";

export type BottomBarTab = "Home" | "Transactions" | "Dashboard" | "Menu";

type StackNavigation = Record<BottomBarTab, { month: number; year: number }>;

interface BottomBarProps {
  active: BottomBarTab;
  month: number;
  year: number;
  onShowTypeSelector: () => void;
}

interface TabConfig {
  screen: BottomBarTab;
  label: string;
  Icon: FC<SvgProps>;
}

const LEFT_TABS: TabConfig[] = [
  { screen: "Home", label: "Início", Icon: HomeIcon },
  { screen: "Transactions", label: "Extrato", Icon: ListIcon },
];

const RIGHT_TABS: TabConfig[] = [
  { screen: "Dashboard", label: "Relatórios", Icon: BarChartIcon },
  { screen: "Menu", label: "Perfil", Icon: UserIcon },
];

export const BottomBar: FC<BottomBarProps> = ({
  active,
  month,
  year,
  onShowTypeSelector,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();

  const renderTab = ({ screen, label, Icon }: TabConfig) => {
    const isActive = screen === active;
    const color = isActive ? Colors.brandBlue : Colors.muted;

    return (
      <TouchableOpacity
        key={screen}
        style={styles.tab}
        activeOpacity={0.7}
        onPress={() => navigation.navigate(screen, { month, year })}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: isActive }}
      >
        <Icon width={22} height={22} color={color} />
        <Text
          style={[styles.tabLabel, isActive && styles.tabLabelActive, { color }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    // box-none: a faixa transparente acima da barra não bloqueia o conteúdo da tela.
    <View style={styles.wrapper} pointerEvents="box-none">
      <View
        style={[
          styles.bar,
          { height: BAR_HEIGHT + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        {LEFT_TABS.map(renderTab)}
        <View style={styles.fabSlot} />
        {RIGHT_TABS.map(renderTab)}
      </View>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.9}
        onPress={onShowTypeSelector}
        accessibilityRole="button"
        accessibilityLabel="Novo lançamento"
      >
        <PlusIcon width={26} height={26} color={Colors.surface} />
      </TouchableOpacity>
    </View>
  );
};
