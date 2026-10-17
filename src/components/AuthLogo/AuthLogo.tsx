import { FC } from "react";
import { styles } from "./AuthLogoStyles";
import { Text, View } from "react-native";

import LogoMark from "../../assets/images/logo-mt.svg";

const SIZES = {
  welcome: { mark: { width: 22, height: 32 }, rule: 24, gap: 12, font: 17 },
  compact: { mark: { width: 19, height: 28 }, rule: 20, gap: 10, font: 16 },
};

interface AuthLogoProps {
  size: keyof typeof SIZES;
}

export const AuthLogo: FC<AuthLogoProps> = ({ size }) => {
  const { mark, rule, gap, font } = SIZES[size];

  return (
    <View
      style={[styles.logo, { gap }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Money Track"
    >
      <LogoMark width={mark.width} height={mark.height} />
      <View style={[styles.rule, { height: rule }]} />
      <Text style={[styles.name, { fontSize: font }]}>Money Track</Text>
    </View>
  );
};
