import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { CustomText } from "../../components/CustomText/CustomText";
import { styles } from "./SignUpStyles";
import { homeScreensStyle } from "../../styles/home-screens.style";
import SignUpImage from "../../assets/images/signup-image.svg";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../hooks/useAuth";
import Snackbar from "react-native-snackbar";

type StackNavigation = {
  Login: undefined;
  Home: undefined;
};

export const SignUp: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { signUp, error, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUpBtn = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async () => {
    const result = await signUp(email, password);
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
      <View style={homeScreensStyle.topContent}>
        <Logo />
        <CustomText style={styles.signUpMsg}>Crie sua conta</CustomText>
      </View>
      <View style={homeScreensStyle.middleContent}>
        <SignUpImage style={styles.signUpImage} width={220} height={220} />
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
        <Pressable
          onPress={() => {
            console.log("Clicou no botão de cadastro!");
          }}
        >
          <Button
            isLoading={isLoading}
            onPress={handleSignUp}
            value="Cadastrar"
          ></Button>
        </Pressable>
        <View style={homeScreensStyle.footer}>
          <CustomText style={homeScreensStyle.text}>
            Já tem uma conta
          </CustomText>
          <Text style={[homeScreensStyle.text, homeScreensStyle.questionMark]}>
            ?
          </Text>
          <Pressable onPress={handleSignUpBtn}>
            <CustomText style={homeScreensStyle.bottomLink}>
              Acesse a conta
            </CustomText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
