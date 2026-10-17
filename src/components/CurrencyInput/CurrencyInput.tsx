import { FC } from "react";
import { styles } from "./CurrencyInputStyles";
import { Colors } from "../../styles/colors";
import { sheetStyles } from "../../styles/sheet";
import { formatCurrency } from "../../utils/format-amount";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  appendAmountDigit,
  removeAmountDigit,
} from "../../utils/transaction-form";
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DeleteIcon from "../../assets/images/icons/delete.svg";

const DIGIT_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

interface CurrencyInputProps {
  visible: boolean;
  amount: number;
  type: "EXPENSE" | "INCOME";
  onChange: (amount: number) => void;
  onClose: () => void;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  visible,
  amount,
  type,
  onChange,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    Dimensions.get("window").height
  );

  if (!visible) return null;

  const isExpense = type === "EXPENSE";

  const renderDigit = (digit: string) => (
    <TouchableOpacity
      key={digit}
      style={[styles.key, styles.digitKey]}
      activeOpacity={0.7}
      onPress={() => onChange(appendAmountDigit(amount, digit))}
      accessibilityRole="button"
      accessibilityLabel={digit}
    >
      <Text style={styles.digitText}>{digit}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={sheetStyles.overlay}>
      <Pressable
        style={sheetStyles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar"
      />

      <Animated.View
        style={[
          sheetStyles.sheet,
          styles.sheet,
          { paddingBottom: 24 + insets.bottom, transform: [{ translateY }] },
        ]}
        accessibilityViewIsModal
        {...panResponder.panHandlers}
      >
        <View style={sheetStyles.handle} />

        <View style={styles.display}>
          <Text style={styles.displayLabel}>
            {isExpense ? "Valor da despesa" : "Valor da receita"}
          </Text>
          <Text
            style={[
              styles.displayValue,
              { color: isExpense ? Colors.expenseText : Colors.incomeText },
            ]}
            accessibilityLiveRegion="polite"
          >
            {formatCurrency(amount)}
          </Text>
        </View>

        <View style={styles.keypad}>
          {DIGIT_ROWS.map((row) => (
            <View key={row.join("")} style={styles.keyRow}>
              {row.map(renderDigit)}
            </View>
          ))}

          <View style={styles.keyRow}>
            <TouchableOpacity
              style={[styles.key, styles.actionKey]}
              activeOpacity={0.7}
              onPress={() => onChange(0)}
              accessibilityRole="button"
              accessibilityLabel="Limpar valor"
            >
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>

            {renderDigit("0")}

            <TouchableOpacity
              style={[styles.key, styles.actionKey]}
              activeOpacity={0.7}
              onPress={() => onChange(removeAmountDigit(amount))}
              accessibilityRole="button"
              accessibilityLabel="Apagar"
            >
              <DeleteIcon width={24} height={24} color={Colors.ink} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirm}
          activeOpacity={0.85}
          onPress={onClose}
          accessibilityRole="button"
        >
          <Text style={styles.confirmText}>Confirmar valor</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
