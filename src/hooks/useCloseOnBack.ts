import { useEffect } from "react";
import { BackHandler } from "react-native";

// Sheets que não são um Modal nativo: sem isto, o botão voltar do Android sairia da tela
// em vez de fechar o sheet.
export const useCloseOnBack = (visible: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!visible) return;

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );

    return () => subscription.remove();
  }, [visible, onClose]);
};
