import { styles } from "./EditPasswordStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/FormField/FormField";
import { FormScreen } from "../../components/FormScreen/FormScreen";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { UpdatePassword } from "../../services/UpdatePasswordService";
import { Text, View } from "react-native";
import {
  canUpdatePassword,
  confirmationError,
  isNewPasswordValid,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../utils/account-forms";

import CheckIcon from "../../assets/images/icons/check.svg";
import CircleIcon from "../../assets/images/icons/circle.svg";

export const EditPassword: FC = () => {
  const navigation = useNavigation();

  const { userToken, user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const meetsRule = isNewPasswordValid(newPassword);
  const RuleIcon = meetsRule ? CheckIcon : CircleIcon;
  const ruleColor = meetsRule ? Colors.incomeText : Colors.muted;

  const handleSave = async () => {
    setIsLoading(true);

    const { success, message } = await UpdatePassword(
      user?.id ?? "",
      userToken?.token ?? "",
      currentPassword,
      newPassword
    );

    setIsLoading(false);

    if (!success) {
      showSnackBar(message || "Erro desconhecido!", "#de525a");
      return;
    }

    showSnackBar("Senha editada com sucesso!!", "#4BB543");
    navigation.goBack();
  };

  return (
    <FormScreen
      title="Alterar senha"
      footer={
        <FooterButton
          label="Atualizar senha"
          onPress={handleSave}
          disabled={
            !canUpdatePassword(currentPassword, newPassword, confirmPassword)
          }
          loading={isLoading}
        />
      }
    >
      <FormField
        label="Senha atual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secure
        autoCapitalize="none"
        autoComplete="current-password"
      />

      <FormField
        label="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        maxLength={PASSWORD_MAX_LENGTH}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
        hint={
          <View style={styles.rule}>
            <RuleIcon width={14} height={14} color={ruleColor} />
            <Text style={[styles.ruleText, { color: ruleColor }]}>
              Entre {PASSWORD_MIN_LENGTH} e {PASSWORD_MAX_LENGTH} caracteres
            </Text>
          </View>
        }
      />

      <FormField
        label="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        maxLength={PASSWORD_MAX_LENGTH}
        error={confirmationError(newPassword, confirmPassword)}
        secure
        autoCapitalize="none"
        autoComplete="new-password"
      />
    </FormScreen>
  );
};
