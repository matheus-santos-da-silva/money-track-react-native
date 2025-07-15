import { FC } from "react";
import { styles } from "./MonthSelectorModalStyles";
import { Modal, Text, TouchableOpacity, Pressable } from "react-native";

interface MonthSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMonth: (month: number) => void;
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
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione um mês</Text>
          {months.map((month, index) => (
            <TouchableOpacity
              key={month}
              style={styles.monthItem}
              onPress={() => {
                onSelectMonth(index);
                onClose();
              }}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
