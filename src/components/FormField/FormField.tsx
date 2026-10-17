import { styles } from "./FormFieldStyles";
import { Colors } from "../../styles/colors";
import { forwardRef, ReactNode, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import EyeIcon from "../../assets/images/icons/eye.svg";
import EyeOffIcon from "../../assets/images/icons/eye-off.svg";

interface FormFieldProps
  extends Omit<TextInputProps, "style" | "secureTextEntry"> {
  label: string;
  error?: string | null;
  invalid?: boolean;
  secure?: boolean;
  hint?: ReactNode;
  labelAccessory?: ReactNode;
  optional?: boolean;
  surface?: "surface" | "ground";
}

export const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      error,
      invalid = false,
      secure = false,
      hint,
      labelAccessory,
      optional = false,
      surface = "surface",
      onFocus,
      onBlur,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    return (
      <View style={styles.field}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>
            {label}
            {optional && <Text style={styles.optional}> (opcional)</Text>}
          </Text>
          {labelAccessory}
        </View>

        <View>
          <TextInput
            {...inputProps}
            ref={ref}
            style={[
              styles.input,
              surface === "ground" && styles.inputGround,
              secure && styles.inputSecure,
              isFocused && styles.inputFocused,
              (invalid || !!error) && styles.inputError,
            ]}
            placeholderTextColor={Colors.muted}
            secureTextEntry={secure && !isVisible}
            accessibilityLabel={label}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
          />

          {secure && (
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setIsVisible((current) => !current)}
              accessibilityRole="button"
              accessibilityLabel={isVisible ? "Ocultar senha" : "Mostrar senha"}
            >
              {isVisible ? (
                <EyeOffIcon width={20} height={20} color={Colors.muted} />
              ) : (
                <EyeIcon width={20} height={20} color={Colors.muted} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {hint}

        {!!error && (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    );
  }
);
