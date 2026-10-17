import { styles } from "./AuthErrorBannerStyles";
import { Colors } from "../../styles/colors";
import { FC, useEffect } from "react";
import { AccessibilityInfo, Text, TouchableOpacity, View } from "react-native";

import AlertIcon from "../../assets/images/icons/alert-triangle.svg";

interface AuthErrorBannerProps {
  message: string;
  action?: { label: string; onPress: () => void };
}

export const AuthErrorBanner: FC<AuthErrorBannerProps> = ({
  message,
  action,
}) => {
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(message);
  }, [message]);

  return (
    <View style={styles.banner} accessibilityLiveRegion="polite">
      <AlertIcon width={18} height={18} color={Colors.expenseText} />
      <View style={styles.texts}>
        <Text style={styles.message}>{message}</Text>
        {action && (
          <TouchableOpacity
            style={styles.action}
            onPress={action.onPress}
            accessibilityRole="button"
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
