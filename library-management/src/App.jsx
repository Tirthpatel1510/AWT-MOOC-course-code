import { Routes, Route } from "react-router-dom";
import Login from "./features/Login";
import Register from "./features/Register";
import Dashboard from "./features/Dashboard";
import StudentDashboard from "./features/StudentDashboard";
import LibrarianUserList from "./features/LibrarianUserList";
import IssueBookForm from "./features/IssueBookForm";
import RenewBookForm from "./features/RenewBookForm";
import ReturnBookForm from "./features/ReturnBookForm";
import ReportDashboard from "./features/ReportDashboard";
import ProtectedRoute from "./shared/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <LibrarianUserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/issue"
        element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <IssueBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/renew"
        element={
          <ProtectedRoute>
            <RenewBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/return"
        element={
          <ProtectedRoute>
            <ReturnBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <ReportDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
