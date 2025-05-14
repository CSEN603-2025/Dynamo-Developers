import { useState } from "react";

export default function CompanyDashboard() {
  // Internships posted by the company
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      industry: "Tech",
      duration: "3 months",
      paid: true,
      pay: "$1500/month",
      skills: "React, JavaScript",
      description: "Work on UI.",
      applications: 2,
      status: "open",
    },
    {
      id: 2,
      title: "Marketing Intern",
      industry: "Marketing",
      duration: "6 months",
      paid: false,
      pay: "Unpaid",
      skills: "Communication, Social Media",
      description: "Help with outreach.",
      applications: 1,
      status: "open",
    },
  ]);
  const [view, setView] = useState("internships");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [editInternship, setEditInternship] = useState(null);
  const [form, setForm] = useState({
    title: "",
    industry: "",
    duration: "",
    paid: false,
    pay: "",
    skills: "",
    description: "",
  });
  const [applicationStatus, setApplicationStatus] = useState({});
  const [internshipSearch, setInternshipSearch] = useState("");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [documents, setDocuments] = useState({}); // { internshipId: [file1, file2] }

  // Dummy applications
  const applications = [
    { id: 1, name: "Alice", status: applicationStatus[1] || "Pending", internshipId: 1 },
    { id: 2, name: "Bob", status: applicationStatus[2] || "Accepted", internshipId: 1 },
    { id: 3, name: "Charlie", status: applicationStatus[3] || "Finalized", internshipId: 2 },
    { id: 4, name: "Dana", status: applicationStatus[4] || "Current Intern", internshipId: 2 },
  ];
  const interns = applications.filter((app) => app.status === "Current Intern");

  // Handlers
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      setInternships((prev) => prev.filter((post) => post.id !== id));
    }
  };
  const handleEdit = (post) => {
    setEditInternship(post);
    setForm({
      title: post.title,
      industry: post.industry,
      duration: post.duration,
      paid: post.paid,
      pay: post.pay,
      skills: post.skills,
      description: post.description,
    });
    setView("edit");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editInternship) {
      setInternships((prev) =>
        prev.map((post) =>
          post.id === editInternship.id ? { ...post, ...form } : post
        )
      );
      setEditInternship(null);
    } else {
      const newPost = {
        id: internships.length + 1,
        applications: 0,
        status: "open",
        ...form,
      };
      setInternships((prev) => [...prev, newPost]);
    }
    setForm({ title: "", industry: "", duration: "", paid: false, pay: "", skills: "", description: "" });
    setView("internships");
  };
  const handleStatusChange = (appId, status) => {
    setApplicationStatus((prev) => ({ ...prev, [appId]: status }));
  };
  const handleDocumentUpload = (internshipId, e) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({
      ...prev,
      [internshipId]: prev[internshipId] ? [...prev[internshipId], file.name] : [file.name],
    }));
  };

  // Renderers
  const renderInternships = () => {
    const filtered = internships.filter((i) =>
      i.title.toLowerCase().includes(internshipSearch.toLowerCase())
    );
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#1976d2" }}>My Internships</h2>
          <button onClick={() => setView("new")}>Post New Internship</button>
        </div>
        <input
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Search internships"
          value={internshipSearch}
          onChange={e => setInternshipSearch(e.target.value)}
        />
        <div className="internship-list">
          {filtered.map((post) => (
            <div key={post.id} className="internship-card" style={{ background: "#fff", border: "1px solid #bbdefb" }}>
              <h3 style={{ color: "#1976d2" }}>{post.title}</h3>
              <p><b>Industry:</b> {post.industry}</p>
              <p><b>Duration:</b> {post.duration}</p>
              <p><b>Pay:</b> {post.paid ? post.pay : "Unpaid"}</p>
              <p><b>Skills:</b> {post.skills}</p>
              <p><b>Applications:</b> {post.applications}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => { setSelectedInternship(post.id); setView("applications"); }}>View Applications</button>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
              <div style={{ marginTop: 8 }}>
                <label>
                  <b>Upload Document:</b>
                  <input type="file" onChange={e => handleDocumentUpload(post.id, e)} style={{ marginLeft: 8 }} />
                </label>
                <div style={{ fontSize: 13, color: "#1976d2" }}>
                  Uploaded: {(documents[post.id] || []).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderNewOrEditForm = () => (
    <form onSubmit={handleFormSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "#1976d2" }}>{editInternship ? "Edit Internship" : "Post New Internship"}</h2>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
      <input placeholder="Industry" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} required />
      <input placeholder="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} required />
      <label>
        Paid:
        <input type="checkbox" checked={form.paid} onChange={e => setForm({ ...form, paid: e.target.checked })} style={{ marginLeft: 8 }} />
      </label>
      <input placeholder="Pay (if paid)" value={form.pay} onChange={e => setForm({ ...form, pay: e.target.value })} disabled={!form.paid} />
      <input placeholder="Skills" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} required />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit">{editInternship ? "Update" : "Post"}</button>
        <button type="button" onClick={() => { setEditInternship(null); setForm({ title: "", industry: "", duration: "", paid: false, pay: "", skills: "", description: "" }); setView("internships"); }}>Cancel</button>
      </div>
    </form>
  );

  const renderApplications = () => {
    const relevantApps = applications.filter(
      (app) => app.internshipId === selectedInternship &&
        app.name.toLowerCase().includes(applicationSearch.toLowerCase())
    );
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#1976d2" }}>Applications</h2>
          <button onClick={() => setView("internships")}>← Back</button>
        </div>
        <input
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Search applications"
          value={applicationSearch}
          onChange={e => setApplicationSearch(e.target.value)}
        />
        <div className="internship-list">
          {relevantApps.map((app) => (
            <div key={app.id} className="application-card" style={{ background: "#e3f2fd", border: "1px solid #bbdefb" }}>
              <p><b>Name:</b> {app.name}</p>
              <p><b>Status:</b> {app.status}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => handleStatusChange(app.id, "Finalized")}>Set as Finalized</button>
                <button onClick={() => handleStatusChange(app.id, "Accepted")}>Set as Accepted</button>
                <button onClick={() => handleStatusChange(app.id, "Current Intern")}>Set as Current Intern</button>
                <button onClick={() => handleStatusChange(app.id, "Rejected")}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderInterns = () => (
    <>
      <h2 style={{ color: "#1976d2" }}>Current Interns</h2>
      <div className="internship-list">
        {interns.length === 0 ? (
          <p>No current interns</p>
        ) : (
          interns.map((intern) => (
            <div key={intern.id} className="intern-card" style={{ background: "#e3f2fd", border: "1px solid #bbdefb" }}>
              <p>{intern.name}</p>
              <button onClick={() => alert("Evaluation submitted (dummy)")}>Evaluate</button>
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <div className="dashboard-container" style={{ background: "#e3f2fd", minHeight: "100vh", padding: "2rem 0" }}>
      <div className="dashboard-content" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px #bbdefb55", padding: "2rem" }}>
        <nav className="navbar" style={{ marginBottom: 32, background: "#1976d2", color: "#fff", borderRadius: 12, padding: "1rem 2rem", display: "flex", gap: 24, justifyContent: "center" }}>
          <button style={{ background: view === "internships" ? "#fff" : "#1976d2", color: view === "internships" ? "#1976d2" : "#fff" }} onClick={() => setView("internships")}>My Internships</button>
          <button style={{ background: view === "interns" ? "#fff" : "#1976d2", color: view === "interns" ? "#1976d2" : "#fff" }} onClick={() => setView("interns")}>Current Interns</button>
        </nav>
        {view === "internships" && <section>{renderInternships()}</section>}
        {view === "new" && <section>{renderNewOrEditForm()}</section>}
        {view === "edit" && <section>{renderNewOrEditForm()}</section>}
        {view === "applications" && <section>{renderApplications()}</section>}
        {view === "interns" && <section>{renderInterns()}</section>}
      </div>
    </div>
  );
}