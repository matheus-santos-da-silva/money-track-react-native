import { styles } from "./DeleteAccountStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/FormField/FormField";
import { FormScreen } from "../../components/FormScreen/FormScreen";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { clearOldCache } from "../../utils/cache-helpers";
import { useNavigation } from "@react-navigation/native";
import { DeleteAccount as deleteAccount } from "../../services/DeleteAccountService";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import InfoIcon from "../../assets/images/icons/info.svg";
import AlertTriangleIcon from "../../assets/images/icons/alert-triangle.svg";

export const DeleteAccount: FC = () => {
  const navigation = useNavigation();

  const { userToken, user, logout } = useAuth();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    const { success, message } = await deleteAccount(
      user?.id ?? "",
      userToken?.token ?? "",
      password
    );

    if (!success) {
      setIsLoading(false);
      showSnackBar(message || "Erro desconhecido!", "#de525a");
      return;
    }

    await clearOldCache(user?.id ?? "");
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
    <FormScreen
      title="Excluir conta"
      footer={
        <>
          <FooterButton
            label="Excluir minha conta"
            variant="danger"
            onPress={confirmDeletion}
            disabled={password === ""}
            loading={isLoading}
          />
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      }
    >
      <View style={styles.warning}>
        <View style={styles.warningHeader}>
          <AlertTriangleIcon
            width={22}
            height={22}
            color={Colors.expenseText}
          />
          <Text style={styles.warningTitle}>Isso não pode ser desfeito</Text>
        </View>
        <Text style={styles.warningText}>
          Todas as suas despesas, receitas e categorias serão apagadas para
          sempre.
        </Text>
      </View>

      <View style={styles.notice}>
        <InfoIcon width={20} height={20} color={Colors.muted} />
        <Text style={styles.noticeText}>
          Se você assina o Premium, cancele também na Google Play para não
          continuar sendo cobrado.
        </Text>
      </View>

      <FormField
        label="Digite sua senha para confirmar"
        value={password}
        onChangeText={setPassword}
        secure
        autoCapitalize="none"
        autoComplete="current-password"
      />
    </FormScreen>
  );
};
