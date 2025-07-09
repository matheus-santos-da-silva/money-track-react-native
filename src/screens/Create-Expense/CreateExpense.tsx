import { Colors } from "../../styles/colors";
import { CreateTransaction } from "../../components/CreateTransaction/CreateTransaction";

export const CreateExpense = () => (
  <CreateTransaction
    transactionType="EXPENSE"
    color={Colors.expenseRed}
    typeText="Receita"
  />
);
