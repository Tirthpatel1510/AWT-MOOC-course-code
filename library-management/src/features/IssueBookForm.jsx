import { useIssueBookForm } from "../utils/useTransactionForm";
import TransactionForm from "../shared/components/TransactionForm";

function IssueBookForm() {
  return <TransactionForm title="Issue Book" subtitle="Select book and due date" dateLabel="Due Date" buttonLabel="Issue Book" baseFine={0} state={useIssueBookForm()} />;
}

export default IssueBookForm;
