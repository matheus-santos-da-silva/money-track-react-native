import { Logo } from "../../components/Logo/Logo";
import { Input } from "../../components/Input/Input";
import { styles } from "./SignUpStyles";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { FC, useState } from "react";
import { validateData } from "../../utils/validate-signUp";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { homeScreensStyle } from "../../styles/home-screens.style";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import SignUpImage from "../../assets/images/signup-image.svg";

export type StackNavigation = {
  Login: undefined;
  Home: undefined;
  ProfileCompletion: { email: string; password: string };
};

export const SignUp: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUpBtn = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async () => {
    const { message } = validateData(email, password);

    if (message) {
      showSnackBar(message || "Erro desconhecido!", "#de525a");
    } else {
      navigation.navigate("ProfileCompletion", { email, password });
    }
  };

  return (
    <SafeAreaView style={styles.signUpContainer}>
      <View style={homeScreensStyle.topContent}>
        <Logo />
        <CustomText style={styles.signUpMsg}>Crie sua conta</CustomText>
      </View>
      <View style={homeScreensStyle.mainContent}>
        <View style={homeScreensStyle.middleContent}>
          <SignUpImage width={250} height={250} />
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
            onPress={handleSignUp}
            value="Cadastrar"
          />
          <View style={homeScreensStyle.divisionContainer}>
            <View style={homeScreensStyle.orLine} />
            <Text style={homeScreensStyle.orText}>OU</Text>
            <View style={homeScreensStyle.orLine} />
          </View>
          <View style={homeScreensStyle.footer}>
            <CustomText style={homeScreensStyle.text}>
              Já tem uma conta
            </CustomText>
            <Text
              style={[homeScreensStyle.text, homeScreensStyle.questionMark]}
            >
              ?
            </Text>
            <Pressable onPress={handleSignUpBtn}>
              <CustomText style={homeScreensStyle.bottomLink}>
                Acesse a conta
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
