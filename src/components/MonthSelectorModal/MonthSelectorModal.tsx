import { styles } from "./MonthSelectorModalStyles";
import { CustomText } from "../CustomText/CustomText";
import { FC, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, Pressable, View } from "react-native";

import ArrowLeftIcon from "../../assets/images/blue-left-arrow.svg";
import ArrowRightIcon from "../../assets/images/blue-right-arrow.svg";

interface MonthSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMonth: (month: number, year: number) => void;
  currentYear: number;
}

export const months = [
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
  currentYear,
}) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    if (visible) {
      setSelectedYear(currentYear);
    }
  }, [visible, currentYear]);

  const handlePrevYear = () => setSelectedYear((prev) => prev - 1);
  const handleNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalContent}>
          <CustomText style={styles.modalTitle}>Selecione uma data</CustomText>

          <View style={styles.yearContainer}>
            <TouchableOpacity
              onPress={handlePrevYear}
              style={styles.arrowButton}
            >
              <ArrowLeftIcon width={20} height={20} />
            </TouchableOpacity>

            <Text style={styles.yearText}>{selectedYear}</Text>

            <TouchableOpacity
              onPress={handleNextYear}
              style={styles.arrowButton}
            >
              <ArrowRightIcon width={20} height={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.monthsContainer}>
            {months.map((month, index) => (
              <TouchableOpacity
                key={month}
                style={styles.monthItem}
                onPress={() => {
                  onSelectMonth(index, selectedYear);
                  onClose();
                }}
              >
                <Text style={styles.monthText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
