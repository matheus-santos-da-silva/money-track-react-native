import { FC } from "react";
import { styles } from "./ProfileRowStyles";
import { Colors } from "../../styles/colors";
import { SvgProps } from "react-native-svg";
import { Text, TouchableOpacity, View } from "react-native";

import ChevronRightIcon from "../../assets/images/icons/chevron-right.svg";

interface ProfileRowProps {
  Icon: FC<SvgProps>;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  showDivider?: boolean;
}

export const ProfileRow: FC<ProfileRowProps> = ({
  Icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  showDivider = false,
}) => (
  <TouchableOpacity
    style={[styles.row, showDivider && styles.divider]}
    activeOpacity={0.7}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={
      subtitle ? `${title}, ${subtitle.toLowerCase()}` : title
    }
  >
    <View style={styles.icon}>
      <Icon width={20} height={20} color={Colors.ink} />
    </View>

    <View style={styles.texts}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>

    {showChevron && (
      <ChevronRightIcon width={18} height={18} color={Colors.refLine} />
    )}
  </TouchableOpacity>
);
