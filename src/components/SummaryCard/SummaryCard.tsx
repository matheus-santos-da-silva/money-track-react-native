import { FC } from "react";
import { styles } from "./SummaryCardStyles";
import { Colors } from "../../styles/colors";
import { formatCurrency } from "../../utils/format-amount";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import ArrowUpRightIcon from "../../assets/images/icons/arrow-up-right.svg";
import ArrowDownLeftIcon from "../../assets/images/icons/arrow-down-left.svg";

interface SummaryCardProps {
  kind: "INCOME" | "EXPENSE";
  amount: number;
  isHidden: boolean;
  isLoading: boolean;
  onPress: () => void;
}

const KINDS = {
  INCOME: {
    label: "Receitas",
    Icon: ArrowDownLeftIcon,
    color: Colors.incomeText,
    tint: Colors.incomeTint,
  },
  EXPENSE: {
    label: "Despesas",
    Icon: ArrowUpRightIcon,
    color: Colors.expenseText,
    tint: Colors.expenseTint,
  },
};

export const SummaryCard: FC<SummaryCardProps> = ({
  kind,
  amount,
  isHidden,
  isLoading,
  onPress,
}) => {
  const { label, Icon, color, tint } = KINDS[kind];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View style={[styles.chip, { backgroundColor: tint }]}>
          <Icon width={18} height={18} color={color} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.brandBlue}
          style={styles.loader}
        />
      ) : (
        <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
          {formatCurrency(amount, isHidden)}
        </Text>
      )}
    </TouchableOpacity>
  );
};
