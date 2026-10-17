import Animated from "react-native-reanimated";
import { styles } from "./AuthScreenStyles";
import { Colors } from "../../styles/colors";
import { FC, ReactNode } from "react";
import { useKeyboardInset } from "../../hooks/useKeyboardInset";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StatusBar, View } from "react-native";

interface AuthScreenProps {
  header: ReactNode;
  overlap: number;
  gap: number;
  children: ReactNode;
}

export const AuthScreen: FC<AuthScreenProps> = ({
  header,
  overlap,
  gap,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const keyboardInset = useKeyboardInset();

  return (
    <Animated.View style={[styles.container, keyboardInset]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.brandBlue} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {header}

        <View
          style={[
            styles.panel,
            { marginTop: -overlap, gap, paddingBottom: 28 + insets.bottom },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </Animated.View>
  );
};
