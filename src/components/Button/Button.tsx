import { styles } from "./ButtonStyles";
import { CustomText } from "../CustomText/CustomText";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface ButtonFieldProps extends TouchableOpacityProps {
  value: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

export const Button: FC<ButtonFieldProps> = ({
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
            color="#ffffffff"
            style={styles.loading}
          />
        ) : (
          <CustomText style={[styles.buttonText, style]}>{value}</CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};
