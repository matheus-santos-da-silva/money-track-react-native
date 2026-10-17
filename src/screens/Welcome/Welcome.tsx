import { FC } from "react";
import { styles } from "./WelcomeStyles";
import { Colors } from "../../styles/colors";
import { AuthLogo } from "../../components/AuthLogo/AuthLogo";
import { useNavigation } from "@react-navigation/native";
import { AuthIllustration } from "../../components/AuthIllustration/AuthIllustration";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type StackNavigation = {
  Login: undefined;
  SignUp: undefined;
};

const SHORT_SCREEN_HEIGHT = 800;

export const Welcome: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const isShort = height - insets.top - insets.bottom < SHORT_SCREEN_HEIGHT;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.brandBlue} />

      <View
        style={[styles.ring, styles.ringOuter]}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />
      <View
        style={[styles.ring, styles.ringInner]}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: 32 + insets.top, paddingBottom: 32 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.logo}>
          <AuthLogo size="welcome" />
        </View>

        <View style={styles.illustration}>
          <AuthIllustration variant="full" height={isShort ? 260 : undefined} />
        </View>

        <View style={styles.spacer} />

        <Text
          style={[styles.title, isShort && styles.titleShort]}
          accessibilityRole="header"
        >
          Seu dinheiro, organizado de verdade.
        </Text>
        <Text style={styles.text}>
          Registre gastos em segundos, veja para onde vai cada real e feche o
          mês no azul.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primary]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("SignUp")}
            accessibilityRole="button"
          >
            <Text style={styles.primaryText}>Criar conta grátis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondary]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Login")}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryText}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
