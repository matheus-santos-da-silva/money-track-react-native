import { FC } from "react";
import { styles } from "./ChipStyles";
import { Colors } from "../../styles/colors";
import { Text, TouchableOpacity } from "react-native";

import CloseIcon from "../../assets/images/icons/close.svg";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  // solid: seleção escura (filtro de tipo na tela). tint: seleção azul clara (dentro do sheet).
  variant?: "solid" | "tint";
}

export const Chip: FC<ChipProps> = ({
  label,
  selected,
  onPress,
  variant = "solid",
}) => {
  const isSolid = variant === "solid";
  const selectedStyle = isSolid ? styles.solidSelected : styles.tintSelected;
  const selectedLabelStyle = isSolid
    ? styles.solidSelectedLabel
    : styles.tintSelectedLabel;

  return (
    <TouchableOpacity
      style={[styles.chip, selected && selectedStyle]}
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, selected && selectedLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

interface RemovableChipProps {
  label: string;
  onRemove: () => void;
}

// Etiqueta de um filtro ativo: tocar remove o filtro.
export const RemovableChip: FC<RemovableChipProps> = ({ label, onRemove }) => (
  <TouchableOpacity
    style={[styles.chip, styles.removable]}
    activeOpacity={0.8}
    onPress={onRemove}
    accessibilityRole="button"
    accessibilityLabel={`Remover filtro ${label}`}
  >
    <Text style={[styles.label, styles.removableLabel]} numberOfLines={1}>
      {label}
    </Text>
    <CloseIcon width={14} height={14} color={Colors.brandInk} />
  </TouchableOpacity>
);
