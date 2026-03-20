import React from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./SlashScreenStyle";
import { CustomText } from "../../components/CustomText/CustomText";
import Logo from "../../assets/images/logo-mt.svg";
import FastImage from "@d11/react-native-fast-image";

export const SlashScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.middleContent}>
        <Logo style={styles.logo} />
        <FastImage
          source={require("../../assets/images/mt-loading-blue-gif.gif")}
          style={styles.loadingGif}
        />
      </View>
      <View style={styles.bottomContent}>
        <CustomText style={styles.bottomText}>Money Track</CustomText>
      </View>
    </SafeAreaView>
  );
};
