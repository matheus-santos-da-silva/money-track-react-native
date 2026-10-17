import Animated from "react-native-reanimated";
import { FC, ReactNode } from "react";
import { styles } from "./FormScreenStyles";
import { ScreenHeader } from "../ScreenHeader/ScreenHeader";
import { ScrollView, View } from "react-native";
import { useKeyboardFooterPadding } from "../../hooks/useKeyboardFooterPadding";

interface FormScreenProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  footerDivider?: boolean;
}

export const FormScreen: FC<FormScreenProps> = ({
  title,
  children,
  footer,
  footerDivider = false,
}) => {
  const footerPadding = useKeyboardFooterPadding();

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <Animated.View
        style={[
          styles.footer,
          footerDivider && styles.footerDivider,
          footerPadding,
        ]}
      >
        {footer}
      </Animated.View>
    </View>
  );
};
