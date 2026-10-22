import { styles } from "./TransactionsStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { shiftMonth } from "../../utils/home-summary";
import { MessageCard } from "../../components/MessageCard/MessageCard";
import { HeaderSearch } from "../../components/HeaderSearch/HeaderSearch";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { useStatement } from "../../hooks/useStatement";
import { getDateRange } from "../../utils/get-date-range";
import { MonthNavigator } from "../../components/MonthNavigator/MonthNavigator";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { StackNavigation } from "../Home/Home";
import { useTransactions } from "../../contexts/TransactionsContext";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatementItemDTO } from "../../services/DTOS/finance/StatementDTO";
import { MonthSelectorModal } from "../../components/MonthSelectorModal/MonthSelectorModal";
import { TransactionListRow } from "../../components/TransactionListRow/TransactionListRow";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Chip, RemovableChip } from "../../components/Chip/Chip";
import { StatementFilterSheet } from "../../components/StatementFilterSheet/StatementFilterSheet";
import { TransactionSettingsModal } from "../../components/TransactionSettingsModal/TransactionSettingsModal";
import { FC, useEffect, useMemo, useState } from "react";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  formatCurrency,
  formatSignedCurrency,
} from "../../utils/format-amount";
import {
  groupStatement,
  resultsLabel,
  rowAccessibilityLabel,
  rowSubtitle,
  StatementSection,
  toTransactionDTO,
} from "../../utils/statement-list";
import {
  activeFilterChips,
  defaultFilters,
  isNarrowingList,
  monthPeriod,
  periodLabel,
  removeFilter,
  StatementFilters,
  toStatementQuery,
  TYPE_OPTIONS,
} from "../../utils/statement-filters";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ListIcon from "../../assets/images/icons/list.svg";
import PlusIcon from "../../assets/images/icons/plus.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import FilterIcon from "../../assets/images/icons/filter.svg";
import RefreshIcon from "../../assets/images/refresh-icon-svg.svg";
import AlertTriangleIcon from "../../assets/images/icons/alert-triangle.svg";

type ParamList = {
  Params: {
    month: number;
    year: number;
  };
};

const SEARCH_DEBOUNCE_MS = 300;

export const Transactions: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();

  const { month, year } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { user, userToken } = useAuth();
  const token = userToken?.token ?? "";

  const { shouldRefetch, clearRefetch } = useTransactions();

  const [filters, setFilters] = useState<StatementFilters>(() =>
    defaultFilters(month, year)
  );

  const [searchText, setSearchText] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const search = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDTO | null>(null);

  const { categories: expenseCategories } = useGetCategories({
    token,
    type: "EXPENSE",
  });
  const { categories: incomeCategories } = useGetCategories({
    token,
    type: "INCOME",
  });

  const categories = useMemo(
    () => [...expenseCategories, ...incomeCategories],
    [expenseCategories, incomeCategories]
  );

  const filterChips = useMemo(
    () =>
      activeFilterChips(
        filters,
        Object.fromEntries(categories.map(({ id, name }) => [id, name]))
      ),
    [filters, categories]
  );

  const { period, sort } = filters;
  const isNarrowing = isNarrowingList(filters, search);

  const {
    items,
    dayTotals,
    summary,
    filtered,
    nextCursor,
    loading,
    loadingMore,
    refreshing,
    error,
    loadMore,
    refresh,
    reload,
  } = useStatement({
    userId: user?.id ?? "",
    token,
    query: toStatementQuery(filters, search),
    // Só o mês sem filtros fica em cache: é a visão que a tela abre.
    cacheable:
      period.kind === "month" && !isNarrowing && filterChips.length === 0,
  });

  const sections = useMemo(
    () => groupStatement(items, dayTotals, sort),
    [items, dayTotals, sort]
  );

  // Criar, editar ou excluir um lançamento liga shouldRefetch: ao voltar, recarrega.
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (shouldRefetch) {
        reload();
        clearRefetch();
      }
    });

    return unsubscribe;
  }, [navigation, shouldRefetch, reload, clearRefetch]);

  // Trocar de mês volta para a visão do mês, sem o filtro de tipo.
  const handleMonthChange = (newMonth: number, newYear: number) => {
    setFilters((current) => ({
      ...current,
      period: monthPeriod(newMonth, newYear),
      type: "all",
    }));
  };

  const handleMonthStep =
    period.kind === "month"
      ? (delta: number) => {
          const next = shiftMonth(period.month, period.year, delta);
          handleMonthChange(next.month, next.year);
        }
      : undefined;

  const closeSearch = () => {
    setSearchText("");
    setIsSearchVisible(false);
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

  const today = new Date();
  const selectedMonth =
    period.kind === "month"
      ? period
      : { month: today.getMonth(), year: today.getFullYear() };

  const renderSummaryValue = (value: string, style: object) =>
    summary ? (
      <Text style={[styles.summaryValue, style]} numberOfLines={1}>
        {value}
      </Text>
    ) : (
      <ActivityIndicator
        size="small"
        color={Colors.brandBlue}
        style={styles.summaryLoader}
      />
    );

  const listHeader = (
    <View style={styles.listHeader}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryColumn}>
          <Text style={styles.summaryLabel}>Entradas</Text>
          {renderSummaryValue(
            formatCurrency(summary?.incomes ?? 0),
            styles.income
          )}
        </View>
        <View style={[styles.summaryColumn, styles.summaryMiddleColumn]}>
          <Text style={styles.summaryLabel}>Saídas</Text>
          {renderSummaryValue(
            formatCurrency(summary?.expenses ?? 0),
            styles.expense
          )}
        </View>
        <View style={styles.summaryColumn}>
          <Text style={styles.summaryLabel}>Saldo</Text>
          {renderSummaryValue(
            `${(summary?.balance ?? 0) < 0 ? "− " : ""}${formatCurrency(
              Math.abs(summary?.balance ?? 0)
            )}`,
            styles.balance
          )}
        </View>
      </View>

      <View style={styles.chips}>
        {TYPE_OPTIONS.map(({ id, label }) => (
          <Chip
            key={id}
            label={label}
            selected={filters.type === id}
            onPress={() => setFilters((current) => ({ ...current, type: id }))}
          />
        ))}
        {filterChips.map(({ key, label }) => (
          <RemovableChip
            key={key}
            label={label}
            onRemove={() => setFilters((current) => removeFilter(current, key))}
          />
        ))}
      </View>

      {isNarrowing && !!filtered?.count && (
        <Text style={styles.results}>
          {resultsLabel(filtered.count, filtered.total)}
        </Text>
      )}
    </View>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.brandBlue}
          style={styles.listLoader}
        />
      );
    }

    if (error) {
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
            onPress: reload,
          }}
        />
      );
    }

    const emptyIcon = (
      <ListIcon width={26} height={26} color={Colors.brandBlue} />
    );

    if (isNarrowing) {
      return (
        <MessageCard
          icon={emptyIcon}
          title="Nenhum lançamento encontrado"
          message="Tente outro termo ou remova os filtros."
        />
      );
    }

    return (
      <MessageCard
        icon={emptyIcon}
        title={
          period.kind === "month"
            ? `Nada lançado em ${getDateRange(
                period.year,
                period.month
              ).monthName.toLowerCase()}`
            : "Nada lançado no período"
        }
        message="Registre sua primeira receita ou despesa para acompanhar o mês por aqui."
        action={{
          label: "Adicionar lançamento",
          icon: <PlusIcon width={18} height={18} color={Colors.surface} />,
          onPress: () => setIsTypeSelectorVisible(true),
        }}
      />
    );
  };

  const renderSectionHeader = ({ section }: { section: StatementSection }) =>
    section.title ? (
      <View style={styles.dayHeader}>
        <Text style={styles.dayTitle}>{section.title}</Text>
        {section.total !== null && (
          <Text style={styles.dayTotal}>
            {formatSignedCurrency(section.total)}
          </Text>
        )}
      </View>
    ) : null;

  // As linhas de um grupo formam um card só: a primeira e a última arredondam os cantos.
  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: StatementItemDTO;
    index: number;
    section: StatementSection;
  }) => {
    const isLast = index === section.data.length - 1;

    return (
      <View
        style={[
          styles.rowCard,
          index === 0 && styles.rowCardFirst,
          isLast && styles.rowCardLast,
        ]}
      >
        <TransactionListRow
          categoryIcon={item.category.icon}
          title={item.category.name}
          subtitle={rowSubtitle(item)}
          amount={item.amount}
          kind={item.type}
          iconShape="circle"
          showDivider={!isLast}
          onPress={() => setSelectedTransaction(toTransactionDTO(item))}
          accessibilityLabel={rowAccessibilityLabel(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingTop: Math.max(20, insets.top + 8) }]}
      >
        {isSearchVisible ? (
          <HeaderSearch
            value={searchText}
            onChangeText={setSearchText}
            onCancel={closeSearch}
            placeholder="Categoria ou descrição"
            accessibilityLabel="Buscar no extrato"
          />
        ) : (
          <View style={styles.titleRow}>
            <Text style={styles.title}>Extrato</Text>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsSearchVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Buscar"
            >
              <SearchIcon width={20} height={20} color={Colors.surface} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsFilterSheetVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Filtrar"
            >
              <FilterIcon width={20} height={20} color={Colors.surface} />
              {filterChips.length > 0 && <View style={styles.filterDot} />}
            </TouchableOpacity>
          </View>
        )}

        <MonthNavigator
          label={periodLabel(period)}
          onPress={() => setIsMonthSelectorVisible(true)}
          onStep={handleMonthStep}
        />
      </View>

      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={Colors.brandBlue}
              style={styles.footerLoader}
            />
          ) : null
        }
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onEndReached={nextCursor ? loadMore : undefined}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[Colors.brandBlue]}
            progressViewOffset={40}
          />
        }
      />

      <BottomBar
        active="Transactions"
        month={month}
        year={year}
        onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
      />

      <MonthSelectorModal
        visible={isMonthSelectorVisible}
        onClose={() => setIsMonthSelectorVisible(false)}
        onSelectMonth={handleMonthChange}
        currentMonth={selectedMonth.month}
        currentYear={selectedMonth.year}
      />

      <StatementFilterSheet
        visible={isFilterSheetVisible}
        onClose={() => setIsFilterSheetVisible(false)}
        filters={filters}
        categories={categories}
        onApply={setFilters}
      />

      <CreateTransactionTypeSelector
        visible={isTypeSelectorVisible}
        onClose={() => setIsTypeSelectorVisible(false)}
        onSelect={handleSelectType}
      />

      <TransactionSettingsModal
        visible={selectedTransaction !== null}
        props={{
          transaction: selectedTransaction,
          token,
          user_id: user?.id ?? "",
        }}
        onClose={() => setSelectedTransaction(null)}
      />

      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={() => setIsPremiumModalVisible(false)}
      />
    </View>
  );
};
