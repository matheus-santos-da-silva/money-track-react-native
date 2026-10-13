import { dateOnlyKey, parseDateOnly, todayKey } from "../../utils/date-only";
import { styles } from "./TransactionsStyles";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { CustomText } from "../../components/CustomText/CustomText";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { filterOptions } from "../../components/TransactionsFilterModal/TransactionsFilterModal";
import { TransactionRow } from "../../components/TransactionRow/TransactionRow";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { StackNavigation } from "../Home/Home";
import { useTransactions } from "../../contexts/TransactionsContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchTransactionsBar } from "../../components/SearchTransactionBar/SearchTransactionsBar";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { FC, useEffect, useState } from "react";
import { TransactionsFilterModal } from "../../components/TransactionsFilterModal/TransactionsFilterModal";
import { TransactionSettingsModal } from "../../components/TransactionSettingsModal/TransactionSettingsModal";
import { TransactionsMonthSelector } from "../../components/TransactionsMonthSelector/TransactionsMonthSelector";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import SearchIcon from "../../assets/images/search-btn-svg.svg";
import DateFilterIcon from "../../assets/images/date-filter-svg.svg";

type ParamList = {
  Params: {
    month: number;
    year: number;
  };
};

type GroupedTransactions = {
  [date: string]: {
    id: string;
    description?: string;
    total_installments: number;
    current_installment: number;
    installment_group_id?: string;
    transaction_date: Date;
    recurrence: "MONTHLY" | "YEARLY" | "NONE";
    type: "Receita" | "Despesa";
    amount: number;
    category: CategoryDTO;
  }[];
};

const formatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
});

export const Transactions: FC = () => {
  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { month, year } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { user, userToken } = useAuth();

  const [currentYear, setCurrentYear] = useState<number>(year);
  const [currentMonthIndex, setCurrentMonth] = useState(month);

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setFilterSelected(null);
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  const isViewingCurrentMonth = currentMonthIndex === month && currentYear === year;

  const {
    transactions: contextTransactions,
    setTransactions,
    shouldRefetch,
    clearRefetch,
  } = useTransactions();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => setIsSearchVisible((prev) => !prev);
  const closeSearch = () => {
    setSearchQuery("");
    setIsSearchVisible(false);
  };

  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [transactionSettings, setTransactionSettings] =
    useState<TransactionDTO | null>(null);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState<filterOptions | null>(
    null,
  );

  const handleSelectFilter = (filter: filterOptions) => {
    handleMonthChange(new Date().getMonth(), new Date().getFullYear());
    setFilterSelected(filter);
  };

  const {
    transactions: fetchedTransactions,
    loading,
    refetch,
  } = useGetUserTransactions({
    user_id: user?.id ?? "",
    token: userToken?.token || "",
    month: currentMonthIndex,
    year: currentYear,
  });

  const transactions =
    isViewingCurrentMonth && !forceUpdate
      ? contextTransactions
      : fetchedTransactions;

  const groupedByDate: GroupedTransactions = {};

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    setIsTypeSelectorVisible(false);
    if (user?.isPremium === false) {
      setIsPremiumModalVisible(true);
      return;
    } else {
      navigation.navigate(
        type === "EXPENSE" ? "CreateExpense" : "CreateIncome",
        {},
      );
    }
  };

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

  const filteredTransactions = searchQuery
    ? {
        incomes:
          transactions?.incomes.filter((tx) =>
            tx.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ?? [],
        expenses:
          transactions?.expenses.filter((tx) =>
            tx.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ?? [],
      }
    : transactions;

  if (filteredTransactions) {
    [...filteredTransactions.incomes, ...filteredTransactions.expenses].forEach(
      (transaction) => {
        if (filterSelected === "today") {
          const isoDate = dateOnlyKey(transaction.transaction_date);

          if (isoDate === todayKey()) {
            if (!groupedByDate[isoDate]) groupedByDate[isoDate] = [];

            groupedByDate[isoDate].push({
              id: transaction.id,
              recurrence: transaction.recurrence,
              total_installments: transaction.total_installments,
              current_installment: transaction.current_installment,
              transaction_date: transaction.transaction_date,
              description: transaction?.description,
              type: filteredTransactions.incomes.includes(transaction)
                ? "Receita"
                : "Despesa",
              amount: transaction.amount,
              category: transaction.category,
              installment_group_id: transaction.installment_group_id,
            });
          }
        } else {
          const isoDate = dateOnlyKey(transaction.transaction_date);

          if (!groupedByDate[isoDate]) groupedByDate[isoDate] = [];

          groupedByDate[isoDate].push({
            id: transaction.id,
            recurrence: transaction.recurrence,
            total_installments: transaction.total_installments,
            current_installment: transaction.current_installment,
            installment_group_id: transaction.installment_group_id,
            transaction_date: transaction.transaction_date,
            description: transaction?.description,
            type: filteredTransactions.incomes.includes(transaction)
              ? "Receita"
              : "Despesa",
            amount: transaction.amount,
            category: transaction.category,
          });
        }
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blueTopContainer}>
        {isSearchVisible ? (
          <SearchTransactionsBar
            visible={isSearchVisible}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClose={closeSearch}
          />
        ) : (
          <View style={styles.blueTopContent}>
            <View style={{ width: 72 }} />
            <CustomText style={styles.title}>Transações</CustomText>
            <View style={styles.topIcons}>
              <TouchableOpacity>
                <SearchIcon width={22} height={22} onPress={toggleSearch} />
              </TouchableOpacity>
              <TouchableOpacity>
                <DateFilterIcon
                  width={22}
                  height={22}
                  onPress={() => setIsFilterModalVisible(true)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TransactionsMonthSelector
          monthIndex={currentMonthIndex}
          year={currentYear}
          onMonthChange={handleMonthChange}
          filterSelected={filterSelected}
        />
      </View>
      <View style={styles.mainContainer}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : filteredTransactions &&
          (filteredTransactions.incomes.length > 0 ||
            filteredTransactions.expenses.length > 0) ? (
          <ScrollView contentContainerStyle={styles.transactionsContent}>
            {Object.entries(groupedByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([isoDate, txList]) => (
                <View key={isoDate}>
                  <CustomText style={styles.transactionDateText}>
                    {formatter.format(parseDateOnly(isoDate))}
                  </CustomText>

                  {txList.map((tx, index) => {
                    return (
                      <TouchableOpacity
                        key={`${tx.id}-${index}`}
                        onPress={() => {
                          setIsTransactionModalVisible(true);
                          setTransactionSettings({
                            ...tx,
                            category_id: tx.category.id,
                          });
                        }}
                      >
                        <TransactionRow
                          title={tx.category.name}
                          type={tx.type}
                          value={tx.amount}
                          icon={tx.category.icon.split("-")[1]}
                          circleColor={tx.category.icon.split("-")[0]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CustomText style={{ fontSize: 16, color: "#6B7280" }}>
              Nenhuma transação encontrada
            </CustomText>
          </View>
        )}
      </View>
      <BottomBar
        userProps={{
          id: user?.id || "",
          name: user?.name || "",
          token: userToken?.token || "",
          month,
          year,
        }}
        onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
      />
      <TransactionsFilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onSelectFilter={handleSelectFilter}
        selectedFilter={filterSelected}
        onChangeSelected={handleSelectFilter}
      />

      <CreateTransactionTypeSelector
        visible={isTypeSelectorVisible}
        onClose={() => setIsTypeSelectorVisible(false)}
        onSelect={(type) => {
          setIsTypeSelectorVisible(false);
          handleSelectType(type);
        }}
      />

      <TransactionSettingsModal
        visible={isTransactionModalVisible}
        props={{
          transaction: transactionSettings,
          token: userToken?.token || "",
          user_id: user?.id || "",
        }}
        onClose={() => {
          setIsTransactionModalVisible(false);
          setTransactionSettings(null);
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
