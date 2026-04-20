import { useRenewBookForm } from "../utils/useTransactionForm";
import TransactionForm from "../shared/components/TransactionForm";

function RenewBookForm() {
  return <TransactionForm title="Renew Book" subtitle="Extend due date for issued book" dateLabel="New Due Date" buttonLabel="Renew Book" baseFine={10} state={useRenewBookForm()} />;
}

export default RenewBookForm;
