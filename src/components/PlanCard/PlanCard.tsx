import { FC } from "react";
import { styles } from "./PlanCardStyles";
import { Colors } from "../../styles/colors";
import { PlanKind, PlanSummary } from "../../utils/plan-summary";
import { Text, TouchableOpacity, View } from "react-native";

import StarIcon from "../../assets/images/icons/star.svg";
import ChevronRightIcon from "../../assets/images/icons/chevron-right.svg";

interface PlanCardProps {
  plan: PlanSummary;
  onPress: () => void;
}

const BADGES: Record<PlanKind, { box: object; color: string }> = {
  trial: { box: styles.badgeTrial, color: Colors.trialInk },
  premium: { box: styles.badgePremium, color: Colors.brandInk },
  free: { box: styles.badgeFree, color: Colors.expenseText },
};

export const PlanCard: FC<PlanCardProps> = ({ plan, onPress }) => {
  const badge = BADGES[plan.kind];

  return (
    <View style={styles.card}>
      <View style={[styles.badge, badge.box]}>
        <StarIcon width={14} height={14} color={badge.color} />
        <Text style={[styles.badgeText, { color: badge.color }]}>
          {plan.badge}
        </Text>
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.text}>{plan.text}</Text>
      </View>

      {plan.actionStyle === "button" ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onPress}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{plan.action}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.link}
          onPress={onPress}
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>{plan.action}</Text>
          <ChevronRightIcon width={16} height={16} color={Colors.brandBlue} />
        </TouchableOpacity>
      )}
    </View>
  );
};
