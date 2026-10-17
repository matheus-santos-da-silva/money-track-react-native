import { FC } from "react";
import { styles } from "./HeaderSearchStyles";
import { Colors } from "../../styles/colors";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import SearchIcon from "../../assets/images/icons/search.svg";

interface HeaderSearchProps {
  value: string;
  onChangeText: (value: string) => void;
  onCancel: () => void;
  placeholder: string;
  accessibilityLabel: string;
}

export const HeaderSearch: FC<HeaderSearchProps> = ({
  value,
  onChangeText,
  onCancel,
  placeholder,
  accessibilityLabel,
}) => (
  <View style={styles.row}>
    <View style={styles.field}>
      <SearchIcon width={18} height={18} color={Colors.muted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        value={value}
        onChangeText={onChangeText}
        autoFocus
        returnKeyType="search"
        accessibilityLabel={accessibilityLabel}
      />
    </View>
    <TouchableOpacity
      style={styles.cancel}
      onPress={onCancel}
      accessibilityRole="button"
    >
      <Text style={styles.cancelText}>Cancelar</Text>
    </TouchableOpacity>
  </View>
);
