import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ground,
  },

  body: {
    flex: 1,
  },

  content: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 18,
  },

  footer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    gap: 4,
  },

  footerDivider: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
