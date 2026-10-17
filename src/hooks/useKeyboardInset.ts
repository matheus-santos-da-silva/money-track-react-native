import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";

// No Android 15 (edge-to-edge) a janela não encolhe com o teclado e fechá-lo pelo
// botão voltar não emite keyboardDidHide; a altura do teclado vem do Reanimated.
export const useEdgeToEdgeKeyboard = () =>
  useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
    isNavigationBarTranslucentAndroid: true,
  });

// Reserva embaixo da tela o espaço ocupado pelo teclado.
export const useKeyboardInset = () => {
  const keyboard = useEdgeToEdgeKeyboard();

  return useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value,
  }));
};
