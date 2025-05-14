import Navbar from "../components/Navbar";
import { useState } from "react";

export default function SCADOfficeDashboard() {
  // Dummy data for companies applying
  const [companyApplications, setCompanyApplications] = useState([
    { id: 1, name: "TechCorp", status: "pending", email: "hr@techcorp.com" },
    { id: 2, name: "EduSoft", status: "pending", email: "contact@edusoft.com" },
  ]);
  const [internshipCycle, setInternshipCycle] = useState({
    start: "2025-06-01",
    end: "2025-09-01",
  });
  const [students] = useState([
    { id: 1, name: "Alice", major: "CS" },
    { id: 2, name: "Bob", major: "IT" },
    { id: 3, name: "Charlie", major: "CS" },
  ]);
  const [companies] = useState([
    { id: 1, name: "TechCorp" },
    { id: 2, name: "EduSoft" },
    { id: 3, name: "BizSoft" },
  ]);
  const [internships] = useState([
    { id: 1, title: "Frontend Intern", company: "TechCorp", status: "open" },
    { id: 2, title: "Backend Intern", company: "EduSoft", status: "open" },
    { id: 3, title: "Marketing Intern", company: "BizSoft", status: "closed" },
  ]);
  const [reports, setReports] = useState([
    { id: 1, student: "Alice", status: "pending" },
    { id: 2, student: "Bob", status: "flagged" },
    { id: 3, student: "Charlie", status: "accepted" },
    { id: 4, student: "Alice", status: "rejected" },
  ]);
  const [notifications] = useState([
    { id: 1, message: "New company application from TechCorp" },
  ]);
  const [clarifications, setClarifications] = useState([
    { id: 1, reportId: 2, message: "Why was this report flagged?" },
  ]);
  const [clarificationInput, setClarificationInput] = useState("");
  const [clarificationReportId, setClarificationReportId] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [internshipSearch, setInternshipSearch] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");

  // Statistics
  const statistics = {
    totalReports: reports.length,
    accepted: reports.filter((r) => r.status === "accepted").length,
    rejected: reports.filter((r) => r.status === "rejected").length,
    flagged: reports.filter((r) => r.status === "flagged").length,
    pending: reports.filter((r) => r.status === "pending").length,
    topCompany: "TechCorp",
    topMajor: "CS",
  };

  // Handlers
  const handleCompanyDecision = (id, decision) => {
    setCompanyApplications((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: decision } : c))
    );
    alert(`Company ${decision}`);
  };
  const handleCycleChange = (e) => {
    const { name, value } = e.target;
    setInternshipCycle((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddClarification = () => {
    if (clarificationReportId && clarificationInput) {
      setClarifications((prev) => [
        ...prev,
        { id: prev.length + 1, reportId: Number(clarificationReportId), message: clarificationInput },
      ]);
      setClarificationInput("");
      setClarificationReportId("");
      alert("Clarification submitted");
    }
  };
  const handleDownloadReport = () => {
    alert("Dummy PDF report downloaded!");
  };

  // Filters
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(companySearch.toLowerCase())
  );
  const filteredInternships = internships.filter((i) =>
    i.title.toLowerCase().includes(internshipSearch.toLowerCase())
  );
  const filteredReports = reports.filter((r) =>
    reportStatusFilter ? r.status === reportStatusFilter : true
  );

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem" }}>
        <Navbar />
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>SCAD Office Dashboard</h2>
        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Company Applications */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Company Applications</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {companyApplications.map((c) => (
                <div key={c.id} style={{ background: "#fff", border: "1px solid #bbdefb", borderRadius: 8, padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>
                    <b>{c.name}</b> ({c.email}) - Status: {c.status}
                  </span>
                  {c.status === "pending" && (
                    <span>
                      <button onClick={() => handleCompanyDecision(c.id, "accepted")}>Accept</button>
                      <button onClick={() => handleCompanyDecision(c.id, "rejected")}>Reject</button>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Internship Cycle */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Internship Cycle</h3>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <label>Start: <input type="date" name="start" value={internshipCycle.start} onChange={handleCycleChange} /></label>
              <label>End: <input type="date" name="end" value={internshipCycle.end} onChange={handleCycleChange} /></label>
            </div>
          </section>

          {/* Students, Companies, Internships */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>All Students</h3>
            <input placeholder="Search students" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
            <ul>{filteredStudents.map((s) => <li key={s.id}>{s.name} ({s.major})</li>)}</ul>
            <h3 style={{ color: "#1976d2" }}>All Companies</h3>
            <input placeholder="Search companies" value={companySearch} onChange={e => setCompanySearch(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
            <ul>{filteredCompanies.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
            <h3 style={{ color: "#1976d2" }}>All Internships</h3>
            <input placeholder="Search internships" value={internshipSearch} onChange={e => setInternshipSearch(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
            <ul>{filteredInternships.map((i) => <li key={i.id}>{i.title} at {i.company} ({i.status})</li>)}</ul>
          </section>

          {/* Reports */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Reports</h3>
            <label>Filter by status: </label>
            <select value={reportStatusFilter} onChange={e => setReportStatusFilter(e.target.value)}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
            <ul>{filteredReports.map((r) => <li key={r.id}>Report #{r.id}: {r.student} - Status: {r.status}</li>)}</ul>
            <button onClick={handleDownloadReport}>Download PDF Report</button>
          </section>

          {/* Real-time Statistics */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Real-time Statistics</h3>
            <ul>
              <li>Total Reports: {statistics.totalReports}</li>
              <li>Accepted: {statistics.accepted}</li>
              <li>Rejected: {statistics.rejected}</li>
              <li>Flagged: {statistics.flagged}</li>
              <li>Pending: {statistics.pending}</li>
              <li>Top Company: {statistics.topCompany}</li>
              <li>Top Major: {statistics.topMajor}</li>
            </ul>
          </section>

          {/* Notifications */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Notifications</h3>
            <ul>{notifications.map((n) => <li key={n.id}>{n.message}</li>)}</ul>
          </section>

          {/* Clarifications */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Clarifications</h3>
            <ul>{clarifications.map((c) => <li key={c.id}>Report #{c.reportId}: {c.message}</li>)}</ul>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                placeholder="Report ID"
                value={clarificationReportId}
                onChange={e => setClarificationReportId(e.target.value)}
                style={{ width: 80 }}
              />
              <input
                placeholder="Clarification message"
                value={clarificationInput}
                onChange={e => setClarificationInput(e.target.value)}
                style={{ width: 200 }}
              />
              <button onClick={handleAddClarification}>Submit Clarification</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}