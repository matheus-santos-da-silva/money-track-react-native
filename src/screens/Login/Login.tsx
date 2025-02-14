import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Logo from "../../components/Logo/Logo";
import { styles } from "./LoginStyles";

import LoginImage from "../../assets/images/login-image.svg";

const Login: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.topContent}>
        <Logo />
        <Text style={{ fontFamily: "KonkhmerSleokchher-Regular", fontSize: 24, color: "#646464" }}>
          Acesse sua conta
        </Text>
        <LoginImage width={280} height={280} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
