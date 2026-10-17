import { FC } from "react";
import { styles } from "./OptionChipStyles";
import { Colors } from "../../styles/colors";
import { SvgProps } from "react-native-svg";
import { Text, TouchableOpacity } from "react-native";

interface OptionChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  icon?: FC<SvgProps>;
  accessibilityLabel?: string;
}

export const OptionChip: FC<OptionChipProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
  icon: Icon,
  accessibilityLabel,
}) => {
  const color = selected ? Colors.brandInk : Colors.ink;

  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ checked: selected, disabled }}
    >
      {Icon && <Icon width={16} height={16} color={color} />}
      <Text style={[styles.label, { color }]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
