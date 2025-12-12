import { styles } from "./HandleCategoryStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { CustomText } from "../../components/CustomText/CustomText";
import { IconSelector } from "../../components/IconSelector/IconSelector";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { ColorSelector } from "../../components/ColorSelector/ColorSelector";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { StackNavigationProp } from "@react-navigation/stack";
import { CategoryTypeSelector } from "../../components/CategoryTypeSelector/CategoryTypeSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PlusButton from "../../assets/images/plus.svg";
import ArrowLeftIcon from "../../assets/images/arrow-left-svg.svg";

type StackNavigation = {
  Home: undefined;
};

export interface InitialCategoryData {
  id?: string;
  icon?: string;
  name?: string;
}

type TransactionType = "INCOME" | "EXPENSE";

type ParamList = {
  Params: {
    token: string;
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

export const HandleCategory: FC = () => {
  const { token, type, initialData, isEditing } =
    useRoute<RouteProp<ParamList, "Params">>().params;

  const { execute, loading } = useCreateCategory();
  const { update, updateCategoryLoading } = useUpdateCategory();

  const isSubmitting = loading || updateCategoryLoading;

  const [showColorsMenu, setShowColorsMenu] = useState<boolean>(false);
  const [showIconsMenu, setShowIconsMenu] = useState<boolean>(false);

  const [categoryType, setCategoryType] = useState<TransactionType>(type);
  const [categoryName, setCategoryName] = useState<string>(
    initialData?.name || ""
  );

  const iconParts = initialData?.icon ? initialData.icon.split("-") : [];

  const [icon, setIcon] = useState<string>(iconParts[1] ?? "");
  const [iconColor, setIconColor] = useState<string>(
    iconParts[0] ?? Colors.primaryGray
  );

  const IconComponent = icon ? iconMap[icon] : null;

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const handleBackBtn = () => {
    navigation.goBack();
  };

  const color =
    categoryType === "INCOME" ? Colors.incomeGreen : Colors.expenseRed;

  const handleSubmit = async () => {
    if (!categoryName || categoryName.length < 3 || categoryName.length > 20) {
      showSnackBar(
        "O nome da categoria precisa ter entre 3 a 20 caracteres!",
        "#de525a"
      );
      return;
    }

    if (!icon) {
      showSnackBar(
        "Você precisa escolhar um ícone para a categoria!",
        "#de525a"
      );
      return;
    }

    if (!iconColor) {
      showSnackBar(
        "Você precisa escolhar uma cor para a categoria!",
        "#de525a"
      );
      return;
    }

    try {
      let success;
      if (isEditing) {
        if (!initialData?.id) {
          showSnackBar("ID da categoria não encontrado", "#de525a");
          return;
        }

        success = await update({
          category_id: initialData?.id,
          type: categoryType,
          token,
          icon: `${iconColor}-${icon}`,
          name: categoryName,
        });
      } else {
        success = await execute({
          type: categoryType,
          token,
          icon: `${iconColor}-${icon}`,
          name: categoryName,
          created_at: new Date().toISOString(),
        });
      }

      if (success) {
        showSnackBar(
          `Categoria ${isEditing ? "atualizada" : "criada"} com sucesso!`,
          "#4BB543"
        );

        navigation.goBack();
      } else {
        showSnackBar(
          `Erro ao ${isEditing ? "atualizar" : "criar"} categoria.`,
          "#de525a"
        );
      }
    } catch (error) {
      showSnackBar("Ocorreu um erro inesperado", "#de525a");
    }
  };

  return (
    <SafeAreaView style={styles(color).container}>
      <View style={[styles(color).menuColor, styles(color).topMenu]}>
        <View style={styles(color).topLogo}>
          <TouchableOpacity onPress={handleBackBtn}>
            <ArrowLeftIcon height={18} width={18} />
          </TouchableOpacity>

          <View style={styles(color).logo}>
            <CustomText style={{ color: "#FFFFFF" }}>
              {isEditing ? "Atualizar Categoria" : "Criar Categoria"}
            </CustomText>
          </View>
        </View>

        <View>
          <CategoryTypeSelector
            typeSelected={categoryType}
            onSelect={setCategoryType}
            disabled={isEditing}
          />
        </View>
      </View>

      <View style={styles(color).mainContent}>
        <View>
          <CustomText style={{ color: Colors.primaryGray, fontSize: 14 }}>
            Nome da Categoria:
          </CustomText>
          <TextInput
            style={styles(color).categoryNameInput}
            placeholder={"Digite o nome da categoria"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            onChangeText={setCategoryName}
            value={categoryName}
          />
        </View>

        <View style={styles(color).chooseData}>
          <View style={styles(color).justify}>
            <CustomText style={{ color: Colors.primaryGray, fontSize: 14 }}>
              Escolher Ícone:
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowIconsMenu(true)}
              style={styles(color).addButton}
            >
              <PlusButton width={20} height={20} />
            </TouchableOpacity>
          </View>

          <View style={styles(color).justify}>
            <CustomText style={{ color: Colors.primaryGray, fontSize: 14 }}>
              Escolher Cor:
            </CustomText>

            <TouchableOpacity
              onPress={() => setShowColorsMenu(true)}
              activeOpacity={0.7}
              style={styles(color).addButton}
            >
              <PlusButton width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles(color).chooseIcon}>
          <CustomText style={{ color: Colors.primaryGray, fontSize: 14 }}>
            Ícone Escolhido:
          </CustomText>

          <View style={styles(iconColor).choosedIcon}>
            {IconComponent ? (
              <IconComponent width={36} height={36} />
            ) : (
              <PlusButton width={36} height={36} />
            )}
          </View>
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          onPress={handleSubmit}
          activeOpacity={0.9}
          style={[
            styles(color).confirmButtonContainer,
            isSubmitting && { opacity: 0.6 },
          ]}
        >
          <View
            style={[
              styles(color).confirmButtonColor,
              styles(color).confirmButton,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={{ color: "white", fontSize: 16 }}>
                {isEditing ? "Atualizar" : "Criar"}
              </CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ColorSelector
        visible={showColorsMenu}
        onClose={() => setShowColorsMenu(false)}
        onSelectColor={(color) => setIconColor(color)}
      />

      <IconSelector
        visible={showIconsMenu}
        onClose={() => setShowIconsMenu(false)}
        onSelectIcon={(icon) => setIcon(icon)}
      />
    </SafeAreaView>
  );
};
