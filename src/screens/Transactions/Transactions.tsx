import { styles } from "./TransactionsStyles";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { CustomText } from "../../components/CustomText/CustomText";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { filterOptions } from "../../components/TransactionsFilterModal/TransactionsFilterModal";
import { TransactionRow } from "../../components/TransactionRow/TransactionRow";
import { StackNavigation } from "../Home/Home";
import { useTransactions } from "../../contexts/TransactionsContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchTransactionsBar } from "../../components/SearchTransactionBar/SearchTransactionsBar";
import { useGetUserTransactions } from "../../hooks/useGetUserTransactions";
import { InitialTransactionData } from "../../components/HandleTransaction/HandleTransaction";
import { FC, useEffect, useState } from "react";
import { TransactionsFilterModal } from "../../components/TransactionsFilterModal/TransactionsFilterModal";
import { TransactionsMonthSelector } from "../../components/TransactionsMonthSelector/TransactionsMonthSelector";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import SearchIcon from "../../assets/images/search-btn-svg.svg";
import DateFilterIcon from "../../assets/images/date-filter-svg.svg";

type ParamList = {
  Params: {
    id: string;
    name: string;
    token: string;
    month: number;
    year: number;
  };
};

type GroupedTransactions = {
  [date: string]: {
    id: string;
    description?: string;
    total_installments: number;
    transaction_date: Date;
    recurrence: string;
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
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { name, id, token, month, year } =
    useRoute<RouteProp<ParamList, "Params">>().params;

  const [currentYear] = useState<number>(year);
  const [currentMonthIndex, setCurrentMonth] = useState(month);

  const handleMonthChange = (newMonth: number) => {
    setFilterSelected(null);
    setCurrentMonth(newMonth);
  };
  const isViewingCurrentMonth = currentMonthIndex === month;

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

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState<filterOptions | null>(
    null
  );

  const handleSelectFilter = (filter: filterOptions) => {
    handleMonthChange(new Date().getMonth());
    setFilterSelected(filter);
  };

  const {
    transactions: fetchedTransactions,
    loading,
    refetch,
  } = useGetUserTransactions({
    user_id: id,
    token: token,
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
    navigation.navigate(type === "EXPENSE" ? "CreateExpense" : "CreateIncome", {
      user_id: id,
      token,
    });
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
            tx.category.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) ?? [],
        expenses:
          transactions?.expenses.filter((tx) =>
            tx.category.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) ?? [],
      }
    : transactions;

  if (filteredTransactions) {
    [...filteredTransactions.incomes, ...filteredTransactions.expenses].forEach(
      (transaction) => {
        if (filterSelected === "today") {
          const date = formatter.format(new Date());
          if (
            new Date(transaction.transaction_date).getDate() ===
              new Date().getDate() &&
            new Date(transaction.transaction_date).getMonth() ===
              new Date().getMonth()
          ) {
            if (!groupedByDate[date]) groupedByDate[date] = [];

            groupedByDate[date].push({
              id: transaction.id,
              recurrence: transaction.recurrence,
              total_installments: transaction.total_installments,
              transaction_date: transaction.transaction_date,
              description: transaction?.description,
              type: filteredTransactions.incomes.includes(transaction)
                ? "Receita"
                : "Despesa",
              amount: transaction.amount,
              category: transaction.category,
            });
          }
        } else {
          const date = formatter.format(new Date(transaction.transaction_date));

          if (!groupedByDate[date]) groupedByDate[date] = [];

          groupedByDate[date].push({
            id: transaction.id,
            recurrence: transaction.recurrence,
            total_installments: transaction.total_installments,
            transaction_date: transaction.transaction_date,
            description: transaction?.description,
            type: filteredTransactions.incomes.includes(transaction)
              ? "Receita"
              : "Despesa",
            amount: transaction.amount,
            category: transaction.category,
          });
        }
      }
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
            {Object.entries(groupedByDate).map(([date, txList]) => (
              <View key={date}>
                <CustomText style={styles.transactionDateText}>
                  {date}
                </CustomText>

                {txList.map((tx, index) => {
                  return (
                    <TouchableOpacity
                      key={`${tx.id}-${index}`}
                      onPress={() => {
                        const screen =
                          tx.type === "Despesa"
                            ? "CreateExpense"
                            : "CreateIncome";

                        const initialData: InitialTransactionData = {
                          id: tx.id,
                          amount: tx.amount,
                          category: {
                            id: tx.category.id,
                            icon: tx.category.icon,
                            name: tx.category.name,
                          },
                          description: tx.description,
                          date: tx.transaction_date,
                          transactionType:
                            tx.recurrence !== "NONE"
                              ? "recorrente"
                              : tx.total_installments > 1
                              ? "parcelada"
                              : "fixa",
                          recurrence: tx.recurrence as
                            | "MONTHLY"
                            | "YEARLY"
                            | "NONE",
                          installments: tx.total_installments,
                        };

                        if (screen === "CreateExpense") {
                          navigation.navigate("CreateExpense", {
                            user_id: id,
                            token,
                            initialData,
                          });
                        } else {
                          navigation.navigate("CreateIncome", {
                            user_id: id,
                            token,
                            initialData,
                          });
                        }
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
        userProps={{ id, name, token, month, year }}
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
    </SafeAreaView>
  );
};
