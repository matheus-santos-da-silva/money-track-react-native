import { styles } from "./HomeStyles";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { CustomText } from "../../components/CustomText/CustomText";
import { useBalance } from "../../hooks/useBalance";
import { getDateRange } from "../../utils/get-date-range";
import { showSnackBar } from "../../utils/show-snack-bar";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { clearOldCache } from "../../utils/cache-helpers";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../../contexts/TransactionsContext";
import { TransactionCard } from "../../components/TransactionCard/TransactionCard";
import { MonthSelectorModal } from "../../components/MonthSelectorModal/MonthSelectorModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { InitialTransactionData } from "../../components/HandleTransaction/HandleTransaction";
import { FC, useEffect, useState } from "react";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import EyeIcon from "../../assets/images/white-eye-icon-svg.svg";
import RefreshIcon from "../../assets/images/refresh-icon-svg.svg";
import DownArrowIcon from "../../assets/images/white-arrow-down.svg";
import NotificationIcon from "../../assets/images/bell-svg.svg";
import AlertTriangleIcon from "../../assets/images/alert-triangle.svg";

export type StackNavigation = {
  Menu: undefined;

  CreateExpense: {
    initialData?: InitialTransactionData;
  };

  CreateIncome: {
    initialData?: InitialTransactionData;
  };
};

export const Home: FC = () => {
  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth(),
  );

  const { monthName } = getDateRange(currentYear, currentMonth);

  const { user, error, isPremium, userToken, logout } = useAuth();

  const [isHidden, setIsHidden] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const { setTransactions } = useTransactions();

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (user?.id) {
      clearOldCache(user.id);
    }

    if (error) {
      showSnackBar("Sua sessão expirou. Faça login novamente.", "#de525a");

      const timer = setTimeout(() => {
        logout();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user?.id, error, logout]);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch(true);
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const handleRetry = () => {
    refetch();
  };

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    setIsTypeSelectorVisible(false);
    if (user?.plan === "FREE" && new Date(user.trialEndsAt) < new Date()) {
      setIsPremiumModalVisible(true);
      return;
    }
    navigation.navigate(
      type === "EXPENSE" ? "CreateExpense" : "CreateIncome",
      {},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuContent}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.profileCircle}
              onPress={() => navigation.navigate("Menu")}
            >
              <Text style={styles.profileLetter}>
                {user?.name ? user.name[0] : "U"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.greetingText}>
              {error
                ? "Sessão expirada..."
                : user
                ? `Olá, ${user.name}!`
                : "Carregando..."}
            </Text>
          </View>
          <NotificationIcon fill="white" height="24" width="24" />
        </View>

        <View style={styles.middleMenuContent}>
          <Text style={styles.amountTotalText}>Saldo Total</Text>
          <CustomText style={styles.amount}>
            {isHidden
              ? "-----"
              : transactions
              ? `R$ ${total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "R$ 00,00"}
          </CustomText>
        </View>

        <View style={styles.lastMenuContent}>
          <View
            style={{
              position: "absolute",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={toggleModal} style={styles.monthContent}>
              <CustomText style={styles.monthText}>{monthName}</CustomText>
              <DownArrowIcon height="20" width="20" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleVisibility}
            style={styles.EyeIconView}
          >
            <EyeIcon height="20" width="20" />
          </TouchableOpacity>

          <MonthSelectorModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSelectMonth={handleMonthChange}
            currentYear={currentYear}
          />
        </View>
      </View>

      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.mainContent}>
            {transactionsError ? (
              <View style={styles.errorCard}>
                <View style={styles.errorIconContainer}>
                  <AlertTriangleIcon width={30} height={30} />
                </View>
                <Text style={styles.errorTitle}>Ops, algo deu errado!</Text>
                <Text style={styles.errorMessage}>
                  Não foi possível carregar suas transações
                </Text>

                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRetry}
                >
                  <RefreshIcon width={16} height={16} />
                  <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <TransactionCard
                  type="expense"
                  isHidden={isHidden}
                  onPress={() => {
                    if (!isPremium) {
                      setIsPremiumModalVisible(true);
                      return;
                    }
                    navigation.navigate("CreateExpense", {});
                  }}
                  amount={expenses}
                  isLoading={loading}
                />

                <TransactionCard
                  type="income"
                  isHidden={isHidden}
                  onPress={() => {
                    if (!isPremium) {
                      setIsPremiumModalVisible(true);
                      return;
                    }

                    navigation.navigate("CreateIncome", {});
                  }}
                  amount={incomes}
                  isLoading={loading}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {user && (
        <BottomBar
          userProps={{
            id: user.id,
            name: user.name,
            email: user.email,
            token: userToken?.token ?? "",
            month: currentMonth,
            year: currentYear,
          }}
          onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
        />
      )}

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
    </View>
  );
};
