import { styles } from "./CategorySettingsModalStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { useAuth } from "../../hooks/useAuth";
import { sheetStyles } from "../../styles/sheet";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { FooterButton } from "../FooterButton/FooterButton";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { parseCategoryIcon } from "../../utils/categories";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InitialCategoryData } from "../../screens/HandleCategory/HandleCategory";
import { FC, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TrashIcon from "../../assets/images/icons/trash.svg";
import PencilIcon from "../../assets/images/icons/pencil.svg";

type TransactionType = "INCOME" | "EXPENSE";

type StackNavigation = {
  HandleCategory: {
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

interface CategorySettingsModalProps {
  visible: boolean;
  category: CategoryDTO | null;
  type: TransactionType;
  onClose: () => void;
  onDeleted: () => void;
}

export const CategorySettingsModal: FC<CategorySettingsModalProps> = ({
  visible,
  category,
  type,
  onClose,
  onDeleted,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigation>>();
  const { user, userToken } = useAuth();

  const insets = useSafeAreaInsets();

  const { translateY, panResponder } = useModalAnimation(
    visible,
    onClose,
    Dimensions.get("window").height
  );

  const { deleteCategory, loading } = useDeleteCategory();

  const [step, setStep] = useState<"actions" | "confirm">("actions");

  useEffect(() => {
    if (visible) setStep("actions");
  }, [visible]);

  const handleEdit = () => {
    if (user?.isPremium === false) {
      showSnackBar(
        "Seu período gratuito acabou. Assine o Premium para editar categorias.",
        "#de525a"
      );
      return;
    }

    navigation.navigate("HandleCategory", {
      type,
      isEditing: true,
      initialData: {
        id: category?.id,
        name: category?.name,
        icon: category?.icon,
      },
    });
    onClose();
  };

  const handleDelete = async () => {
    if (!category?.id) {
      showSnackBar("Erro ao deletar Categoria", "#de525a");
      return;
    }

    try {
      const success = await deleteCategory({
        id: category.id,
        token: userToken?.token ?? "",
      });

      if (!success) {
        showSnackBar("Erro ao deletar Categoria", "#de525a");
        return;
      }

      showSnackBar("Categoria deletada com sucesso!", "#4BB543");
      onClose();
      onDeleted();
    } catch (error) {
      showSnackBar("Ocorreu um erro inesperado", "#de525a");
    }
  };

  if (!visible || !category) {
    return null;
  }

  const { color, icon } = parseCategoryIcon(category.icon);
  const IconComponent = iconMap[icon];

  return (
    <View style={sheetStyles.overlay}>
      <Pressable
        style={sheetStyles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar"
      />

      <Animated.View
        style={[
          sheetStyles.sheet,
          step === "actions" ? styles.actionsSheet : styles.confirmSheet,
          { paddingBottom: 28 + insets.bottom, transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={sheetStyles.handle} />

        {step === "actions" ? (
          <>
            <View style={styles.identity}>
              <View style={[styles.iconCircle, { backgroundColor: color }]}>
                {IconComponent && <IconComponent width={26} height={26} />}
              </View>

              <View style={styles.identityTexts}>
                <Text style={styles.name} numberOfLines={1}>
                  {category.name}
                </Text>
                <Text style={styles.typeText}>
                  {type === "EXPENSE"
                    ? "Categoria de despesa"
                    : "Categoria de receita"}
                </Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStep("confirm")}
                style={[styles.actionButton, styles.deleteButton]}
                accessibilityRole="button"
              >
                <TrashIcon width={18} height={18} color={Colors.expenseText} />
                <Text style={[styles.actionText, styles.deleteText]}>
                  Excluir
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleEdit}
                style={[styles.actionButton, styles.editButton]}
                accessibilityRole="button"
              >
                <PencilIcon width={18} height={18} color={Colors.surface} />
                <Text style={[styles.actionText, styles.editText]}>Editar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.dangerChip}>
              <TrashIcon width={24} height={24} color={Colors.expenseText} />
            </View>

            <Text style={styles.confirmTitle} accessibilityRole="header">
              Excluir “{category.name}”?
            </Text>

            <Text style={styles.confirmText}>
              Os lançamentos que já usam essa categoria continuam no seu
              extrato. Ela só deixa de aparecer na hora de lançar.
            </Text>

            <View style={styles.confirmActions}>
              <FooterButton
                label="Excluir categoria"
                variant="danger"
                onPress={handleDelete}
                loading={loading}
              />
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setStep("actions")}
                disabled={loading}
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
};
