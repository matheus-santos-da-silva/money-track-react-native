import { styles } from "./MenuStyles";
import { useAuth } from "../../hooks/useAuth";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { PlanCard } from "../../components/PlanCard/PlanCard";
import { ProfileRow } from "../../components/ProfileRow/ProfileRow";
import { planSummary } from "../../utils/plan-summary";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { clearOldCache } from "../../utils/cache-helpers";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { CreateTransactionTypeSelector } from "../../components/CreateTransactionTypeSelector/CreateTransactionTypeSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import TagIcon from "../../assets/images/icons/tag.svg";
import LockIcon from "../../assets/images/icons/lock.svg";
import UserIcon from "../../assets/images/icons/user.svg";
import LogOutIcon from "../../assets/images/icons/log-out.svg";

type StackNavigation = {
  EditProfile: undefined;
  EditPassword: undefined;
  CategoriesList: undefined;
  Plans: undefined;
  DeleteAccount: undefined;
  CreateExpense: object;
  CreateIncome: object;
};

type ParamList = {
  Params: { month?: number; year?: number } | undefined;
};

export const Menu: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();
  const params = useRoute<RouteProp<ParamList, "Params">>().params;

  const today = new Date();
  const month = params?.month ?? today.getMonth();
  const year = params?.year ?? today.getFullYear();

  const { user, logout } = useAuth();

  const [isTypeSelectorVisible, setIsTypeSelectorVisible] = useState(false);
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    setIsTypeSelectorVisible(false);
    if (user?.isPremium === false) {
      setIsPremiumModalVisible(true);
      return;
    }
    navigation.navigate(
      type === "EXPENSE" ? "CreateExpense" : "CreateIncome",
      {}
    );
  };

  const handleLogout = () => {
    clearOldCache(user?.id ?? "");
    logout();
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { paddingTop: Math.max(32, insets.top + 12) }]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>
            {user?.name ? user.name.trim()[0].toUpperCase() : "U"}
          </Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {user?.name}
        </Text>
        {!!user?.email && (
          <Text style={styles.email} numberOfLines={1}>
            {user.email}
          </Text>
        )}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {user && (
          <PlanCard
            plan={planSummary(user)}
            onPress={() => navigation.navigate("Plans")}
          />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Conta</Text>
          <View style={styles.card}>
            <ProfileRow
              Icon={UserIcon}
              title="Dados pessoais"
              subtitle="Nome e e-mail"
              onPress={() => navigation.navigate("EditProfile")}
            />
            <ProfileRow
              Icon={LockIcon}
              title="Alterar senha"
              subtitle="Troque sua senha de acesso"
              onPress={() => navigation.navigate("EditPassword")}
              showDivider
            />
            <ProfileRow
              Icon={TagIcon}
              title="Categorias"
              subtitle="Organize suas receitas e despesas"
              onPress={() => navigation.navigate("CategoriesList")}
              showDivider
            />
          </View>
        </View>

        <View style={styles.card}>
          <ProfileRow
            Icon={LogOutIcon}
            title="Sair da conta"
            onPress={handleLogout}
            showChevron={false}
          />
        </View>

        <TouchableOpacity
          style={styles.deleteLink}
          onPress={() => navigation.navigate("DeleteAccount")}
          accessibilityRole="button"
        >
          <Text style={styles.deleteText}>Excluir conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomBar
        active="Menu"
        month={month}
        year={year}
        onShowTypeSelector={() => setIsTypeSelectorVisible(true)}
      />

      <CreateTransactionTypeSelector
        visible={isTypeSelectorVisible}
        onClose={() => setIsTypeSelectorVisible(false)}
        onSelect={handleSelectType}
      />

      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={() => setIsPremiumModalVisible(false)}
      />
    </View>
  );
};
