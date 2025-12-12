import { styles } from "./CategoriesListStyles";
import { Colors } from "../../styles/colors";
import { CustomText } from "../../components/CustomText/CustomText";
import { CategoryRow } from "../../components/CategoryRow/CategoryRow";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { useGetCategories } from "../../hooks/useGetCategories";
import { StackNavigationProp } from "@react-navigation/stack";
import { InitialCategoryData } from "../HandleCategory/HandleCategory";
import { CategoryTypeSelector } from "../../components/CategoryTypeSelector/CategoryTypeSelector";
import { SearchTransactionsBar } from "../../components/SearchTransactionBar/SearchTransactionsBar";
import { CategorySettingsModal } from "../../components/CategorySettingsModal/CategorySettingsModal";
import { FC, useCallback, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Logo from "../../assets/images/logo-mt.svg";
import SearchIcon from "../../assets/images/search-btn-svg.svg";
import PlusButton from "../../assets/images/plus.svg";
import PlusCategoryButton from "../../assets/images/add-category-icon.svg";
import ArrowLeftIcon from "../../assets/images/arrow-left-svg.svg";

type TransactionType = "INCOME" | "EXPENSE";

type StackNavigation = {
  HandleCategory: {
    token: string;
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

type ParamList = {
  Params: {
    token: string;
    user_id: string;
  };
};

export const CategoriesList: FC = () => {
  const { token, user_id } = useRoute<RouteProp<ParamList, "Params">>().params;

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [categorySettings, setCategorySettings] = useState<CategoryDTO | null>(
    null
  );

  const toggleSearch = () => setIsSearchVisible((prev) => !prev);
  const closeSearch = () => {
    setSearchQuery("");
    setIsSearchVisible(false);
  };

  const [categoriesType, setCategoriesType] =
    useState<TransactionType>("INCOME");

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const handleBackBtn = () => {
    navigation.goBack();
  };

  const { categories, loading, refetch } = useGetCategories({
    token,
    type: categoriesType,
  });

  /* every time that the screen to focus call refetch to reset cache */
  useFocusEffect(
    useCallback(() => {
      refetch({ resetCache: true });
    }, [categoriesType])
  );

  const filteredCategories =
    categories.filter((category) =>
      category.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  const predefinedCategories =
    filteredCategories.filter((category) => category.user_id === null) || [];

  const userCategories =
    filteredCategories.filter((category) => category.user_id === user_id) || [];

  const color =
    categoriesType === "INCOME" ? Colors.incomeGreen : Colors.expenseRed;

  return (
    <SafeAreaView style={styles(color).container}>
      <View style={[styles(color).menuColor, styles(color).topMenu]}>
        {isSearchVisible ? (
          <SearchTransactionsBar
            visible={isSearchVisible}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClose={closeSearch}
          />
        ) : (
          <View style={styles(color).topLogo}>
            <TouchableOpacity onPress={handleBackBtn}>
              <ArrowLeftIcon height={20} width={20} />
            </TouchableOpacity>

            <View style={styles(color).logo}>
              <Logo width={30} height={40} />
            </View>

            <View style={styles(color).topRightButtons}>
              <TouchableOpacity activeOpacity={0.9}>
                <SearchIcon height={20} width={20} onPress={toggleSearch} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate("HandleCategory", {
                    token,
                    type: categoriesType,
                  });
                }}
              >
                <PlusCategoryButton height={22} width={22} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View>
          <CategoryTypeSelector
            typeSelected={categoriesType}
            onSelect={setCategoriesType}
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles(color).mainContent}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <ActivityIndicator size="large" color={color} />
            </View>
          ) : (
            <>
              <View>
                <View style={styles(color).categoriesTitle}>
                  <CustomText
                    style={{ fontSize: 16, color: Colors.primaryGray }}
                  >
                    Minhas Categorias
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      navigation.navigate("HandleCategory", {
                        token,
                        type: categoriesType,
                      });
                    }}
                  >
                    <View style={styles(color).addCategoryButton}>
                      <PlusButton width={20} height={20} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles(color).categoriesRows}>
                  {userCategories.length > 0 ? (
                    userCategories.map((category) => (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          setCategorySettings(category);
                          setManageModalVisible(true);
                        }}
                        key={category.id}
                      >
                        <CategoryRow
                          circleColor={category.icon.split("-")[0]}
                          icon={category.icon.split("-")[1]}
                          title={category.name}
                          type="custom"
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles(color).withoutCategory}>
                      Você ainda não criou nenhuma categoria personalizada...
                    </Text>
                  )}
                </View>
              </View>

              <View>
                <View style={styles(color).categoriesTitle}>
                  <CustomText
                    style={{ fontSize: 16, color: Colors.primaryGray }}
                  >
                    Categorias Predefinidas
                  </CustomText>
                </View>

                <View style={styles(color).categoriesRows}>
                  {predefinedCategories.length > 0 ? (
                    predefinedCategories.map((category) => (
                      <View key={category.id}>
                        <CategoryRow
                          circleColor={category.icon.split("-")[0]}
                          icon={category.icon.split("-")[1]}
                          title={category.name}
                          type="predefined"
                        />
                      </View>
                    ))
                  ) : (
                    <Text style={styles(color).withoutCategory}>
                      Nenhuma categoria foi encontrada...
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <CategorySettingsModal
        visible={manageModalVisible}
        onClose={() => setManageModalVisible(false)}
        props={{
          category: categorySettings,
          token,
          user_id,
          type: categoriesType,
        }}
      />
    </SafeAreaView>
  );
};
