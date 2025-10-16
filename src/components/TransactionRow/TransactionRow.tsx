import { FC } from "react";
import { styles } from "./TransactionRowStyles";
import { iconMap } from "../../utils/icons";
import { CustomText } from "../CustomText/CustomText";
import { View, Text } from "react-native";
import { formatAmount } from "../../utils/format-amount";

interface TransactionRowProps {
  title: string;
  value: number;
  type: string;
  icon: string;
  circleColor: string;
}

export const TransactionRow: FC<TransactionRowProps> = ({
  title,
  type,
  value,
  icon,
  circleColor,
}) => {
  const IconComponent = iconMap[icon];
  const backgroundCircleColor = circleColor;

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: backgroundCircleColor },
          ]}
        >
          <IconComponent width={20} height={20} />
        </View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightContent}>
        <CustomText
          style={[
            type === "Despesa" ? styles.expenseColor : styles.incomeColor,
            styles.valueText,
          ]}
        >
          {type === "Despesa"
            ? `-R$ ${formatAmount(value)}`
            : `R$ ${formatAmount(value)}`}
        </CustomText>
        <Text style={styles.typeText}>{type}</Text>
      </View>
    </View>
  );
};
