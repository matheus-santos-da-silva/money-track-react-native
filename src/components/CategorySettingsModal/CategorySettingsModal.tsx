import { FC } from "react";
import { styles } from "./CategorySettingsModalStyles";
import { iconMap } from "../../utils/icons";
import { CustomText } from "../CustomText/CustomText";
import { CategoryDTO } from "../../services/DTOS/finance/CategoryDTO";
import { showSnackBar } from "../../utils/show-snack-bar";
import { useNavigation } from "@react-navigation/native";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { useModalAnimation } from "../../hooks/useModalAnimation";
import { StackNavigationProp } from "@react-navigation/stack";
import { InitialCategoryData } from "../../screens/HandleCategory/HandleCategory";
import {
  TouchableOpacity,
  View,
  Animated,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";

import WhitePencil from "../../assets/images/white-pencil.svg";
import WhiteTrashIcon from "../../assets/images/white-trash.svg";

type TransactionType = "INCOME" | "EXPENSE";

export type StackNavigation = {
  HandleCategory: {
    token: string;
    type: TransactionType;
    initialData?: InitialCategoryData;
    isEditing?: boolean;
  };
};

export interface CategorySettingsProps {
  category: CategoryDTO | null;
  token: string;
  user_id: string;
  type: TransactionType;
}

interface CategorySettingsModalProps {
  visible: boolean;
  onClose: () => void;
  props: CategorySettingsProps;
}

export const CategorySettingsModal: FC<CategorySettingsModalProps> = ({
  visible,
  onClose,
  props,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();

  const { translateY, panResponder, handleClose } = useModalAnimation(
    visible,
    onClose,
  );

  const { deleteCategory, loading } = useDeleteCategory();

  const handleOptionSelect = (modalAction: "edit" | "delete") => {
    if (modalAction === "edit") {
      navigation.navigate("HandleCategory", {
        token: props.token,
        type: props.type,
        isEditing: true,
        initialData: {
          id: props.category?.id,
          name: props.category?.name,
          icon: props.category?.icon,
        },
      });
      handleClose();
    } else {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    let success;

    if (props.category?.id) {
      try {
        success = await deleteCategory({
          id: props.category.id,
          token: props.token,
        });

        if (success) {
          showSnackBar(`Categoria deletada com sucesso!`, "#4BB543");
          navigation.goBack();
        } else {
          showSnackBar(`Erro ao deletar Categoria`, "#de525a");
        }
      } catch (error) {
        showSnackBar("Ocorreu um erro inesperado", "#de525a");
      }
    } else {
      showSnackBar("Erro ao deletar Categoria", "#de525a");
    }
  };

  if (!visible || !props.category) {
    return null;
  }

  const IconComponent = iconMap[props.category.icon.split("-")[1]];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => handleClose()}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={() => handleClose()} />

        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragIndicator} />

          <View style={styles.content}>
            <View style={styles.header}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: props.category.icon.split("-")[0] },
                ]}
              >
                <IconComponent width={28} height={28} />
              </View>
              <CustomText style={styles.categoryName}>
                {props.category.name}
              </CustomText>
            </View>

            <View style={styles.separator} />

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                activeOpacity={0.8}
                onPress={() => handleOptionSelect("edit")}
              >
                <WhitePencil width={18} height={18} />
                <CustomText style={styles.actionText}>Editar</CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                activeOpacity={0.8}
                disabled={loading}
                onPress={() => handleOptionSelect("delete")}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <WhiteTrashIcon width={18} height={18} />
                    <CustomText style={styles.actionText}>Excluir</CustomText>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
