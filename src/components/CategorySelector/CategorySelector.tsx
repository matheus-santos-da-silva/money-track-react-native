import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import { styles } from "./CategorySelectorStyles";
import { Colors } from "../../styles/colors";
import { sheetStyles } from "../../styles/sheet";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { CategoryChoice } from "../CategoryChoice/CategoryChoice";
import { FC, useEffect, useState } from "react";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useEdgeToEdgeKeyboard } from "../../hooks/useKeyboardInset";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { matchesCategorySearch } from "../../utils/categories";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PlusIcon from "../../assets/images/icons/plus.svg";
import SearchIcon from "../../assets/images/icons/search.svg";

interface CategorySelectorProps {
  visible: boolean;
  type: "EXPENSE" | "INCOME";
  categories: CategoryDTO[];
  loading: boolean;
  selectedId?: string;
  onSelect: (category: CategoryDTO) => void;
  onCreate: () => void;
  onClose: () => void;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  visible,
  type,
  categories,
  loading,
  selectedId,
  onSelect,
  onCreate,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    screenHeight
  );

  const keyboard = useEdgeToEdgeKeyboard();

  const keyboardOffset = useAnimatedStyle(() => ({
    marginBottom: keyboard.height.value,
    maxHeight: Math.min(
      screenHeight * 0.75,
      screenHeight - keyboard.height.value - insets.top - 24
    ),
  }));

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (visible) setQuery("");
  }, [visible]);

  if (!visible) return null;

  const visibleCategories = categories.filter((category) =>
    matchesCategorySearch(category.name, query)
  );

  return (
    <View style={sheetStyles.overlay}>
      <Pressable
        style={sheetStyles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar"
      />

      <Reanimated.View style={[styles.frame, keyboardOffset]}>
        <Animated.View
          style={[
            sheetStyles.sheet,
            styles.sheet,
            { paddingBottom: 24 + insets.bottom, transform: [{ translateY }] },
          ]}
          accessibilityViewIsModal
        >
          <View style={styles.top} {...panResponder.panHandlers}>
            <View style={sheetStyles.handle} />
            <Text style={styles.title} accessibilityRole="header">
              {type === "EXPENSE"
                ? "Categorias de despesa"
                : "Categorias de receita"}
            </Text>
          </View>

          <View style={styles.search}>
            <SearchIcon width={18} height={18} color={Colors.muted} />
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar categoria"
              placeholderTextColor={Colors.muted}
              accessibilityLabel="Buscar categoria"
              returnKeyType="search"
            />
          </View>

          <ScrollView
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <ActivityIndicator
                style={styles.loader}
                color={Colors.brandBlue}
              />
            ) : (
              <>
                {visibleCategories.length === 0 && (
                  <Text style={styles.empty}>Nenhuma categoria encontrada</Text>
                )}

                <View style={styles.grid}>
                  {visibleCategories.map((category) => (
                    <CategoryChoice
                      key={category.id}
                      style={styles.cell}
                      size="large"
                      name={category.name}
                      icon={category.icon}
                      selected={category.id === selectedId}
                      onPress={() => onSelect(category)}
                    />
                  ))}

                  <TouchableOpacity
                    style={[styles.cell, styles.create]}
                    activeOpacity={0.7}
                    onPress={onCreate}
                    accessibilityRole="button"
                    accessibilityLabel="Nova categoria"
                  >
                    <View style={styles.createCircle}>
                      <PlusIcon
                        width={22}
                        height={22}
                        color={Colors.brandBlue}
                      />
                    </View>
                    <Text style={styles.createText}>Nova</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </Animated.View>
      </Reanimated.View>
    </View>
  );
};
