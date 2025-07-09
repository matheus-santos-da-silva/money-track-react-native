import { styles } from "./HomeStyles";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { CustomText } from "../../components/CustomText/CustomText";
import { useGetUser } from "../../hooks/useGetUser";
import { useBalance } from "../../hooks/useBalance";
import { getDateRange } from "../../utils/get-date-range";
import { clearOldCache } from "../../utils/cache-helpers";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../../contexts/TransactionsContext";
import { TransactionCard } from "../../components/TransactionCard/TransactionCard";
import { MonthSelectorModal } from "../../components/MonthSelectorModal/MonthSelectorModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationIcon from "../../assets/images/bell-svg.svg";
import EyeIcon from "../../assets/images/white-eye-icon-svg.svg";
import DownArrowIcon from "../../assets/images/arrow-down-svg.svg";
import AlertTriangleIcon from "../../assets/images/alert-triangle.svg";
import RefreshIcon from "../../assets/images/refresh-icon-svg.svg";

type StackNavigation = {
  CreateExpense: {
    token: string;
    user_id: string;
  };
  CreateIncome: {
    token: string;
    user_id: string;
  };
};

export const Home: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const currentDate = new Date();
  const [currentYear] = useState<number>(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );

  const { monthName } = getDateRange(currentYear, currentMonth);
  const [token, setToken] = useState<string>("");
  const { user, error } = useGetUser(token ?? "");
  const [isHidden, setIsHidden] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { setTransactions } = useTransactions();

  const handleMonthChange = (newMonth: number) => {
    setCurrentMonth(newMonth);
  };

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { logout } = useAuth();

  useEffect(() => {
    const loadTokenAndCleanCache = async () => {
      const storedToken = await AsyncStorage.getItem("@money-track-token!");
      if (storedToken) {
        setToken(JSON.parse(storedToken).token);
      } else {
        logout();
      }
    };

    loadTokenAndCleanCache();
  }, []);

  useEffect(() => {
    if (user?.id) {
      clearOldCache(user.id);
    }
  }, [user?.id]);

  const { transactions, transactionsError, loading, refetch } =
    useGetUserTransactions({
      user_id: user?.id ?? "",
      token: token ?? "",
      month: currentMonth,
      year: currentYear,
      allMonths: false,
    });

  useEffect(() => {
    if (transactions) setTransactions(transactions);
  }, [transactions]);

  const { total, expenses, incomes } = useBalance(transactions);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const handleRetry = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topMenuContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileLetter}>
                {user?.name ? user.name[0] : "U"}
              </Text>
            </View>

            <Text style={styles.greetingText}>
              {error ? error : user ? `Olá, ${user.name}!` : "Carregando..."}
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

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleVisibility}
          style={styles.EyeIconView}
        >
          <EyeIcon height="24" width="24" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.monthContent}>
          <CustomText style={styles.monthText}>{monthName}</CustomText>
          <DownArrowIcon height="20" width="20" />
        </TouchableOpacity>

        <MonthSelectorModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectMonth={handleMonthChange}
        />

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
                onPress={() =>
                  navigation.navigate("CreateExpense", {
                    token,
                    user_id: user!.id,
                  })
                }
                amount={expenses}
                isLoading={loading}
              />

              <TransactionCard
                type="income"
                isHidden={isHidden}
                onPress={() =>
                  navigation.navigate("CreateIncome", {
                    token,
                    user_id: user!.id,
                  })
                }
                amount={incomes}
                isLoading={loading}
              />
            </>
          )}
        </View>
      </View>
      {user && (
        <BottomBar
          userProps={{
            id: user.id,
            name: user.name,
            token,
            month: currentMonth,
            year: currentYear,
          }}
        />
      )}
    </View>
  );
};
