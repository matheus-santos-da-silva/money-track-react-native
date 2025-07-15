import { styles } from "./InputStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../CustomText/CustomText";
import { FC, useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import IconEye from "../../assets/images/icon-eye-password.svg";

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isPassword: boolean;
}

export const Input: FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = Colors.primaryGray,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={placeholderTextColor}
          keyboardType={label === "Email" ? "email-address" : "default"}
        />

        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <IconEye style={styles.icon} height={20} width={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
