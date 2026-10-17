import { FC } from "react";
import { styles } from "./ScreenHeaderStyles";
import { Colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";

interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader: FC<ScreenHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <TouchableOpacity
        style={styles.side}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <ChevronLeftIcon width={22} height={22} color={Colors.surface} />
      </TouchableOpacity>

      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.side} />
    </View>
  );
};
