import { FC } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { styles, SHEET_HEIGHT } from "./IconSelectorStyles";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { iconMap } from "../../utils/icons";
import { Colors } from "../../styles/colors";

interface IconSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectIcon: (icon: string) => void;
}

const icons = [
  "health",
  "subscriptions",
  "education",
  "investment",
  "travel",
  "extraincome",
  "wage",
  "leisure",
  "home",
  "transport",
  "food",
];

export const IconSelector: FC<IconSelectorProps> = ({
  visible,
  onClose,
  onSelectIcon,
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
        <Text style={styles.title}>Selecione um ícone:</Text>
        <View style={styles.iconContainer}>
          {icons.map((icon) => {
            const IconComponent = iconMap[icon];
            return (
              <TouchableOpacity
                style={[styles.iconCircle]}
                activeOpacity={0.6}
                onPress={() => {
                  onSelectIcon(icon);
                  onClose();
                }}
                key={icon}
              >
                {IconComponent && <IconComponent width={30} height={30} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};
