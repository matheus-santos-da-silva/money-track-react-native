import React from "react";
import { Text, SafeAreaView, View } from "react-native";

import Logo from "../assets/icon-money-track.svg";
import Logo1 from "../assets/logo-money-track.svg";

const Login: React.FC = () => {
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Logo1 width={30} height={30} style={{ marginRight: 3 }} />
        <Logo width={95} height={23} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
