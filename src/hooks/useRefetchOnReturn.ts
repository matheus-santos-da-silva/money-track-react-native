import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

// Recarrega quando o usuário volta para a tela. O primeiro foco é ignorado
// porque a busca ao montar já cobre essa abertura.
export const useRefetchOnReturn = (refetch: () => void) => {
  const navigation = useNavigation();
  const hasLeft = useRef(false);
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;

  useEffect(() => {
    const offBlur = navigation.addListener("blur", () => {
      hasLeft.current = true;
    });
    const offFocus = navigation.addListener("focus", () => {
      if (hasLeft.current) refetchRef.current();
    });

    return () => {
      offBlur();
      offFocus();
    };
  }, [navigation]);
};
