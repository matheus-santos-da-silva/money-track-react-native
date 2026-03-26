import React from "react";
import { View } from "react-native";
import { styles } from "./LogoStyles";

import MoneyTrackLogo from "../../assets/images/logo-money-track.svg";

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <MoneyTrackLogo width={114} height={24} />
    </View>
  );
};
