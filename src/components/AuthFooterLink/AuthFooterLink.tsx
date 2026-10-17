import { FC } from "react";
import { styles } from "./AuthFooterLinkStyles";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthFooterLinkProps {
  question: string;
  label: string;
  onPress: () => void;
}

export const AuthFooterLink: FC<AuthFooterLinkProps> = ({
  question,
  label,
  onPress,
}) => (
  <View style={styles.row}>
    <Text style={styles.question}>{question}</Text>
    <TouchableOpacity
      style={styles.link}
      onPress={onPress}
      accessibilityRole="link"
    >
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  </View>
);
