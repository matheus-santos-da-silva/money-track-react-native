import { Colors } from "../../styles/colors";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { SHEET_HEIGHT, styles } from "./TransactionInstallmentsSelectorStyles";
import { FC, useEffect, useState } from "react";

import {
  Animated,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TransactionInstallmentsSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (installments: number) => void;
  type: "EXPENSE" | "INCOME";
  value: number;
}

export const TransactionInstallmentsSelector: FC<
  TransactionInstallmentsSelectorProps
> = ({ visible, onClose, onSelect, type, value }) => {
  const { translateY, panResponder } = useModalAnimation(visible, onClose);
  const [selected, setSelected] = useState<number>(1);

  const selectedColor =
    type === "EXPENSE" ? Colors.expenseRed : Colors.incomeGreen;

  useEffect(() => {
    if (visible) {
      setSelected(value);
    }
  }, [value, visible]);

  if (!visible) return null;

  const handleSelect = (value: number) => {
    setSelected(value);
    onSelect?.(value);
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
        <Text style={styles.title}>Escolha o número de parcelas:</Text>

        <FlatList
          data={[...Array(36)].map((_, i) => i + 1)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            const isSelected = selected === item;

            return (
              <TouchableOpacity
                style={[
                  styles.numberButton,
                  isSelected && {
                    backgroundColor: selectedColor,
                    borderColor: selectedColor,
                  },
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[styles.numberText, isSelected && { color: "#fff" }]}
                >
                  {item}x
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};
