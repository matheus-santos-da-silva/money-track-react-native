import { FC } from "react";
import { Colors } from "../../styles/colors";
import { styles } from "./TransactionSettingsModalStyles";
import { iconMap } from "../../utils/icons";
import { useState } from "react";
import { Dimensions } from "react-native";
import { CustomText } from "../CustomText/CustomText";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { clearOldCache } from "../../utils/cache-helpers";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { InitialTransactionData } from "../HandleTransaction/HandleTransaction";
import { ManageTransactionOptionsModal } from "../ManageTransactionOptionsModal/ManageTransactionOptionsModal";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import WhiteTrashIcon from "../../assets/images/white-trash.svg";
import WhitePencil from "../../assets/images/white-pencil.svg";

const { height: screenHeight } = Dimensions.get("window");

type TransactionType = "fixa" | "parcelada" | "recorrente";

export type StackNavigation = {
  CreateExpense: {
    token: string;
    user_id: string;
    initialData?: InitialTransactionData;
  };
  CreateIncome: {
    token: string;
    user_id: string;
    initialData?: InitialTransactionData;
  };
};

export interface TransactionsSettingsProps {
  transaction: TransactionDTO | null;
  token: string;
  user_id: string;
}

interface TransactionSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  props: TransactionsSettingsProps;
}

export const TransactionSettingsModal: FC<TransactionSettingsModalProps> = ({
  visible,
  onClose,
  props,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { translateY, panResponder } = useModalAnimation(visible, onClose);

  const { deleteTransactionFunc, deleteTransactionLoading } =
    useDeleteTransaction();

  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete">("edit");

  const handleEditPress = () => {
    if (
      props.transaction?.total_installments &&
      props.transaction?.total_installments > 1
    ) {
      setModalAction("edit");
      setManageModalVisible(true);
    } else {
      navigateToEdit(false);
    }
  };

  const handleDeletePress = async () => {
    if (
      props.transaction?.total_installments &&
      props.transaction?.total_installments > 1
    ) {
      setModalAction("delete");
      setManageModalVisible(true);
    } else {
      await handleDelete(false);
    }
  };

  const handleOptionSelect = (applyToAll: boolean) => {
    setManageModalVisible(false);
    setTimeout(() => {
      if (modalAction === "edit") {
        navigateToEdit(applyToAll);
      } else {
        handleDelete(applyToAll);
      }
    }, 300);
  };

  const navigateToEdit = (applyToAll: boolean) => {
    const screen =
      props.transaction?.type === "Despesa" ? "CreateExpense" : "CreateIncome";

    const type = props.transaction?.type === "Despesa" ? "EXPENSE" : "INCOME";

    let transactionType: TransactionType = "fixa";

    if (props.transaction?.recurrence !== "NONE") {
      transactionType = "recorrente";
    } else if (props.transaction?.total_installments > 1) {
      transactionType = "parcelada";
    }

    navigation.navigate(screen, {
      token: props.token,
      user_id: props.user_id,
      initialData: {
        amount: props?.transaction?.amount,
        category: props?.transaction?.category,
        date: props?.transaction?.transaction_date,
        description: props?.transaction?.description,
        id: props?.transaction?.id,
        installments: props?.transaction?.total_installments,
        recurrence: props?.transaction?.recurrence,
        installment_group_id: props?.transaction?.installment_group_id,
        applyToAll: applyToAll,
        transactionType,
        type,
      },
    });

    onClose();
  };

  const handleDelete = async (applyToAll: boolean) => {
    let success;

    if (props.transaction?.id) {
      try {
        success = await deleteTransactionFunc({
          type: props.transaction?.type === "Despesa" ? "expenses" : "incomes",
          token: props.token,
          id: props.transaction?.id,
          applyToAll: applyToAll,
          user_id: props.user_id,
        });

        if (success) {
          await clearOldCache(props.user_id);
          showSnackBar(`Transação deletada com sucesso!`, "#4BB543");
          navigation.goBack();
        } else {
          showSnackBar(`Erro ao deletar transação`, "#de525a");
        }
      } catch (error) {
        showSnackBar("Ocorreu um erro inesperado", "#de525a");
      }
    } else {
      showSnackBar("Erro ao deletar transação", "#de525a");
    }
  };

  if (!visible || !props.transaction) {
    return null;
  }

  let heightValue: number = 0.3;

  if (props?.transaction.description) {
    if (props?.transaction.description?.length >= 150) {
      heightValue = 0.35;
    }
  } else {
    heightValue = 0.2;
  }

  const SHEET_HEIGHT = screenHeight * heightValue;
  const IconComponent = iconMap[props.transaction.category.icon.split("-")[1]];

  let transactionType: TransactionType = "fixa";

  if (props.transaction.recurrence !== "NONE") {
    transactionType = "recorrente";
  } else if (props.transaction.total_installments > 1) {
    transactionType = "parcelada";
  }

  const recurrenceOptions = {
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  const recurrence =
    props.transaction.recurrence !== "NONE"
      ? recurrenceOptions[props.transaction.recurrence]
      : "Nenhuma.";

  const installments: string =
    props.transaction.total_installments > 1
      ? `${props.transaction.current_installment}/${props.transaction.total_installments}`
      : "À vista.";

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

        <View style={styles.mainContent}>
          <View style={styles.topContent}>
            <View style={styles.leftTopContent}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor:
                      props.transaction.category.icon.split("-")[0],
                  },
                ]}
              >
                <IconComponent width={30} height={30} />
              </View>
              <View style={styles.transactionsTitle}>
                <CustomText
                  style={{
                    color: Colors.primaryGray,
                    fontSize: 18,
                    lineHeight: 16,
                  }}
                >
                  {props.transaction.category.name}
                </CustomText>
                <Text
                  style={{
                    color: Colors.primaryGray,
                    fontSize: 16,
                  }}
                >
                  {new Date(
                    props.transaction.transaction_date,
                  ).toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </View>

            <View style={styles.rightTopContent}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleEditPress}
                style={[
                  styles.optionsCircle,
                  { backgroundColor: Colors.primaryBlue },
                ]}
              >
                <WhitePencil width={16} height={16} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleDeletePress}
                style={[
                  styles.optionsCircle,
                  { backgroundColor: Colors.expenseRed },
                ]}
              >
                <WhiteTrashIcon width={18} height={18} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.transactionsContent}>
            <View style={styles.recurrenceContent}>
              <View style={{ flexDirection: "row", gap: 6 }}>
                <CustomText style={styles.transactionsContentKonkhmerText}>
                  Parcelas:
                </CustomText>
                <Text style={styles.transactionsContentPoppinsText}>
                  {installments}
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 6 }}>
                <CustomText style={styles.transactionsContentKonkhmerText}>
                  Recorrência:
                </CustomText>
                <Text style={styles.transactionsContentPoppinsText}>
                  {recurrence}
                </Text>
              </View>
            </View>

            {props.transaction.description ? (
              <View style={[{ gap: 6 }]}>
                <CustomText
                  style={[
                    styles.transactionsContentKonkhmerText,
                    { textAlign: "center" },
                  ]}
                >
                  Descrição:
                </CustomText>

                <Text
                  style={[
                    styles.transactionsContentPoppinsText,
                    { textAlign: "center" },
                  ]}
                >
                  {props.transaction.description}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </Animated.View>

      <ManageTransactionOptionsModal
        visible={manageModalVisible}
        action={modalAction}
        onClose={() => setManageModalVisible(false)}
        onSelectOption={handleOptionSelect}
      />
    </View>
  );
};
