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
import { useAuth } from "../../hooks/useAuth";
import Snackbar from "react-native-snackbar";

type StackNavigation = {
  SignUp: undefined;
  Home: undefined;
};

export const Login: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUpBtn = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async () => {
    const result = await login(email, password);
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
    <SafeAreaView style={styles.loginContainer}>
      <View style={homeScreensStyle.topContent}>
        <Logo />
        <CustomText style={styles.loginMsg}>Acesse sua conta</CustomText>
      </View>
      <View style={homeScreensStyle.mainContent}>
        <View style={homeScreensStyle.middleContent}>
          <LoginImage width={260} height={260} />
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
        <View style={styles.bottomContent}>
          <Button
            isLoading={isLoading}
            onPress={handleLogin}
            value="Entrar"
          ></Button>
          <View style={homeScreensStyle.divisionContainer}>
            <View style={homeScreensStyle.orLine} />
            <Text style={homeScreensStyle.orText}>OU</Text>
            <View style={homeScreensStyle.orLine} />
          </View>
          <View style={homeScreensStyle.footer}>
            <CustomText style={homeScreensStyle.text}>
              Ainda não tem uma conta
            </CustomText>
            <Text
              style={[homeScreensStyle.text, homeScreensStyle.questionMark]}
            >
              ?
            </Text>
            <Pressable onPress={handleSignUpBtn}>
              <CustomText style={homeScreensStyle.bottomLink}>
                Cadastre-se
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
