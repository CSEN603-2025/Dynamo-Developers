import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Red asterisk for required fields
const RequiredAsterisk = () => (
  <span style={{ color: "#e53935", marginLeft: 4, fontWeight: "bold" }}>*</span>
);

// Info icon component (smaller, modern)
function InfoIconWithTooltip({ message }) {
  const [show, setShow] = useState(false);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 11,
          cursor: "pointer",
          marginLeft: 4,
          boxShadow: "0 1px 4px #bbdefb55"
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        tabIndex={0}
        aria-label="Show requirements"
      >
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#1976d2"/>
          <text x="10" y="15" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Arial" fontWeight="bold">i</text>
        </svg>
      </span>
      {show && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#e3f2fd",
            color: "#1976d2",
            border: "1px solid #bbdefb",
            borderRadius: 8,
            padding: 14,
            marginTop: 6,
            fontSize: 15,
            zIndex: 10,
            minWidth: 220,
            maxWidth: 320,
            boxShadow: "0 2px 8px #bbdefb55",
            whiteSpace: "pre-line",
            lineHeight: 1.5,
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

const userTypes = [
  { value: "student", label: "Student" },
  { value: "company", label: "Company" },
  { value: "faculty", label: "Faculty" },
];

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
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

      // Store company application in localStorage
      const companyApplication = {
        id: Date.now(),
        name: form.companyName,
        status: "pending",
        email: form.officialEmail,
        industry: form.industry,
        size: form.size,
        registrationDate: new Date().toISOString().split('T')[0],
        documents: [
          {
            name: "Company Logo",
            type: "image",
            size: form.logo.size + " bytes",
            url: URL.createObjectURL(form.logo),
            downloadName: form.logo.name
          },
          {
            name: "Company Documents",
            type: "pdf",
            size: form.documents.size + " bytes",
            url: URL.createObjectURL(form.documents),
            downloadName: form.documents.name
          }
        ]
      };

      // Get existing applications or initialize empty array
      const existingApplications = JSON.parse(localStorage.getItem('companyApplications') || '[]');
      existingApplications.push(companyApplication);
      localStorage.setItem('companyApplications', JSON.stringify(existingApplications));
      
      // Store company email for status checking
      localStorage.setItem('companyEmail', form.officialEmail);
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

    // After successful registration
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/pending-company');
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)",
        minHeight: "100vh",
        padding: "2rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      }}
    >
      <style>
        {`
          .register-fadein {
            animation: fadeIn 1.2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .register-input, .register-input[type="file"] {
            width: 100%;
            padding: 18px 18px;
            border-radius: 12px;
            border: 1.8px solid #90caf9;
            font-size: 18px;
            outline: none;
            margin-bottom: 14px;
            background: #f7fbff;
            transition: border 0.2s, background 0.2s;
            font-weight: 500;
            box-sizing: border-box;
          }
          .register-input:focus {
            border: 2px solid #1976d2 !important;
            background: #e3f2fd !important;
          }
          .register-btn {
            background: linear-gradient(90deg, #1976d2 60%, #64b5f6 100%);
            color: #fff;
            font-weight: 700;
            font-size: 19px;
            letter-spacing: 0.5px;
            border: none;
            border-radius: 10px;
            padding: 15px 0;
            margin-top: 18px;
            cursor: pointer;
            box-shadow: 0 2px 12px #bbdefb55;
            transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
            text-transform: uppercase;
            display: block;
            width: 100%;
          }
          .register-btn:hover {
            background: linear-gradient(90deg, #1565c0 60%, #42a5f5 100%);
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 4px 16px #90caf9aa;
          }
          .register-title {
            text-align: center;
            margin-bottom: 0;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: 2.2rem;
            line-height: 1.1;
            user-select: none;
            color: #1976d2;
            text-shadow: 0 2px 12px #bbdefb33;
          }
          .register-title-underline {
            display: block;
            width: 80px;
            height: 5px;
            margin: 0.7rem auto 1.2rem auto;
            border-radius: 3px;
            background: linear-gradient(90deg, #1976d2 60%, #f06292 100%);
            box-shadow: 0 2px 8px #bbdefb33;
          }
          .user-type-toggle {
            display: flex;
            justify-content: center;
            gap: 22px;
            margin-bottom: 32px;
          }
          .user-type-btn {
            padding: 12px 36px;
            border-radius: 22px;
            border: 2px solid #90caf9;
            background: #f7fbff;
            color: #1976d2;
            font-weight: 700;
            font-size: 17px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
            outline: none;
            box-shadow: 0 1px 4px #bbdefb33;
            text-transform: capitalize;
          }
          .user-type-btn.selected {
            background: linear-gradient(90deg, #1976d2 60%, #fce4ec 100%);
            color: #fff;
            border: 2px solid #1976d2;
            box-shadow: 0 2px 8px #bbdefb55;
          }
          .register-section {
            background: #f7fbff;
            border-radius: 16px;
            padding: 22px 22px 10px 22px;
            margin-bottom: 22px;
            box-shadow: 0 1px 8px #bbdefb22;
            border: 1.5px solid #e3f2fd;
          }
          .register-section label {
            font-weight: 600;
            margin-bottom: 7px;
            display: block;
            color: #1976d2;
            font-size: 16px;
            letter-spacing: 0.1px;
          }
          .register-upload-label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 0;
            color: #1976d2;
            font-weight: 600;
            font-size: 16px;
          }
          .register-upload-input {
            margin-top: 10px;
            margin-bottom: 10px;
            width: 100%;
          }
        `}
      </style>
      <div
        className="register-fadein"
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: 28,
          boxShadow: "0 8px 40px 0 #90caf9cc",
          padding: "2.7rem 2.2rem 2.2rem 2.2rem",
          maxWidth: 540,
          width: "100%",
          margin: "0 auto",
          backdropFilter: "blur(6px)",
          border: "1.5px solid #e3f2fd",
        }}
      >
        {/* Only one, centered, visually appealing title */}
        <div className="register-title">GUC Internship System</div>
        <span className="register-title-underline"></span>
        {/* User type selection buttons below the title */}
        <div className="user-type-toggle">
          {userTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              className={`user-type-btn${userType === type.value ? " selected" : ""}`}
              onClick={() => setUserType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {userType === "student" && (
            <div className="register-section">
              <label>
                Username <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Username"
                  name="username"
                  value={form.username}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Email <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <label>
                Password <RequiredAsterisk />
                <input
                  className="register-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                />
              </label>
              <div>
                <div className="register-upload-label">
                  Upload CV <RequiredAsterisk />
                  <InfoIconWithTooltip
                    message="Please upload your most recent CV in PDF or DOC format."
                  />
                </div>
                <input
                  type="file"
                  name="studentCV"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleChange}
                  className="register-upload-input"
                />
              </div>
            </div>
          )}

          {userType === "company" && (
            <div className="register-section">
              <label>
                Company Name <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Company Name"
                  name="companyName"
                  value={form.companyName}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Industry <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Industry"
                  name="industry"
                  value={form.industry}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Company Size <RequiredAsterisk />
                <select className="register-input" name="size" required value={form.size} onChange={handleChange}>
                 <option value="" style={{ color: "#888", fontWeight: 400 }} disabled>
  Select Company Size
</option>
                  <option value="Small">Small (≤ 50 employees)</option>
                  <option value="Medium">Medium (≤ 200 employees)</option>
                  <option value="Large">Large (200+ employees)</option>
                </select>
              </label>
              <label>
                Official Company Email <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Official Company Email"
                  name="officialEmail"
                  value={form.officialEmail}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <div>
                <div className="register-upload-label">
                  Upload Company Logo <RequiredAsterisk />
                  <InfoIconWithTooltip
                    message="Please upload your official company logo in PNG or JPG format."
                  />
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  required
                  onChange={handleChange}
                  className="register-upload-input"
                />
              </div>
              <div>
                <div className="register-upload-label">
                  Upload Legitimacy Documents <RequiredAsterisk />
                  <InfoIconWithTooltip
                    message={
                      <div>
                        <b>Company Legitimacy Documents should include:</b>
                        <ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
                          <li>Tax documentation</li>
                          <li>Business registration certificate</li>
                          <li>Proof of address</li>
                          <li>Company profile or brochure</li>
                          <li>Recent financial statement</li>
                        </ul>
                      </div>
                    }
                  />
                </div>
                <input
                  type="file"
                  name="documents"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  required
                  onChange={handleChange}
                  className="register-upload-input"
                />
              </div>
            </div>
          )}

          {userType === "faculty" && (
            <div className="register-section">
              <label>
                Faculty ID <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Faculty ID"
                  name="facultyId"
                  value={form.facultyId}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                Faculty Email <RequiredAsterisk />
                <input
                  className="register-input"
                  placeholder="Faculty Email"
                  name="facultyEmail"
                  value={form.facultyEmail}
                  required
                  onChange={handleChange}
                  type="email"
                />
              </label>
              <label>
                Password <RequiredAsterisk />
                <input
                  className="register-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  required
                  onChange={handleChange}
                />
              </label>
              <div>
                <div className="register-upload-label">
                  Faculty Documentation <RequiredAsterisk />
                  <InfoIconWithTooltip
                    message={
                      <div>
                        <b>Faculty Documentation should include:</b>
                        <ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
                          <li>Tax documentation</li>
                          <li>Proof of academic employment (e.g., university contract)</li>
                          <li>Recent CV or resume</li>
                          <li>Government-issued ID</li>
                          <li>Letter of recommendation or reference</li>
                        </ul>
                      </div>
                    }
                  />
                </div>
                <input
                  type="file"
                  name="facultyDocs"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  required
                  onChange={handleChange}
                  className="register-upload-input"
                />
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: "#d32f2f", background: "#e3f2fd", borderRadius: 8, padding: 8, textAlign: "center", marginBottom: 10 }}>
              {error}
            </div>
          )}

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: '2.5rem 2rem',
            minWidth: 350,
            maxWidth: 480,
            boxShadow: '0 8px 32px #1976d299',
            textAlign: 'center',
          }}>
            <h2 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 18 }}>Registration Successful!</h2>
            <p style={{ fontSize: 18, color: '#222', marginBottom: 18 }}>
              Your application is being reviewed by the SCAD Office. You will be redirected to the Pending Company Dashboard where you can track your application status.<br /><br />
              The SCAD Office will send you an email when your status is updated.
            </p>
            <button
              style={{
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 2.2rem',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/pending-company')}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}