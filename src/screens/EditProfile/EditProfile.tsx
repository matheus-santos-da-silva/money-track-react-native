import { styles } from "./EditProfileStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/FormField/FormField";
import { FormScreen } from "../../components/FormScreen/FormScreen";
import { UpdateUser } from "../../services/UpdateUserService";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import {
  canSaveProfile,
  emailError,
  nameError,
} from "../../utils/account-forms";

import LockIcon from "../../assets/images/icons/lock.svg";

type StackNavigation = {
  EditPassword: undefined;
};

export const EditProfile: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();

  const { user, userToken, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const canSave = canSaveProfile(
    { name, email },
    { name: user?.name ?? "", email: user?.email ?? "" }
  );

  const handleSave = async () => {
    setIsLoading(true);

    const { success, message } = await UpdateUser(
      user?.id ?? "",
      userToken?.token ?? "",
      email.trim(),
      name.trim()
    );

    setIsLoading(false);

    if (!success) {
      showSnackBar(message || "Erro desconhecido!", "#de525a");
      return;
    }

    refreshUser();
    showSnackBar("Perfil editado com sucesso!!", "#4BB543");
    navigation.goBack();
  };

  return (
    <FormScreen
      title="Dados pessoais"
      footer={
        <FooterButton
          label="Salvar alterações"
          onPress={handleSave}
          disabled={!canSave}
          loading={isLoading}
        />
      }
    >
      <FormField
        label="Nome"
        value={name}
        onChangeText={setName}
        error={nameError(name)}
        placeholder="Digite seu nome"
        autoComplete="name"
        autoCapitalize="words"
      />

      <FormField
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        error={emailError(email)}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TouchableOpacity
        style={styles.passwordCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("EditPassword")}
        accessibilityRole="button"
        accessibilityLabel="Quer trocar a senha? Alterar"
      >
        <LockIcon width={20} height={20} color={Colors.ink} />
        <Text style={styles.passwordText}>Quer trocar a senha?</Text>
        <Text style={styles.passwordAction}>Alterar</Text>
      </TouchableOpacity>
    </FormScreen>
  );
};
