import React, { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { CustomText } from "../CustomText/CustomText";
import { styles } from "./ButtonStyles";

interface ButtonFieldProps extends TouchableOpacityProps {
  value: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

export const Button: React.FC<ButtonFieldProps> = ({
  value,
  style,
  onPress,
  isLoading,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.buttonPressed]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      activeOpacity={1}
    >
      <View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#646464"
            style={styles.loading}
          />
        ) : (
          <CustomText style={[styles.buttonText, style]}>{value}</CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};
