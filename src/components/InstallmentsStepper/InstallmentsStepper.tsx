import { FC } from "react";
import { styles } from "./InstallmentsStepperStyles";
import { Colors } from "../../styles/colors";
import { Text, TouchableOpacity, View } from "react-native";
import {
  installmentSummary,
  MAX_INSTALLMENTS,
  MIN_INSTALLMENTS,
} from "../../utils/transaction-form";

import PlusIcon from "../../assets/images/icons/plus.svg";
import MinusIcon from "../../assets/images/icons/minus.svg";

interface InstallmentsStepperProps {
  amount: number;
  installments: number;
  date: Date;
  disabled: boolean;
  onChange: (installments: number) => void;
}

export const InstallmentsStepper: FC<InstallmentsStepperProps> = ({
  amount,
  installments,
  date,
  disabled,
  onChange,
}) => {
  const { title, detail } = installmentSummary(amount, installments, date);

  const canDecrease = !disabled && installments > MIN_INSTALLMENTS;
  const canIncrease = !disabled && installments < MAX_INSTALLMENTS;

  return (
    <View style={styles.card}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>

      <View style={styles.stepper}>
        <TouchableOpacity
          style={[styles.step, !canDecrease && styles.stepDisabled]}
          onPress={() => onChange(installments - 1)}
          disabled={!canDecrease}
          accessibilityRole="button"
          accessibilityLabel="Menos parcelas"
          accessibilityState={{ disabled: !canDecrease }}
        >
          <MinusIcon width={18} height={18} color={Colors.ink} />
        </TouchableOpacity>

        <Text style={styles.count} accessibilityLiveRegion="polite">
          {installments}x
        </Text>

        <TouchableOpacity
          style={[styles.step, !canIncrease && styles.stepDisabled]}
          onPress={() => onChange(installments + 1)}
          disabled={!canIncrease}
          accessibilityRole="button"
          accessibilityLabel="Mais parcelas"
          accessibilityState={{ disabled: !canIncrease }}
        >
          <PlusIcon width={18} height={18} color={Colors.ink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
