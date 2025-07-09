import { FC } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./CategorySelectorStyles";
import { Animated, Pressable, Text, View } from "react-native";

interface CategorySelectorProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  visible,
  onClose,
  children,
}) => {
  const { translateY, panResponder } = useModalAnimation(visible, onClose);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY }], height: SHEET_HEIGHT },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragIndicator} />
        <Text style={styles.title}>Selecione uma Categoria</Text>
        <View style={styles.categoriesContainer}>{children}</View>
      </Animated.View>
    </View>
  );
};
