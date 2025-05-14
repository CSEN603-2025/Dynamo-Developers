import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Info icon component (inline, not separate file)
function InfoIconWithTooltip({ message }) {
  const [show, setShow] = useState(false);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 14,
          cursor: "pointer",
          marginLeft: 6,
          boxShadow: "0 1px 4px #bbdefb55"
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow((v) => !v)}
        tabIndex={0}
        aria-label="Show requirements"
      >
        {/* SVG info icon */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#1976d2"/>
          <text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Arial" fontWeight="bold">i</text>
        </svg>
      </span>
      {show && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: 0,
            background: "#e3f2fd",
            color: "#1976d2",
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: 12,
            marginTop: 4,
            fontSize: 15,
            zIndex: 10,
            minWidth: 260,
            boxShadow: "0 2px 8px #bbdefb55"
          }}
        >
          {typeof message === "string" ? (
            <span>{message}</span>
          ) : (
            message
          )}
        </div>
      )}
    </span>
  );
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    size: "",
    officialEmail: "",
    logo: null,
    documents: null,
    facultyId: "",
    facultyEmail: "",
    facultyDocs: null,
    studentCV: null,
  });
  const [error, setError] = useState("");

  const requiredIcon = (
    <span style={{ color: "#d32f2f", marginLeft: 4, fontWeight: "bold" }} title="Required">*</span>
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (userType === "student") {
      if (!form.username || !form.email || !form.password || !form.studentCV) {
        setError("All fields are required.");
        return;
      }
      if (!validateEmail(form.email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else if (userType === "company") {
      if (
        !form.companyName ||
        !form.industry ||
        !form.size ||
        !form.officialEmail ||
        !form.logo ||
        !form.documents
      ) {
        setError("All fields are required.");
        return;
      }
      if (!validateEmail(form.officialEmail)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else if (userType === "faculty") {
      if (!form.facultyId || !form.facultyEmail || !form.password || !form.facultyDocs) {
        setError("All fields are required.");
        return;
      }
      if (!validateEmail(form.facultyEmail)) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    alert("Registered successfully! (Dummy)");
    navigate("/");
  };

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem", maxWidth: 500, margin: "2rem auto" }}>
        <Navbar />
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>Register</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24 }}>
          <label>
            <input
              type="radio"
              name="userType"
              value="student"
              checked={userType === "student"}
              onChange={() => setUserType("student")}
            />{" "}
            Student
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="company"
              checked={userType === "company"}
              onChange={() => setUserType("company")}
            />{" "}
            Company
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="faculty"
              checked={userType === "faculty"}
              onChange={() => setUserType("faculty")}
            />{" "}
            Faculty Academic
          </label>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {userType === "student" && (
            <>
              <label>
                Username {requiredIcon}
                <input
                  placeholder="Username"
                  name="username"
                  value={form.username}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Email {requiredIcon}
                <input
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <label>
                Password {requiredIcon}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                Upload CV {requiredIcon}
                <InfoIconWithTooltip
                  message="Please upload your most recent CV in PDF or DOC format."
                />
                <input
                  type="file"
                  name="studentCV"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleChange}
                  style={{ display: "block", marginTop: 4 }}
                />
              </label>
            </>
          )}

          {userType === "company" && (
            <>
              <label>
                Company Name {requiredIcon}
                <input
                  placeholder="Company Name"
                  name="companyName"
                  value={form.companyName}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Industry {requiredIcon}
                <input
                  placeholder="Industry"
                  name="industry"
                  value={form.industry}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Company Size {requiredIcon}
                <select name="size" required value={form.size} onChange={handleChange}>
                  <option value="">Select Company Size</option>
                  <option value="Small">Small (≤ 50 employees)</option>
                  <option value="Medium">Medium (≤ 200 employees)</option>
                  <option value="Large">Large (200+ employees)</option>
                </select>
              </label>
              <label>
                Official Company Email {requiredIcon}
                <input
                  placeholder="Official Company Email"
                  name="officialEmail"
                  value={form.officialEmail}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                Upload Company Logo {requiredIcon}
                <InfoIconWithTooltip
                  message="Please upload your official company logo in PNG or JPG format."
                />
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  required
                  onChange={handleChange}
                  style={{ display: "block", marginTop: 4 }}
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                Upload Legitimacy Documents {requiredIcon}
                <InfoIconWithTooltip
                  message={
                    <div>
                      <b>Company Legitimacy Documents should include:</b>
                      <ul style={{ margin: "8px 0 0 16px" }}>
                        <li>1. Tax documentation</li>
                        <li>2. Business registration certificate</li>
                        <li>3. Proof of address</li>
                        <li>4. Company profile or brochure</li>
                        <li>5. Recent financial statement</li>
                      </ul>
                    </div>
                  }
                />
                <input
                  type="file"
                  name="documents"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  required
                  onChange={handleChange}
                  style={{ display: "block", marginTop: 4 }}
                />
              </label>
            </>
          )}

          {userType === "faculty" && (
            <>
              <label>
                Faculty ID {requiredIcon}
                <input
                  placeholder="Faculty ID"
                  name="facultyId"
                  value={form.facultyId}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Faculty Email {requiredIcon}
                <input
                  placeholder="Faculty Email"
                  name="facultyEmail"
                  value={form.facultyEmail}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <label>
                Password {requiredIcon}
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                Faculty Documentation {requiredIcon}
                <InfoIconWithTooltip
                  message={
                    <div>
                      <b>Faculty Documentation should include:</b>
                      <ul style={{ margin: "8px 0 0 16px" }}>
                        <li>1. Tax documentation</li>
                        <li>2. Proof of academic employment (e.g., university contract)</li>
                        <li>3. Recent CV or resume</li>
                        <li>4. Government-issued ID</li>
                        <li>5. Letter of recommendation or reference</li>
                      </ul>
                    </div>
                  }
                />
                <input
                  type="file"
                  name="facultyDocs"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  required
                  onChange={handleChange}
                  style={{ display: "block", marginTop: 4 }}
                />
              </label>
            </>
          )}

          {error && (
            <div style={{ color: "#d32f2f", background: "#e3f2fd", borderRadius: 8, padding: 8, textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit" style={{ marginTop: 16 }}>Register</button>
        </form>
      </div>
    </div>
  );
}