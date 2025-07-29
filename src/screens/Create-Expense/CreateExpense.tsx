import { Colors } from "../../styles/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  HandleTransaction,
  InitialTransactionData,
} from "../../components/HandleTransaction/HandleTransaction";

type ParamList = {
  Params: {
    initialData?: InitialTransactionData;
  };
};

export const CreateExpense = () => {
  const { initialData } = useRoute<RouteProp<ParamList, "Params">>().params;

  return (
    <HandleTransaction
      transactionType="EXPENSE"
      color={Colors.expenseRed}
      typeText="Receita"
      initialData={initialData}
      isEditing={initialData ? true : false}
    />
  );
};
