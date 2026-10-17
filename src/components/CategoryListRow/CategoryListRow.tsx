import { FC } from "react";
import { styles } from "./CategoryListRowStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { parseCategoryIcon } from "../../utils/categories";
import { Text, TouchableOpacity, View } from "react-native";

import MoreVerticalIcon from "../../assets/images/icons/more-vertical.svg";

interface CategoryListRowProps {
  name: string;
  icon: string;
  isFirst: boolean;
  onOpenOptions?: () => void;
}

export const CategoryListRow: FC<CategoryListRowProps> = ({
  name,
  icon,
  isFirst,
  onOpenOptions,
}) => {
  const { color, icon: iconKey } = parseCategoryIcon(icon);
  const IconComponent = iconMap[iconKey];

  const content = (
    <>
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        {IconComponent && <IconComponent width={20} height={20} />}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </>
  );

  if (!onOpenOptions) {
    return (
      <View style={[styles.row, !isFirst && styles.divider]}>{content}</View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.row, !isFirst && styles.divider]}
      activeOpacity={0.7}
      onPress={onOpenOptions}
      accessibilityRole="button"
      accessibilityLabel={name}
    >
      {content}
      <TouchableOpacity
        style={styles.optionsButton}
        onPress={onOpenOptions}
        accessibilityRole="button"
        accessibilityLabel={`Opções de ${name}`}
      >
        <MoreVerticalIcon width={20} height={20} color={Colors.muted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
