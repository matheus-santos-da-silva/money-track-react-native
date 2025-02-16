import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./InputStyles";
import { CustomText } from "../CustomText/CustomText";
import IconEye from "../../assets/images/icon-eye-password.svg";

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isPassword: boolean;
}

export const Input: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={label === "Email" ? "email-address" : "default"}
      />

      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <IconEye style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
