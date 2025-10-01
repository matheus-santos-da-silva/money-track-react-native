import { styles } from "./MenuStyles";
import { TopBar } from "../../components/TopBar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { clearOldCache } from "../../utils/cache-helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import UserCircle from "../../assets/images/menu-user-circle.svg";
import UserIcon from "../../assets/images/user-svg.svg";
import CategoriesIcon from "../../assets/images/categories-menu-icon.svg";
import MyPlanIcon from "../../assets/images/plan-menu-icon.svg";
import LogoutIcon from "../../assets/images/logout-menu-icon.svg";

type StackNavigation = {
  Home: undefined;
  CategoriesList: {
    token: string;
    user_id: string;
  };
  EditProfile: {
    token: string;
    user_id: string;
    name: string;
    email: string;
  };
};

type ParamList = {
  Params: {
    id: string;
    token: string;
    name: string;
    email: string;
  };
};

export const Menu: React.FC = () => {
  const { name, id, token, email } =
    useRoute<RouteProp<ParamList, "Params">>().params;

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { logout } = useAuth();

  const handleBackBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TopBar handleBackBtn={handleBackBtn} />
      </View>
      <View style={styles.content}>
        <View style={styles.userWelcomeContent}>
          <UserCircle height="80" width="80" />
          <CustomText style={styles.userWelcomeText}>
            {`Olá, ${name}!`}
          </CustomText>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfile", {
                token,
                user_id: id,
                name,
                email,
              })
            }
          >
            <View style={styles.menuOption}>
              <UserIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Editar Perfil</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoriesList", {
                token,
                user_id: id,
              })
            }
          >
            <View style={styles.menuOption}>
              <CategoriesIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Categorias</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity>
            <View style={styles.menuOption}>
              <MyPlanIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Meu Plano</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity
            onPress={() => {
              clearOldCache(id);
              logout();
            }}
          >
            <View style={styles.menuOption}>
              <LogoutIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Sair</CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
