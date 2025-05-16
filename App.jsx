import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import FacultyDashboard from "./pages/facultydashboard"; 
import SCADOfficeDashboard from "./pages/ScadOffice";
import ProStudentDashboard from "./pages/ProStudentDashboard";
import PendingCompanyDashboard from "./pages/PendingCompanyDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/scad-office" element={<SCADOfficeDashboard />} />
      <Route path="/pro-student-dashboard" element={<ProStudentDashboard />} />
      <Route path="/pending-company" element={<PendingCompanyDashboard />} />
    </Routes>
  );
}

export default App;