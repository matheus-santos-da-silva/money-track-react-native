import { FC } from "react";
import { styles } from "./MenuStyles";
import { TopBar } from "../../components/TopBar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { useNavigation } from "@react-navigation/native";
import { clearOldCache } from "../../utils/cache-helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import UserIcon from "../../assets/images/user-svg.svg";
import UserCircle from "../../assets/images/menu-user-circle.svg";
import MyPlanIcon from "../../assets/images/plan-menu-icon.svg";
import LogoutIcon from "../../assets/images/logout-menu-icon.svg";
import CategoriesIcon from "../../assets/images/categories-menu-icon.svg";

type StackNavigation = {
  Home: undefined;
  CategoriesList: undefined;
  EditProfile: undefined;
  Plans: undefined;
};

export const Menu: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { user, logout } = useAuth();

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
            {`Olá, ${user?.name}!`}
          </CustomText>
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <View style={styles.menuOption}>
              <UserIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Editar Perfil</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CategoriesList")}
          >
            <View style={styles.menuOption}>
              <CategoriesIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Categorias</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity onPress={() => navigation.navigate("Plans")}>
            <View style={styles.menuOption}>
              <MyPlanIcon height="26" width="26" />
              <CustomText style={styles.menuText}>Meu Plano</CustomText>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity
            onPress={() => {
              clearOldCache(user?.id || "");
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
