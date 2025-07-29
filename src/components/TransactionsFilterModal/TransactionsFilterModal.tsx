import { FC } from "react";
import { styles } from "./TransactionsFilterModalStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../CustomText/CustomText";
import { View, TouchableOpacity } from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";
import Modal from "react-native-modal";

export type filterOptions = "today" | "thisMonth";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedFilter: filterOptions | null;
  onSelectFilter: (filter: filterOptions) => void;
  onChangeSelected: (filter: filterOptions) => void;
}

export const TransactionsFilterModal: FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onSelectFilter,
  selectedFilter,
  onChangeSelected,
}) => {
  const renderOption = (label: string, value: filterOptions) => (
    <TouchableOpacity
      style={styles.optionsView}
      onPress={() => onChangeSelected(value)}
    >
      <MaterialIcons
        name={
          selectedFilter === value
            ? "radio-button-checked"
            : "radio-button-unchecked"
        }
        color={Colors.primaryGray}
        size={22}
      />
      <CustomText style={styles.optionText}>{label}</CustomText>
    </TouchableOpacity>
  );

  const handleApply = () => {
    if (selectedFilter) {
      onSelectFilter(selectedFilter);
      onClose();
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <CustomText style={styles.title}>Escolha um Período</CustomText>

        <View style={styles.option}>
          {renderOption("Hoje", "today")}
          {renderOption("Este mês", "thisMonth")}
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          disabled={!selectedFilter}
        >
          <CustomText style={styles.applyButtonText}>Aplicar Filtro</CustomText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
