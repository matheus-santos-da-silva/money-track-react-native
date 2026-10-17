import Animated from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HandleTransactionStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../FormField/FormField";
import { OptionChip } from "../OptionChip/OptionChip";
import { TypeSwitch } from "../TypeSwitch/TypeSwitch";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { FooterButton } from "../FooterButton/FooterButton";
import { PremiumModal } from "../PremiumModal/PremiumModal";
import { showSnackBar } from "../../utils/show-snack-bar";
import { clearOldCache } from "../../utils/cache-helpers";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { CategoryChoice } from "../CategoryChoice/CategoryChoice";
import { formatCurrency } from "../../utils/format-amount";
import { useTransactions } from "../../contexts/TransactionsContext";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { InstallmentsStepper } from "../InstallmentsStepper/InstallmentsStepper";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useUpdateTransaction } from "../../hooks/useUpdateTransaction";
import { useKeyboardFooterPadding } from "../../hooks/useKeyboardFooterPadding";
import { FC, useEffect, useRef, useState } from "react";
import { parseDateOnly, toDateOnlyString } from "../../utils/date-only";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  dateOption,
  MIN_INSTALLMENTS,
  rankCategoryShortcuts,
  recurrenceSummary,
  SHORTCUT_COUNT,
} from "../../utils/transaction-form";
import { useNavigation } from "@react-navigation/native";

import XIcon from "../../assets/images/icons/close.svg";
import InfoIcon from "../../assets/images/icons/info.svg";
import PencilIcon from "../../assets/images/icons/pencil.svg";
import CalendarIcon from "../../assets/images/icons/calendar.svg";
import ArrowUpRightIcon from "../../assets/images/icons/arrow-up-right.svg";
import ArrowDownLeftIcon from "../../assets/images/icons/arrow-down-left.svg";

type TransactionType = "INCOME" | "EXPENSE";
type Repetition = "fixa" | "parcelada" | "recorrente";
type Recurrence = "MONTHLY" | "YEARLY" | "NONE";

export interface InitialTransactionData {
  id?: string;
  amount?: number;
  category?: {
    id: string;
    icon: string;
    name: string;
  };
  recurrence?: Recurrence;
  installments?: number;
  description?: string;
  date?: string | Date;
  transactionType?: Repetition;
  type?: TransactionType;
  applyToAll: boolean;
  installment_group_id?: string;
}

type StackNavigation = {
  HandleCategory: { type: TransactionType };
};

const TYPE_OPTIONS = [
  {
    value: "EXPENSE" as const,
    label: "Despesa",
    icon: ArrowUpRightIcon,
    selectedColor: Colors.expenseText,
  },
  {
    value: "INCOME" as const,
    label: "Receita",
    icon: ArrowDownLeftIcon,
    selectedColor: Colors.incomeText,
  },
];

const REPETITION_OPTIONS: { value: Repetition; label: string }[] = [
  { value: "fixa", label: "Única" },
  { value: "parcelada", label: "Parcelada" },
  { value: "recorrente", label: "Recorrente" },
];

interface HandleTransactionProps {
  transactionType: TransactionType;
  initialData?: InitialTransactionData;
  isEditing?: boolean;
}

export const HandleTransaction: FC<HandleTransactionProps> = ({
  transactionType: initialType,
  initialData,
  isEditing = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();
  const footerPadding = useKeyboardFooterPadding();

  const { user, userToken } = useAuth();
  const { transactions, triggerRefetch } = useTransactions();

  const { execute, transactionLoading } = useCreateTransaction();
  const { update, updateTransactionLoading } = useUpdateTransaction();

  const [transactionType, setTransactionType] =
    useState<TransactionType>(initialType);
  const [amount, setAmount] = useState(initialData?.amount ?? 0);
  const [category, setCategory] = useState(initialData?.category ?? null);
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [date, setDate] = useState<Date>(
    initialData?.date ? parseDateOnly(initialData.date) : new Date()
  );
  const [repetition, setRepetition] = useState<Repetition>(
    initialData?.transactionType ?? "fixa"
  );
  const [installments, setInstallments] = useState(
    initialData?.installments ?? 1
  );
  const [recurrence, setRecurrence] = useState<Recurrence>(
    initialData?.recurrence ?? "NONE"
  );

  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const [isCategorySheetVisible, setIsCategorySheetVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const shouldReloadCategories = useRef(false);

  const { categories, categoriesError, loading, refetch } = useGetCategories({
    token: userToken?.token ?? "",
    type: transactionType,
  });

  useEffect(
    () =>
      navigation.addListener("focus", () => {
        if (!shouldReloadCategories.current) return;

        shouldReloadCategories.current = false;
        refetch({ resetCache: true });
      }),
    [navigation, refetch]
  );

  const isExpense = transactionType === "EXPENSE";
  const typeName = isExpense ? "despesa" : "receita";
  const isDateLocked = isEditing && !!initialData?.applyToAll;
  const isSubmitting = transactionLoading || updateTransactionLoading;
  const canSubmit = amount > 0 && category !== null;

  const shortcuts = rankCategoryShortcuts(
    categories,
    isExpense ? transactions.expenses : transactions.incomes,
    category?.id
  );

  const selectedDateOption = dateOption(date);

  const changeType = (type: TransactionType) => {
    if (type === transactionType) return;

    setTransactionType(type);
    setCategory(null);
  };

  const selectCategory = (selected: CategoryDTO) => {
    setCategory(selected);
    setIsCategorySheetVisible(false);
  };

  const openCreateCategory = () => {
    setIsCategorySheetVisible(false);

    if (user?.isPremium === false) {
      setIsPremiumModalVisible(true);
      return;
    }

    shouldReloadCategories.current = true;
    navigation.navigate("HandleCategory", { type: transactionType });
  };

  const selectRelativeDate = (daysAgo: number) => {
    const today = new Date();
    setDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo)
    );
  };

  const changeRepetition = (value: Repetition) => {
    setRepetition(value);

    if (value === "fixa") {
      setRecurrence("NONE");
      setInstallments(1);
    } else if (value === "parcelada") {
      setRecurrence("NONE");
      setInstallments((current) => Math.max(current, MIN_INSTALLMENTS));
    } else {
      setInstallments(1);
      setRecurrence((current) => (current === "NONE" ? "MONTHLY" : current));
    }
  };

  const handleSubmit = async () => {
    if (!category) return;

    const transactionData = {
      id: initialData?.id,
      type: (isExpense ? "expenses" : "incomes") as "incomes" | "expenses",
      token: userToken!.token,
      amount,
      category_id: category.id,
      recurrence,
      total_installments: installments,
      transaction_date: toDateOnlyString(date),
      description,
      ...(isEditing && {
        applyToAll: initialData?.applyToAll,
        installment_group_id: initialData?.installment_group_id,
      }),
    };

    try {
      let success;
      if (isEditing) {
        if (!initialData?.id) {
          showSnackBar("ID da transação não encontrado", "#de525a");
          return;
        }

        success = await update({ ...transactionData, id: initialData.id });
      } else {
        const { id, ...data } = transactionData;
        success = await execute({ ...data, current_installment: 1 });
      }

      if (success) {
        showSnackBar(
          `Transação ${isEditing ? "atualizada" : "criada"} com sucesso!`,
          "#4BB543"
        );

        triggerRefetch();
        await clearOldCache(user!.id);
        navigation.goBack();
      } else {
        showSnackBar(
          `Erro ao ${isEditing ? "atualizar" : "criar"} transação`,
          "#de525a"
        );
      }
    } catch (error) {
      showSnackBar("Ocorreu um erro inesperado", "#de525a");
    }
  };

  const renderShortcuts = () => {
    if (categoriesError && !loading) {
      return (
        <View style={styles.categoriesError}>
          <Text style={styles.categoriesErrorText}>
            Não foi possível carregar as categorias.
          </Text>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => refetch({ resetCache: true })}
            accessibilityRole="button"
          >
            <Text style={styles.textButtonLabel}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView
        horizontal
        style={styles.shortcutsScroll}
        contentContainerStyle={styles.shortcuts}
        showsHorizontalScrollIndicator={false}
        accessibilityRole="radiogroup"
      >
        {loading
          ? Array.from({ length: SHORTCUT_COUNT }, (_, index) => (
              <View key={index} style={styles.shortcutPlaceholder}>
                <View style={styles.placeholderCircle} />
              </View>
            ))
          : shortcuts.map((shortcut) => (
              <CategoryChoice
                key={shortcut.id}
                style={styles.shortcut}
                size="regular"
                name={shortcut.name}
                icon={shortcut.icon}
                selected={shortcut.id === category?.id}
                onPress={() => setCategory(shortcut)}
              />
            ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
          >
            <XIcon width={22} height={22} color={Colors.surface} />
          </TouchableOpacity>

          <Text style={styles.title} accessibilityRole="header">
            {isEditing ? "Editar" : "Nova"} {typeName}
          </Text>

          <View style={styles.close} />
        </View>

        <TypeSwitch
          style={styles.typeSwitch}
          tone="onBlue"
          options={TYPE_OPTIONS}
          selected={transactionType}
          onSelect={changeType}
          disabled={isEditing}
          accessibilityLabel="Tipo"
        />

        <TouchableOpacity
          style={styles.amountButton}
          activeOpacity={0.8}
          onPress={() => setIsKeypadVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={`Valor da ${typeName}, ${formatCurrency(
            amount
          )}. Toque para editar`}
        >
          <Text style={styles.amountLabel}>Valor da {typeName}</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.amount, amount === 0 && styles.amountEmpty]}>
              {formatCurrency(amount)}
            </Text>
            <PencilIcon width={20} height={20} color={Colors.onBlueMuted} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isDateLocked && (
          <View style={styles.notice}>
            <InfoIcon width={18} height={18} color={Colors.brandInk} />
            <Text style={styles.noticeText}>
              As alterações valem para esta e as próximas{" "}
              {initialData?.recurrence && initialData.recurrence !== "NONE"
                ? "ocorrências"
                : "parcelas"}
              . A data e a forma de pagamento não mudam.
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Categoria</Text>
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => setIsCategorySheetVisible(true)}
              accessibilityRole="button"
            >
              <Text style={styles.textButtonLabel}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {renderShortcuts()}
        </View>

        <FormField
          label="Descrição"
          optional
          value={description}
          onChangeText={setDescription}
          placeholder={
            isExpense ? "Ex.: Mercado do mês" : "Ex.: Projeto freelance"
          }
        />

        <View style={[styles.section, isDateLocked && styles.locked]}>
          <Text style={styles.sectionLabel}>Data</Text>
          <View style={styles.optionsRow} accessibilityRole="radiogroup">
            <OptionChip
              label="Hoje"
              selected={selectedDateOption === "today"}
              onPress={() => selectRelativeDate(0)}
              disabled={isDateLocked}
            />
            <OptionChip
              label="Ontem"
              selected={selectedDateOption === "yesterday"}
              onPress={() => selectRelativeDate(1)}
              disabled={isDateLocked}
            />
            <OptionChip
              label={
                selectedDateOption === "other"
                  ? date.toLocaleDateString("pt-BR")
                  : "Outra data"
              }
              icon={CalendarIcon}
              selected={selectedDateOption === "other"}
              onPress={() => setIsDatePickerVisible(true)}
              disabled={isDateLocked}
            />
          </View>

          {isDatePickerVisible && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setIsDatePickerVisible(false);
                if (event.type === "set" && selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Repetição</Text>
          <TypeSwitch
            tone="light"
            options={REPETITION_OPTIONS}
            selected={repetition}
            onSelect={changeRepetition}
            disabled={isEditing}
            accessibilityLabel="Repetição"
          />

          {repetition === "parcelada" && (
            <InstallmentsStepper
              amount={amount}
              installments={installments}
              date={date}
              disabled={isEditing}
              onChange={setInstallments}
            />
          )}

          {repetition === "recorrente" && recurrence !== "NONE" && (
            <View style={[styles.recurrenceCard, isEditing && styles.locked]}>
              <View style={styles.optionsRow} accessibilityRole="radiogroup">
                <OptionChip
                  label="Todo mês"
                  selected={recurrence === "MONTHLY"}
                  onPress={() => setRecurrence("MONTHLY")}
                  disabled={isEditing}
                />
                <OptionChip
                  label="Todo ano"
                  selected={recurrence === "YEARLY"}
                  onPress={() => setRecurrence("YEARLY")}
                  disabled={isEditing}
                />
              </View>
              <Text style={styles.recurrenceSummary}>
                {recurrenceSummary(date, recurrence)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Animated.View style={[styles.footer, footerPadding]}>
        <FooterButton
          label={isEditing ? "Salvar alterações" : `Adicionar ${typeName}`}
          onPress={handleSubmit}
          disabled={!canSubmit}
          loading={isSubmitting}
        />
      </Animated.View>

      <CurrencyInput
        visible={isKeypadVisible}
        amount={amount}
        type={transactionType}
        onChange={setAmount}
        onClose={() => setIsKeypadVisible(false)}
      />

      <CategorySelector
        visible={isCategorySheetVisible}
        type={transactionType}
        categories={categories}
        loading={loading}
        selectedId={category?.id}
        onSelect={selectCategory}
        onCreate={openCreateCategory}
        onClose={() => setIsCategorySheetVisible(false)}
      />

      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={() => setIsPremiumModalVisible(false)}
      />
    </View>
  );
};
