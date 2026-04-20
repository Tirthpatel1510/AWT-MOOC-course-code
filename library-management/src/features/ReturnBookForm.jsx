import { useReturnBookForm } from "../utils/useTransactionForm";
import TransactionForm from "../shared/components/TransactionForm";

function ReturnBookForm() {
  return <TransactionForm title="Return Book" subtitle="Return an issued book" dateLabel="Return Date" buttonLabel="Return Book" baseFine={15} state={useReturnBookForm()} />;
}

export default ReturnBookForm;
