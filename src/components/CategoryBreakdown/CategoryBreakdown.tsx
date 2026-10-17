import { styles } from "./CategoryBreakdownStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { sumAmounts } from "../../utils/money";
import { FC, ReactNode, useMemo, useState } from "react";
import { formatCurrency } from "../../utils/format-amount";
import { TransactionDTO } from "../../services/DTOS/finance/TransactionDTO";
import { byCategory, topCategories } from "../../utils/reports";
import { Text, TouchableOpacity, View } from "react-native";

import ListIcon from "../../assets/images/icons/list.svg";

type Tab = "expenses" | "incomes";

interface CategoryBreakdownProps {
  monthName: string;
  expenses: TransactionDTO[];
  incomes: TransactionDTO[];
}

const VISIBLE_CATEGORIES = 6;

const TABS: { id: Tab; label: string }[] = [
  { id: "expenses", label: "Despesas" },
  { id: "incomes", label: "Receitas" },
];

const COPY = {
  expenses: {
    title: "Para onde foi seu dinheiro",
    subtitle: "Saídas",
    share: "das saídas",
  },
  incomes: {
    title: "De onde veio seu dinheiro",
    subtitle: "Entradas",
    share: "das entradas",
  },
};

const percentLabel = (share: number) => `${Math.round(share * 100)}%`;

interface RowProps {
  icon: ReactNode;
  color: string;
  name: string;
  total: number;
  share: number;
  width: number;
  shareLabel: string;
}

const CategoryRow: FC<RowProps> = ({
  icon,
  color,
  name,
  total,
  share,
  width,
  shareLabel,
}) => (
  <View
    style={styles.row}
    accessible
    accessibilityLabel={`${name}, ${formatCurrency(total)}, ${percentLabel(
      share
    )} ${shareLabel}`}
  >
    <View style={[styles.icon, { backgroundColor: color }]}>{icon}</View>

    <View style={styles.rowBody}>
      <View style={styles.rowTop}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>

      <View style={styles.rowBottom}>
        <View style={styles.track}>
          <View
            style={[styles.fill, { width: `${Math.min(100, width * 100)}%` }]}
          />
        </View>
        <Text style={styles.percent}>{percentLabel(share)}</Text>
      </View>
    </View>
  </View>
);

export const CategoryBreakdown: FC<CategoryBreakdownProps> = ({
  monthName,
  expenses,
  incomes,
}) => {
  const [tab, setTab] = useState<Tab>(
    expenses.length > 0 ? "expenses" : "incomes"
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = useMemo(
    () => byCategory(tab === "expenses" ? expenses : incomes),
    [tab, expenses, incomes]
  );

  const { top, others } = isExpanded
    ? { top: categories, others: null }
    : topCategories(categories, VISIBLE_CATEGORIES);

  const total = sumAmounts(categories.map(({ total }) => total));
  const largest = categories[0]?.total ?? 0;
  const copy = COPY[tab];

  const selectTab = (next: Tab) => {
    setTab(next);
    setIsExpanded(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.subtitle}>
          {copy.subtitle} de {monthName.toLowerCase()} por categoria ·{" "}
          {formatCurrency(total)}
        </Text>
      </View>

      <View style={styles.tabs} accessibilityRole="tablist">
        {TABS.map(({ id, label }) => {
          const isSelected = tab === id;

          return (
            <TouchableOpacity
              key={id}
              style={[styles.tab, isSelected && styles.tabSelected]}
              activeOpacity={0.8}
              onPress={() => selectTab(id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[styles.tabText, isSelected && styles.tabTextSelected]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {categories.length === 0 ? (
        <Text style={styles.empty}>
          Nenhuma {tab === "expenses" ? "despesa" : "receita"} neste mês.
        </Text>
      ) : (
        <View style={styles.list}>
          {top.map(({ categoryId, name, icon, total, share }) => {
            const [color, iconKey] = icon.split("-");
            const Icon = iconMap[iconKey];

            return (
              <CategoryRow
                key={categoryId}
                icon={Icon && <Icon width={18} height={18} />}
                color={color}
                name={name}
                total={total}
                share={share}
                width={total / largest}
                shareLabel={copy.share}
              />
            );
          })}

          {others && (
            <CategoryRow
              icon={<ListIcon width={18} height={18} color={Colors.surface} />}
              color={Colors.muted}
              name="Outras"
              total={others.total}
              share={others.share}
              width={others.total / largest}
              shareLabel={copy.share}
            />
          )}
        </View>
      )}

      {categories.length > VISIBLE_CATEGORIES && (
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setIsExpanded((current) => !current)}
          accessibilityRole="button"
        >
          <Text style={styles.toggleText}>
            {isExpanded ? "Mostrar menos" : "Ver todas as categorias"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
