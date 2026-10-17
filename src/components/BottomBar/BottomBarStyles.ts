import { Fonts } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const BAR_HEIGHT = 76;

const FAB_SIZE = 64;
// Quanto o botão central passa da borda superior da barra.
const FAB_RISE = 8;

export const styles = StyleSheet.create({
  // O botão central fica dentro dos limites do wrapper: no Android, a parte de um
  // filho que sai do pai não recebe toque.
  wrapper: {
    marginTop: -FAB_RISE,
    paddingTop: FAB_RISE,
  },

  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  tab: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  tabLabel: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    lineHeight: 16,
  },

  tabLabelActive: {
    fontFamily: Fonts.semiBold,
  },

  fabSlot: {
    flex: 1,
  },

  fab: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -FAB_SIZE / 2,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: Colors.ground,
    backgroundColor: Colors.brandBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
