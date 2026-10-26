import { styles } from "./SignUpStyles";
import { Colors } from "../../styles/colors";
import { FormField } from "../../components/FormField/FormField";
import { AuthScreen } from "../../components/AuthScreen/AuthScreen";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { SignUpHeader } from "../../components/SignUpHeader/SignUpHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthFooterLink } from "../../components/AuthFooterLink/AuthFooterLink";
import { FC, useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TextInput, View } from "react-native";
import {
  isSignUpEmailValid,
  isSignUpPasswordValid,
  PASSWORD_RULE_TEXT,
} from "../../utils/validate-signUp";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../utils/account-forms";

import CheckIcon from "../../assets/images/icons/check.svg";
import CircleIcon from "../../assets/images/icons/circle.svg";

export type StackNavigation = {
  Login: undefined;
  ProfileCompletion: { email: string; password: string };
};

export const SignUp: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigation>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = useRef<TextInput>(null);

  const trimmedEmail = email.trim();
  const isEmailValid = isSignUpEmailValid(trimmedEmail);
  const isPasswordValid = isSignUpPasswordValid(password);
  const canContinue = isEmailValid && isPasswordValid;

  const ruleColor = isPasswordValid ? Colors.incomeText : Colors.muted;
  const RuleIcon = isPasswordValid ? CheckIcon : CircleIcon;

  const handleContinue = () => {
    if (!canContinue) return;

    navigation.navigate("ProfileCompletion", {
      email: trimmedEmail,
      password,
    });
  };

  return (
    <AuthScreen
      header={
        <SignUpHeader
          step={1}
          title="Crie sua conta"
          subtitle="Leva menos de um minuto. Você só precisa de um e-mail."
        />
      }
      overlap={28}
      gap={18}
    >
      <View style={styles.fields}>
        <FormField
          label="E-mail"
          surface="ground"
          value={email}
          onChangeText={setEmail}
          error={
            trimmedEmail !== "" && !isEmailValid
              ? "Digite um e-mail válido."
              : null
          }
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <FormField
          ref={passwordRef}
          label="Crie uma senha"
          surface="ground"
          secure
          value={password}
          onChangeText={setPassword}
          placeholder={`Pelo menos ${PASSWORD_MIN_LENGTH} caracteres`}
          maxLength={PASSWORD_MAX_LENGTH}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
          onSubmitEditing={handleContinue}
          hint={
            <View
              style={styles.rule}
              accessible
              accessibilityLabel={`${PASSWORD_RULE_TEXT}${
                isPasswordValid ? ", cumprido" : ""
              }`}
            >
              <RuleIcon width={14} height={14} color={ruleColor} />
              <Text style={[styles.ruleText, { color: ruleColor }]}>
                {PASSWORD_RULE_TEXT}
              </Text>
            </View>
          }
        />
      </View>

      <View style={styles.spacer} />

      <FooterButton
        label="Continuar"
        size="large"
        onPress={handleContinue}
        disabled={!canContinue}
      />

      <View style={styles.footer}>
        <AuthFooterLink
          question="Já tem conta?"
          label="Entrar"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </AuthScreen>
  );
};
