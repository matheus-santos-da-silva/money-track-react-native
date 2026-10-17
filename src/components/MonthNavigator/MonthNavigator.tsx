import { FC } from "react";
import { styles } from "./MonthNavigatorStyles";
import { Colors } from "../../styles/colors";
import { Text, TouchableOpacity, View } from "react-native";

import ChevronDownIcon from "../../assets/images/icons/chevron-down.svg";
import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";
import ChevronRightIcon from "../../assets/images/icons/chevron-right.svg";

interface MonthNavigatorProps {
  label: string;
  onPress: () => void;
  // Sem as setas quando o período exibido não é um mês.
  onStep?: (delta: number) => void;
}

// Linha do mês dos cabeçalhos azuis: setas e a pílula que abre o seletor.
export const MonthNavigator: FC<MonthNavigatorProps> = ({
  label,
  onPress,
  onStep,
}) => (
  <View style={styles.row}>
    {onStep && (
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => onStep(-1)}
        accessibilityRole="button"
        accessibilityLabel="Mês anterior"
      >
        <ChevronLeftIcon width={20} height={20} color={Colors.surface} />
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.pill}
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.label}>{label}</Text>
      <ChevronDownIcon width={16} height={16} color={Colors.surface} />
    </TouchableOpacity>

    {onStep && (
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => onStep(1)}
        accessibilityRole="button"
        accessibilityLabel="Próximo mês"
      >
        <ChevronRightIcon width={20} height={20} color={Colors.surface} />
      </TouchableOpacity>
    )}
  </View>
);
