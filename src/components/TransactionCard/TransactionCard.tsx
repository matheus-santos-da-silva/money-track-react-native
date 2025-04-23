import React from "react";
import { styles } from "./TransactionCardStyles";
import { TouchableOpacity, View } from "react-native";
import { CustomText } from "../CustomText/CustomText";
import { ActivityIndicator } from "react-native";
import IncomeIcon from "../../assets/images/icon-receita-svg.svg";
import ExpenseIcon from "../../assets/images/icon-despesa-svg.svg";
import BluePlusBTN from "../../assets/images/blue-plus-button-svg.svg";
import { Colors } from "../../styles/colors";

interface TransactionCardProps {
  type: "income" | "expense";
  amount: number;
  isHidden: boolean;
  onPress: () => void;
  isLoading?: boolean;
}

export const TransactionCard = React.memo<TransactionCardProps>(
  ({ type, amount, isHidden, onPress, isLoading = false }) => {
    const icon = type === "income" ? <IncomeIcon /> : <ExpenseIcon />;
    const label = type === "income" ? "Receitas" : "Despesas";

    return (
      <View style={styles.cardsContainer}>
        <View style={styles.topCardContent}>
          <View style={styles.iconAndText}>
            {icon}
            <CustomText style={styles.cardText}>{label}</CustomText>
          </View>
          <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <BluePlusBTN height="25" width="25" />
          </TouchableOpacity>
        </View>
        <View style={styles.divisionLine} />
        <View style={styles.cardMainContent}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryGray} />
          ) : (
            <CustomText style={styles.cardMainContentText}>
              {isHidden
                ? "R$ -----"
                : `R$ ${amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </CustomText>
          )}
        </View>
      </View>
    );
  }
);
