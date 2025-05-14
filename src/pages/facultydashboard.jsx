import Navbar from "../components/Navbar";
import { useState } from "react";

export default function FacultyDashboard() {
  // Dummy data for reports
  const [reports, setReports] = useState([
    { id: 1, student: "Alice", company: "TechCorp", status: "pending", details: "Frontend project" },
    { id: 2, student: "Bob", company: "EduSoft", status: "flagged", details: "Backend API" },
    { id: 3, student: "Charlie", company: "BizSoft", status: "accepted", details: "Marketing campaign" },
    { id: 4, student: "Alice", company: "BizSoft", status: "rejected", details: "Content writing" },
  ]);
  // Dummy data for clarifications/comments
  const [clarifications, setClarifications] = useState([
    { id: 1, reportId: 2, message: "Why was this report flagged?" },
  ]);
  const [clarificationInput, setClarificationInput] = useState("");
  const [clarificationReportId, setClarificationReportId] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // Handler to set report status
  const handleSetStatus = (id, status) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    alert(`Report #${id} set to ${status}`);
  };

  // Handler for adding clarifications
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

  // Filtered reports
  const filteredReports = reports.filter((r) =>
    reportStatusFilter ? r.status === reportStatusFilter : true
  );

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem" }}>
        <Navbar />
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>Faculty Dashboard</h2>
        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Reports Section */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Internship Reports</h3>
            <div style={{ marginBottom: 12 }}>
              <label>Filter by status: </label>
              <select value={reportStatusFilter} onChange={e => setReportStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>
            <div className="internship-list">
              {filteredReports.map((r) => (
                <div
                  key={r.id}
                  className="application-card"
                  style={{
                    background: "#fff",
                    border: "1px solid #bbdefb",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                  }}
                >
                  <p>
                    <b>Report #{r.id}:</b> {r.student} at {r.company} - <b>Status:</b> {r.status}
                  </p>
                  <p>
                    <b>Details:</b> {r.details}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => handleSetStatus(r.id, "flagged")}>Flag</button>
                    <button onClick={() => handleSetStatus(r.id, "rejected")}>Reject</button>
                    <button onClick={() => handleSetStatus(r.id, "accepted")}>Accept</button>
                    <button onClick={() => setSelectedReport(r)}>View Full</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clarifications Section */}
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#1976d2" }}>Clarifications/Comments</h3>
            <ul>
              {clarifications.map((c) => (
                <li key={c.id}>Report #{c.reportId}: {c.message}</li>
              ))}
            </ul>
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

          {/* Full Report Modal */}
          {selectedReport && (
            <section
              style={{
                background: "#fff",
                border: "2px solid #1976d2",
                borderRadius: 12,
                padding: 24,
                position: "fixed",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                minWidth: 320,
                maxWidth: 500,
                boxShadow: "0 8px 32px #1976d299",
              }}
            >
              <h3 style={{ color: "#1976d2" }}>Full Report Details</h3>
              <p>
                <b>Student:</b> {selectedReport.student}
                <br />
                <b>Company:</b> {selectedReport.company}
                <br />
                <b>Status:</b> {selectedReport.status}
                <br />
                <b>Details:</b> {selectedReport.details}
              </p>
              <button onClick={() => setSelectedReport(null)}>Close</button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}