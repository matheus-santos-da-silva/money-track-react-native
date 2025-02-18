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

type StackNavigation = {
  Login: undefined;
};

export const SignUp: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const handleSignUpBtn = () => {
    navigation.navigate("Login");
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        <Button value="Cadastrar"></Button>
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
