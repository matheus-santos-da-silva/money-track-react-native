import { styles, CHART_HEIGHT } from "./SpendingHistoryChartStyles";
import { Colors } from "../../styles/colors";
import { FC, useState } from "react";
import { Svg, Line } from "react-native-svg";
import { formatCurrency } from "../../utils/format-amount";
import {
  averageLabel,
  averageOf,
  chartScale,
  comparisonToAverage,
  monthName,
} from "../../utils/reports";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export interface SpendingBar {
  month: number;
  year: number;
  expenses: number;
}

interface SpendingHistoryChartProps {
  bars: SpendingBar[];
  status: "loading" | "error" | "ready";
  onRetry: () => void;
}

const MIN_BAR_HEIGHT = 4;
const AVERAGE_LABEL_GAP = 4;

const barHeight = (value: number, scale: number) =>
  value > 0 ? Math.max(MIN_BAR_HEIGHT, (value / scale) * CHART_HEIGHT) : 0;

export const SpendingHistoryChart: FC<SpendingHistoryChartProps> = ({
  bars,
  status,
  onRetry,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(bars.length - 1);

  const isReady = status === "ready";
  const values = bars.map(({ expenses }) => expenses);
  const scale = chartScale(values);
  const average = isReady ? averageOf(values) : null;
  const averageBottom = average === null ? 0 : (average / scale) * CHART_HEIGHT;
  const selected = bars[selectedIndex];

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>Gastos nos últimos {bars.length} meses</Text>
        <Text style={styles.subtitle}>Toque numa barra para ver o mês</Text>
      </View>

      {status === "error" ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>
            Não foi possível carregar o histórico.
          </Text>
          <TouchableOpacity
            style={styles.retry}
            onPress={onRetry}
            accessibilityRole="button"
          >
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {isReady && selected && (
            <View style={styles.selection}>
              <Text style={styles.selectionTitle}>
                {monthName(selected.month, selected.year)} ·{" "}
                {formatCurrency(selected.expenses)}
              </Text>
              <Text style={styles.selectionComparison}>
                {comparisonToAverage(selected.expenses, average)}
              </Text>
            </View>
          )}

          <View>
            <View style={styles.plot}>
              {bars.map((bar, index) => {
                const isSelected = index === selectedIndex;
                const name = monthName(bar.month, bar.year);

                return (
                  <TouchableOpacity
                    key={`${bar.year}-${bar.month}`}
                    style={styles.column}
                    activeOpacity={0.7}
                    disabled={!isReady}
                    onPress={() => setSelectedIndex(index)}
                    accessibilityRole="button"
                    accessibilityLabel={`${name}: ${formatCurrency(
                      bar.expenses
                    )}`}
                    accessibilityState={{ selected: isSelected }}
                  >
                    {isReady && (
                      <View
                        style={[
                          styles.bar,
                          isSelected && styles.barSelected,
                          { height: barHeight(bar.expenses, scale) },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}

              {average !== null && (
                <>
                  <Svg
                    style={[styles.averageLine, { bottom: averageBottom }]}
                    width="100%"
                    height={2}
                    pointerEvents="none"
                  >
                    <Line
                      x1="0"
                      y1="1"
                      x2="100%"
                      y2="1"
                      stroke={Colors.refLine}
                      strokeWidth={1.5}
                      strokeDasharray="4 3"
                    />
                  </Svg>
                  <Text
                    style={[
                      styles.averageLabel,
                      { bottom: averageBottom + AVERAGE_LABEL_GAP },
                    ]}
                    pointerEvents="none"
                    importantForAccessibility="no"
                  >
                    {averageLabel(average)}
                  </Text>
                </>
              )}

              {status === "loading" && (
                <ActivityIndicator
                  size="small"
                  color={Colors.brandBlue}
                  style={styles.loader}
                />
              )}
            </View>

            <View style={styles.labels}>
              {bars.map((bar, index) => (
                <Text
                  key={`${bar.year}-${bar.month}`}
                  style={[
                    styles.monthLabel,
                    index === selectedIndex && styles.monthLabelSelected,
                  ]}
                  importantForAccessibility="no"
                >
                  {monthName(bar.month, bar.year).slice(0, 3)}
                </Text>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};
