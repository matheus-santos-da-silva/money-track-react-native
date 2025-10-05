import { FC } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./ColorSelectorStyles";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ColorSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const colors = [
  "#E67171",
  "#08a4a7",
  "#FF91A4",
  "#b7616fff",
  "#53D253",
  "#135313",
  "#9D00FF",
  "#FFA500",
  "#895129",
  "#580e84ff",
  "#111184",
  "#56BFFF",
  "#cbd53fff",
  "#848484ff",
  "#b137a7ff",
  "#000000ff",
  "#505050ff",
  "#d76413ff",
  "#b11e1eff",
  "#237b71ff",
  "#114943ff",
  "#637126ff",
  "#c51d41ff",
  "#ea3d0dff",
  "#2469ffff",
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  visible,
  onClose,
  onSelectColor,
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
        <Text style={styles.title}>Selecione uma cor:</Text>
        <View style={styles.colorsContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: color }]}
              activeOpacity={0.6}
              onPress={() => {
                onSelectColor(color);
                onClose();
              }}
              key={color}
            ></TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
