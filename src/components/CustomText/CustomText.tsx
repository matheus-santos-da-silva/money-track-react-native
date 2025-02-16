import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { styles } from "./CustomTextStyles";

interface CustomProps extends TextProps {
  children: ReactNode;
}

export const CustomText: React.FC<CustomProps> = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};
