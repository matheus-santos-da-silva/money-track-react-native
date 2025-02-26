import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Logo } from "../../components/Logo/Logo";
import { CustomText } from "../../components/CustomText/CustomText";
import { Input } from "../../components/Input/Input";
import { homeScreensStyle } from "../../styles/home-screens.style";
import { styles } from "./ProfileCompletionStyles";
import { Button } from "../../components/Button/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import BackBtn from "../../assets/images/back-btn.svg";
import Snackbar from "react-native-snackbar";

type StackNavigation = {
  SignUp: undefined;
  Home: undefined;
};

type ParamList = {
  Params: {
    email: string;
    password: string;
  };
};

export const ProfileCompletion: React.FC = () => {
  const [name, setName] = useState("");
  const { email, password } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { signUp, error, isLoading } = useAuth();

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const handleBackBtn = () => {
    navigation.goBack();
  };

  const handleFinishSignUp = async () => {
    const result = await signUp({ email, name, password });
    if (!result) {
      Snackbar.show({
        text: error || "Erro desconhecido!",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#de525a",
        fontFamily: "Poppins-Regular",
      });
    }
  };

  return (
    <SafeAreaView style={homeScreensStyle.container}>
      <View style={[styles.topContent]}>
        <BackBtn onPress={handleBackBtn} style={styles.backBtn} />
        <View style={styles.logo}>
          <Logo />
        </View>
      </View>
      <View style={styles.middleContent}>
        <CustomText style={styles.profileCompletionMsg}>
          Estamos quase lá!
        </CustomText>
        <Text style={styles.middleText}>
          Mas antes queremos saber o seu nome!
        </Text>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.label}>
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            isPassword={false}
          />
        </View>
        <View style={styles.btn}>
          <Button
            isLoading={isLoading}
            onPress={handleFinishSignUp}
            value="Continuar"
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
