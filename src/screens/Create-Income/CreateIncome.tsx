import { Colors } from "../../styles/colors";
import { CreateTransaction } from "../../components/CreateTransaction/CreateTransaction";

export const CreateIncome = () => (
  <CreateTransaction
    transactionType="INCOME"
    color={Colors.incomeGreen}
    typeText="Despesa"
  />
);
