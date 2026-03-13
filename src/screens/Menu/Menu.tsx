import { FC } from "react";
import { styles } from "./MenuStyles";
import { TopBar } from "../../components/TopBar/TopBar";
import { useAuth } from "../../hooks/useAuth";
import { CustomText } from "../../components/CustomText/CustomText";
import { useNavigation } from "@react-navigation/native";
import { clearOldCache } from "../../utils/cache-helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import UserIcon from "../../assets/images/user-svg.svg";
import UserCircle from "../../assets/images/menu-user-circle.svg";
import MyPlanIcon from "../../assets/images/plan-menu-icon.svg";
import LogoutIcon from "../../assets/images/logout-menu-icon.svg";
import CategoriesIcon from "../../assets/images/categories-menu-icon.svg";
import BlueRightArrow from "../../assets/images/blue-right-arrow.svg";

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
          <UserCircle height="72" width="72" />
          <CustomText style={styles.userWelcomeText}>
            {`Olá, ${user?.name}!`}
          </CustomText>
          {user?.email ? (
            <Text style={styles.userEmail}>{user.email}</Text>
          ) : null}
        </View>

        <View style={styles.menuList}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={styles.menuOption}>
              <View style={styles.menuOptionLeft}>
                <View
                  style={[styles.iconWrapper, { backgroundColor: "#EBF1FF" }]}
                >
                  <UserIcon height="22" width="22" />
                </View>
                <CustomText style={styles.menuText}>Editar Perfil</CustomText>
              </View>
              <BlueRightArrow width={14} height={14} />
            </View>
          </TouchableOpacity>

          <View style={styles.divisionLine} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("CategoriesList")}
          >
            <View style={styles.menuOption}>
              <View style={styles.menuOptionLeft}>
                <View
                  style={[styles.iconWrapper, { backgroundColor: "#E6F4EE" }]}
                >
                  <CategoriesIcon height="22" width="22" />
                </View>
                <CustomText style={styles.menuText}>Categorias</CustomText>
              </View>
              <BlueRightArrow width={14} height={14} />
            </View>
          </TouchableOpacity>

          <View style={styles.divisionLine} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Plans")}
          >
            <View style={styles.menuOption}>
              <View style={styles.menuOptionLeft}>
                <View
                  style={[styles.iconWrapper, { backgroundColor: "#FFF3E6" }]}
                >
                  <MyPlanIcon height="22" width="22" />
                </View>
                <CustomText style={styles.menuText}>Meu Plano</CustomText>
              </View>
              <BlueRightArrow width={14} height={14} />
            </View>
          </TouchableOpacity>

          <View style={styles.divisionLine} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              clearOldCache(user?.id || "");
              logout();
            }}
          >
            <View style={styles.menuOption}>
              <View style={styles.menuOptionLeft}>
                <View
                  style={[styles.iconWrapper, { backgroundColor: "#FDECEA" }]}
                >
                  <LogoutIcon height="22" width="22" />
                </View>
                <CustomText style={styles.menuText}>Sair</CustomText>
              </View>
              <BlueRightArrow width={14} height={14} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
