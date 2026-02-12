import { styles } from "./EditPasswordStyles";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { UpdatePassword } from "../../services/UpdatePasswordService";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, SafeAreaView, TouchableOpacity, TextInput } from "react-native";

import Logo from "../../assets/images/logo-mt.svg";
import BackButton from "../../assets/images/arrow-left-svg.svg";
import EyeIcon from "../../assets/images/icon-eye-password.svg";

type StackNavigation = {
  Home: undefined;
};

export const EditPassword: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { userToken, user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdatePassword = async () => {
    if (
      currentPassword.length < 7 ||
      currentPassword.length > 30 ||
      newPassword.length < 7 ||
      newPassword.length > 30 ||
      confirmPassword.length < 7 ||
      confirmPassword.length > 30
    ) {
      showSnackBar("A senha deve ter entre 8 a 30 caracteres", "#de525a");
      return;
    }

    if (newPassword !== confirmPassword) {
      showSnackBar("As senhas não coincidem!", "#de525a");
      return;
    }

    setIsLoading(true);

    const { success, message } = await UpdatePassword(
      user?.id || "",
      userToken?.token || "",
      currentPassword,
      newPassword,
    );

    if (!success) {
      setIsLoading(false);
      showSnackBar(message || "Erro desconhecido!", "#de525a");
    } else {
      showSnackBar("Senha editada com sucesso!!", "#4BB543");
      navigation.navigate("Home");
      setIsLoading(false);
    }
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

        <CustomText style={styles.editProfileText}>Nova Senha</CustomText>
      </View>

      <View style={styles.mainContent}>
        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Senha Atual</CustomText>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Digite sua senha atual"}
              placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
              onChangeText={setCurrentPassword}
              value={currentPassword}
              secureTextEntry={!showCurrentPassword}
            />

            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              activeOpacity={0.6}
              style={styles.eyeIcon}
            >
              <EyeIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Nova Senha</CustomText>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Digite a nova senha"}
              placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
              onChangeText={setNewPassword}
              value={newPassword}
              secureTextEntry={!showNewPassword}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <EyeIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>
              Confirmar Nova Senha
            </CustomText>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Confirme a nova senha"}
              placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <EyeIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonDiv}>
          <Button
            value="Confirmar"
            onPress={handleUpdatePassword}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
