import { Colors } from "../../styles/colors";
import { CustomText } from "../CustomText/CustomText";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./TransactionRecurrenceSelectorStyles";
import { FC, useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TransactionRecurrenceSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (recurrence: "MONTHLY" | "YEARLY") => void;
  type: "EXPENSE" | "INCOME";
  value: "MONTHLY" | "YEARLY" | "NONE";
}

export const TransactionRecurrenceSelector: FC<
  TransactionRecurrenceSelectorProps
> = ({ visible, onClose, onSelect, type, value }) => {
  const { translateY, panResponder } = useModalAnimation(visible, onClose);
  const [selected, setSelected] = useState<"MONTHLY" | "YEARLY" | "NONE">(
    "NONE"
  );

  const selectedColor =
    type === "EXPENSE" ? Colors.expenseRed : Colors.incomeGreen;

  useEffect(() => {
    if (visible) {
      setSelected(value);
    }
  }, [value, visible]);

  const handleSelect = (value: "MONTHLY" | "YEARLY") => {
    setSelected(value);
    onSelect?.(value);
    onClose();
  };

  if (!visible) return null;

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
        <Text style={styles.title}>Recorrência da Transação</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selected === "MONTHLY" && {
                ...styles.selectedOption,
                borderColor: selectedColor,
                backgroundColor: selectedColor,
              },
            ]}
            onPress={() => handleSelect("MONTHLY")}
          >
            <CustomText
              style={[
                styles.optionText,
                selected === "MONTHLY" && styles.selectedOptionText,
              ]}
            >
              Mensal
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selected === "YEARLY" && {
                ...styles.selectedOption,
                borderColor: selectedColor,
                backgroundColor: selectedColor,
              },
            ]}
            onPress={() => handleSelect("YEARLY")}
          >
            <CustomText
              style={[
                styles.optionText,
                selected === "YEARLY" && styles.selectedOptionText,
              ]}
            >
              Anual
            </CustomText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
