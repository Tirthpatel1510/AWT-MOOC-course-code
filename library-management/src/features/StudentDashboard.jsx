const borrowedBooks = [
  { id: 1, title: "React Basics", issueDate: "2026-04-01", returnDate: "2026-04-15" },
  { id: 2, title: "Database Design", issueDate: "2026-04-05", returnDate: "2026-04-20" },
];

function StudentDashboard() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <h2 className="text-lg font-semibold mb-3">Borrowed Books</h2>

      <div className="space-y-2">
        {borrowedBooks.map((book) => (
          <div key={book.id} className="border p-3 rounded">
            <p className="font-medium">{book.title}</p>
            <p className="text-sm text-slate-600">Issue: {book.issueDate}</p>
            <p className="text-sm text-slate-600">Return: {book.returnDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;
