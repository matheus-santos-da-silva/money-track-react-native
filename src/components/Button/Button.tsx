import React, { useState } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { CustomText } from "../CustomText/CustomText";
import { styles } from "./ButtonStyles";

interface ButtonFieldProps extends TouchableOpacityProps {
  value: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<ButtonFieldProps> = ({
  value,
  style,
  onPress,
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
      <CustomText style={[styles.buttonText, style]}> {value}</CustomText>
    </TouchableOpacity>
  );
};
