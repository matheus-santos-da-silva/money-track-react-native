import { FC } from "react";
import { styles } from "./AuthIllustrationStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { Text, View } from "react-native";

import RepeatIcon from "../../assets/images/icons/repeat.svg";
import ArrowDownLeftIcon from "../../assets/images/icons/arrow-down-left.svg";

const BAR_HEIGHTS = [34, 40, 48, 30, 44, 42];

const CartIcon = iconMap.food;

const BASE_HEIGHTS = { full: 330, compact: 170 };

interface AuthIllustrationProps {
  variant: keyof typeof BASE_HEIGHTS;
  height?: number;
}

export const AuthIllustration: FC<AuthIllustrationProps> = ({
  variant,
  height = BASE_HEIGHTS[variant],
}) => {
  const isFull = variant === "full";
  const baseHeight = BASE_HEIGHTS[variant];
  const scale = height / baseHeight;

  return (
    <View
      style={{ height }}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
    >
      <View
        style={{
          height: baseHeight,
          marginTop: (height - baseHeight) / 2,
          transform: [{ scale }],
        }}
      >
        <View
          style={[
            styles.piece,
            isFull ? styles.balanceFull : styles.balanceCompact,
          ]}
        >
          <Text style={[styles.caption, !isFull && styles.captionSmall]}>
            Saldo de outubro
          </Text>
          <Text style={isFull ? styles.balance : styles.balanceSmall}>
            R$ 1.837,60
          </Text>
          <View style={[styles.track, !isFull && styles.trackSmall]}>
            <View style={[styles.fill, !isFull && styles.trackSmall]} />
          </View>
          {isFull && (
            <View style={styles.balanceFooter}>
              <Text style={styles.captionSmall}>Entrou R$ 4.850</Text>
              <Text style={styles.captionSmall}>Saiu R$ 3.012</Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.piece,
            isFull ? styles.salaryFull : styles.salaryCompact,
          ]}
        >
          <View style={isFull ? styles.salaryChip : styles.salaryChipSmall}>
            <ArrowDownLeftIcon
              width={isFull ? 18 : 16}
              height={isFull ? 18 : 16}
              color={Colors.incomeText}
            />
          </View>
          {isFull ? (
            <View>
              <Text style={styles.captionSmall}>Salário</Text>
              <Text style={styles.salary}>+ R$ 4.500,00</Text>
            </View>
          ) : (
            <Text style={styles.salarySmall}>+ R$ 4.500,00</Text>
          )}
        </View>

        {isFull && (
          <View style={[styles.piece, styles.chart]}>
            <Text style={styles.captionSmall}>Gastos por mês</Text>
            <View style={styles.bars}>
              {BAR_HEIGHTS.map((barHeight, index) => (
                <View
                  key={index}
                  style={[
                    styles.bar,
                    { height: barHeight },
                    index === BAR_HEIGHTS.length - 1 && styles.barCurrent,
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        <View
          style={[
            styles.bubble,
            isFull ? styles.cartFull : styles.cartCompact,
            styles.cartColor,
          ]}
        >
          <CartIcon width={isFull ? 22 : 20} height={isFull ? 22 : 20} />
        </View>

        {isFull && (
          <View style={[styles.bubble, styles.repeat]}>
            <RepeatIcon width={18} height={18} color={Colors.surface} />
          </View>
        )}
      </View>
    </View>
  );
};
