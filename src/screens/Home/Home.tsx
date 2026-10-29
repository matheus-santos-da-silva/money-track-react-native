import { styles } from "./HomeStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useBalance } from "../../hooks/useBalance";
import { SummaryCard } from "../../components/SummaryCard/SummaryCard";
import { getDateRange } from "../../utils/get-date-range";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { clearOldCache } from "../../utils/cache-helpers";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../../utils/format-amount";
import { useTransactions } from "../../contexts/TransactionsContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MonthSelectorModal } from "../../components/MonthSelectorModal/MonthSelectorModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { MonthNavigator } from "../../components/MonthNavigator/MonthNavigator";
import { TransactionListRow } from "../../components/TransactionListRow/TransactionListRow";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { useRefetchOnReturn } from "../../hooks/useRefetchOnReturn";
import { InitialTransactionData } from "../../components/HandleTransaction/HandleTransaction";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  latestTransactions,
  shiftMonth,
  shortDateLabel,
  spendingRatio,
} from "../../utils/home-summary";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EyeIcon from "../../assets/images/icons/eye.svg";
import BellIcon from "../../assets/images/icons/bell.svg";
import ListIcon from "../../assets/images/icons/list.svg";
import PlusIcon from "../../assets/images/icons/plus.svg";
import EyeOffIcon from "../../assets/images/icons/eye-off.svg";
import RefreshIcon from "../../assets/images/refresh-icon-svg.svg";
import AlertTriangleIcon from "../../assets/images/icons/alert-triangle.svg";

export type StackNavigation = {
  Menu: undefined;

  Transactions: {
    month: number;
    year: number;
  };

  CreateExpense: {
    initialData?: InitialTransactionData;
  };

  CreateIncome: {
    initialData?: InitialTransactionData;
  };
};

const RECENT_TRANSACTIONS_LIMIT = 4;

export const Home: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();

  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );

  const { monthName } = getDateRange(currentYear, currentMonth);

  const { user, userToken } = useAuth();

  const [isHidden, setIsHidden] = useState(false);
  const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);
  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const { setTransactions } = useTransactions();

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleMonthStep = (delta: number) => {
    const { month, year } = shiftMonth(currentMonth, currentYear, delta);
    handleMonthChange(month, year);
  };

  useEffect(() => {
    if (user?.id) {
      clearOldCache(user.id);
    }
  }, [user?.id]);

  const { transactions, transactionsError, loading, refetch } =
    useGetUserTransactions({
      user_id: user?.id ?? "",
      token: userToken?.token ?? "",
      month: currentMonth,
      year: currentYear,
    });

  useEffect(() => {
    if (transactions) setTransactions(transactions);
  }, [transactions]);

  const { total, expenses, incomes } = useBalance(transactions);

  const recentTransactions = useMemo(
    () =>
      transactions
        ? latestTransactions(transactions, RECENT_TRANSACTIONS_LIMIT)
        : [],
    [transactions]
  );

  const hasTransactions = recentTransactions.length > 0;
  // Só é "mês vazio" depois que os dados chegaram: evita piscar no 1º carregamento.
  const isEmptyMonth = transactions !== null && !hasTransactions;
  const spending = hasTransactions ? spendingRatio(expenses, incomes) : null;

  useRefetchOnReturn(() => refetch(true));

  const errorFadeAnim = useRef(new Animated.Value(0)).current;
  const errorSlideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    if (transactionsError) {
      errorFadeAnim.setValue(0);
      errorSlideAnim.setValue(24);
      Animated.parallel([
        Animated.timing(errorFadeAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(errorSlideAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [transactionsError]);

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    setIsTypeSelectorVisible(false);
    if (user?.isPremium === false) {
      setIsPremiumModalVisible(true);
      return;
    }
    navigation.navigate(
      type === "EXPENSE" ? "CreateExpense" : "CreateIncome",
      {}
    );
  };

  const openMonthTransactions = () => {
    navigation.navigate("Transactions", {
      month: currentMonth,
      year: currentYear,
    });
  };

  const VisibilityIcon = isHidden ? EyeOffIcon : EyeIcon;

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingTop: Math.max(20, insets.top + 8) }]}
      >
        <View style={styles.profileRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatar}
            onPress={() => navigation.navigate("Menu")}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
          >
            <Text style={styles.avatarLetter}>
              {user?.name ? user.name[0] : "U"}
            </Text>
          </TouchableOpacity>

          <View style={styles.greeting}>
            <Text style={styles.greetingLabel}>Olá,</Text>
            <Text style={styles.greetingName} numberOfLines={1}>
              {user ? user.name : "Carregando..."}
            </Text>
          </View>

          <View
            style={styles.bellButton}
            accessibilityRole="button"
            accessibilityLabel="Notificações"
          >
            <BellIcon width={20} height={20} color={Colors.surface} />
          </View>
        </View>

        <MonthNavigator
          label={`${monthName} ${currentYear}`}
          onPress={() => setIsMonthSelectorVisible(true)}
          onStep={handleMonthStep}
        />

        <View style={styles.balance}>
          <Text style={styles.balanceLabel}>Saldo total</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount} numberOfLines={1}>
              {formatCurrency(total, isHidden)}
            </Text>
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.7}
              onPress={() => setIsHidden((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel="Mostrar ou ocultar valores"
            >
              <VisibilityIcon width={20} height={20} color={Colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {transactionsError ? (
          <Animated.View
            style={{
              opacity: errorFadeAnim,
              transform: [{ translateY: errorSlideAnim }],
            }}
          >
            <MessageCard
              icon={
                <AlertTriangleIcon
                  width={28}
                  height={28}
                  color={Colors.expenseText}
                />
              }
              title="Não conseguimos nos conectar"
              message={
                "Não se preocupe, seus dados estão salvos.\nVerifique sua conexão e tente novamente."
              }
              action={{
                label: "Tentar novamente",
                icon: <RefreshIcon width={16} height={16} />,
                onPress: () => refetch(),
              }}
            />
          </Animated.View>
        ) : (
          <>
            <View style={styles.summaryRow}>
              <SummaryCard
                kind="INCOME"
                amount={incomes}
                isHidden={isHidden}
                isLoading={loading}
                onPress={openMonthTransactions}
              />
              <SummaryCard
                kind="EXPENSE"
                amount={expenses}
                isHidden={isHidden}
                isLoading={loading}
                onPress={openMonthTransactions}
              />
            </View>

            {spending && (
              <View style={[styles.card, styles.spendingCard]}>
                <View style={styles.spendingHeader}>
                  <Text style={styles.spendingText}>
                    {spending.exceeded
                      ? "Você gastou mais do que recebeu"
                      : `Você gastou ${spending.percent}% do que recebeu`}
                  </Text>
                  <Text style={styles.spendingPeriod}>no mês</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.min(spending.percent, 100)}%` },
                      spending.exceeded && styles.progressFillExceeded,
                    ]}
                  />
                </View>
              </View>
            )}

            {hasTransactions && (
              <View style={styles.recentSection}>
                <View style={styles.recentHeader}>
                  <Text style={styles.sectionTitle}>Últimos lançamentos</Text>
                  <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={openMonthTransactions}
                    accessibilityRole="button"
                  >
                    <Text style={styles.seeAllText}>Ver todos</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.card, styles.recentCard]}>
                  {recentTransactions.map((transaction, index) => (
                    <TransactionListRow
                      key={`${transaction.kind}-${transaction.id}`}
                      categoryIcon={transaction.category.icon}
                      title={
                        transaction.description || transaction.category.name
                      }
                      subtitle={`${
                        transaction.category.name
                      } · ${shortDateLabel(transaction.transaction_date)}`}
                      amount={transaction.amount}
                      kind={transaction.kind}
                      iconShape="rounded"
                      showDivider={index < recentTransactions.length - 1}
                    />
                  ))}
                </View>
              </View>
            )}

            {isEmptyMonth && (
              <MessageCard
                icon={
                  <ListIcon width={26} height={26} color={Colors.brandBlue} />
                }
                title={`Nada lançado em ${monthName.toLowerCase()}`}
                message="Registre sua primeira receita ou despesa para acompanhar o mês por aqui."
                action={{
                  label: "Adicionar lançamento",
                  icon: (
                    <PlusIcon width={18} height={18} color={Colors.surface} />
                  ),
                  onPress: () => setIsTypeSelectorVisible(true),
                }}
              />
            )}
          </>
        )}
      </ScrollView>

      <BottomBar
        active="Home"
        month={currentMonth}
        year={currentYear}
        onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
      />

      <MonthSelectorModal
        visible={isMonthSelectorVisible}
        onClose={() => setIsMonthSelectorVisible(false)}
        onSelectMonth={handleMonthChange}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      <CreateTransactionTypeSelector
        visible={isTypeSelectorVisible}
        onClose={() => setIsTypeSelectorVisible(false)}
        onSelect={handleSelectType}
      />
      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={() => setIsPremiumModalVisible(false)}
      />
    </View>
  );
};
