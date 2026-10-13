import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { clearOldCache } from "../../utils/cache-helpers";
import { useNavigation } from "@react-navigation/native";
import { DeleteAccount as deleteAccount } from "../../services/DeleteAccountService";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "../EditPassword/EditPasswordStyles";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "../../assets/images/logo-mt.svg";
import BackButton from "../../assets/images/arrow-left-svg.svg";
import EyeIcon from "../../assets/images/icon-eye-password.svg";

type StackNavigation = {
  Menu: undefined;
};

export const DeleteAccount: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { userToken, user, logout } = useAuth();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    if (!password) {
      showSnackBar("Digite sua senha para confirmar", "#de525a");
      return;
    }

    setIsLoading(true);

    const { success, message } = await deleteAccount(
      user?.id || "",
      userToken?.token || "",
      password
    );

    if (!success) {
      setIsLoading(false);
      showSnackBar(message || "Erro desconhecido!", "#de525a");
      return;
    }

    await clearOldCache(user?.id || "");
    showSnackBar("Conta excluída com sucesso!", "#4BB543");
    await logout();
  };

  const confirmDeletion = () => {
    Alert.alert(
      "Excluir conta",
      "Esta ação é permanente e não pode ser desfeita. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: handleDeleteAccount,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenuContent}>
        <View style={styles.topContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton width={20} height={20} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Logo width={30} height={40} />
          </View>
        </View>

        <CustomText style={styles.editProfileText}>Excluir Conta</CustomText>
      </View>

      <View style={styles.mainContent}>
        <Text style={{ color: "#de525a", fontSize: 14, marginBottom: 12 }}>
          Ao excluir sua conta, todos os seus dados (despesas, receitas e
          categorias) serão apagados permanentemente.
        </Text>
        <Text style={{ color: "#646464", fontSize: 13, marginBottom: 24 }}>
          Se você assina o plano Premium, cancele a assinatura também na Google
          Play para não continuar sendo cobrado.
        </Text>

        <View style={styles.fieldGroup}>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Confirme sua senha</CustomText>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="rgba(100, 100, 100, 0.5)"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.6}
              style={styles.eyeIcon}
            >
              <EyeIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonDiv}>
          <Button
            value="Excluir minha conta"
            onPress={confirmDeletion}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
