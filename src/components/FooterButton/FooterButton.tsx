import { FC } from "react";
import { styles } from "./FooterButtonStyles";
import { Colors } from "../../styles/colors";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface FooterButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "danger";
  size?: "regular" | "large";
}

export const FooterButton: FC<FooterButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "regular",
}) => {
  const isDisabled = disabled || loading;
  const isDanger = variant === "danger";
  const isLarge = size === "large";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isLarge && styles.buttonLarge,
        isDanger ? styles.danger : styles.primary,
        disabled && (isDanger ? styles.dangerDisabled : styles.primaryDisabled),
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.surface} />
      ) : (
        <Text style={[styles.label, isLarge && styles.labelLarge]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
