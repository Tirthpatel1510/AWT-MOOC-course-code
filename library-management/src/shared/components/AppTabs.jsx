function AppTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-2 border-b border-slate-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={`px-3 py-2 text-sm rounded-t-md ${
            activeTab === tab.value
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AppTabs;
