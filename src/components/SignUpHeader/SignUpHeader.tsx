import { FC } from "react";
import { styles } from "./SignUpHeaderStyles";
import { Colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";

const TOTAL_STEPS = 2;

interface SignUpHeaderProps {
  step: number;
  title: string;
  subtitle: string;
}

export const SignUpHeader: FC<SignUpHeaderProps> = ({
  step,
  title,
  subtitle,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const stepLabel = `Passo ${step} de ${TOTAL_STEPS}`;

  return (
    <View style={[styles.header, { paddingTop: 28 + insets.top }]}>
      <View
        style={styles.ring}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />

      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <ChevronLeftIcon width={22} height={22} color={Colors.surface} />
        </TouchableOpacity>
        <Text style={styles.step} importantForAccessibility="no">
          {stepLabel}
        </Text>
      </View>

      <View
        style={styles.progress}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={stepLabel}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <View
            key={index}
            style={[styles.segment, index < step && styles.segmentDone]}
          />
        ))}
      </View>

      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
