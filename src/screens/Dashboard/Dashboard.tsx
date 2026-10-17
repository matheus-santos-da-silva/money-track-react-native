import { styles } from "./DashboardStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { shiftMonth } from "../../utils/home-summary";
import { BalanceCard } from "../../components/BalanceCard/BalanceCard";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { StackNavigation } from "../Home/Home";
import { MonthNavigator } from "../../components/MonthNavigator/MonthNavigator";
import { MonthHighlights } from "../../components/MonthHighlights/MonthHighlights";
import { useTransactions } from "../../contexts/TransactionsContext";
import { ReportIndicators } from "../../components/ReportIndicators/ReportIndicators";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CategoryBreakdown } from "../../components/CategoryBreakdown/CategoryBreakdown";
import { MonthSelectorModal } from "../../components/MonthSelectorModal/MonthSelectorModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { useTransactionsHistory } from "../../hooks/useTransactionsHistory";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { FC, useEffect, useMemo, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import {
  SpendingBar,
  SpendingHistoryChart,
} from "../../components/SpendingHistoryChart/SpendingHistoryChart";
import {
  balanceComparison,
  dailyAverage,
  dailyAverageCaption,
  historyByMonth,
  monthHighlights,
  monthName,
  monthTotals,
  savingsRate,
  transactionsOfMonth,
} from "../../utils/reports";

import PlusIcon from "../../assets/images/icons/plus.svg";
import BarChartIcon from "../../assets/images/icons/bar-chart.svg";
import RefreshIcon from "../../assets/images/refresh-icon-svg.svg";
import AlertTriangleIcon from "../../assets/images/icons/alert-triangle.svg";

type ParamList = {
  Params: {
    month: number;
    year: number;
  };
};

// Meses do gráfico, contando o exibido.
const HISTORY_MONTHS = 6;

export const Dashboard: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();

  const { month, year } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { user, userToken } = useAuth();
  const userId = user?.id ?? "";
  const token = userToken?.token ?? "";

  const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);
  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const [currentYear, setCurrentYear] = useState<number>(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [forceUpdate, setForceUpdate] = useState(false);

  const isViewingRouteMonth = currentMonth === month && currentYear === year;

  const {
    transactions: contextTransactions,
    setTransactions,
    shouldRefetch,
    clearRefetch,
  } = useTransactions();

  const {
    transactions: fetchedTransactions,
    transactionsError,
    loading,
    refetch,
  } = useGetUserTransactions({
    user_id: userId,
    token,
    month: currentMonth,
    year: currentYear,
  });

  const history = useTransactionsHistory({
    user_id: userId,
    token,
    month: currentMonth,
    year: currentYear,
    months: HISTORY_MONTHS,
  });

  // O mês da rota vem do contexto (já carregado pela Home); os demais, da busca.
  // Enquanto a busca de outro mês carrega, os dados antigos não aparecem.
  const transactions =
    isViewingRouteMonth && !forceUpdate
      ? contextTransactions
      : loading
      ? null
      : fetchedTransactions;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (shouldRefetch) {
        setForceUpdate(true);
        history.refetch(true);

        refetch(true).then((updated) => {
          if (isViewingRouteMonth && updated) {
            setTransactions(updated);
          }

          setForceUpdate(false);
          clearRefetch();
        });
      }
    });

    return unsubscribe;
  }, [
    navigation,
    shouldRefetch,
    isViewingRouteMonth,
    refetch,
    history.refetch,
  ]);

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleMonthStep = (delta: number) => {
    const next = shiftMonth(currentMonth, currentYear, delta);
    handleMonthChange(next.month, next.year);
  };

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

  const name = monthName(currentMonth, currentYear);
  const totals = useMemo(
    () => (transactions ? monthTotals(transactions) : null),
    [transactions]
  );
  const hasData =
    !!transactions &&
    (transactions.expenses.length > 0 || transactions.incomes.length > 0);

  const months = useMemo(
    () =>
      history.transactions
        ? historyByMonth(
            history.transactions,
            currentMonth,
            currentYear,
            HISTORY_MONTHS
          )
        : null,
    [history.transactions, currentMonth, currentYear]
  );

  // A barra do mês exibido usa o mesmo total do card de saldo: os dois nunca divergem,
  // mesmo que um cache esteja mais velho que o outro.
  const bars = useMemo<SpendingBar[]>(
    () =>
      Array.from({ length: HISTORY_MONTHS }, (_, index) => {
        const isShownMonth = index === HISTORY_MONTHS - 1;
        const shifted = shiftMonth(
          currentMonth,
          currentYear,
          index - (HISTORY_MONTHS - 1)
        );

        return {
          ...shifted,
          expenses:
            isShownMonth && totals
              ? totals.expenses
              : months?.[index].expenses ?? 0,
        };
      }),
    [months, totals, currentMonth, currentYear]
  );

  const previousMonth = months?.[HISTORY_MONTHS - 2];

  const highlights = useMemo(() => {
    if (!transactions) return [];

    const previous =
      history.transactions && previousMonth
        ? {
            ...previousMonth,
            expenses: transactionsOfMonth(
              history.transactions,
              previousMonth.month,
              previousMonth.year
            ).expenses,
          }
        : null;

    return monthHighlights(transactions.expenses, previous);
  }, [transactions, history.transactions, previousMonth]);

  const average = totals
    ? dailyAverage(totals.expenses, currentMonth, currentYear)
    : null;

  const chartStatus = history.transactions
    ? "ready"
    : history.error
    ? "error"
    : "loading";

  const renderMonthContent = () => {
    if (!transactions && transactionsError) {
      return (
        <MessageCard
          icon={
            <AlertTriangleIcon
              width={28}
              height={28}
              color={Colors.expenseText}
            />
          }
          title="Não conseguimos nos conectar"
          message="Verifique sua conexão e tente novamente."
          action={{
            label: "Tentar novamente",
            icon: <RefreshIcon width={16} height={16} />,
            onPress: () => refetch(),
          }}
        />
      );
    }

    return (
      <BalanceCard
        monthName={name}
        totals={totals}
        comparison={
          totals && months
            ? balanceComparison(totals.balance, previousMonth)
            : null
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingTop: Math.max(20, insets.top + 8) }]}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>Relatórios</Text>
        </View>

        <MonthNavigator
          label={`${name} ${currentYear}`}
          onPress={() => setIsMonthSelectorVisible(true)}
          onStep={handleMonthStep}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderMonthContent()}

        {hasData && totals && (
          <ReportIndicators
            savingsRate={savingsRate(totals)}
            overspent={totals.balance < 0}
            dailyAverage={
              average && {
                amount: average.amount,
                caption: dailyAverageCaption(
                  average,
                  currentMonth,
                  currentYear
                ),
              }
            }
          />
        )}

        <SpendingHistoryChart
          key={`${currentYear}-${currentMonth}`}
          bars={bars}
          status={chartStatus}
          onRetry={() => history.refetch()}
        />

        {hasData && transactions && (
          <>
            <CategoryBreakdown
              key={`${currentYear}-${currentMonth}`}
              monthName={name}
              expenses={transactions.expenses}
              incomes={transactions.incomes}
            />
            <MonthHighlights highlights={highlights} />
          </>
        )}

        {transactions && !hasData && (
          <MessageCard
            icon={
              <BarChartIcon width={26} height={26} color={Colors.brandBlue} />
            }
            title={`Sem lançamentos em ${name.toLowerCase()}`}
            message="Assim que você registrar receitas e despesas, os gráficos e destaques do mês aparecem aqui."
            action={{
              label: "Adicionar lançamento",
              icon: <PlusIcon width={18} height={18} color={Colors.surface} />,
              onPress: () => setIsTypeSelectorVisible(true),
            }}
          />
        )}
      </ScrollView>

      <BottomBar
        active="Dashboard"
        month={month}
        year={year}
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
