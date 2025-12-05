import { FC } from "react";
import { styles } from "./ManageTransactionOptionsModalStyles";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";

interface ManageTransactionOptionsModalProps {
  visible: boolean;
  action: "edit" | "delete";
  onClose: () => void;
  onSelectOption: (applyToAll: boolean) => void;
}

export const ManageTransactionOptionsModal: FC<
  ManageTransactionOptionsModalProps
> = ({ visible, action, onClose, onSelectOption }) => {
  const isEdit = action === "edit";
  const title = isEdit ? "Editar Transação" : "Excluir Transação";
  const subtitle = isEdit
    ? "Como você gostaria de editar esta transação?"
    : "Como você gostaria de excluir esta transação?";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.optionButton}
                  activeOpacity={0.8}
                  onPress={() => onSelectOption(false)}
                >
                  <Text style={styles.optionText}>Apenas esta parcela</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionButton}
                  activeOpacity={0.8}
                  onPress={() => onSelectOption(true)}
                >
                  <Text style={styles.optionText}>Todas as parcelas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.6}
                  onPress={onClose}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
