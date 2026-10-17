import { styles } from "./ProfileCompletionStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { nameError } from "../../utils/account-forms";
import { FormField } from "../../components/FormField/FormField";
import { AuthScreen } from "../../components/AuthScreen/AuthScreen";
import { AuthResult } from "../../contexts/AuthContext";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { SignUpHeader } from "../../components/SignUpHeader/SignUpHeader";
import { AuthErrorBanner } from "../../components/AuthErrorBanner/AuthErrorBanner";
import { FC, useState } from "react";
import { Text, View } from "react-native";
import { authErrorMessage, isEmailTaken } from "../../utils/auth-errors";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import StarIcon from "../../assets/images/icons/star.svg";

type ParamList = {
  Params: {
    email: string;
    password: string;
  };
};

export const ProfileCompletion: FC = () => {
  const navigation = useNavigation();
  const { email, password } = useRoute<RouteProp<ParamList, "Params">>().params;
  const { signUp, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [failure, setFailure] = useState<AuthResult | null>(null);

  const trimmedName = name.trim();
  const error = nameError(trimmedName);
  const canSubmit = error === null;

  const handleNameChange = (value: string) => {
    setName(value);
    setFailure(null);
  };

  const handleFinishSignUp = async () => {
    if (!canSubmit || isLoading) return;

    const result = await signUp({ email, name: trimmedName, password });
    if (!result.success) setFailure(result);
  };

  return (
    <AuthScreen
      header={
        <SignUpHeader
          step={2}
          title="Como podemos te chamar?"
          subtitle="Último passo. Depois disso, é só lançar o primeiro gasto."
        />
      }
      overlap={28}
      gap={18}
    >
      <View style={styles.fields}>
        <FormField
          label="Seu nome"
          surface="ground"
          value={name}
          onChangeText={handleNameChange}
          error={trimmedName !== "" ? error : null}
          placeholder="Como você gosta de ser chamado"
          autoCapitalize="words"
          autoComplete="name"
          textContentType="givenName"
          returnKeyType="done"
          onSubmitEditing={handleFinishSignUp}
          hint={
            <Text style={styles.hint}>
              É assim que vamos te cumprimentar no app.
            </Text>
          }
        />

        <View style={styles.trial}>
          <View style={styles.trialChip}>
            <StarIcon width={20} height={20} color={Colors.surface} />
          </View>
          <View style={styles.trialTexts}>
            <Text style={styles.trialTitle}>7 dias de Premium grátis</Text>
            <Text style={styles.trialText}>
              Sua conta já começa com tudo liberado. Sem cartão, sem
              compromisso.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.spacer} />

      {failure && (
        <AuthErrorBanner
          message={authErrorMessage(failure)}
          action={
            isEmailTaken(failure)
              ? { label: "Usar outro e-mail", onPress: navigation.goBack }
              : undefined
          }
        />
      )}

      <FooterButton
        label="Criar minha conta"
        size="large"
        onPress={handleFinishSignUp}
        disabled={!canSubmit}
        loading={isLoading}
      />
    </AuthScreen>
  );
};
