import { FC } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./CreateTransactionTypeSelectorStyles";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ExpenseIcon from "../../assets/images/icon-despesa-svg.svg";
import IncomeIcon from "../../assets/images/icon-receita-svg.svg";

interface CreateTransactionTypeSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: "EXPENSE" | "INCOME") => void;
}

export const CreateTransactionTypeSelector: FC<
  CreateTransactionTypeSelectorProps
> = ({ visible, onClose, onSelect }) => {
  const { translateY, panResponder } = useModalAnimation(visible, onClose);

  if (!visible) return null;

  const handleSelect = (type: "EXPENSE" | "INCOME") => {
    onSelect(type);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY }], height: SHEET_HEIGHT },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragIndicator} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Novo Lançamento</Text>
          <Text style={styles.subtitle}>Escolha o tipo de transação</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, styles.expenseButton]}
            onPress={() => handleSelect("EXPENSE")}
            activeOpacity={0.85}
          >
            <ExpenseIcon width={44} height={44} />
            <Text style={styles.optionText}>Despesa</Text>
            <Text style={styles.optionSubtitle}>Saída de dinheiro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.incomeButton]}
            onPress={() => handleSelect("INCOME")}
            activeOpacity={0.85}
          >
            <IncomeIcon width={44} height={44} />
            <Text style={styles.optionText}>Receita</Text>
            <Text style={styles.optionSubtitle}>Entrada de dinheiro</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
