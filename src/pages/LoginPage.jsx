import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(""); // To store role
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy users
  const dummyStudentUser = {
    email: "student@guc.com",
    password: "123",
    role: "student",
  };
  const dummyCompanyUser = {
    email: "company@guc.com",
    password: "123",
    role: "company",
  };
  const dummySCADUser = {
    email: "scad@guc.com",
    password: "123",
    role: "scad",
  };
  const dummyFacultyUser = {
    email: "faculty@guc.com",
    password: "123",
    role: "faculty",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === dummyStudentUser.email &&
      password === dummyStudentUser.password
    ) {
      setIsLoggedIn(true);
      setUserRole("student");
      navigate("/dashboard");
    } else if (
      email === dummyCompanyUser.email &&
      password === dummyCompanyUser.password
    ) {
      setIsLoggedIn(true);
      setUserRole("company");
      navigate("/company");
    } else if (
      email === dummySCADUser.email &&
      password === dummySCADUser.password
    ) {
      setIsLoggedIn(true);
      setUserRole("scad");
      navigate("/scad-office");
    } else if (
      email === dummyFacultyUser.email &&
      password === dummyFacultyUser.password
    ) {
      setIsLoggedIn(true);
      setUserRole("faculty");
      navigate("/faculty");
    } else {
      alert(
        "Invalid credentials. Try:\nstudent@guc.com\ncompany@guc.com\nscad@guc.com\nfaculty@guc.com\nPassword: 123"
      );
    }
  };

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem", maxWidth: 400, margin: "2rem auto" }}>
        <Navbar />
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" style={{ marginTop: 8 }}>Log In</button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16 }}>
          No account? <Link to="/register" style={{ color: "#1976d2" }}>Register here</Link>
        </p>
        {isLoggedIn && (
          <div style={{ marginTop: "2em", textAlign: "center" }}>
            <h3>Welcome, {userRole}!</h3>
          </div>
        )}
      </div>
    </div>
  );
}