import { styles } from "./HandleCategoryStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/FormField/FormField";
import { FormScreen } from "../../components/FormScreen/FormScreen";
import { TypeSwitch } from "../../components/TypeSwitch/TypeSwitch";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";
import { FC, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import {
  canSaveCategory,
  CATEGORY_ICONS,
  CATEGORY_NAME_MAX_LENGTH,
  categoryNameError,
  CategoryOption,
  colorOptions,
  formatCategoryIcon,
  parseCategoryIcon,
} from "../../utils/categories";

import PlusIcon from "../../assets/images/icons/plus.svg";
import CheckIcon from "../../assets/images/icons/check.svg";

export interface InitialCategoryData {
  id?: string;
  icon?: string;
  name?: string;
}

type TransactionType = "INCOME" | "EXPENSE";

type ParamList = {
  Params: {
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

const TYPE_OPTIONS: { value: TransactionType; label: string }[] = [
  { value: "EXPENSE", label: "Despesa" },
  { value: "INCOME", label: "Receita" },
];

const ICON_COLUMNS = 6;
const COLOR_COLUMNS = 8;

const toRows = <T,>(items: T[], columns: number) =>
  Array.from({ length: Math.ceil(items.length / columns) }, (_, index) =>
    items.slice(index * columns, (index + 1) * columns)
  );

const fillRow = (count: number, columns: number) =>
  Array.from({ length: columns - count }, (_, index) => (
    <View key={`empty-${index}`} style={styles.gridSpacer} />
  ));

export const HandleCategory: FC = () => {
  const navigation = useNavigation();

  const { type, initialData, isEditing } =
    useRoute<RouteProp<ParamList, "Params">>().params;

  const { userToken } = useAuth();

  const { execute, loading } = useCreateCategory();
  const { update, updateCategoryLoading } = useUpdateCategory();

  const initialIcon = parseCategoryIcon(initialData?.icon);
  const original = isEditing
    ? {
        name: initialData?.name ?? "",
        icon: initialIcon.icon,
        color: initialIcon.color,
      }
    : undefined;

  const [categoryType, setCategoryType] = useState<TransactionType>(type);
  const [name, setName] = useState(original?.name ?? "");
  const [icon, setIcon] = useState(original?.icon ?? "");
  const [color, setColor] = useState(original?.color ?? "");

  const [colors] = useState(() => colorOptions(original?.color ?? ""));

  const isExpense = categoryType === "EXPENSE";
  const trimmedName = name.trim();
  const nameError = categoryNameError(name);
  const PreviewIcon = icon && color ? iconMap[icon] : null;

  const handleSubmit = async () => {
    const payload = {
      type: categoryType,
      token: userToken?.token || "",
      icon: formatCategoryIcon(color, icon),
      name: trimmedName,
    };

    if (isEditing && !initialData?.id) {
      showSnackBar("ID da categoria não encontrado", "#de525a");
      return;
    }

    try {
      const success = isEditing
        ? await update({ ...payload, category_id: initialData?.id ?? "" })
        : await execute({ ...payload, created_at: new Date().toISOString() });

      if (!success) {
        showSnackBar(
          `Erro ao ${isEditing ? "atualizar" : "criar"} categoria.`,
          "#de525a"
        );
        return;
      }

      showSnackBar(
        `Categoria ${isEditing ? "atualizada" : "criada"} com sucesso!`,
        "#4BB543"
      );
      navigation.goBack();
    } catch (error) {
      showSnackBar("Ocorreu um erro inesperado", "#de525a");
    }
  };

  const renderIconOption = (option: CategoryOption) => {
    const IconComponent = iconMap[option.value];
    const isSelected = option.value === icon;

    return (
      <TouchableOpacity
        key={option.value}
        style={[styles.iconOption, isSelected && styles.iconOptionSelected]}
        activeOpacity={0.8}
        onPress={() => setIcon(option.value)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={option.label}
      >
        <View
          style={[
            styles.iconOptionCircle,
            { backgroundColor: color || Colors.refLine },
          ]}
        >
          {IconComponent && <IconComponent width={22} height={22} />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderColorOption = (option: CategoryOption) => {
    const isSelected = option.value === color;

    return (
      <TouchableOpacity
        key={option.value}
        style={styles.colorOption}
        activeOpacity={0.8}
        onPress={() => setColor(option.value)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={option.label}
      >
        {isSelected && (
          <View style={[styles.colorRing, { borderColor: option.value }]} />
        )}
        <View style={[styles.colorSwatch, { backgroundColor: option.value }]}>
          {isSelected && (
            <CheckIcon width={16} height={16} color={Colors.surface} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FormScreen
      title={isEditing ? "Editar categoria" : "Nova categoria"}
      footerDivider
      footer={
        <FooterButton
          label={isEditing ? "Salvar alterações" : "Criar categoria"}
          onPress={handleSubmit}
          disabled={!canSaveCategory({ name, icon, color }, original)}
          loading={loading || updateCategoryLoading}
        />
      }
    >
      <View style={styles.preview}>
        <View
          style={[
            styles.previewCircle,
            PreviewIcon
              ? { backgroundColor: color }
              : styles.previewCircleEmpty,
          ]}
        >
          {PreviewIcon ? (
            <PreviewIcon width={24} height={24} />
          ) : (
            <PlusIcon width={24} height={24} color={Colors.refLine} />
          )}
        </View>

        <View style={styles.previewTexts}>
          <Text style={styles.previewLabel}>Prévia</Text>
          <Text
            style={[
              styles.previewName,
              !trimmedName && styles.previewNameEmpty,
            ]}
            numberOfLines={1}
          >
            {trimmedName || "Nome da categoria"}
          </Text>
        </View>

        <Text
          style={[
            styles.typeTag,
            isExpense ? styles.expenseTag : styles.incomeTag,
          ]}
        >
          {isExpense ? "Despesa" : "Receita"}
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Tipo</Text>
        <TypeSwitch
          tone="light"
          options={TYPE_OPTIONS}
          selected={categoryType}
          onSelect={setCategoryType}
          disabled={isEditing}
          accessibilityLabel="Tipo"
        />
        {isEditing && (
          <Text style={styles.groupHint}>
            O tipo não pode ser alterado depois que a categoria é criada.
          </Text>
        )}
      </View>

      <FormField
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Pet, Academia, Freelas"
        maxLength={CATEGORY_NAME_MAX_LENGTH}
        error={nameError}
        labelAccessory={
          <Text
            style={[
              styles.counter,
              name.length >= CATEGORY_NAME_MAX_LENGTH && styles.counterFull,
            ]}
          >
            {name.length}/{CATEGORY_NAME_MAX_LENGTH}
          </Text>
        }
      />

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Ícone</Text>
        <View style={styles.iconGrid} accessibilityRole="radiogroup">
          {toRows(CATEGORY_ICONS, ICON_COLUMNS).map((row, index) => (
            <View key={index} style={styles.iconRow}>
              {row.map(renderIconOption)}
              {fillRow(row.length, ICON_COLUMNS)}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Cor</Text>
        <View accessibilityRole="radiogroup">
          {toRows(colors, COLOR_COLUMNS).map((row, index) => (
            <View key={index} style={styles.colorRow}>
              {row.map(renderColorOption)}
              {fillRow(row.length, COLOR_COLUMNS)}
            </View>
          ))}
        </View>
      </View>
    </FormScreen>
  );
};
