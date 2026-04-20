import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import AppTable from "../shared/components/AppTable";
import AppTabs from "../shared/components/AppTabs";
import PageCard from "../shared/components/PageCard";

const tabs = [
  { label: "Overdue Books", value: "overdue" },
  { label: "Issued Chart", value: "issued" },
  { label: "Transactions", value: "transactions" },
];

const overdueRows = [
  { id: 1, title: "React Basics", student: "Asha", dueDate: "2026-04-10", daysLate: 8 },
  { id: 2, title: "Database Design", student: "Rahul", dueDate: "2026-04-12", daysLate: 6 },
];

const transactionRows = [
  { id: 1, action: "Issued", book: "React Basics", user: "Asha", date: "2026-04-01" },
  { id: 2, action: "Renewed", book: "Database Design", user: "Rahul", date: "2026-04-08" },
  { id: 3, action: "Returned", book: "JavaScript", user: "Asha", date: "2026-04-14" },
];

const issuedChartData = [
  { name: "Mon", issued: 2 },
  { name: "Tue", issued: 4 },
  { name: "Wed", issued: 3 },
  { name: "Thu", issued: 5 },
  { name: "Fri", issued: 4 },
];

function ReportDashboard() {
  const [activeTab, setActiveTab] = useState("overdue");

  return (
    <div className="p-5">
      <PageCard title="Report Dashboard" subtitle="Simple reports with mock data">
        <AppTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overdue" ? (
          <AppTable
            columns={[
              { key: "title", title: "Book" },
              { key: "student", title: "Student" },
              { key: "dueDate", title: "Due Date" },
              { key: "daysLate", title: "Days Late" },
            ]}
            rows={overdueRows}
          />
        ) : null}

        {activeTab === "issued" ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issuedChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issued" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : null}

        {activeTab === "transactions" ? (
          <AppTable
            columns={[
              { key: "action", title: "Action" },
              { key: "book", title: "Book" },
              { key: "user", title: "User" },
              { key: "date", title: "Date" },
            ]}
            rows={transactionRows}
          />
        ) : null}
      </PageCard>
    </div>
  );
}

export default ReportDashboard;
