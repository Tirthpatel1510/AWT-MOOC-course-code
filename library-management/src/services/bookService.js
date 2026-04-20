const mockBooks = [
  { id: 1, title: "React Basics", author: "John", category: "Programming", available: 4 },
  { id: 2, title: "JavaScript Essentials", author: "Smith", category: "Programming", available: 0 },
  { id: 3, title: "Database Design", author: "Khan", category: "Database", available: 6 },
  { id: 4, title: "Operating Systems", author: "Rita", category: "Systems", available: 2 },
  { id: 5, title: "Data Structures", author: "Arun", category: "Programming", available: 8 },
  { id: 6, title: "Computer Networks", author: "Maya", category: "Networks", available: 3 },
];

export const bookService = {
  list: async () => mockBooks,
};
