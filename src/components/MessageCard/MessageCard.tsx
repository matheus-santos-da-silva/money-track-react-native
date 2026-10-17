import { styles } from "./MessageCardStyles";
import { FC, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MessageCardProps {
  icon: ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    icon?: ReactNode;
    onPress: () => void;
  };
}

// Card centralizado dos estados sem lista: mês vazio, sem resultado e erro de conexão.
export const MessageCard: FC<MessageCardProps> = ({
  icon,
  title,
  message,
  action,
}) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>

    {action && (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={action.onPress}
        accessibilityRole="button"
      >
        {action.icon}
        <Text style={styles.buttonText}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);
