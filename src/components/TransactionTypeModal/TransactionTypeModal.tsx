import { FC } from "react";
import { styles } from "../CreateTransaction/CreateTransactionStyles";
import { Colors } from "../../styles/colors";
import { modalStyles } from "./TransactionTypeModalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Modal, View, Text, TouchableOpacity } from "react-native";

export type RootStackParamList = {
  CreateExpense: { token: string };
  CreateIncome: { token: string };
};

interface TransactionTypeModalProps {
  visible: boolean;
  onClose: () => void;
  token: string;
  type: "EXPENSE" | "INCOME";
}

export const TransactionTypeModal: FC<TransactionTypeModalProps> = ({
  visible,
  onClose,
  token,
  type,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const isExpense = type === "EXPENSE";
  const targetRoute = isExpense ? "CreateExpense" : "CreateIncome";
  const buttonColor = isExpense ? Colors.expenseRed : Colors.incomeGreen;
  const buttonText = isExpense ? "Despesa" : "Receita";

  const handlePress = () => {
    onClose();
    navigation.navigate(targetRoute, { token });
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={modalStyles.modalBackground}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles(buttonColor).modalContainer}>
          <Text style={styles(buttonColor).modalTitle}>
            Alterar tipo de transação:
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={[
              styles(buttonColor).modalButton,
              {
                backgroundColor: buttonColor,
                shadowColor: buttonColor,
              },
            ]}
          >
            <Text style={styles(buttonColor).modalText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
