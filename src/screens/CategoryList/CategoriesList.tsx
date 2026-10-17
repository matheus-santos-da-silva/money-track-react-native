import { styles } from "./CategoriesListStyles";
import { Colors } from "../../styles/colors";
import { useAuth } from "../../hooks/useAuth";
import { TypeSwitch } from "../../components/TypeSwitch/TypeSwitch";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { PremiumModal } from "../../components/PremiumModal/PremiumModal";
import { HeaderSearch } from "../../components/HeaderSearch/HeaderSearch";
import { useGetCategories } from "../../hooks/useGetCategories";
import { CategoryListRow } from "../../components/CategoryListRow/CategoryListRow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { InitialCategoryData } from "../HandleCategory/HandleCategory";
import { matchesCategorySearch } from "../../utils/categories";
import { CategorySettingsModal } from "../../components/CategorySettingsModal/CategorySettingsModal";
import { FC, useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TagIcon from "../../assets/images/icons/tag.svg";
import PlusIcon from "../../assets/images/icons/plus.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import ChevronLeftIcon from "../../assets/images/icons/chevron-left.svg";

type TransactionType = "INCOME" | "EXPENSE";

type StackNavigation = {
  HandleCategory: {
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

const TYPE_OPTIONS: { value: TransactionType; label: string }[] = [
  { value: "EXPENSE", label: "Despesas" },
  { value: "INCOME", label: "Receitas" },
];

const EMPTY_EXAMPLES: Record<TransactionType, string> = {
  EXPENSE:
    "Ex.: Pet, Academia, Presentes. Elas aparecem na hora de lançar uma despesa.",
  INCOME:
    "Ex.: Freelas, Aluguel recebido, Vendas. Elas aparecem na hora de lançar uma receita.",
};

export const CategoriesList: FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const insets = useSafeAreaInsets();

  const { userToken, user } = useAuth();

  const [categoriesType, setCategoriesType] =
    useState<TransactionType>("EXPENSE");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(
    null
  );
  const [isPremiumModalVisible, setIsPremiumModalVisible] = useState(false);

  const { categories, loading, refetch } = useGetCategories({
    token: userToken?.token || "",
    type: categoriesType,
  });

  useFocusEffect(
    useCallback(() => {
      refetch({ resetCache: true });
    }, [categoriesType])
  );

  const closeSearch = () => {
    setSearchQuery("");
    setIsSearchVisible(false);
  };

  const openCreate = () => {
    if (user?.isPremium === false) {
      setIsPremiumModalVisible(true);
      return;
    }

    navigation.navigate("HandleCategory", { type: categoriesType });
  };

  const visibleCategories = categories.filter((category) =>
    matchesCategorySearch(category.name, searchQuery)
  );
  const userCategories = visibleCategories.filter(
    (category) => category.user_id === user?.id
  );
  const predefinedCategories = visibleCategories.filter(
    (category) => category.user_id === null
  );

  const isSearching = searchQuery.trim() !== "";
  const hasNoResults = isSearching && visibleCategories.length === 0;

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.brandBlue}
        />
      );
    }

    if (hasNoResults) {
      return (
        <View style={styles.noResults}>
          <Text style={styles.noResultsTitle}>
            Nenhuma categoria encontrada
          </Text>
          <Text style={styles.noResultsText}>Tente outro nome.</Text>
        </View>
      );
    }

    const showUserSection = !isSearching || userCategories.length > 0;

    return (
      <>
        {showUserSection && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>
                Minhas categorias{" "}
                <Text style={styles.sectionCount}>
                  · {userCategories.length}
                </Text>
              </Text>

              <TouchableOpacity
                style={styles.newButton}
                onPress={openCreate}
                accessibilityRole="button"
                accessibilityLabel="Nova categoria"
              >
                <PlusIcon width={18} height={18} color={Colors.brandBlue} />
                <Text style={styles.newButtonText}>Nova</Text>
              </TouchableOpacity>
            </View>

            {userCategories.length > 0 ? (
              <View style={[styles.card, styles.userCard]}>
                {userCategories.map((category, index) => (
                  <CategoryListRow
                    key={category.id}
                    name={category.name}
                    icon={category.icon}
                    isFirst={index === 0}
                    onOpenOptions={() => setSelectedCategory(category)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.empty}>
                <View style={styles.emptyChip}>
                  <TagIcon width={22} height={22} color={Colors.brandBlue} />
                </View>
                <Text style={styles.emptyTitle}>
                  Crie categorias do seu jeito
                </Text>
                <Text style={styles.emptyText}>
                  {EMPTY_EXAMPLES[categoriesType]}
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  activeOpacity={0.85}
                  onPress={openCreate}
                  accessibilityRole="button"
                >
                  <PlusIcon width={18} height={18} color={Colors.surface} />
                  <Text style={styles.emptyButtonText}>Criar categoria</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {predefinedCategories.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Padrão do app</Text>
              <Text style={styles.sectionCaption}>
                Disponíveis para todos e não podem ser editadas.
              </Text>
            </View>

            <View style={[styles.card, styles.defaultCard]}>
              {predefinedCategories.map((category, index) => (
                <CategoryListRow
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  isFirst={index === 0}
                />
              ))}
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        {isSearchVisible ? (
          <View style={styles.searchRow}>
            <HeaderSearch
              value={searchQuery}
              onChangeText={setSearchQuery}
              onCancel={closeSearch}
              placeholder="Nome da categoria"
              accessibilityLabel="Buscar categoria"
            />
          </View>
        ) : (
          <View style={styles.titleRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <ChevronLeftIcon width={22} height={22} color={Colors.surface} />
            </TouchableOpacity>

            <Text style={styles.title} accessibilityRole="header">
              Categorias
            </Text>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setIsSearchVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Buscar categoria"
            >
              <SearchIcon width={20} height={20} color={Colors.surface} />
            </TouchableOpacity>
          </View>
        )}

        <TypeSwitch
          style={styles.typeSwitch}
          tone="onBlue"
          options={TYPE_OPTIONS}
          selected={categoriesType}
          onSelect={setCategoriesType}
          accessibilityLabel="Tipo de categoria"
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 28 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <CategorySettingsModal
        visible={selectedCategory !== null}
        category={selectedCategory}
        type={categoriesType}
        onClose={() => setSelectedCategory(null)}
        onDeleted={() => refetch({ resetCache: true })}
      />

      <PremiumModal
        isVisible={isPremiumModalVisible}
        onClose={() => setIsPremiumModalVisible(false)}
        onSubscribe={() => setIsPremiumModalVisible(false)}
      />
    </View>
  );
};
