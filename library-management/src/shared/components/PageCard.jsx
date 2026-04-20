function PageCard({ title, subtitle, children }) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      {subtitle ? <p className="text-slate-500 mt-1">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default PageCard;
