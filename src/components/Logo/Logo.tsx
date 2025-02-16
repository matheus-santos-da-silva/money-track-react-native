import React from "react";
import { View } from "react-native";
import { styles } from "./LogoStyles";

import MoneyTrackIcon from "../../assets/images/icon-money-track.svg";
import MoneyTrackLogo from "../../assets/images/logo-money-track.svg";

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <MoneyTrackIcon width={30} height={30} style={styles.icon} />
      <MoneyTrackLogo width={104} height={24} />
    </View>
  );
};
