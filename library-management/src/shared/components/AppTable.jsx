function AppTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-3 py-2 font-semibold text-slate-700">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-200">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2 text-slate-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td className="px-3 py-4 text-slate-500" colSpan={columns.length}>
                No records found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default AppTable;
