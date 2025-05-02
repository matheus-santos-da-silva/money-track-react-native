import React from "react";
import { View } from "react-native";
import { styles } from "./TopBarStyles";
import { Logo } from "../Logo/Logo";

import BackBtn from "../../assets/images/back-btn.svg";

interface TopBarProps {
  handleBackBtn: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ handleBackBtn }) => {
  return (
    <View style={[styles.topContent]}>
      <BackBtn onPress={handleBackBtn} style={styles.backBtn} />
      <View style={styles.logo}>
        <Logo />
      </View>
    </View>
  );
};
