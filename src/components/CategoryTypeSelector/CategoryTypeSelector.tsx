import { FC } from "react";
import { styles } from "./CategoryTypeSelectorStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../CustomText/CustomText";
import { View, TouchableOpacity } from "react-native";

import WhiteTrendingDown from "../../assets/images/white-trending-down.svg";
import RedTrendingDown from "../../assets/images/red-trending-down.svg";
import WhiteTrendingUp from "../../assets/images/white-trending-up.svg";
import GreenTrendingUp from "../../assets/images/green-trending-up.svg";

type TransactionType = "INCOME" | "EXPENSE";

interface CategoryTypeSelectorProps {
  typeSelected: TransactionType;
  onSelect: (type: TransactionType) => void;
}

export const CategoryTypeSelector: FC<CategoryTypeSelectorProps> = ({
  typeSelected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxSelector}>
        <TouchableOpacity
          style={[styles.options, typeSelected === "INCOME" && styles.selected]}
          onPress={() => onSelect("INCOME")}
        >
          <CustomText
            style={{
              color: typeSelected === "INCOME" ? Colors.incomeGreen : "white",
              fontSize: 14,
              lineHeight: 14,
            }}
          >
            Receita
          </CustomText>
          {typeSelected === "INCOME" ? (
            <GreenTrendingUp width={16} height={16} />
          ) : (
            <WhiteTrendingUp width={16} height={16} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.options,
            typeSelected === "EXPENSE" && styles.selected,
          ]}
          onPress={() => onSelect("EXPENSE")}
        >
          <CustomText
            style={{
              color: typeSelected === "EXPENSE" ? Colors.expenseRed : "white",
              fontSize: 14,
            }}
          >
            Despesa
          </CustomText>
          {typeSelected === "EXPENSE" ? (
            <RedTrendingDown width={16} height={16} />
          ) : (
            <WhiteTrendingDown width={16} height={16} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
