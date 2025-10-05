import { FC } from "react";
import { styles } from "./CategoryRowStyles";
import { iconMap } from "../../utils/icons";
import { View, Text } from "react-native";

import GrayDownArrowIcon from "../../assets/images/arrow-down-svg.svg";

interface CategoryRowProps {
  title: string;
  icon: string;
  circleColor: string;
  type: "predefined" | "custom";
}

export const CategoryRow: FC<CategoryRowProps> = ({
  title,
  type,
  icon,
  circleColor,
}) => {
  const IconComponent = iconMap[icon];
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={[styles.iconCircle, { backgroundColor: circleColor }]}>
          <IconComponent width={20} height={20} />
        </View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {type === "custom" && (
        <View style={styles.rightContent}>
          <GrayDownArrowIcon height={14} width={14} />
        </View>
      )}
    </View>
  );
};
