import { styles } from "./EditProfileStyles";
import { Button } from "../../components/Button/Button";
import { CustomText } from "../../components/CustomText/CustomText";
import { UpdateUser } from "../../services/UpdateUserService";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { validateEmail } from "../../utils/validate-email";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View, SafeAreaView, TouchableOpacity, TextInput } from "react-native";

import BackButton from "../../assets/images/arrow-left-svg.svg";

type StackNavigation = {
  Home: undefined;
  EditPassword: {
    token: string;
    user_id: string;
  };
};

type ParamList = {
  Params: {
    token: string;
    user_id: string;
    name: string;
    email: string;
  };
};

export const EditProfile: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { token, user_id, name, email } =
    useRoute<RouteProp<ParamList, "Params">>().params;

  const [customerName, setCustomerName] = useState<string>(name);
  const [customerEmail, setCustomerEmail] = useState<string>(email);

  const handleUpdateUser = async () => {
    if (!/^[A-Za-z]+$/.test(customerName)) {
      showSnackBar(
        "O nome deve conter apenas letras, sem números ou símbolos.",
        "#de525a"
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

    const { success, message } = await UpdateUser(
      user_id,
      token,
      customerEmail,
      customerName
    );

    if (!success) {
      showSnackBar(message || "Erro desconhecido!", "#de525a");
    } else {
      showSnackBar("Perfil editado com sucesso!!", "#407BFF");
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenuContent}>
        <View style={styles.topContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton width={18} height={18} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <CustomText style={{ color: "#FFFFFF" }}>Money Track</CustomText>
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
            onPress={() =>
              navigation.navigate("EditPassword", {
                token,
                user_id,
              })
            }
            style={styles.input}
            placeholder={"Digite sua senha"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            value={"*********"}
          />
        </View>
        <View style={styles.buttonDiv}>
          <Button value="Editar" onPress={handleUpdateUser} isLoading={false} />
        </View>
      </View>
    </SafeAreaView>
  );
};
