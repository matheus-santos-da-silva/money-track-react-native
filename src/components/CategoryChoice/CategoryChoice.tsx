import { FC } from "react";
import { styles } from "./CategoryChoiceStyles";
import { iconMap } from "../../utils/icons";
import { parseCategoryIcon } from "../../utils/categories";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const SIZES = {
  regular: { circle: 48, icon: 22 },
  large: { circle: 52, icon: 24 },
};

interface CategoryChoiceProps {
  name: string;
  icon: string;
  selected: boolean;
  size: keyof typeof SIZES;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const CategoryChoice: FC<CategoryChoiceProps> = ({
  name,
  icon,
  selected,
  size,
  onPress,
  style,
}) => {
  const { color, icon: iconKey } = parseCategoryIcon(icon);
  const IconComponent = iconMap[iconKey];
  const { circle, icon: iconSize } = SIZES[size];

  return (
    <TouchableOpacity
      style={[styles.choice, style]}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={name}
      accessibilityState={{ checked: selected }}
    >
      <View style={[styles.ring, selected && { borderColor: color }]}>
        <View
          style={[
            styles.circle,
            {
              width: circle,
              height: circle,
              borderRadius: circle / 2,
              backgroundColor: color,
            },
          ]}
        >
          {IconComponent && (
            <IconComponent width={iconSize} height={iconSize} />
          )}
        </View>
      </View>

      <Text
        style={[styles.name, selected && styles.nameSelected]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
