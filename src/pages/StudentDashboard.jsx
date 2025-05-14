import { useState } from "react";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  // List of available internships (dummy data)
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
    },
  ]);

  // Past and current internships (dummy data)
  const [pastAndCurrentInternships] = useState([
    {
      id: 4,
      title: "Marketing Intern",
      company: "Apple",
      industry: "Marketing",
      duration: "3 months",
      pay: "Unpaid",
      description: "Assist with online marketing strategies and campaigns",
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
      description: "Help in planning and developing product features",
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
      description: "Work on product features, bug fixes, and testing",
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
      description: "Assist with writing articles and blogs for digital media",
      status: "Current Intern",
      monthCompleted: "",
    },
  ]);

  // Search and filter states
  const [allInternshipsSearchTerm, setAllInternshipsSearchTerm] = useState("");
  const [allInternshipsIndustryFilter, setAllInternshipsIndustryFilter] = useState("");
  const [allInternshipsDurationFilter, setAllInternshipsDurationFilter] = useState("");
  const [allInternshipsPayFilter, setAllInternshipsPayFilter] = useState("");
  const [pastAndCurrentSearchTerm, setPastAndCurrentSearchTerm] = useState("");
  const [pastAndCurrentStatusFilter, setPastAndCurrentStatusFilter] = useState("");
  const [pastAndCurrentDateFilter, setPastAndCurrentDateFilter] = useState("");

  // Internships selected for viewing
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [document, setDocument] = useState(null);

  // List of applied internships
  const [appliedInternships, setAppliedInternships] = useState([]);

  // Search/filter functions
  const handleAllInternshipsFilter = () => {
    return internships.filter((internship) => {
      return (
        (allInternshipsSearchTerm === "" ||
          internship.title.toLowerCase().includes(allInternshipsSearchTerm.toLowerCase()) ||
          internship.company.toLowerCase().includes(allInternshipsSearchTerm.toLowerCase())) &&
        (allInternshipsIndustryFilter ? internship.industry === allInternshipsIndustryFilter : true) &&
        (allInternshipsDurationFilter ? internship.duration === allInternshipsDurationFilter : true) &&
        (allInternshipsPayFilter ? internship.pay === allInternshipsPayFilter : true)
      );
    });
  };

  const handlePastAndCurrentFilter = () => {
    return pastAndCurrentInternships.filter((internship) => {
      return (
        (pastAndCurrentSearchTerm === "" ||
          internship.title.toLowerCase().includes(pastAndCurrentSearchTerm.toLowerCase()) ||
          internship.company.toLowerCase().includes(pastAndCurrentSearchTerm.toLowerCase())) &&
        (pastAndCurrentStatusFilter
          ? internship.status.toLowerCase().includes(pastAndCurrentStatusFilter.toLowerCase())
          : true) &&
        (pastAndCurrentDateFilter
          ? internship.monthCompleted.toLowerCase().includes(pastAndCurrentDateFilter.toLowerCase())
          : true)
      );
    });
  };

  // View details
  const handleViewDetails = (internshipId) => {
    const internship = [...internships, ...pastAndCurrentInternships].find(
      (internship) => internship.id === internshipId
    );
    setSelectedInternship(internship);
  };

  // Apply for internship
  const handleApply = (internshipId) => {
    setInternships((prevInternships) =>
      prevInternships.map((internship) =>
        internship.id === internshipId
          ? { ...internship, applied: true, status: "Pending" }
          : internship
      )
    );
    setAppliedInternships((prevApplied) => [
      ...prevApplied,
      internships.find((internship) => internship.id === internshipId),
    ]);
    setSelectedInternship(null);
  };

  // Document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const handleSubmitDocuments = () => {
    if (document) {
      alert("Documents uploaded successfully!");
    } else {
      alert("Please upload a document.");
    }
  };

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem" }}>
        <Navbar />
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 32 }}>Welcome, Student</h2>

        {/* All Internships Section */}
        <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: "#1976d2" }}>All Internships</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Search All Internships"
              value={allInternshipsSearchTerm}
              onChange={(e) => setAllInternshipsSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setAllInternshipsIndustryFilter(e.target.value)} value={allInternshipsIndustryFilter}>
              <option value="">Filter by Industry</option>
              <option value="Tech">Tech</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select onChange={(e) => setAllInternshipsDurationFilter(e.target.value)} value={allInternshipsDurationFilter}>
              <option value="">Filter by Duration</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="4 months">4 months</option>
            </select>
            <select onChange={(e) => setAllInternshipsPayFilter(e.target.value)} value={allInternshipsPayFilter}>
              <option value="">Filter by Pay</option>
              <option value="$1500/month">$1500/month</option>
              <option value="$1800/month">$1800/month</option>
              <option value="$1700/month">$1700/month</option>
            </select>
          </div>
          <div className="internship-list">
            {handleAllInternshipsFilter().map((job) => (
              <div key={job.id} className="internship-card" style={{ background: "#fff", border: "1px solid #bbdefb" }}>
                <h3 style={{ color: "#1976d2" }}>{job.title}</h3>
                <p>{job.company}</p>
                <button onClick={() => handleViewDetails(job.id)}>View</button>
              </div>
            ))}
          </div>
        </section>

        {/* My Past and Current Internships Section */}
        <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: "#1976d2" }}>My Past and Current Internships</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Search Past and Current Internships"
              value={pastAndCurrentSearchTerm}
              onChange={(e) => setPastAndCurrentSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setPastAndCurrentStatusFilter(e.target.value)} value={pastAndCurrentStatusFilter}>
              <option value="">Filter by Status</option>
              <option value="Current Intern">Current Intern</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Filter by Month + Year"
              value={pastAndCurrentDateFilter}
              onChange={(e) => setPastAndCurrentDateFilter(e.target.value)}
            />
          </div>
          <div className="internship-list">
            {handlePastAndCurrentFilter().map((job) => (
              <div key={job.id} className="internship-card" style={{ background: "#fff", border: "1px solid #bbdefb" }}>
                <h3 style={{ color: "#1976d2" }}>{job.title}</h3>
                <p>{job.company}</p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Applied Internships Section */}
        <section style={{ background: "#e3f2fd", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: "#1976d2" }}>Applied Internships</h3>
          <div className="internship-list">
            {appliedInternships.length > 0 ? (
              appliedInternships.map((job) => (
                <div key={job.id} className="internship-card" style={{ background: "#fff", border: "1px solid #bbdefb" }}>
                  <h3 style={{ color: "#1976d2" }}>{job.title}</h3>
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
        </section>

        {/* View Selected Internship Details */}
        {selectedInternship && (
          <section className="internship-details" style={{ background: "#fff", border: "2px solid #1976d2", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: "#1976d2" }}>{selectedInternship.title}</h3>
            <p>
              <strong>Company:</strong> {selectedInternship.company}
            </p>
            <p>
              <strong>Industry:</strong> {selectedInternship.industry}
            </p>
            <p>
              <strong>Duration:</strong> {selectedInternship.duration}
            </p>
            <p>
              <strong>Pay:</strong> {selectedInternship.pay}
            </p>
            <p>
              <strong>Description:</strong> {selectedInternship.description}
            </p>
            {!selectedInternship.applied && (
              <button onClick={() => handleApply(selectedInternship.id)}>
                Apply
              </button>
            )}
            <div>
              <h4>Upload Extra Documents (CV, Cover Letter, Certificates, etc.)</h4>
              <input type="file" onChange={handleDocumentUpload} />
              <button onClick={handleSubmitDocuments}>Submit Documents</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}