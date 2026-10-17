import { FC } from "react";
import { styles } from "./BalanceCardStyles";
import { Colors } from "../../styles/colors";
import { formatCurrency } from "../../utils/format-amount";
import { BalanceComparison, MonthTotals } from "../../utils/reports";
import { ActivityIndicator, Text, View } from "react-native";

import ArrowUpIcon from "../../assets/images/icons/arrow-up.svg";
import ArrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import ArrowUpRightIcon from "../../assets/images/icons/arrow-up-right.svg";
import ArrowDownLeftIcon from "../../assets/images/icons/arrow-down-left.svg";

interface BalanceCardProps {
  monthName: string;
  totals: MonthTotals | null;
  comparison: BalanceComparison | null;
}

const TONES = {
  up: {
    box: styles.tagUp,
    text: styles.tagUpText,
    color: Colors.incomeText,
    Icon: ArrowUpIcon,
  },
  down: {
    box: styles.tagDown,
    text: styles.tagDownText,
    color: Colors.expenseText,
    Icon: ArrowDownIcon,
  },
  same: {
    box: styles.tagSame,
    text: styles.tagSameText,
    color: Colors.muted,
    Icon: null,
  },
};

export const BalanceCard: FC<BalanceCardProps> = ({
  monthName,
  totals,
  comparison,
}) => {
  const renderValue = (value: string, style: object) =>
    totals ? (
      <Text style={style} numberOfLines={1}>
        {value}
      </Text>
    ) : (
      <ActivityIndicator
        size="small"
        color={Colors.brandBlue}
        style={styles.loader}
      />
    );

  const balance = totals?.balance ?? 0;
  const tone = comparison ? TONES[comparison.tone] : null;

  return (
    <View style={styles.card}>
      <View style={styles.balance}>
        <Text style={styles.label}>Saldo de {monthName.toLowerCase()}</Text>
        {renderValue(
          `${balance < 0 ? "− " : ""}${formatCurrency(Math.abs(balance))}`,
          styles.balanceValue
        )}

        {comparison && tone && (
          <View style={[styles.tag, tone.box]}>
            {tone.Icon && (
              <tone.Icon width={14} height={14} color={tone.color} />
            )}
            <Text style={[styles.tagText, tone.text]}>{comparison.label}</Text>
          </View>
        )}
      </View>

      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={[styles.columnIcon, styles.incomeIcon]}>
            <ArrowDownLeftIcon
              width={18}
              height={18}
              color={Colors.incomeText}
            />
          </View>
          <View style={styles.columnTexts}>
            <Text style={styles.columnLabel}>Entradas</Text>
            {renderValue(
              formatCurrency(totals?.incomes ?? 0),
              styles.columnValue
            )}
          </View>
        </View>

        <View style={styles.column}>
          <View style={[styles.columnIcon, styles.expenseIcon]}>
            <ArrowUpRightIcon
              width={18}
              height={18}
              color={Colors.expenseText}
            />
          </View>
          <View style={styles.columnTexts}>
            <Text style={styles.columnLabel}>Saídas</Text>
            {renderValue(
              formatCurrency(totals?.expenses ?? 0),
              styles.columnValue
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
