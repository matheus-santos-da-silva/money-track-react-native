import { StyleSheet } from "react-native";
import { Colors } from "./colors";

// Base dos bottom sheets redesenhados (seletor de mês e novo lançamento).
export const sheetStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.scrim,
  },

  sheet: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    gap: 16,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.handle,
    alignSelf: "center",
  },
});
