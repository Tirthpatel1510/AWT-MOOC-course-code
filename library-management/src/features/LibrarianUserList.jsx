const users = [
  { id: 1, name: "Asha", role: "student" },
  { id: 2, name: "Rahul", role: "student" },
  { id: 3, name: "Meena", role: "librarian" },
];

function LibrarianUserList() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="border p-3 rounded flex items-center justify-between">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-slate-600">Role: {user.role}</p>
            </div>
            <button type="button" className="bg-slate-700 text-white px-3 py-1 rounded text-sm">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibrarianUserList;
