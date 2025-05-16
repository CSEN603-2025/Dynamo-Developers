import { useState } from "react";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  // — Internships state —
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Google",
      industry: "Tech",
      duration: "3 months",
      pay: "$1500/month",
      description: "Work on UI with React and JavaScript",
      applied: false,
      status: "Pending",
      documents: [],
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "Amazon",
      industry: "E-commerce",
      duration: "6 months",
      pay: "$1800/month",
      description: "Build REST APIs and manage databases",
      applied: false,
      status: "Pending",
      documents: [],
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Facebook",
      industry: "Tech",
      duration: "4 months",
      pay: "$1700/month",
      description: "Analyze big data using Python and SQL",
      applied: false,
      status: "Pending",
      documents: [],
    },
  ]);

  // — Past & Current Internships —
  const [pastAndCurrentInternships] = useState([
    {
      id: 4,
      title: "Marketing Intern",
      company: "Apple",
      industry: "Marketing",
      duration: "3 months",
      pay: "Unpaid",
      description: "Assist with online marketing strategies",
      status: "Completed",
      monthCompleted: "June 2022",
    },
    {
      id: 5,
      title: "Product Management Intern",
      company: "Tesla",
      industry: "Automotive",
      duration: "5 months",
      pay: "$2000/month",
      description: "Help in planning and developing features",
      status: "Completed",
      monthCompleted: "August 2021",
    },
    {
      id: 6,
      title: "Software Engineering Intern",
      company: "Microsoft",
      industry: "Tech",
      duration: "6 months",
      pay: "$2500/month",
      description: "Work on product features and testing",
      status: "Current Intern",
      monthCompleted: "",
    },
    {
      id: 7,
      title: "Content Writing Intern",
      company: "Red Bull",
      industry: "Media",
      duration: "2 months",
      pay: "Unpaid",
      description: "Assist with writing articles",
      status: "Current Intern",
      monthCompleted: "",
    },
  ]);

  // — Filters for All Internships —
  const [allSearch, setAllSearch] = useState("");
  const [allIndustry, setAllIndustry] = useState("");
  const [allDuration, setAllDuration] = useState("");
  const [allPay, setAllPay] = useState("");

  // — Filters for Past & Current —
  const [pastSearch, setPastSearch] = useState("");
  const [pastStatus, setPastStatus] = useState("");
  const [pastDate, setPastDate] = useState("");

  // — Selection & uploads —
  const [selected, setSelected] = useState(null);
  const [document, setDocument] = useState(null);

  // — Applied internships —
  const [applied, setApplied] = useState([]);

  // — Evaluations —
  const [evaluations, setEvaluations] = useState({});
  const [evalModal, setEvalModal] = useState({
    open: false,
    id: null,
    text: "",
    recommended: false,
  });

  // — Reports & review status —
  const [reports, setReports] = useState({});
  const [reportModal, setReportModal] = useState({
    open: false,
    id: null,
    file: null,
    courses: [],
    finalized: false,
  });

  // — Notifications & Appeals —
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Next cycle starts on June 1, 2025", type: "cycle" },
    { id: 2, message: "Cycle begins in 7 days", type: "cycle" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const addNotification = (message, type, jobId = null) => {
    setNotifications((n) => [...n, { id: Date.now(), message, type, jobId }]);
  };
  const [appealModal, setAppealModal] = useState({
    open: false,
    jobId: null,
    message: "",
  });

  // — Video: Which internships count? —
  const [showVideo, setShowVideo] = useState(false);
  const major = localStorage.getItem("major") || "Computer Science";
  const videoMap = {
    "Computer Science": "https://www.youtube.com/embed/4sSKhRkAGPU",
    Business: "https://www.youtube.com/embed/yLvKsegh8vM",
    "Electrical Engineering": "https://www.youtube.com/embed/BTRtA7kP_Uw",
  };
  const videoUrl = videoMap[major] || videoMap["Computer Science"];

  // — Suggested companies —
  const suggestedCompanies = [
    {
      id: 1,
      name: "Google",
      industry: "Tech",
      reason: "Fits your front-end interest",
    },
    {
      id: 2,
      name: "Amazon",
      industry: "E-commerce",
      reason: "Popular with interns",
    },
    {
      id: 3,
      name: "Tesla",
      industry: "Automotive",
      reason: "Highly recommended",
    },
  ];

  // — Courses checklist based on major —
  const courseMap = {
    "Computer Science": [
      "Algorithms",
      "Data Structures",
      "Web Dev",
      "Databases",
    ],
    Business: ["Marketing 101", "Finance", "Management"],
    "Electrical Engineering": ["Circuits", "Signals", "Control"],
  };
  const courses = courseMap[major] || [];

  // — Filtered lists —
  const allFiltered = internships
    .filter(
      (i) =>
        i.title.toLowerCase().includes(allSearch.toLowerCase()) ||
        i.company.toLowerCase().includes(allSearch.toLowerCase())
    )
    .filter(
      (i) =>
        (allIndustry ? i.industry === allIndustry : true) &&
        (allDuration ? i.duration === allDuration : true) &&
        (allPay ? i.pay === allPay : true)
    );

  const pastFiltered = pastAndCurrentInternships
    .filter(
      (i) =>
        i.title.toLowerCase().includes(pastSearch.toLowerCase()) ||
        i.company.toLowerCase().includes(pastSearch.toLowerCase())
    )
    .filter(
      (i) =>
        (pastStatus ? i.status === pastStatus : true) &&
        (pastDate ? i.monthCompleted.includes(pastDate) : true)
    );

  // — Handlers —
  const handleView = (id) =>
    setSelected(
      [...internships, ...pastAndCurrentInternships].find((i) => i.id === id)
    );
  const handleApply = (id) => {
    setInternships((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, applied: true, status: "Pending" } : i
      )
    );
    setApplied((prev) => [...prev, internships.find((i) => i.id === id)]);
    setSelected(null);
  };
  const handleUpload = (e) => setDocument(e.target.files[0]);
  const handleSubmitDocs = () => {
    if (!document) return alert("Upload a document.");
    setInternships((prev) =>
      prev.map((i) =>
        i.id === selected.id
          ? { ...i, documents: [...i.documents, document] }
          : i
      )
    );
    alert("Uploaded!");
  };

  const openEval = (jobId) =>
    setEvalModal({
      open: true,
      id: jobId,
      text: evaluations[jobId]?.text || "",
      recommended: evaluations[jobId]?.recommended || false,
    });
  const saveEval = () => {
    setEvaluations((prev) => ({
      ...prev,
      [evalModal.id]: {
        text: evalModal.text,
        recommended: evalModal.recommended,
      },
    }));
    setEvalModal({ open: false, id: null, text: "", recommended: false });
  };
  const deleteEval = (jobId) => {
    setEvaluations((prev) => {
      const c = { ...prev };
      delete c[jobId];
      return c;
    });
  };

  const openReport = (jobId) => {
    const ex = reports[jobId] || {};
    setReportModal({
      open: true,
      id: jobId,
      file: ex.file || null,
      courses: ex.courses || [],
      finalized: ex.finalized || false,
    });
  };
  const toggleCourse = (course) => {
    setReportModal((prev) => {
      const has = prev.courses.includes(course);
      return {
        ...prev,
        courses: has
          ? prev.courses.filter((c) => c !== course)
          : [...prev.courses, course],
      };
    });
  };
  const saveReport = (finalized) => {
    if (!reportModal.file) return alert("Upload a file.");
    setReports((prev) => ({
      ...prev,
      [reportModal.id]: {
        name: reportModal.file.name,
        file: reportModal.file,
        courses: reportModal.courses,
        finalized,
        reviewStatus: prev[reportModal.id]?.reviewStatus || "Pending",
        reviewComment: prev[reportModal.id]?.reviewComment || "",
      },
    }));
    setReportModal({
      open: false,
      id: null,
      file: null,
      courses: [],
      finalized: false,
    });
  };
  const deleteReport = (jobId) =>
    setReports((prev) => {
      const c = { ...prev };
      delete c[jobId];
      return c;
    });

  const checkReportStatus = (jobId) => {
    const accepted = Math.random() > 0.5;
    if (accepted) {
      setReports((prev) => ({
        ...prev,
        [jobId]: {
          ...prev[jobId],
          reviewStatus: "Accepted",
          reviewComment: "",
        },
      }));
      addNotification(`Report #${jobId} accepted.`, "report-accepted", jobId);
    } else {
      const comment = "Please add more detail to your data section.";
      setReports((prev) => ({
        ...prev,
        [jobId]: {
          ...prev[jobId],
          reviewStatus: "Rejected",
          reviewComment: comment,
        },
      }));
      addNotification(`Report #${jobId} rejected.`, "report-rejected", jobId);
    }
  };
  const viewComment = (jobId) =>
    alert(reports[jobId]?.reviewComment || "No comment.");
  const openAppeal = (jobId) =>
    setAppealModal({ open: true, jobId, message: "" });
  const sendAppeal = () => {
    addNotification(
      `Appeal for report #${appealModal.jobId}: "${appealModal.message}"`,
      "appeal",
      appealModal.jobId
    );
    setAppealModal({ open: false, jobId: null, message: "" });
  };

  return (
    <div>
        <Navbar />

      {/* Bell icon (spaced from Logout) */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "4rem",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        🔔
      </button>

      <h2 style={{ marginTop: "2rem" }}>Welcome, Student</h2>

      {/* Notifications */}
      {showNotifications && (
        <div
          style={{
            margin: "1rem 0",
            background: "#fff",
            borderBottom: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: "0.5rem 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span>{n.message}</span>
              {n.type === "report-rejected" && (
                <>
                  <button onClick={() => viewComment(n.jobId)}>
                    View Comment
                  </button>
                  <button onClick={() => openAppeal(n.jobId)}>Appeal</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Layout */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Main Column */}
        <div style={{ flex: 3 }}>
          {/* All Internships */}
          <div className="filters">
            <h3>All Internships</h3>
            <input
              placeholder="Search All Internships"
              value={allSearch}
              onChange={(e) => setAllSearch(e.target.value)}
            />
            <select
              value={allIndustry}
              onChange={(e) => setAllIndustry(e.target.value)}
            >
              <option value="">Filter by Industry</option>
              <option>Tech</option>
              <option>E-commerce</option>
              <option>Marketing</option>
            </select>
            <select
              value={allDuration}
              onChange={(e) => setAllDuration(e.target.value)}
            >
              <option value="">Filter by Duration</option>
              <option>3 months</option>
              <option>6 months</option>
              <option>4 months</option>
            </select>
            <select value={allPay} onChange={(e) => setAllPay(e.target.value)}>
              <option value="">Filter by Pay</option>
              <option>$1500/month</option>
              <option>$1800/month</option>
              <option>$1700/month</option>
            </select>
          </div>
          <div className="internship-list">
            {allFiltered.map((job) => (
              <div
                key={job.id}
                className="internship-card"
                style={{ minHeight: "220px" }}
              >
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <button onClick={() => handleView(job.id)}>View</button>
              </div>
            ))}
          </div>

          {/* Past & Current */}
          <h3>My Past & Current Internships</h3>
          <div className="filters">
            <input
              placeholder="Search Past & Current"
              value={pastSearch}
              onChange={(e) => setPastSearch(e.target.value)}
            />
            <select
              value={pastStatus}
              onChange={(e) => setPastStatus(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option>Current Intern</option>
              <option>Completed</option>
            </select>
            <input
              placeholder="Filter by Month + Year"
              value={pastDate}
              onChange={(e) => setPastDate(e.target.value)}
            />
          </div>
          <div className="internship-list">
            {pastFiltered.map((job) => (
              <div
                key={job.id}
                className="internship-card"
                style={{
                  minHeight: "260px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
                </div>
                {job.status === "Completed" && (
                  <div style={{ display: "grid", gap: "6px" }}>
                    {evaluations[job.id] ? (
                      <div>
                        <p style={{ fontStyle: "italic" }}>
                          {evaluations[job.id].text}
                        </p>
                        <p>
                          Recommend:{" "}
                          {evaluations[job.id].recommended ? "Yes" : "No"}
                        </p>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => openEval(job.id)}>
                            Edit Eval
                          </button>
                          <button onClick={() => deleteEval(job.id)}>
                            Del Eval
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => openEval(job.id)}>Add Eval</button>
                    )}
                    {reports[job.id] ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            flexWrap: "wrap",
                          }}
                        >
                          <span>
                            {reports[job.id].name}
                            {reports[job.id].finalized ? " (Finalized)" : ""}
                          </span>
                          <a
                            href={URL.createObjectURL(reports[job.id].file)}
                            download={reports[job.id].name}
                          >
                            Download
                          </a>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                          }}
                        >
                          {reports[job.id].reviewStatus === "Pending" && (
                            <button onClick={() => checkReportStatus(job.id)}>
                              Check Status
                            </button>
                          )}
                          <button onClick={() => openReport(job.id)}>
                            {reports[job.id].finalized
                              ? "View Rep"
                              : "Edit Rep"}
                          </button>
                          <button onClick={() => deleteReport(job.id)}>
                            Del Rep
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => openReport(job.id)}>
                        Add Rep
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Applied */}
          <h3>Applied Internships</h3>
          <div className="internship-list">
            {applied.length > 0 ? (
              applied.map((job) => (
                <div
                  key={job.id}
                  className="internship-card"
                  style={{ minHeight: "180px" }}
                >
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>
                    <strong>Status:</strong> {job.status}
                  </p>
                </div>
              ))
            ) : (
              <p>No internships applied yet.</p>
            )}
          </div>

          {/* Details */}
          {selected && (
            <div className="internship-details">
              <h3>{selected.title}</h3>
              <p>
                <strong>Company:</strong> {selected.company}
            </p>
            <p>
                <strong>Industry:</strong> {selected.industry}
            </p>
            <p>
                <strong>Duration:</strong> {selected.duration}
            </p>
            <p>
                <strong>Pay:</strong> {selected.pay}
            </p>
            <p>
                <strong>Description:</strong> {selected.description}
              </p>

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {!selected.applied && (
                  <button onClick={() => handleApply(selected.id)}>
                Apply
              </button>
            )}
                <label
                  style={{ display: "flex", gap: "6px", alignItems: "center" }}
                >
                  <span>Upload Docs:</span>
                  <input type="file" onChange={handleUpload} />
                </label>
                <button onClick={handleSubmitDocs}>Submit Docs</button>
              </div>

              {selected.documents.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <h4>Uploaded Documents</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {selected.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        <span>{doc.name}</span>
                        <a href={URL.createObjectURL(doc)} download={doc.name}>
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside
          style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "1rem" }}
        >
          <h3>Suggested Companies</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {suggestedCompanies.map((c) => (
              <li key={c.id} style={{ marginBottom: "1rem" }}>
                <strong>{c.name}</strong>
                <br />
                <em>{c.industry}</em>
                <br />
                <small>{c.reason}</small>
              </li>
            ))}
          </ul>

          {/* Video Panel */}
          <div style={{ marginTop: "2rem" }}>
            <h3>Which Internships Count?</h3>
            <button onClick={() => setShowVideo((v) => !v)}>
              {showVideo ? "Hide Video" : "▶ Watch Video"}
            </button>
            {showVideo && (
              <div style={{ marginTop: "1rem" }}>
                <iframe
                  width="100%"
                  height="200"
                  src={videoUrl}
                  title="Internship Requirements Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Evaluation Modal */}
      {evalModal.open && (
        <div className="modal">
          <h3>{evaluations[evalModal.id] ? "Edit" : "Add"} Evaluation</h3>
          <textarea
            value={evalModal.text}
            onChange={(e) =>
              setEvalModal((prev) => ({ ...prev, text: e.target.value }))
            }
            rows={4}
          />
          <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={evalModal.recommended}
              onChange={(e) =>
                setEvalModal((prev) => ({
                  ...prev,
                  recommended: e.target.checked,
                }))
              }
            />
            Recommend
          </label>
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            <button onClick={saveEval}>Save</button>
            <button
              onClick={() =>
                setEvalModal({
                  open: false,
                  id: null,
                  text: "",
                  recommended: false,
                })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModal.open && (
        <div className="modal">
          <h3>
            {reports[reportModal.id]?.finalized
              ? "View Finalized Report"
              : reports[reportModal.id]
              ? "Edit Report"
              : "Add Report"}
          </h3>
          {reports[reportModal.id]?.finalized ? (
            <>
              <p>
                <strong>File:</strong> {reports[reportModal.id].name}
              </p>
              <p>
                <strong>Courses:</strong>
              </p>
              <ul>
                {reports[reportModal.id].courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p>
                <strong>Status:</strong> {reports[reportModal.id].reviewStatus}
              </p>
              {reports[reportModal.id].reviewStatus === "Rejected" && (
                <p>
                  <strong>Comment:</strong>{" "}
                  {reports[reportModal.id].reviewComment}
                </p>
              )}
              <button
                onClick={() =>
                  setReportModal({
                    open: false,
                    id: null,
                    file: null,
                    courses: [],
                    finalized: false,
                  })
                }
              >
                Close
              </button>
            </>
          ) : (
            <>
              <label style={{ display: "block", marginBottom: "8px" }}>
                Upload Report:
                <input
                  type="file"
                  onChange={(e) =>
                    setReportModal((prev) => ({
                      ...prev,
                      file: e.target.files[0],
                    }))
                  }
                />
              </label>
              <p>Select courses that helped you:</p>
              {courses.map((course) => (
                <label
                  key={course}
                  style={{ display: "flex", gap: "6px", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={reportModal.courses.includes(course)}
                    onChange={() => toggleCourse(course)}
                  />
                  {course}
                </label>
              ))}
              <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                <button onClick={() => saveReport(false)}>Save</button>
                <button onClick={() => saveReport(true)}>Finalize</button>
                <button
                  onClick={() =>
                    setReportModal({
                      open: false,
                      id: null,
                      file: null,
                      courses: [],
                      finalized: false,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Appeal Modal */}
      {appealModal.open && (
        <div className="modal">
          <h3>Appeal Report #{appealModal.jobId}</h3>
          <textarea
            value={appealModal.message}
            onChange={(e) =>
              setAppealModal((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={4}
            placeholder="Your appeal message…"
          />
          <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
            <button onClick={sendAppeal}>Send Appeal</button>
            <button
              onClick={() =>
                setAppealModal({ open: false, jobId: null, message: "" })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}