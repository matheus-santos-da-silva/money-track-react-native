import { FC } from "react";
import { Colors } from "../../styles/colors";
import { styles } from "./TransactionSettingsModalStyles";
import { iconMap } from "../../utils/icons";
import { useState } from "react";
import { sheetStyles } from "../../styles/sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useAuth } from "../../hooks/useAuth";
import { parseDateOnly } from "../../utils/date-only";
import { useNavigation } from "@react-navigation/native";
import { clearOldCache } from "../../utils/cache-helpers";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { InitialTransactionData } from "../HandleTransaction/HandleTransaction";
import { ManageTransactionOptionsModal } from "../ManageTransactionOptionsModal/ManageTransactionOptionsModal";
import { formatSignedCurrency } from "../../utils/format-amount";
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import TrashIcon from "../../assets/images/icons/trash.svg";
import PencilIcon from "../../assets/images/icons/pencil.svg";

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
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const { user } = useAuth();

  const insets = useSafeAreaInsets();

  // O conteúdo define a altura do sheet; a animação parte de fora da tela.
  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    Dimensions.get("window").height,
  );

  const { deleteTransactionFunc, deleteTransactionLoading } =
    useDeleteTransaction();

  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete">("edit");

  // Parcelada ou recorrente: pergunta se vale só para esta ou para as demais.
  const scopeKind: "installment" | "recurring" | null =
    (props.transaction?.total_installments ?? 1) > 1
      ? "installment"
      : props.transaction && props.transaction.recurrence !== "NONE"
      ? "recurring"
      : null;

  const handleEditPress = () => {
    // Plano gratuito com trial vencido é somente leitura (o servidor também bloqueia).
    if (user?.isPremium === false) {
      showSnackBar(
        "Seu período gratuito acabou. Assine o Premium para editar transações.",
        "#de525a",
      );
      return;
    }

    if (scopeKind) {
      setModalAction("edit");
      setManageModalVisible(true);
    } else {
      navigateToEdit(false);
    }
  };

  const handleDeletePress = async () => {
    if (scopeKind) {
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

  const { transaction } = props;
  const isExpense = transaction.type === "Despesa";
  const [categoryColor, iconKey] = transaction.category.icon.split("-");
  const IconComponent = iconMap[iconKey];

  const recurrenceOptions = {
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  const recurrence =
    transaction.recurrence !== "NONE"
      ? recurrenceOptions[transaction.recurrence]
      : "Nenhuma";

  const installments: string =
    transaction.total_installments > 1
      ? `${transaction.current_installment}/${transaction.total_installments}`
      : "À vista";

  const fullDate = parseDateOnly(transaction.transaction_date).toLocaleDateString(
    "pt-BR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <View style={sheetStyles.overlay}>
      <Pressable style={sheetStyles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          sheetStyles.sheet,
          styles.sheet,
          { paddingBottom: 28 + insets.bottom, transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={sheetStyles.handle} />

        <View style={styles.identity}>
          <View style={[styles.iconCircle, { backgroundColor: categoryColor }]}>
            {IconComponent && <IconComponent width={24} height={24} />}
          </View>

          <View style={styles.identityTexts}>
            <Text style={styles.categoryName} numberOfLines={1}>
              {transaction.category.name}
            </Text>
            <Text style={styles.dateText}>{fullDate}</Text>
          </View>

          <Text
            style={[
              styles.typeTag,
              isExpense ? styles.expenseTag : styles.incomeTag,
            ]}
          >
            {transaction.type}
          </Text>
        </View>

        <Text
          style={[
            styles.amountText,
            isExpense ? styles.expenseAmount : styles.incomeAmount,
          ]}
        >
          {formatSignedCurrency(
            isExpense ? -transaction.amount : transaction.amount,
          )}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Parcelas</Text>
            <Text style={styles.infoValue}>{installments}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Recorrência</Text>
            <Text style={styles.infoValue}>{recurrence}</Text>
          </View>
        </View>

        {transaction.description ? (
          <View style={styles.description}>
            <Text style={styles.infoLabel}>Descrição</Text>
            <Text style={styles.descriptionText}>{transaction.description}</Text>
          </View>
        ) : null}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleDeletePress}
            style={[styles.actionButton, styles.deleteButton]}
            accessibilityRole="button"
          >
            {deleteTransactionLoading ? (
              <ActivityIndicator size="small" color={Colors.expenseText} />
            ) : (
              <>
                <TrashIcon width={18} height={18} color={Colors.expenseText} />
                <Text style={[styles.actionText, styles.deleteText]}>
                  Excluir
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleEditPress}
            style={[styles.actionButton, styles.editButton]}
            accessibilityRole="button"
          >
            <PencilIcon width={18} height={18} color={Colors.surface} />
            <Text style={[styles.actionText, styles.editText]}>Editar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ManageTransactionOptionsModal
        visible={manageModalVisible}
        action={modalAction}
        kind={scopeKind ?? "installment"}
        onClose={() => setManageModalVisible(false)}
        onSelectOption={handleOptionSelect}
      />
    </View>
  );
};
