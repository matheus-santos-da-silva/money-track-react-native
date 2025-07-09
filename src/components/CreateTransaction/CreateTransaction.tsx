import { styles } from "./CreateTransactionStyles";
import { Colors } from "../../styles/colors";
import { iconMap } from "../../utils/icons";
import { CustomText } from "../../components/CustomText/CustomText";
import { selectColor } from "../../utils/colors";
import { FC, useState } from "react";
import { showSnackBar } from "../../utils/show-snack-bar";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import { useGetCategories } from "../../hooks/useGetCategories";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { TransactionTypeModal } from "../../components/TransactionTypeModal/TransactionTypeModal";
import { CurrencyInputWithKeypad } from "../../components/CurrencyInput/CurrencyInput";
import { TransactionRecurrenceSelector } from "../../components/TransactionRecurrenceSelector/TransactionRecurrenceSelector";
import { TransactionInstallmentsSelector } from "../../components/TransactionInstallmentsSelector/TransactionInstallmentsSelector";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateIcon from "../../assets/images/gray-date-icon.svg";
import ArrowLeftIcon from "../../assets/images/arrow-left-svg.svg";
import CategoriesIcon from "../../assets/images/categories-menu-icon.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import DescriptionIcon from "../../assets/images/description-icon.svg";
import TransactionIcon from "../../assets/images/transaction-icon.svg";
import GrayDownArrowIcon from "../../assets/images/arrow-down-svg.svg";
import WhiteDownArrowIcon from "../../assets/images/white-arrow-down.svg";

type StackNavigation = {
  Home: undefined;
  CreateTransaction: { token: string; user_id: string };
};

type ParamList = {
  Params: {
    token: string;
    user_id: string;
  };
};

type TransactionType = "INCOME" | "EXPENSE";

interface CreateTransactionProps {
  transactionType: TransactionType;
  color: string;
  typeText: string;
}

export const CreateTransaction: FC<CreateTransactionProps> = ({
  transactionType,
  color,
  typeText,
}) => {
  const { token, user_id } = useRoute<RouteProp<ParamList, "Params">>().params;

  const { execute, transactionLoading } = useCreateTransaction();

  const [amount, setAmount] = useState(0);

  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [category, setCategory] = useState<{
    id: string;
    icon: string;
    name: string;
  } | null>(null);

  const [showRecurrenceMenu, setShowRecurrenceMenu] = useState(false);
  const [recurrence, setRecurrence] = useState<"MONTHLY" | "YEARLY" | "NONE">(
    "NONE"
  );

  const [showInstallmentsMenu, setShowInstallmentsMenu] = useState(false);
  const [installments, setInstallments] = useState<number>(1);

  const [description, setDescription] = useState<string>("");

  const [selectedTransactionType, setSelectedTransactionType] = useState<
    "fixa" | "parcelada" | "recorrente" | null
  >(null);

  const handleSelectTransaction = (
    type: "fixa" | "parcelada" | "recorrente"
  ) => {
    setSelectedTransactionType(type);
  };

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const navigation = useNavigation<StackNavigationProp<StackNavigation>>();
  const handleBackBtn = () => {
    navigation.goBack();
  };

  const { categories, categoriesError, loading } = useGetCategories({
    token,
    type: transactionType,
  });

  return (
    <SafeAreaView style={styles(color).container}>
      <View style={[styles(color).menuColor, styles(color).topMenu]}>
        <View style={styles(color).topLogo}>
          <TouchableOpacity onPress={handleBackBtn}>
            <ArrowLeftIcon height={18} width={18} />
          </TouchableOpacity>

          <View style={styles(color).logo}>
            <CustomText style={{ color: "#FFFFFF" }}>Money Track</CustomText>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles(color).amountDiv}>
          <Text style={styles(color).valueText}>Valor:</Text>
          <CurrencyInputWithKeypad
            value={amount}
            onChange={setAmount}
            type={transactionType}
          />
        </View>
        <TouchableOpacity onPress={() => setShowTypeMenu(true)}>
          <View style={styles(color).typeMenu}>
            <CustomText style={{ color: "#FFFFFF" }}>{typeText}</CustomText>
            <WhiteDownArrowIcon />
          </View>
        </TouchableOpacity>
      </View>

      <TransactionTypeModal
        visible={showTypeMenu}
        onClose={() => setShowTypeMenu(false)}
        token={token}
        type={transactionType === "INCOME" ? "EXPENSE" : "INCOME"}
      />

      <View style={styles(color).mainContent}>
        <View>
          <View style={styles(color).label}>
            <DescriptionIcon height={16} width={16} />
            <CustomText style={styles(color).grayText}>Descrição:</CustomText>
          </View>
          <TextInput
            style={styles(color).descriptionInput}
            placeholder={"Adicione sua descrição"}
            placeholderTextColor={"rgba(100, 100, 100, 0.7)"}
            onChangeText={setDescription}
            value={description}
          />
        </View>

        <View style={styles(color).halfDiv}>
          <View style={styles(color).halfCard}>
            <View style={styles(color).label}>
              <CategoriesIcon height={18} width={18} />
              <CustomText style={styles(color).grayText}>Categoria:</CustomText>
            </View>
            <TouchableOpacity onPress={() => setShowCategoriesMenu(true)}>
              <View style={styles(color).halfInput}>
                <Text style={styles(color).inputText}>
                  {category ? category.name : "Categorias"}
                </Text>
                <GrayDownArrowIcon height={12} width={12} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles(color).halfCard}>
            <View style={styles(color).label}>
              <DateIcon height={16} width={16} />
              <CustomText style={styles(color).grayText}>Data:</CustomText>
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={styles(color).halfInput}>
                <Text style={styles(color).inputText}>{formatDate(date)}</Text>
                <GrayDownArrowIcon height={12} width={12} />
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (event.type === "set" && selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
        </View>

        <View style={styles(color).transactionContainer}>
          <View style={styles(color).label}>
            <TransactionIcon height={18} width={18} />
            <CustomText style={styles(color).grayText}>Transação:</CustomText>
          </View>

          <View style={styles(color).transactionButtonsContainer}>
            <View style={styles(color).transactionButtonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  handleSelectTransaction("fixa");
                  setRecurrence("NONE");
                  setShowRecurrenceMenu(false);
                  setInstallments(1);
                  setShowInstallmentsMenu(false);
                }}
              >
                <View
                  style={[
                    styles(color).transactionButton,
                    selectedTransactionType === "fixa" && {
                      borderColor: color,
                    },
                  ]}
                >
                  <CustomText
                    style={[
                      styles(color).transactionButtonText,
                      selectedTransactionType === "fixa" && {
                        color: color,
                      },
                    ]}
                  >
                    Fixa
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles(color).transactionButtonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  handleSelectTransaction("parcelada");
                  setShowInstallmentsMenu(true);
                }}
              >
                <View
                  style={[
                    styles(color).transactionButton,
                    selectedTransactionType === "parcelada" && {
                      borderColor: color,
                    },
                  ]}
                >
                  <CustomText
                    style={[
                      styles(color).transactionButtonText,
                      selectedTransactionType === "parcelada" && {
                        color: color,
                      },
                    ]}
                  >
                    Parcelada
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles(color).transactionButtonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  handleSelectTransaction("recorrente");
                  setShowRecurrenceMenu(true);
                }}
              >
                <View
                  style={[
                    styles(color).transactionButton,
                    selectedTransactionType === "recorrente" && {
                      borderColor: color,
                    },
                  ]}
                >
                  <CustomText
                    style={[
                      styles(color).transactionButtonText,
                      selectedTransactionType === "recorrente" && {
                        color: color,
                      },
                    ]}
                  >
                    Recorrente
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          disabled={transactionLoading}
          onPress={async () => {
            if (!category) {
              showSnackBar("Você precisa escolhar uma categoria!", "#de525a");
              return;
            }

            if (amount === 0) {
              showSnackBar(
                "Valor da Transação não pode ser R$ 0,00!",
                "#de525a"
              );
              return;
            }

            if (!selectedTransactionType) {
              showSnackBar(
                "Escolha um tipo para a sua Transação! Fixa, Parcelada ou Recorrente.",
                "#de525a"
              );
              return;
            }

            const created = await execute({
              type: transactionType === "INCOME" ? "incomes" : "expenses",
              token,
              user_id,
              amount,
              category_id: category.id,
              recurrence,
              total_installments: installments,
              transaction_date: date.toISOString(),
              description,
            });

            if (created) {
              showSnackBar("Transação criada com sucesso!", "#4BB543");
              navigation.goBack();
            } else {
              showSnackBar("Erro ao criar transação", "#de525a");
              return;
            }
          }}
          style={[
            styles(color).confirmButtonContainer,
            transactionLoading && { opacity: 0.6 },
          ]}
        >
          <View
            style={[
              styles(color).confirmButtonColor,
              styles(color).confirmButton,
            ]}
          >
            <CustomText style={styles(color).confirmButtonText}>
              {transactionLoading ? "Salvando..." : "Adicionar"}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>

      <CategorySelector
        visible={showCategoriesMenu}
        onClose={() => setShowCategoriesMenu(false)}
      >
        {loading ? (
          <Text style={{ textAlign: "center" }}>Carregando...</Text>
        ) : categoriesError ? (
          <Text style={{ textAlign: "center", color: "green" }}>
            Erro ao carregar categorias
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon.split("-")[1]];
              const backgroundCircleColor = selectColor(
                category.icon.split("-")[0]
              );

              return (
                <TouchableOpacity
                  key={category.icon}
                  style={{
                    width: "30%",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    setCategory(category);
                    setShowCategoriesMenu(false);
                  }}
                >
                  <View
                    style={[
                      styles(color).iconCircle,
                      { backgroundColor: backgroundCircleColor },
                    ]}
                  >
                    <IconComponent width={20} height={20} />
                  </View>

                  <Text
                    style={{
                      fontSize: 13,
                      color: Colors.primaryGray,
                      marginTop: 5,
                    }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </CategorySelector>

      <TransactionInstallmentsSelector
        onSelect={(value) => {
          setInstallments(value);
          setRecurrence("NONE");
        }}
        visible={showInstallmentsMenu}
        onClose={() => setShowInstallmentsMenu(false)}
        type={transactionType}
        value={installments}
      />

      <TransactionRecurrenceSelector
        onSelect={(value) => {
          setRecurrence(value);
          setInstallments(1);
        }}
        visible={showRecurrenceMenu}
        onClose={() => setShowRecurrenceMenu(false)}
        type={transactionType}
        value={recurrence}
      />
    </SafeAreaView>
  );
};
