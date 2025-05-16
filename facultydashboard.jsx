import { useState } from "react";
import jsPDF from "jspdf";
import { FaChartBar, FaFileAlt, FaCalendarAlt, FaUsers, FaBuilding, FaVideo, FaSearch } from 'react-icons/fa';

const STATUS_COLORS = {
  accepted: { bg: "#e8f5e9", color: "#2e7d32" },
  flagged: { bg: "#fff8e1", color: "#ff9800" },
  rejected: { bg: "#ffebee", color: "#c62828" },
  pending: { bg: "#e3f2fd", color: "#1976d2" },
};

export default function FacultyDashboard() {
  // Dummy data for reports
  const [reports, setReports] = useState([
    { id: 1, student: "Alice", company: "TechCorp", status: "pending", details: "Frontend project" },
    { id: 2, student: "Bob", company: "EduSoft", status: "flagged", details: "Backend API" },
    { id: 3, student: "Charlie", company: "BizSoft", status: "accepted", details: "Marketing campaign" },
    { id: 4, student: "Alice", company: "BizSoft", status: "rejected", details: "Content writing" },
  ]);
  // Store clarifications as an object for quick lookup
  const [clarifications, setClarifications] = useState({}); // { [reportId]: comment }
  const [clarificationModal, setClarificationModal] = useState({ open: false, reportId: null, comment: "" });
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const [reportMajorFilter, setReportMajorFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // Get unique majors from reports (dummy majors for now)
  const majors = ["", ...Array.from(new Set(reports.map(r => r.major || "Engineering")))]

  // Handler to set report status
  const handleSetStatus = (id, status) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    alert(`Report #${id} set to ${status}`);
  };

  // Filtered reports
  const filteredReports = reports.filter((r) =>
    (reportStatusFilter ? r.status === reportStatusFilter : true) &&
    (reportMajorFilter ? (r.major || "Engineering") === reportMajorFilter : true)
  );

  // PDF generation for reports
  const generateReportPDF = (report) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    pdf.setFontSize(16);
    pdf.setTextColor(25, 118, 210);
    pdf.text("Internship Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Student: ${report.student}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Company: ${report.company}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Status: ${report.status}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Details: ${report.details}`, margin, yPosition);
    yPosition += 10;

    return pdf;
  };

  const handleReportDownload = (report) => {
    try {
      const pdf = generateReportPDF(report);
      pdf.save(`${report.student}-${report.company}-report.pdf`);
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    }
  };

  // Dummy data for evaluation reports
  const [evaluations] = useState([
    {
      id: 1,
      student: "Alice",
      company: "TechCorp",
      supervisor: "Dr. Smith",
      startDate: "2024-01-10",
      endDate: "2024-04-10",
      status: "completed",
      details: "Excellent performance, strong technical skills."
    },
    {
      id: 2,
      student: "Bob",
      company: "EduSoft",
      supervisor: "Ms. Johnson",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      status: "completed",
      details: "Good teamwork, needs improvement in documentation."
    }
  ]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  // PDF generation for evaluation reports
  const generateEvaluationPDF = (evaluation) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    pdf.setFontSize(16);
    pdf.setTextColor(25, 118, 210);
    pdf.text("Internship Evaluation Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Student: ${evaluation.student}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Company: ${evaluation.company}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Supervisor: ${evaluation.supervisor}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Start Date: ${evaluation.startDate}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`End Date: ${evaluation.endDate}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Status: ${evaluation.status}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Details: ${evaluation.details}`, margin, yPosition);
    yPosition += 10;

    return pdf;
  };

  const handleEvaluationDownload = (evaluation) => {
    try {
      const pdf = generateEvaluationPDF(evaluation);
      pdf.save(`${evaluation.student}-${evaluation.company}-evaluation.pdf`);
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    }
  };

  // Dummy statistics data
  const stats = {
    reportCounts: { accepted: 5, rejected: 2, flagged: 1, pending: 3 },
    averageReviewTime: 6, // days
    mostUsedCourses: ["Software Engineering", "Data Structures", "Databases"],
    topRatedCompanies: [
      { name: "TechCorp", rating: 4.8 },
      { name: "EduSoft", rating: 4.6 },
      { name: "BizSoft", rating: 4.5 }
    ],
    topCompaniesByCount: [
      { name: "TechCorp", count: 12 },
      { name: "EduSoft", count: 9 },
      { name: "BizSoft", count: 7 }
    ]
  };

  // Function to generate statistics PDF
  const generateStatisticsPDF = () => {
    const pdf = new jsPDF();
    let y = 20;
    pdf.setFontSize(18);
    pdf.setTextColor(25, 118, 210);
    pdf.text('Internship Statistics Report', 20, y);
    y += 12;
    pdf.setFontSize(12);
    pdf.setTextColor(0,0,0);
    pdf.text('Report Status Counts:', 20, y);
    y += 8;
    pdf.text(`Accepted: ${stats.reportCounts.accepted}`, 30, y);
    y += 7;
    pdf.text(`Rejected: ${stats.reportCounts.rejected}`, 30, y);
    y += 7;
    pdf.text(`Flagged: ${stats.reportCounts.flagged}`, 30, y);
    y += 7;
    pdf.text(`Pending: ${stats.reportCounts.pending}`, 30, y);
    y += 10;
    pdf.text(`Average Review Time: ${stats.averageReviewTime} days`, 20, y);
    y += 10;
    pdf.text('Most Used Courses:', 20, y);
    y += 8;
    stats.mostUsedCourses.forEach((course) => {
      pdf.text(`• ${course}`, 30, y);
      y += 7;
    });
    y += 3;
    pdf.text('Top Rated Companies:', 20, y);
    y += 8;
    stats.topRatedCompanies.forEach((c) => {
      pdf.text(`• ${c.name} (★ ${c.rating})`, 30, y);
      y += 7;
    });
    y += 3;
    pdf.text('Top Companies by Internship Count:', 20, y);
    y += 8;
    stats.topCompaniesByCount.forEach((c) => {
      pdf.text(`• ${c.name} (${c.count})`, 30, y);
      y += 7;
    });
    pdf.save('internship-statistics-report.pdf');
  };

  // Add global style for font and background
  <style>{`
    body {
      font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
      background: #f3f4f6;
      color: #222;
    }
  `}</style>

  // Add styles object for consistent layout
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: '#f3f4f6',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
    },
    sidebar: {
      width: '260px',
      background: '#fff',
      borderRight: '2px solid #e0e0e0',
      padding: '1.5rem 1rem 1.5rem 1.5rem',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      boxShadow: '2px 0 8px #e0e0e033',
      zIndex: 100,
    },
    mainContent: {
      flex: 1,
      marginLeft: '260px',
      padding: '2.5rem 2.5rem 2.5rem 2.5rem',
      background: '#f3f4f6',
      minHeight: '100vh',
    },
    card: {
      background: '#fff',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px #e0e0e055',
      border: '1.5px solid #e0e0e0',
    },
    button: {
      background: '#1976d2',
      color: 'white',
      padding: '0.5rem 1.2rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 16,
      transition: 'background 0.2s',
      boxShadow: '0 2px 8px #1976d211',
    },
    buttonSecondary: {
      background: '#9e9e9e',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 600,
      padding: '0.5rem 1rem',
    },
    heading: {
      color: '#1976d2',
      fontWeight: 900,
      letterSpacing: 1,
      marginBottom: '1rem',
    },
    navItem: {
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    activeNavItem: {
      background: '#e3f2fd',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      background: '#f3f4f6',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      width: '100%',
      boxShadow: '0 1px 2px #e0e0e022',
      border: '1.5px solid #e0e0e0',
    },
  };

  // Add state for active section
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { id: 'reports', label: 'Reports', icon: <FaFileAlt /> },
    { id: 'evaluations', label: 'Evaluations', icon: <FaChartBar /> },
    { id: 'statistics', label: 'Statistics', icon: <FaChartBar /> },
  ];

  return (
    <div style={styles.container}>
      {/* Logout Button */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 32,
        zIndex: 4000
      }}>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          style={{
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 20,
            padding: '0.6rem 1.6rem',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 8px #0001',
            cursor: 'pointer',
            letterSpacing: 1,
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#125ea2'}
          onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
        >
          Logout
        </button>
      </div>
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#1976d2', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 900, letterSpacing: 1 }}>Faculty Dashboard</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div style={{ ...styles.searchBar, width: '100%' }}>
              <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
        <nav>
          {navItems.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                ...styles.navItem,
                ...(activeSection === item.id ? styles.activeNavItem : {}),
                color: '#1976d2',
                fontWeight: activeSection === item.id ? 700 : 500,
                fontSize: 17,
                borderRadius: 8,
                marginBottom: '0.5rem',
              }}
              onClick={() => setActiveSection(item.id)}
              onMouseOver={e => e.currentTarget.style.background = '#e3f2fd'}
              onMouseOut={e => e.currentTarget.style.background = activeSection === item.id ? '#e3f2fd' : '#fff'}
            >
              {item.icon}
              <span style={{ marginLeft: '0.75rem' }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeSection === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ ...styles.card, flex: 1, textAlign: 'center' }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Total Reports</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{reports.length}</div>
              </div>
              <div style={{ ...styles.card, flex: 1, textAlign: 'center' }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Total Evaluations</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{evaluations.length}</div>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'reports' && (
          <div style={{ display: "grid", gap: "2rem" }}>
            {/* Reports Section */}
            <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#1976d2" }}>Internship Reports</h3>
              <div style={{ marginBottom: 12, display: 'flex', gap: 16, alignItems: 'center' }}>
                <label>Filter by status: </label>
                <select value={reportStatusFilter} onChange={e => setReportStatusFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
                <label>Filter by major: </label>
                <select value={reportMajorFilter} onChange={e => setReportMajorFilter(e.target.value)}>
                  <option value="">All</option>
                  {majors.filter(m => m).map((major, idx) => (
                    <option key={idx} value={major}>{major}</option>
                  ))}
                </select>
              </div>
              <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1.5fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student</div>
                  <div>Company</div>
                  <div>Status</div>
                  <div>Details</div>
                  <div>Actions</div>
                  <div>Clarification</div>
                  <div>Download</div>
                </div>
                {filteredReports.map((r, idx) => {
                  const statusColor = STATUS_COLORS[r.status] || STATUS_COLORS.pending;
                  return (
                    <div key={r.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1.5fr 1.5fr 1.5fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div>{r.student}</div>
                      <div>{r.company}</div>
                      <div>
                        <span style={{
                          background: statusColor.bg,
                          color: statusColor.color,
                          padding: '0.3rem 0.7rem',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          boxShadow: r.status !== 'pending' ? '0 0 6px 1px #1976d255' : undefined
                        }}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                      </div>
                      <div>{r.details}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['accepted', 'rejected', 'flagged'].map(option => (
                          <button
                            key={option}
                            onClick={() => handleSetStatus(r.id, option)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              borderRadius: 4,
                              border: r.status === option ? 'none' : '1px solid #bbb',
                              background: r.status === option ? STATUS_COLORS[option].color : 'white',
                              color: r.status === option ? 'white' : STATUS_COLORS[option].color,
                              fontWeight: r.status === option ? 700 : 500,
                              boxShadow: r.status === option ? '0 0 8px 1px #1976d255' : undefined,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </button>
                        ))}
                        <button
                          onClick={() => setSelectedReport(r)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#e3f2fd',
                            color: '#1976d2',
                            border: '1px solid #1976d2',
                            borderRadius: 4,
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          View Full
                        </button>
                      </div>
                      <div>
                        {(r.status === 'flagged' || r.status === 'rejected') && (
                          <>
                            <button
                              style={{
                                padding: '0.4rem 0.8rem',
                                background: '#FFC107',
                                color: '#222',
                                border: 'none',
                                borderRadius: 4,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                boxShadow: clarifications[r.id] ? '0 0 8px 1px #ffb30055' : undefined
                              }}
                              onClick={() => setClarificationModal({ open: true, reportId: r.id, comment: clarifications[r.id] || '' })}
                            >
                              {clarifications[r.id] ? 'Edit Clarification' : 'Add Clarification'}
                            </button>
                            {clarifications[r.id] && (
                              <div style={{ marginTop: 4, color: '#666', fontSize: '0.85rem' }}>
                                <b>Comment:</b> {clarifications[r.id]}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div>
                        <button
                          style={{
                            background: '#1976d2',
                            color: 'white',
                            borderRadius: 4,
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            width: '100%'
                          }}
                          onClick={() => handleReportDownload(r)}
                        >
                          Download as PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Evaluation Reports Section */}
        {activeSection === 'evaluations' && (
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24, marginTop: 32 }}>
            <h3 style={{ color: "#1976d2" }}>Evaluation Reports</h3>
            <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1.5fr',
                padding: '1rem',
                background: '#f5f5f5',
                borderBottom: '1px solid #e0e0e0',
                fontWeight: 'bold',
                color: '#1976d2'
              }}>
                <div>Student</div>
                <div>Company</div>
                <div>Supervisor</div>
                <div>Start Date</div>
                <div>End Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {evaluations.map((e, idx) => (
                <div key={e.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1.5fr',
                  padding: '1rem',
                  borderBottom: '1px solid #e0e0e0',
                  alignItems: 'center',
                  background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                }}>
                  <div>{e.student}</div>
                  <div>{e.company}</div>
                  <div>{e.supervisor}</div>
                  <div>{e.startDate}</div>
                  <div>{e.endDate}</div>
                  <div><span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.3rem 0.7rem', borderRadius: 6, fontWeight: 600 }}>{e.status.charAt(0).toUpperCase() + e.status.slice(1)}</span></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setSelectedEvaluation(e)}
                      style={{ padding: '0.4rem 0.8rem', background: '#e3f2fd', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
                    >
                      View Full
                    </button>
                    <button
                      onClick={() => handleEvaluationDownload(e)}
                      style={{ background: '#1976d2', color: 'white', borderRadius: 4, border: 'none', padding: '0.4rem 0.8rem' }}
                    >
                      Download as PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Statistics Section */}
        {activeSection === 'statistics' && (
          <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24, marginTop: 32 }}>
            <h3 style={{ color: "#1976d2", marginBottom: 24 }}>Real-Time Statistics</h3>
            <button
              onClick={generateStatisticsPDF}
              style={{ marginBottom: 24, background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
            >
              Generate Report
            </button>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
              {/* Report Status Cards */}
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 180, boxShadow: '0 2px 8px #1976d222', textAlign: 'center' }}>
                <div style={{ color: '#2e7d32', fontWeight: 700, fontSize: 18 }}>Accepted</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.reportCounts.accepted}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 180, boxShadow: '0 2px 8px #1976d222', textAlign: 'center' }}>
                <div style={{ color: '#c62828', fontWeight: 700, fontSize: 18 }}>Rejected</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.reportCounts.rejected}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 180, boxShadow: '0 2px 8px #1976d222', textAlign: 'center' }}>
                <div style={{ color: '#ff9800', fontWeight: 700, fontSize: 18 }}>Flagged</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.reportCounts.flagged}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 180, boxShadow: '0 2px 8px #1976d222', textAlign: 'center' }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Pending</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.reportCounts.pending}</div>
              </div>
              {/* Average Review Time */}
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 220, boxShadow: '0 2px 8px #1976d222', textAlign: 'center' }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Avg. Review Time</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{stats.averageReviewTime} <span style={{ fontSize: 18 }}>days</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {/* Most Used Courses */}
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 260, boxShadow: '0 2px 8px #1976d222', flex: 1 }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Most Used Courses</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {stats.mostUsedCourses.map((course, idx) => (
                    <li key={idx} style={{ fontSize: 16 }}>{course}</li>
                  ))}
                </ul>
              </div>
              {/* Top Rated Companies */}
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 260, boxShadow: '0 2px 8px #1976d222', flex: 1 }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Top Rated Companies</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {stats.topRatedCompanies.map((c, idx) => (
                    <li key={idx} style={{ fontSize: 16 }}>{c.name} <span style={{ color: '#ffb300', fontWeight: 600 }}>★ {c.rating}</span></li>
                  ))}
                </ul>
              </div>
              {/* Top Companies by Internship Count */}
              <div style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 260, boxShadow: '0 2px 8px #1976d222', flex: 1 }}>
                <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Top Companies by Internship Count</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {stats.topCompaniesByCount.map((c, idx) => (
                    <li key={idx} style={{ fontSize: 16 }}>{c.name} <span style={{ color: '#1976d2', fontWeight: 600 }}>({c.count})</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Clarification Modal */}
        {clarificationModal.open && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 8px 32px #1976d299'
            }}>
              <h3 style={{ color: '#1976d2' }}>Submit Clarification</h3>
              <textarea
                value={clarificationModal.comment}
                onChange={e => setClarificationModal({ ...clarificationModal, comment: e.target.value })}
                rows={4}
                style={{ width: '100%', borderRadius: 6, border: '1px solid #bbb', padding: 8, marginBottom: 16 }}
                placeholder="Enter your clarification comment..."
              />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setClarificationModal({ open: false, reportId: null, comment: '' })}
                  style={{ padding: '0.5rem 1rem', background: '#bbb', color: '#fff', border: 'none', borderRadius: 4 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setClarifications(prev => ({ ...prev, [clarificationModal.reportId]: clarificationModal.comment }));
                    setClarificationModal({ open: false, reportId: null, comment: '' });
                  }}
                  style={{ padding: '0.5rem 1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

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
            <div style={{ marginBottom: 16 }}>
              <p><b>Student:</b> {selectedReport.student}</p>
              <p><b>Company:</b> {selectedReport.company}</p>
              <p><b>Status:</b> {selectedReport.status}</p>
              <p><b>Details:</b> {selectedReport.details}</p>
              {/* Placeholder for more fields */}
              {selectedReport.submissionDate && (
                <p><b>Submission Date:</b> {selectedReport.submissionDate}</p>
              )}
              {selectedReport.sections && (
                <div style={{ marginTop: 8 }}>
                  <b>Sections:</b>
                  <ul>
                    {selectedReport.sections.map((section, idx) => (
                      <li key={idx}>{section}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => setSelectedReport(null)}>Close</button>
              <button style={{ background: "#1976d2", color: "white", borderRadius: 4, border: "none", padding: "0.4rem 0.8rem" }} onClick={() => handleReportDownload(selectedReport)}>Download as PDF</button>
            </div>
          </section>
        )}

        {/* Evaluation Modal */}
        {selectedEvaluation && (
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
            <h3 style={{ color: "#1976d2" }}>Evaluation Report Details</h3>
            <div style={{ marginBottom: 16 }}>
              <p><b>Student:</b> {selectedEvaluation.student}</p>
              <p><b>Company:</b> {selectedEvaluation.company}</p>
              <p><b>Supervisor:</b> {selectedEvaluation.supervisor}</p>
              <p><b>Start Date:</b> {selectedEvaluation.startDate}</p>
              <p><b>End Date:</b> {selectedEvaluation.endDate}</p>
              <p><b>Status:</b> {selectedEvaluation.status}</p>
              <p><b>Details:</b> {selectedEvaluation.details}</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => setSelectedEvaluation(null)}>Close</button>
              <button style={{ background: "#1976d2", color: "white", borderRadius: 4, border: "none", padding: "0.4rem 0.8rem" }} onClick={() => handleEvaluationDownload(selectedEvaluation)}>Download as PDF</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}