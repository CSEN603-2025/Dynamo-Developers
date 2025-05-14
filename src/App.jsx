import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import FacultyDashboard from "./pages/facultydashboard"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/faculty" element={<FacultyDashboard />} /> 
    </Routes>
  );
}

export default App;