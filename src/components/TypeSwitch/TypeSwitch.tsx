import { FC } from "react";
import { styles } from "./TypeSwitchStyles";
import { Colors } from "../../styles/colors";
import { SvgProps } from "react-native-svg";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TypeSwitchOption<T extends string> {
  value: T;
  label: string;
  icon?: FC<SvgProps>;
  selectedColor?: string;
}

interface TypeSwitchProps<T extends string> {
  options: TypeSwitchOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  tone: "onBlue" | "light";
  disabled?: boolean;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}

export const TypeSwitch = <T extends string>({
  options,
  selected,
  onSelect,
  tone,
  disabled = false,
  accessibilityLabel,
  style,
}: TypeSwitchProps<T>) => {
  const isLight = tone === "light";

  return (
    <View
      style={[
        styles.track,
        isLight ? styles.trackLight : styles.trackOnBlue,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option) => {
        const isSelected = option.value === selected;
        const Icon = option.icon;
        const color = isSelected
          ? option.selectedColor ?? Colors.ink
          : isLight
          ? Colors.muted
          : Colors.surface;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.optionSelected,
              isSelected && isLight && !disabled && styles.optionSelectedLight,
            ]}
            activeOpacity={0.8}
            onPress={() => onSelect(option.value)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected, disabled }}
          >
            {Icon && <Icon width={16} height={16} color={color} />}
            <Text style={[styles.label, { color }]}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
