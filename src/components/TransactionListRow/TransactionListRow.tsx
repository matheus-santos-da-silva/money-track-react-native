import { FC } from "react";
import { styles } from "./TransactionListRowStyles";
import { iconMap } from "../../utils/icons";
import { formatSignedCurrency } from "../../utils/format-amount";
import { Text, TouchableOpacity, View } from "react-native";

interface TransactionListRowProps {
  // Ícone da categoria no formato "<cor>-<ícone>" (ex.: "#4CAF50-food").
  categoryIcon: string;
  title: string;
  subtitle?: string;
  amount: number;
  kind: "EXPENSE" | "INCOME";
  iconShape: "rounded" | "circle";
  showDivider: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

// Linha de lançamento dos cards de lista (Home e Extrato).
export const TransactionListRow: FC<TransactionListRowProps> = ({
  categoryIcon,
  title,
  subtitle,
  amount,
  kind,
  iconShape,
  showDivider,
  onPress,
  accessibilityLabel,
}) => {
  const [categoryColor, iconKey] = categoryIcon.split("-");
  const Icon = iconMap[iconKey];
  const isExpense = kind === "EXPENSE";

  return (
    <TouchableOpacity
      style={[styles.row, showDivider && styles.divider]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[
          styles.icon,
          iconShape === "circle" && styles.iconCircle,
          { backgroundColor: categoryColor },
        ]}
      >
        {Icon && <Icon width={20} height={20} />}
      </View>

      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {!!subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      <Text style={[styles.amount, isExpense ? styles.expense : styles.income]}>
        {formatSignedCurrency(isExpense ? -amount : amount)}
      </Text>
    </TouchableOpacity>
  );
};
