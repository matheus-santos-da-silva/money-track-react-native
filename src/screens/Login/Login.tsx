import { Logo } from "../../components/Logo/Logo";
import { Input } from "../../components/Input/Input";
import { styles } from "./LoginStyles";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { homeScreensStyle } from "../../styles/home-screens.style";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, Text, View } from "react-native";

import LoginImage from "../../assets/images/login-image.svg";

type StackNavigation = {
  SignUp: undefined;
  Home: undefined;
};

export const Login: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUpBtn = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result) showSnackBar(error || "Erro desconhecido!", "#de525a");
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={homeScreensStyle.topContent}>
        <Logo />
        <CustomText style={styles.loginMsg}>Acesse sua conta</CustomText>
      </View>
      <View style={homeScreensStyle.mainContent}>
        <LoginImage width={250} height={250} />
        <View style={homeScreensStyle.middleContent}>
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
