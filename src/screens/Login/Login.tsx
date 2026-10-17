import { styles } from "./LoginStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { AuthLogo } from "../../components/AuthLogo/AuthLogo";
import { FormField } from "../../components/FormField/FormField";
import { AuthScreen } from "../../components/AuthScreen/AuthScreen";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { useNavigation } from "@react-navigation/native";
import { AuthFooterLink } from "../../components/AuthFooterLink/AuthFooterLink";
import { AuthErrorBanner } from "../../components/AuthErrorBanner/AuthErrorBanner";
import { authErrorMessage } from "../../utils/auth-errors";
import { AuthIllustration } from "../../components/AuthIllustration/AuthIllustration";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FC, useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";

type StackNavigation = {
  SignUp: undefined;
};

const TOP_MAX_HEIGHT = 300;
const TOP_SCREEN_SHARE = 0.36;

export const Login: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);

  const canSubmit = email.trim() !== "" && password !== "";

  const editField = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setError(null);
  };

  const handleLogin = async () => {
    if (!canSubmit || isLoading) return;

    const result = await login(email.trim(), password);
    if (!result.success) setError(authErrorMessage(result));
  };

  const header = (
    <View
      style={[
        styles.top,
        {
          height:
            Math.min(TOP_MAX_HEIGHT, height * TOP_SCREEN_SHARE) + insets.top,
        },
      ]}
    >
      <View
        style={[styles.ring, styles.ringOuter]}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />
      <View
        style={[styles.ring, styles.ringInner]}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />

      <View style={[styles.topRow, { paddingTop: 28 + insets.top }]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <ChevronLeftIcon width={22} height={22} color={Colors.surface} />
        </TouchableOpacity>
        <AuthLogo size="compact" />
      </View>

      <View style={[styles.illustration, { top: 98 + insets.top }]}>
        <AuthIllustration variant="compact" />
      </View>
    </View>
  );

  return (
    <AuthScreen header={header} overlap={32} gap={22}>
      <View style={styles.heading}>
        <Text style={styles.title} accessibilityRole="header">
          Bem-vindo de volta
        </Text>
        <Text style={styles.subtitle}>Entre para ver como está o seu mês.</Text>
      </View>

      <View style={styles.fields}>
        <FormField
          label="E-mail"
          surface="ground"
          value={email}
          onChangeText={editField(setEmail)}
          invalid={!!error}
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
          label="Senha"
          surface="ground"
          secure
          value={password}
          onChangeText={editField(setPassword)}
          invalid={!!error}
          placeholder="Sua senha"
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />

        {error && <AuthErrorBanner message={error} />}
      </View>

      <FooterButton
        label="Entrar"
        size="large"
        onPress={handleLogin}
        disabled={!canSubmit}
        loading={isLoading}
      />

      <View style={styles.spacer} />

      <AuthFooterLink
        question="Ainda não tem conta?"
        label="Criar conta"
        onPress={() => navigation.navigate("SignUp")}
      />
    </AuthScreen>
  );
};
