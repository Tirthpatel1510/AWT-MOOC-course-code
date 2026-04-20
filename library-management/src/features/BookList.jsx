import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AppModal from "../shared/components/AppModal";

const initialBooks = [
  { id: 1, title: "React Basics", author: "John", category: "Programming" },
  { id: 2, title: "JavaScript", author: "Smith", category: "Programming" },
  { id: 3, title: "Database Design", author: "Khan", category: "Database" },
  { id: 4, title: "Operating Systems", author: "Rita", category: "Systems" },
  { id: 5, title: "Computer Networks", author: "Maya", category: "Networks" },
];

const pageSize = 3;

function BookList() {
  const { role } = useAuth();
  const isLibrarian = role === "librarian";

  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", category: "Programming" });

  const categories = ["all", ...new Set(books.map((b) => b.category))];

  const filtered = books.filter((b) => {
    const text = search.toLowerCase();
    const searchMatch = b.title.toLowerCase().includes(text) || b.author.toLowerCase().includes(text);
    const categoryMatch = category === "all" || b.category === category;
    return searchMatch && categoryMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageBooks = filtered.slice(start, start + pageSize);

  function openAdd() {
    setEditId(null);
    setForm({ title: "", author: "", category: "Programming" });
    setOpen(true);
  }

  function openEdit(book) {
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, category: book.category });
    setOpen(true);
  }

  function saveBook(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;

    if (editId) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editId
            ? { ...b, title: form.title.trim(), author: form.author.trim(), category: form.category }
            : b
        )
      );
    } else {
      const nextId = Math.max(...books.map((b) => b.id), 0) + 1;
      setBooks((prev) => [
        ...prev,
        { id: nextId, title: form.title.trim(), author: form.author.trim(), category: form.category },
      ]);
    }

    setOpen(false);
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <input
          placeholder="Search by title/author"
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 rounded md:w-52"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {isLibrarian ? (
          <button className="bg-blue-600 text-white px-3 rounded" onClick={openAdd} type="button">
            Add Book
          </button>
        ) : null}
      </div>

      {pageBooks.map((book) => (
        <div key={book.id} className="border p-3 mb-2 rounded flex items-center justify-between">
          <div>
            {book.title} - {book.author} ({book.category})
          </div>
          {isLibrarian ? (
            <button className="text-sm bg-slate-700 text-white px-2 py-1 rounded" onClick={() => openEdit(book)}>
              Edit
            </button>
          ) : null}
        </div>
      ))}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>

      <AppModal title={editId ? "Edit Book" : "Add Book"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={saveBook} className="space-y-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          />
          <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">
            Save
          </button>
        </form>
      </AppModal>
    </div>
  );
}

export default BookList;
