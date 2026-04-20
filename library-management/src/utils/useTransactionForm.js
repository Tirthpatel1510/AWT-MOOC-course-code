import { useMemo, useState } from "react";

const books = [
  { id: 1, title: "React Basics", available: 4 },
  { id: 2, title: "JavaScript Essentials", available: 0 },
  { id: 3, title: "Database Design", available: 6 },
];

function useTransactionBase(initialFine = 0) {
  const [selectedBookId, setSelectedBookId] = useState(books[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [finePreview, setFinePreview] = useState(initialFine);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === Number(selectedBookId)),
    [selectedBookId]
  );

  const availability = selectedBook?.available ?? 0;

  function updateFineFromDate(dateValue, baseFine = 0) {
    setSelectedDate(dateValue);

    if (!dateValue) {
      setFinePreview(baseFine);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateValue);
    selected.setHours(0, 0, 0, 0);

    const msDiff = today.getTime() - selected.getTime();
    const dayDiff = Math.max(0, Math.floor(msDiff / (1000 * 60 * 60 * 24)));

    setFinePreview(baseFine + dayDiff * 2);
  }

  return {
    books,
    selectedBookId,
    setSelectedBookId,
    selectedDate,
    setSelectedDate,
    selectedBook,
    availability,
    finePreview,
    setFinePreview,
    updateFineFromDate,
  };
}

export function useIssueBookForm() {
  return useTransactionBase(0);
}

export function useRenewBookForm() {
  const state = useTransactionBase(10);
  return state;
}

export function useReturnBookForm() {
  const state = useTransactionBase(15);
  return state;
}
