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

export const CreateIncome = () => {
  const { initialData } = useRoute<RouteProp<ParamList, "Params">>().params;

  return (
    <HandleTransaction
      transactionType="INCOME"
      color={Colors.incomeGreen}
      typeText="Despesa"
      initialData={initialData}
      isEditing={initialData ? true : false}
    />
  );
};
