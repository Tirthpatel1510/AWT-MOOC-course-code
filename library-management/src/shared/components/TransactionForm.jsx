import PageCard from "./PageCard";

function TransactionForm({
  title,
  subtitle,
  dateLabel,
  buttonLabel,
  baseFine,
  state,
}) {
  const {
    books,
    selectedBookId,
    setSelectedBookId,
    selectedDate,
    availability,
    finePreview,
    updateFineFromDate,
  } = state;

  return (
    <div className="p-5">
      <PageCard title={title} subtitle={subtitle}>
        <form className="space-y-4">
          <select
            className="border border-slate-300 rounded-md p-2 w-full"
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(Number(e.target.value))}
          >
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            aria-label={dateLabel}
            className="border border-slate-300 rounded-md p-2 w-full"
            value={selectedDate}
            onChange={(e) => updateFineFromDate(e.target.value, baseFine)}
          />

          <p className="text-sm">Availability: <span className="font-semibold">{availability}</span></p>
          <p className="text-sm">Fine Preview: <span className="font-semibold">Rs. {finePreview}</span></p>

          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            {buttonLabel}
          </button>
        </form>
      </PageCard>
    </div>
  );
}

export default TransactionForm;