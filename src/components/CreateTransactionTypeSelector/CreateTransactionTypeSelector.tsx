import { Colors } from "../../styles/colors";
import { FC, useState } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./CreateTransactionTypeSelectorStyles";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CreateTransactionTypeSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: "EXPENSE" | "INCOME") => void;
}

export const CreateTransactionTypeSelector: FC<
  CreateTransactionTypeSelectorProps
> = ({ visible, onClose, onSelect }) => {
  const { translateY, panResponder } = useModalAnimation(visible, onClose);
  const [selected, setSelected] = useState<"EXPENSE" | "INCOME" | null>(null);

  if (!visible) return null;

  const handleSelect = (type: "EXPENSE" | "INCOME") => {
    setSelected(type);
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
        <Text style={styles.title}>Tipo de Transação</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, styles.expenseButton]}
            onPress={() => handleSelect("EXPENSE")}
          >
            <Text style={[styles.optionText]}>Despesa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.incomeButton]}
            onPress={() => handleSelect("INCOME")}
          >
            <Text style={[styles.optionText]}>Receita</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
