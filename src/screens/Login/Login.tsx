import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { styles } from "./LoginStyles";
import { homeScreensStyle } from "../../styles/home-screens.style";
import { Input } from "../../components/Input/Input";
import { Logo } from "../../components/Logo/Logo";
import { CustomText } from "../../components/CustomText/CustomText";
import { Button } from "../../components/Button/Button";
import LoginImage from "../../assets/images/login-image.svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackNavigation = {
  SignUp: undefined;
};

export const Login: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const handleSignUpBtn = () => {
    navigation.navigate("SignUp");
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SafeAreaView style={homeScreensStyle.container}>
      <View style={homeScreensStyle.topContent}>
        <Logo />
        <CustomText style={styles.loginMsg}>Acesse sua conta</CustomText>
      </View>
      <View style={homeScreensStyle.middleContent}>
        <LoginImage width={220} height={220} />
        <View style={homeScreensStyle.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            isPassword={false}
          />
          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            isPassword={true}
          />
        </View>
      </View>
      <View>
        <Button value="Continuar"></Button>
        <View style={homeScreensStyle.footer}>
          <CustomText style={homeScreensStyle.text}>
            Ainda não tem uma conta
          </CustomText>
          <Text style={[homeScreensStyle.text, homeScreensStyle.questionMark]}>
            ?
          </Text>
          <Pressable onPress={handleSignUpBtn}>
            <CustomText style={homeScreensStyle.bottomLink}>
              Cadastre-se
            </CustomText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
