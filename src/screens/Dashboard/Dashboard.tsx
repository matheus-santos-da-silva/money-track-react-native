import { styles } from "./DashboardStyles";
import { Colors } from "../../styles/colors";
import { colors } from "../../utils/colors";
import { useAuth } from "../../hooks/useAuth";
import { PieChart } from "react-native-gifted-charts";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { CustomText } from "../../components/CustomText/CustomText";
import { SubtitleRow } from "../../components/SubtitleRow/SubtitleRow";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { useTransactions } from "../../contexts/TransactionsContext";
import { StackNavigation } from "../Home/Home";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { TransactionsMonthSelector } from "../../components/TransactionsMonthSelector/TransactionsMonthSelector";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { FC, useEffect, useMemo, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import ReportsImage from "../../assets/images/reports-image.svg";
import RedTrendingDown from "../../assets/images/red-trending-down.svg";
import GreenTrendingUp from "../../assets/images/green-trending-up.svg";

type ParamList = {
  Params: {
    month: number;
    year: number;
  };
};

type CategoryGroup = {
  name: string;
  total: number;
};

export const Dashboard: FC = () => {
  const { month, year } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { user, userToken } = useAuth();

  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const [currentYear, setCurrentYear] = useState<number>(year);
  const [currentMonthIndex, setCurrentMonth] = useState(month);
  const [forceUpdate, setForceUpdate] = useState(false);

  const isViewingCurrentMonth = currentMonthIndex === month && currentYear === year;

  const {
    transactions: contextTransactions,
    setTransactions,
    shouldRefetch,
    clearRefetch,
  } = useTransactions();

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    setIsTypeSelectorVisible(false);
    if (user?.plan === "FREE" && new Date(user.trialEndsAt) < new Date()) {
      setIsPremiumModalVisible(true);
      return;
    } else {
      navigation.navigate(
        type === "EXPENSE" ? "CreateExpense" : "CreateIncome",
        {},
      );
    }
  };

  const {
    transactions: fetchedTransactions,
    loading,
    refetch,
  } = useGetUserTransactions({
    user_id: user?.id || "",
    token: userToken?.token || "",
    month: currentMonthIndex,
    year: currentYear,
  });

  const transactions =
    isViewingCurrentMonth && !forceUpdate
      ? contextTransactions
      : fetchedTransactions;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (shouldRefetch) {
        setForceUpdate(true);

        refetch(true).then((updated) => {
          if (isViewingCurrentMonth && updated) {
            setTransactions(updated);
          }

          setForceUpdate(false);
          clearRefetch();
        });
      }
    });

    return unsubscribe;
  }, [navigation, shouldRefetch]);

  const getPieDataByCategory = (
    colors: string[],
    totalAmount: number,
    transactions?: TransactionDTO[],
    maxCategories: number = 7,
  ) => {
    if (!transactions?.length || totalAmount === 0) return [];

    const grouped = transactions.reduce<Record<string, CategoryGroup>>(
      (acc, item) => {
        const categoryId = item.category_id;
        const name = item.category?.name;
        if (!acc[categoryId]) {
          acc[categoryId] = { name, total: 0 };
        }
        acc[categoryId].total += item.amount;
        return acc;
      },
      {},
    );

    const sorted = Object.values(grouped).sort((a, b) => b.total - a.total);
    const topCategories = sorted.slice(0, maxCategories);
    const otherCategories = sorted.slice(maxCategories);

    if (otherCategories.length > 0) {
      const othersTotal = otherCategories.reduce(
        (sum, cat) => sum + cat.total,
        0,
      );
      topCategories.push({ name: "Outros...", total: othersTotal });
    }

    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);

    return topCategories.map((item, index) => {
      const color = shuffledColors[index % shuffledColors.length];
      return {
        color,
        value: (item.total / totalAmount) * 100,
        text: `${((item.total / totalAmount) * 100).toFixed(1)}%`,
        name: item.name,
        total: item.total,
      };
    });
  };

  const expensesAmount: number =
    transactions?.expenses.reduce((acc, expense) => acc + expense.amount, 0) ||
    0;

  const incomesAmount: number =
    transactions?.incomes.reduce((acc, income) => acc + income.amount, 0) || 0;

  const totalAmount = incomesAmount - expensesAmount;

  const incomesPieData = useMemo(
    () => getPieDataByCategory(colors, incomesAmount, transactions?.incomes),
    [transactions?.incomes, incomesAmount],
  );

  const expensesPieData = useMemo(
    () => getPieDataByCategory(colors, expensesAmount, transactions?.expenses),
    [transactions?.expenses, expensesAmount],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.title}>
          <CustomText style={{ fontSize: 20, color: "white" }}>
            Resumo
          </CustomText>
        </View>

        <View>
          <TransactionsMonthSelector
            monthIndex={currentMonthIndex}
            year={currentYear}
            onMonthChange={handleMonthChange}
            filterSelected={null}
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 45,
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.totalAmountDiv}>
            <View style={styles.cardTotalAmount}>
              <View style={styles.cardTotalAmountTitle}>
                <CustomText style={styles.cardTotalAmountText}>
                  Receita
                </CustomText>
                <GreenTrendingUp width={12} height={12} />
              </View>

              <View style={styles.justify}>
                <Text
                  style={[
                    styles.cardTotalAmountValue,
                    { color: Colors.incomeGreen },
                  ]}
                >
                  {`R$ +${incomesAmount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Text>
              </View>
            </View>

            <View style={styles.cardTotalAmount}>
              <View style={styles.cardTotalAmountTitle}>
                <CustomText style={styles.cardTotalAmountText}>
                  Saldo Total
                </CustomText>
              </View>

              <View style={styles.justify}>
                <Text
                  style={[
                    styles.cardTotalAmountValue,
                    { color: Colors.primaryGray },
                  ]}
                >
                  {`R$ ${totalAmount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Text>
              </View>
            </View>

            <View style={styles.cardTotalAmount}>
              <View style={styles.cardTotalAmountTitle}>
                <CustomText style={styles.cardTotalAmountText}>
                  Despesa
                </CustomText>
                <RedTrendingDown width={12} height={12} />
              </View>

              <View style={styles.justify}>
                <Text
                  style={[
                    styles.cardTotalAmountValue,
                    { color: Colors.expenseRed },
                  ]}
                >
                  {`R$ -${expensesAmount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Text>
              </View>
            </View>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primaryBlue} />
              <Text style={styles.messageText}>Carregando relatórios...</Text>
            </View>
          ) : incomesPieData.length === 0 && expensesPieData.length === 0 ? (
            // 🚫 Nenhum dado disponível
            <View style={styles.withoutAnyReportDiv}>
              <ReportsImage width={250} height={250} />
              <View>
                <Text style={styles.messageText}>
                  Nenhum relatório disponível no momento!
                </Text>
                <Text style={styles.messageText}>
                  Adicione alguma transação para visualizar os gráficos!
                </Text>
              </View>
            </View>
          ) : (
            <>
              {/* --- RECEITAS --- */}
              {incomesPieData.length > 0 ? (
                <View style={styles.chartsCards}>
                  <View style={styles.chartsCardsTitleDiv}>
                    <CustomText style={styles.chartsCardsTitle}>
                      Receita por Categoria
                    </CustomText>
                  </View>

                  <View style={styles.data}>
                    <View style={styles.subtitle}>
                      {incomesPieData.map((income, index) => (
                        <SubtitleRow
                          key={income.name + index}
                          color={income.color}
                          title={income.name}
                          percent={(income.total / incomesAmount) * 100}
                        />
                      ))}
                    </View>

                    <View>
                      <PieChart
                        donut
                        data={incomesPieData}
                        showText={false}
                        radius={65}
                        innerRadius={38}
                        strokeColor="#fff"
                        innerCircleColor="#ffffffff"
                        focusOnPress
                      />
                    </View>
                  </View>
                </View>
              ) : (
                // 🚫 Nenhuma receita
                <View style={styles.withoutOneReportDiv}>
                  <ReportsImage width={160} height={160} />
                  <Text style={styles.messageText}>
                    Nenhuma receita registrada!
                  </Text>
                </View>
              )}

              {/* --- DESPESAS --- */}
              {expensesPieData.length > 0 ? (
                <View style={styles.chartsCards}>
                  <View style={styles.chartsCardsTitleDiv}>
                    <CustomText style={styles.chartsCardsTitle}>
                      Despesa por Categoria
                    </CustomText>
                  </View>

                  <View style={styles.data}>
                    <View style={styles.subtitle}>
                      {expensesPieData.map((expense, index) => (
                        <SubtitleRow
                          key={expense.name + index}
                          color={expense.color}
                          title={expense.name}
                          percent={(expense.total / expensesAmount) * 100}
                        />
                      ))}
                    </View>

                    <View>
                      <PieChart
                        donut
                        data={expensesPieData}
                        radius={65}
                        innerRadius={38}
                        strokeColor="#fff"
                        innerCircleColor="#ffffffff"
                        focusOnPress
                      />
                    </View>
                  </View>
                </View>
              ) : (
                // 🚫 Nenhuma despesa
                <View style={styles.withoutOneReportDiv}>
                  <ReportsImage width={160} height={160} />
                  <Text style={styles.messageText}>
                    Nenhuma despesa registrada!
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      <BottomBar
        userProps={{
          id: user?.id || "",
          name: user?.name || "",
          token: userToken?.token || "",
          month,
          year,
          email: user?.email || "",
        }}
        onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
      />

      <CreateTransactionTypeSelector
        visible={isTypeSelectorVisible}
        onClose={() => setIsTypeSelectorVisible(false)}
        onSelect={(type) => {
          setIsTypeSelectorVisible(false);
          handleSelectType(type);
        }}
      />

      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={(productId: string) => {
          setIsPremiumModalVisible(false);
          console.log("Subscribe to:", productId);
        }}
      />
    </SafeAreaView>
  );
};
