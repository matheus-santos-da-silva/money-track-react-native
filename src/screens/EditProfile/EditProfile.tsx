import { styles } from "./EditProfileStyles";
import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { UpdateUser } from "../../services/UpdateUserService";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { validateEmail } from "../../utils/validate-email";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, SafeAreaView, TouchableOpacity, TextInput } from "react-native";

import Logo from "../../assets/images/logo-mt.svg";
import BackButton from "../../assets/images/arrow-left-svg.svg";

type StackNavigation = {
  Home: undefined;
  EditPassword: undefined;
};

export const EditProfile: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { user, userToken, refreshUser } = useAuth();

  const [customerName, setCustomerName] = useState<string>(user?.name || "");
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || "");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateUser = async () => {
    if (!/^[A-Za-z]+$/.test(customerName)) {
      showSnackBar(
        "O nome deve conter apenas letras, sem números ou símbolos.",
        "#de525a",
      );
      return;
    }

    if (customerName.length < 3 || customerName.length > 20) {
      showSnackBar("Nome deve ter entre 3 e 20 caracteres", "#de525a");
      return;
    }

    if (!validateEmail(customerEmail)) {
      showSnackBar("Email inválido", "#de525a");
      return;
    }

    setIsLoading(true);

    const { success, message } = await UpdateUser(
      user?.id || "",
      userToken?.token || "",
      customerEmail,
      customerName,
    );

    if (!success) {
      setIsLoading(false);
      showSnackBar(message || "Erro desconhecido!", "#de525a");
    } else {
      refreshUser();
      showSnackBar("Perfil editado com sucesso!!", "#4BB543");
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

        <CustomText style={styles.editProfileText}>Editar Perfil</CustomText>
      </View>

      <View style={styles.mainContent}>
        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Nome</CustomText>
          </View>
          <TextInput
            style={styles.input}
            placeholder={"Digite seu nome"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            onChangeText={setCustomerName}
            value={customerName}
          />
        </View>

        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Email</CustomText>
          </View>
          <TextInput
            style={styles.input}
            placeholder={"Digite seu email"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            onChangeText={setCustomerEmail}
            value={customerEmail}
          />
        </View>

        <View>
          <View style={styles.label}>
            <CustomText style={styles.labelText}>Senha</CustomText>
          </View>
          <TextInput
            onPress={() => navigation.navigate("EditPassword")}
            style={styles.input}
            placeholder={"Digite sua senha"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            value={"*********"}
          />
        </View>
        <View style={styles.buttonDiv}>
          <Button
            value="Editar"
            onPress={handleUpdateUser}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
