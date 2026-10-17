import { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEdgeToEdgeKeyboard } from "./useKeyboardInset";

export const useKeyboardFooterPadding = () => {
  const insets = useSafeAreaInsets();
  const keyboard = useEdgeToEdgeKeyboard();

  const restingPadding = 28 + insets.bottom;

  return useAnimatedStyle(() => ({
    paddingBottom: Math.max(restingPadding, keyboard.height.value + 12),
  }));
};
