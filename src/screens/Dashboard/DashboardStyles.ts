import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

// Quanto o conteúdo sobe sobre o cabeçalho azul.
const HEADER_OVERLAP = 40;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ground,
  },

  /* Cabeçalho */
  header: {
    backgroundColor: Colors.brandBlue,
    paddingHorizontal: 20,
    paddingBottom: 20 + HEADER_OVERLAP,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 14,
  },

  titleRow: {
    height: 44,
    justifyContent: "center",
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.surface,
  },

  /* Conteúdo */
  content: {
    marginTop: -HEADER_OVERLAP,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 14,
  },
});
