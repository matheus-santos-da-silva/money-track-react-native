import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.brandBlue,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 12,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  side: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: Colors.surface,
  },
});
