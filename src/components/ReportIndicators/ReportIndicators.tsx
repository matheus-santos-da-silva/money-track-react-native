import { FC } from "react";
import { styles } from "./ReportIndicatorsStyles";
import { Text, View } from "react-native";
import { formatCurrency } from "../../utils/format-amount";

interface ReportIndicatorsProps {
  savingsRate: number | null;
  overspent: boolean;
  dailyAverage: { amount: number; caption: string } | null;
}

export const ReportIndicators: FC<ReportIndicatorsProps> = ({
  savingsRate,
  overspent,
  dailyAverage,
}) => {
  const savingsCaption =
    savingsRate === null
      ? "sem entradas no mês"
      : overspent
      ? "você gastou mais do que entrou"
      : "do que entrou ficou com você";

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Taxa de economia</Text>
        <Text style={styles.value}>
          {savingsRate === null ? "—" : `${savingsRate}%`}
        </Text>
        {savingsRate !== null && (
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${savingsRate}%` }]} />
          </View>
        )}
        <Text style={styles.caption}>{savingsCaption}</Text>
      </View>

      {dailyAverage && (
        <View style={styles.card}>
          <Text style={styles.label}>Gasto médio por dia</Text>
          <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
            {formatCurrency(dailyAverage.amount)}
          </Text>
          <Text style={styles.caption}>{dailyAverage.caption}</Text>
        </View>
      )}
    </View>
  );
};
