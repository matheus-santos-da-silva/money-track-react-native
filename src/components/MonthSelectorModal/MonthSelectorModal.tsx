import { Colors } from "../../styles/colors";
import { sheetStyles } from "../../styles/sheet";
import { useCloseOnBack } from "../../hooks/useCloseOnBack";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SHEET_HEIGHT, styles } from "./MonthSelectorModalStyles";
import { FC, useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";
import ChevronRightIcon from "../../assets/images/icons/chevron-right.svg";

interface MonthSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMonth: (month: number, year: number) => void;
  currentMonth: number;
  currentYear: number;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const MonthSelectorModal: FC<MonthSelectorModalProps> = ({
  visible,
  onClose,
  onSelectMonth,
  currentMonth,
  currentYear,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    SHEET_HEIGHT + insets.bottom,
  );

  useEffect(() => {
    if (visible) {
      setSelectedYear(currentYear);
    }
  }, [visible, currentYear]);

  useCloseOnBack(visible, onClose);

  if (!visible) return null;

  const selectMonth = (month: number, year: number) => {
    onSelectMonth(month, year);
    onClose();
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    selectMonth(today.getMonth(), today.getFullYear());
  };

  return (
    <View style={sheetStyles.overlay}>
      <Pressable style={sheetStyles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          sheetStyles.sheet,
          { paddingBottom: 28 + insets.bottom, transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={sheetStyles.handle} />

        <View style={styles.header}>
          <Text style={styles.title}>Selecionar mês</Text>

          <View style={styles.yearContainer}>
            <TouchableOpacity
              style={styles.yearButton}
              onPress={() => setSelectedYear((year) => year - 1)}
              accessibilityRole="button"
              accessibilityLabel="Ano anterior"
            >
              <ChevronLeftIcon width={18} height={18} color={Colors.ink} />
            </TouchableOpacity>

            <Text style={styles.yearText}>{selectedYear}</Text>

            <TouchableOpacity
              style={styles.yearButton}
              onPress={() => setSelectedYear((year) => year + 1)}
              accessibilityRole="button"
              accessibilityLabel="Próximo ano"
            >
              <ChevronRightIcon width={18} height={18} color={Colors.ink} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.monthsGrid}>
          {months.map((month, index) => {
            const isSelected =
              index === currentMonth && selectedYear === currentYear;

            return (
              <TouchableOpacity
                key={month}
                style={[styles.monthButton, isSelected && styles.monthSelected]}
                activeOpacity={0.8}
                onPress={() => selectMonth(index, selectedYear)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.monthText,
                    isSelected && styles.monthTextSelected,
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.currentMonthButton}
          activeOpacity={0.8}
          onPress={goToCurrentMonth}
          accessibilityRole="button"
        >
          <Text style={styles.currentMonthText}>Ir para o mês atual</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
