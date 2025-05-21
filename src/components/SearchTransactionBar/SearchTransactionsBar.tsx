import React from "react";
import { styles } from "./SearchTransactionsBarStyles";
import { TextInput, View, TouchableOpacity } from "react-native";

import SearchIcon from "../../assets/images/search-btn-svg.svg";
import CloseIcon from "../../assets/images/close-btn-svg.svg";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  visible: boolean;
}

export const SearchTransactionsBar: React.FC<Props> = ({
  value,
  onChangeText,
  onClose,
  visible,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <SearchIcon style={styles.searchIcon} width={20} height={20} />
      <TextInput
        style={styles.input}
        placeholder="Buscar transação..."
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <CloseIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};
