import { FC } from "react";
import { styles } from "./MonthHighlightsStyles";
import { Colors } from "../../styles/colors";
import { Highlight } from "../../utils/reports";
import { Text, View } from "react-native";

import RepeatIcon from "../../assets/images/icons/repeat.svg";
import ReceiptIcon from "../../assets/images/icons/receipt.svg";
import TrendingUpIcon from "../../assets/images/icons/trending-up.svg";

interface MonthHighlightsProps {
  highlights: Highlight[];
}

const ICONS = {
  fixed: RepeatIcon,
  riser: TrendingUpIcon,
  biggest: ReceiptIcon,
};

export const MonthHighlights: FC<MonthHighlightsProps> = ({ highlights }) => {
  if (highlights.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Destaques do mês</Text>

      {highlights.map(({ kind, title, text }, index) => {
        const Icon = ICONS[kind];

        return (
          <View
            key={kind}
            style={[styles.row, index > 0 && styles.divider]}
            accessible
          >
            <View style={styles.icon}>
              <Icon width={18} height={18} color={Colors.ink} />
            </View>
            <View style={styles.texts}>
              <Text style={styles.rowTitle}>{title}</Text>
              <Text style={styles.rowText}>{text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
