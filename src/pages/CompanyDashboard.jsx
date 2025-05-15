import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CompanyDashboard() {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "Google",
      title: "UI/UX Designer",
      duration: "3 months",
      industry: "Design",
      isPaid: true,
      salary: "$2000/month",
      skills: "Figma, Adobe XD",
      description: "Design user interfaces for mobile and web apps."
    },
    {
      id: 2,
      company: "Amazon",
      title: "DevOps Intern",
      duration: "6 months",
      industry: "Engineering",
      isPaid: true,
      salary: "$2500/month",
      skills: "AWS, Docker, Jenkins",
      description: "Assist with CI/CD pipeline automation."
    }
  ]);

  const [allInternships] = useState([
    {
      id: 1,
      company: "Google",
      title: "UI/UX Designer",
      duration: "3 months",
      industry: "Design",
      isPaid: true,
      salary: "$2000/month",
      skills: "Figma, Adobe XD",
      description: "Design user interfaces for mobile and web apps."
    },
    {
      id: 2,
      company: "Amazon",
      title: "DevOps Intern",
      duration: "6 months",
      industry: "Engineering",
      isPaid: true,
      salary: "$2500/month",
      skills: "AWS, Docker, Jenkins",
      description: "Assist with CI/CD pipeline automation."
    },
    {
      id: 3,
      company: "Facebook",
      title: "Data Science Intern",
      duration: "4 months",
      industry: "Data Science",
      isPaid: false,
      salary: null,
      skills: "Python, Pandas, Machine Learning",
      description: "Work on data analysis projects."
    },
    {
      id: 4,
      company: "Microsoft",
      title: "Software Engineering Intern",
      duration: "5 months",
      industry: "Engineering",
      isPaid: true,
      salary: "$3000/month",
      skills: "C++, Algorithms",
      description: "Develop new software features."
    },
    {
      id: 5,
      company: "Apple",
      title: "Marketing Intern",
      duration: "2 months",
      industry: "Marketing",
      isPaid: false,
      salary: null,
      skills: "Communication, Market Research",
      description: "Support the product marketing team."
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      message: 'The SCAD Office has accepted your Application.',
      date: '2025-05-10',
      status: 'accepted'
    },
    {
      id: 2,
      message: 'The SCAD Office has rejected your Application.',
      date: '2025-05-11',
      status: 'rejected'
    },
    {
      id: 3,
      message: 'A student applied to your internship at Google.',
      date: '2025-05-15',
      status: 'application'
    }
  ]);

  const [activeTab, setActiveTab] = useState('internships');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [formMode, setFormMode] = useState(null); // 'create' or 'edit'
  const [formData, setFormData] = useState({});

  // Filters
  const [mySearch, setMySearch] = useState('');
  const [myIndustry, setMyIndustry] = useState('');
  const [myDuration, setMyDuration] = useState('');
  const [myPaid, setMyPaid] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [isPaid, setIsPaid] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedInternship(null);
    setFormMode(null);
  };

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
    setActiveTab('details');
  };

  const handleDeleteInternship = (id) => {
    setInternships(internships.filter((job) => job.id !== id));
  };

  const handleEditInternship = (job) => {
    setFormMode('edit');
    setFormData(job);
    setActiveTab('form');
  };

  const handleCreateInternship = () => {
    setFormMode('create');
    setFormData({
      title: '',
      company: '',
      duration: '',
      industry: '',
      isPaid: false,
      salary: '',
      skills: '',
      description: ''
    });
    setActiveTab('form');
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formMode === 'edit') {
      setInternships(internships.map((job) => job.id === formData.id ? formData : job));
    } else {
      const newInternship = {
        ...formData,
        id: Math.max(...internships.map((job) => job.id)) + 1
      };
      setInternships([...internships, newInternship]);
    }
    setFormMode(null);
    setActiveTab('internships');
  };

  const filteredMyInternships = internships.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(mySearch.toLowerCase()) ||
      job.company.toLowerCase().includes(mySearch.toLowerCase());
    const matchIndustry = myIndustry ? job.industry === myIndustry : true;
    const matchDuration = myDuration ? job.duration === myDuration : true;
    const matchPaid = myPaid !== null ? job.isPaid === myPaid : true;
    return matchSearch && matchIndustry && matchDuration && matchPaid;
  });

  const filteredInternships = allInternships.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchIndustry = selectedIndustry ? job.industry === selectedIndustry : true;
    const matchDuration = selectedDuration ? job.duration === selectedDuration : true;
    const matchPaid = isPaid !== null ? job.isPaid === isPaid : true;
    return matchSearch && matchIndustry && matchDuration && matchPaid;
  });

  return (
    <div>
      <Navbar />
      <h2 className="dashboard-title">Welcome, Company</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2em' }}>
        <button onClick={() => handleTabChange('internships')}>Internships</button>
        <button onClick={() => handleTabChange('messages')}>Messages</button>
      </div>

      {activeTab === 'internships' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>My Internships</h3>
            <button onClick={handleCreateInternship}>Create Internship</button>
          </div>

          <input
            type="text"
            placeholder="Search my internships..."
            value={mySearch}
            onChange={(e) => setMySearch(e.target.value)}
            style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
          />

          <div style={{ marginBottom: '1em' }}>
            <select onChange={(e) => setMyIndustry(e.target.value)} value={myIndustry}>
              <option value="">Filter by Industry</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select onChange={(e) => setMyDuration(e.target.value)} value={myDuration}>
              <option value="">Filter by Duration</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
              <option value="4 months">4 months</option>
              <option value="5 months">5 months</option>
              <option value="6 months">6 months</option>
            </select>

            <select onChange={(e) =>
              setMyPaid(e.target.value === 'paid' ? true : e.target.value === 'unpaid' ? false : null)}
              value={myPaid === null ? '' : myPaid ? 'paid' : 'unpaid'}
            >
              <option value="">Filter by Paid/Unpaid</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div className="internship-list">
            {filteredMyInternships.map((job) => (
              <div key={job.id} className="internship-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>Duration: {job.duration}</p>
                <p>{job.isPaid ? 'Paid' : 'Unpaid'}</p>
                <button onClick={() => handleSelectInternship(job)}>View</button>
                <button onClick={() => handleEditInternship(job)}>Edit</button>
                <button onClick={() => handleDeleteInternship(job.id)}>Delete</button>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2em' }}>All Available Internships</h3>

          <input
            type="text"
            placeholder="Search all internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
          />

          <div style={{ marginBottom: '1em' }}>
            <select onChange={(e) => setSelectedIndustry(e.target.value)} value={selectedIndustry}>
              <option value="">Filter by Industry</option>
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select onChange={(e) => setSelectedDuration(e.target.value)} value={selectedDuration}>
              <option value="">Filter by Duration</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
              <option value="4 months">4 months</option>
              <option value="5 months">5 months</option>
              <option value="6 months">6 months</option>
            </select>

            <select onChange={(e) =>
              setIsPaid(e.target.value === 'paid' ? true : e.target.value === 'unpaid' ? false : null)}
              value={isPaid === null ? '' : isPaid ? 'paid' : 'unpaid'}
            >
              <option value="">Filter by Paid/Unpaid</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div className="internship-list">
            {filteredInternships.map((job) => (
              <div key={job.id} className="internship-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>Duration: {job.duration}</p>
                <p>{job.isPaid ? 'Paid' : 'Unpaid'}</p>
                <button onClick={() => handleSelectInternship(job)}>View</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'form' && (
        <div>
          <h3>{formMode === 'edit' ? 'Edit Internship' : 'Create Internship'}</h3>
          <form onSubmit={handleSubmitForm}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <input
              type="text"
              placeholder="Industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={formData.isPaid}
                onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
              />
              Paid
            </label>
            <input
              type="text"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => handleTabChange('internships')}>Cancel</button>
          </form>
        </div>
      )}

      {activeTab === 'details' && selectedInternship && (
        <div className="internship-details">
          <h3>Internship Details</h3>
          <p><strong>Title:</strong> {selectedInternship.title}</p>
          <p><strong>Company:</strong> {selectedInternship.company}</p>
          <p><strong>Duration:</strong> {selectedInternship.duration}</p>
          <p><strong>Industry:</strong> {selectedInternship.industry}</p>
          <p><strong>Status:</strong> {selectedInternship.isPaid ? 'Paid' : 'Unpaid'}</p>
          {selectedInternship.isPaid && <p><strong>Salary:</strong> {selectedInternship.salary}</p>}
          {selectedInternship.skills && <p><strong>Skills Required:</strong> {selectedInternship.skills}</p>}
          {selectedInternship.description && <p><strong>Job Description:</strong> {selectedInternship.description}</p>}
          <button onClick={() => handleTabChange('internships')}>Back</button>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="messages-list">
          <h3>Messages</h3>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className={`message-card ${msg.status}`}>
                <p>{msg.message}</p>
                <small>{msg.date}</small>
                <div className={`status ${msg.status}`}>{msg.status}</div>
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
