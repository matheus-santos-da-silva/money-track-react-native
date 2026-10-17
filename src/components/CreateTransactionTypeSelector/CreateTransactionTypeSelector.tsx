import { FC } from "react";
import { Colors } from "../../styles/colors";
import { sheetStyles } from "../../styles/sheet";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, SHEET_HEIGHT } from "./CreateTransactionTypeSelectorStyles";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowUpRightIcon from "../../assets/images/icons/arrow-up-right.svg";
import ArrowDownLeftIcon from "../../assets/images/icons/arrow-down-left.svg";

interface CreateTransactionTypeSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: "EXPENSE" | "INCOME") => void;
}

export const CreateTransactionTypeSelector: FC<
  CreateTransactionTypeSelectorProps
> = ({ visible, onClose, onSelect }) => {
  const insets = useSafeAreaInsets();

  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    SHEET_HEIGHT + insets.bottom,
  );

  if (!visible) return null;

  const handleSelect = (type: "EXPENSE" | "INCOME") => {
    onSelect(type);
    onClose();
  };

  return (
    <View style={sheetStyles.overlay}>
      <Pressable style={sheetStyles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          sheetStyles.sheet,
          { paddingBottom: 20 + insets.bottom, transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={sheetStyles.handle} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Novo lançamento</Text>
          <Text style={styles.subtitle}>O que você quer registrar?</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, styles.expenseCard]}
            onPress={() => handleSelect("EXPENSE")}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <View style={[styles.optionChip, styles.expenseChip]}>
              <ArrowUpRightIcon width={22} height={22} color={Colors.surface} />
            </View>
            <View style={styles.optionTexts}>
              <Text style={styles.optionTitle}>Despesa</Text>
              <Text style={styles.optionSubtitle}>Saída de dinheiro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, styles.incomeCard]}
            onPress={() => handleSelect("INCOME")}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <View style={[styles.optionChip, styles.incomeChip]}>
              <ArrowDownLeftIcon
                width={22}
                height={22}
                color={Colors.surface}
              />
            </View>
            <View style={styles.optionTexts}>
              <Text style={styles.optionTitle}>Receita</Text>
              <Text style={styles.optionSubtitle}>Entrada de dinheiro</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
