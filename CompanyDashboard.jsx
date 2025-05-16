import { useState } from 'react';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './CompanyDashboard.css';

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
      description: "Design user interfaces for mobile and web apps.",
      applications: 5
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
      description: "Assist with CI/CD pipeline automation.",
      applications: 3
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

  const [applications, setApplications] = useState([
    {
      id: 1,
      internshipId: 1,
      studentName: "John Doe",
      email: "john.doe@example.com",
      status: "current_intern",
      appliedDate: "2024-03-15",
      resumeUrl: "resume1.pdf",
      coverLetter: "I am excited to apply for this position...",
      internshipTitle: "UI/UX Designer",
      company: "Google",
      education: "Bachelor in Design, XYZ University",
      experience: "1 year internship at Design Studio",
      skills: "Figma, Adobe XD, Sketch",
      phoneNumber: "+1234567890",
      portfolio: "portfolio1.pdf",
      startDate: "2024-03-20",
      endDate: null,
      industry: "Design"
    },
    {
      id: 2,
      internshipId: 1,
      studentName: "Jane Smith",
      email: "jane.smith@example.com",
      status: "internship_completed",
      appliedDate: "2024-01-16",
      resumeUrl: "resume2.pdf",
      coverLetter: "With my background in design...",
      internshipTitle: "UI/UX Designer",
      company: "Google",
      education: "Master in HCI, ABC University",
      experience: "2 years freelance UI/UX",
      skills: "Figma, Prototyping, User Research",
      phoneNumber: "+1234567891",
      portfolio: "portfolio2.pdf",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      industry: "Design"
    },
    {
      id: 3,
      internshipId: 2,
      studentName: "Mike Johnson",
      email: "mike.j@example.com",
      status: "current_intern",
      appliedDate: "2024-02-14",
      resumeUrl: "resume3.pdf",
      coverLetter: "I am interested in the DevOps position...",
      internshipTitle: "DevOps Intern",
      company: "Amazon",
      education: "Bachelor in Computer Science, DEF University",
      experience: "Multiple cloud projects",
      skills: "AWS, Docker, Jenkins, CI/CD",
      phoneNumber: "+1234567892",
      portfolio: "portfolio3.pdf",
      startDate: "2024-02-20",
      endDate: null,
      industry: "Engineering"
    },
    {
      id: 4,
      internshipId: 3,
      studentName: "Sarah Williams",
      email: "sarah.w@example.com",
      status: "internship_completed",
      appliedDate: "2023-11-10",
      resumeUrl: "resume4.pdf",
      coverLetter: "As a data science enthusiast...",
      internshipTitle: "Data Science Intern",
      company: "Facebook",
      education: "Master in Data Science, GHI University",
      experience: "Research Assistant in ML Lab",
      skills: "Python, Machine Learning, SQL",
      phoneNumber: "+1234567893",
      portfolio: "portfolio4.pdf",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      industry: "Data Science"
    },
    {
      id: 5,
      internshipId: 4,
      studentName: "Alex Chen",
      email: "alex.c@example.com",
      status: "current_intern",
      appliedDate: "2024-03-01",
      resumeUrl: "resume5.pdf",
      coverLetter: "With my strong background in software development...",
      internshipTitle: "Software Engineering Intern",
      company: "Microsoft",
      education: "Bachelor in Software Engineering, JKL University",
      experience: "Open source contributor",
      skills: "C++, Algorithms, System Design",
      phoneNumber: "+1234567894",
      portfolio: "portfolio5.pdf",
      startDate: "2024-03-15",
      endDate: null,
      industry: "Engineering"
    },
    {
      id: 6,
      internshipId: 5,
      studentName: "Emily Brown",
      email: "emily.b@example.com",
      status: "internship_completed",
      appliedDate: "2023-12-01",
      resumeUrl: "resume6.pdf",
      coverLetter: "I am passionate about marketing...",
      internshipTitle: "Marketing Intern",
      company: "Apple",
      education: "Bachelor in Marketing, MNO University",
      experience: "Social media management",
      skills: "Digital Marketing, Content Creation",
      phoneNumber: "+1234567895",
      portfolio: "portfolio6.pdf",
      startDate: "2023-12-15",
      endDate: "2024-03-15",
      industry: "Marketing"
    },
    {
      id: 7,
      internshipId: 2,
      studentName: "Tom Wilson",
      email: "tom.w@example.com",
      status: "current_intern",
      appliedDate: "2024-02-20",
      resumeUrl: "resume7.pdf",
      coverLetter: "Experienced in cloud infrastructure...",
      internshipTitle: "DevOps Intern",
      company: "Amazon",
      education: "Master in Cloud Computing, PQR University",
      experience: "AWS Certified Developer",
      skills: "Kubernetes, Terraform, AWS",
      phoneNumber: "+1234567896",
      portfolio: "portfolio7.pdf",
      startDate: "2024-03-01",
      endDate: null,
      industry: "Engineering"
    },
    {
      id: 8,
      internshipId: 1,
      studentName: "Lisa Garcia",
      email: "lisa.g@example.com",
      status: "internship_completed",
      appliedDate: "2023-10-15",
      resumeUrl: "resume8.pdf",
      coverLetter: "Passionate about user experience...",
      internshipTitle: "UI/UX Designer",
      company: "Google",
      education: "Bachelor in Interactive Design, STU University",
      experience: "UX Research Assistant",
      skills: "User Research, Wireframing, Prototyping",
      phoneNumber: "+1234567897",
      portfolio: "portfolio8.pdf",
      startDate: "2023-11-01",
      endDate: "2024-02-01",
      industry: "Design"
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

  // Application Management States
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilters, setApplicationFilters] = useState({
    search: '',
    internshipId: '',
    status: 'all',
    internStatus: 'all'  // for current-interns tab
  });

  // Add evaluations state
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      applicationId: 2, // References Jane Smith's completed internship
      overallRating: 4,
      technicalSkills: 4,
      softSkills: 5,
      workQuality: 4,
      punctuality: 5,
      adaptability: 4,
      comments: "Jane showed exceptional growth throughout her internship. Her UI/UX skills improved significantly, and she demonstrated great teamwork.",
      evaluationDate: "2024-03-20",
      evaluatedBy: "John Manager"
    },
    {
      id: 2,
      applicationId: 4, // References Sarah Williams's completed internship
      overallRating: 5,
      technicalSkills: 5,
      softSkills: 4,
      workQuality: 5,
      punctuality: 4,
      adaptability: 5,
      comments: "Sarah's data science skills and analytical thinking were outstanding. She made valuable contributions to our ML projects.",
      evaluationDate: "2024-02-15",
      evaluatedBy: "Mike Lead"
    }
  ]);

  // Add evaluation form state
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [evaluationFormData, setEvaluationFormData] = useState({
    overallRating: 0,
    technicalSkills: 0,
    softSkills: 0,
    workQuality: 0,
    punctuality: 0,
    adaptability: 0,
    comments: "",
    evaluatedBy: ""
  });

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

  // Filter applications based on all criteria
  const filteredApplications = applications.filter(app => {
    const matchSearch = 
      app.studentName.toLowerCase().includes(applicationFilters.search.toLowerCase()) ||
      app.email.toLowerCase().includes(applicationFilters.search.toLowerCase());
    const matchStatus = applicationFilters.status === 'all' ? true : app.status === applicationFilters.status;
    return matchSearch && matchStatus;
  });

  // Application Status Update Handler
  const handleStatusUpdate = (applicationId, newStatus, startDate = null, endDate = null) => {
    // Update the applications state with the new status
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          startDate: newStatus === 'current_intern' ? startDate : app.startDate,
          endDate: newStatus === 'internship_completed' ? endDate : app.endDate
        };
      }
      return app;
    });

    // Update both the applications state and the selected application
    setApplications(updatedApplications);
    setSelectedApplication(updatedApplications.find(app => app.id === applicationId));
  };

  // Add evaluation management functions
  const handleCreateEvaluation = (applicationId) => {
    setEvaluationFormData({
      overallRating: 0,
      technicalSkills: 0,
      softSkills: 0,
      workQuality: 0,
      punctuality: 0,
      adaptability: 0,
      comments: "",
      evaluatedBy: ""
    });
    setCurrentEvaluation(null);
    setShowEvaluationForm(true);
  };

  const handleEditEvaluation = (evaluation) => {
    setEvaluationFormData(evaluation);
    setCurrentEvaluation(evaluation);
    setShowEvaluationForm(true);
  };

  const handleDeleteEvaluation = (evaluationId) => {
    setEvaluations(evaluations.filter(evaluation => evaluation.id !== evaluationId));
  };

  const handleSubmitEvaluation = (e, applicationId, formData = evaluationFormData) => {
    e.preventDefault();
    
    const newEvaluation = {
      ...formData,
      id: currentEvaluation ? currentEvaluation.id : Math.max(...evaluations.map(e => e.id), 0) + 1,
      applicationId,
      evaluationDate: new Date().toISOString().split('T')[0]
    };

    if (currentEvaluation) {
      // Update existing evaluation
      setEvaluations(evaluations.map(evaluation => 
        evaluation.id === currentEvaluation.id ? newEvaluation : evaluation
      ));
    } else {
      // Create new evaluation
      setEvaluations([...evaluations, newEvaluation]);
    }

    setShowEvaluationForm(false);
    setCurrentEvaluation(null);
  };

  // Add the evaluation form component
  const EvaluationForm = ({ application, onSubmit, onCancel, initialData }) => {
    const ratingOptions = [1, 2, 3, 4, 5];
    const [formData, setFormData] = useState(initialData || {
      overallRating: 0,
      technicalSkills: 0,
      softSkills: 0,
      workQuality: 0,
      punctuality: 0,
      adaptability: 0,
      comments: "",
      evaluatedBy: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '2em',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        zIndex: 1000
      }}>
        <h3>Intern Evaluation - {application.studentName}</h3>
        <form onSubmit={handleSubmit}>
          {/* Rating Fields */}
          {['overallRating', 'technicalSkills', 'softSkills', 'workQuality', 'punctuality', 'adaptability'].map(field => (
            <div key={field} style={{ marginBottom: '1em' }}>
              <label style={{ display: 'block', marginBottom: '0.5em' }}>
                {field.split(/(?=[A-Z])/).join(' ').replace(/\b\w/g, c => c.toUpperCase())}:
              </label>
              <div style={{ display: 'flex', gap: '1em' }}>
                {ratingOptions.map(rating => (
                  <label key={rating} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                    <input
                      type="radio"
                      name={field}
                      value={rating}
                      checked={formData[field] === rating}
                      onChange={(e) => setFormData({
                        ...formData,
                        [field]: parseInt(e.target.value)
                      })}
                    />
                    {rating}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Comments Field */}
          <div style={{ marginBottom: '1em' }}>
            <label style={{ display: 'block', marginBottom: '0.5em' }}>
              Comments:
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({
                ...formData,
                comments: e.target.value
              })}
              style={{ width: '100%', minHeight: '100px', padding: '0.5em' }}
              required
            />
          </div>

          {/* Evaluator Name Field */}
          <div style={{ marginBottom: '1em' }}>
            <label style={{ display: 'block', marginBottom: '0.5em' }}>
              Evaluated By:
            </label>
            <input
              type="text"
              value={formData.evaluatedBy}
              onChange={(e) => setFormData({
                ...formData,
                evaluatedBy: e.target.value
              })}
              style={{ width: '100%', padding: '0.5em' }}
              required
            />
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '1em', justifyContent: 'flex-end', marginTop: '2em' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.8em 1.5em',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.8em 1.5em',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {initialData ? 'Update' : 'Submit'} Evaluation
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Add PDF generation functions
  const generateEvaluationPDF = (evaluation, intern) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Header
    doc.setFontSize(20);
    doc.text('Internship Evaluation Report', pageWidth / 2, 20, { align: 'center' });
    
    // Intern Info
    doc.setFontSize(12);
    doc.text(`Intern: ${intern.studentName}`, 20, 40);
    doc.text(`Position: ${intern.internshipTitle}`, 20, 50);
    doc.text(`Company: ${intern.company}`, 20, 60);
    doc.text(`Department: ${intern.industry}`, 20, 70);
    doc.text(`Period: ${intern.startDate} to ${intern.endDate}`, 20, 80);

    // Ratings Table
    doc.autoTable({
      startY: 100,
      head: [['Evaluation Criteria', 'Rating (out of 5)']],
      body: [
        ['Overall Rating', evaluation.overallRating],
        ['Technical Skills', evaluation.technicalSkills],
        ['Soft Skills', evaluation.softSkills],
        ['Work Quality', evaluation.workQuality],
        ['Punctuality', evaluation.punctuality],
        ['Adaptability', evaluation.adaptability],
      ],
    });

    // Comments
    const splitComments = doc.splitTextToSize(
      `Comments: ${evaluation.comments}`,
      pageWidth - 40
    );
    doc.text(splitComments, 20, doc.lastAutoTable.finalY + 20);

    // Footer
    doc.text(`Evaluated by: ${evaluation.evaluatedBy}`, 20, doc.internal.pageSize.height - 30);
    doc.text(`Date: ${evaluation.evaluationDate}`, 20, doc.internal.pageSize.height - 20);

    // Save the PDF
    doc.save(`${intern.studentName.replace(/\s+/g, '_')}_evaluation.pdf`);
  };

  const generateInternshipCertificate = (intern) => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Add border
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Certificate header
    doc.setFontSize(30);
    doc.text('Certificate of Completion', pageWidth / 2, 50, { align: 'center' });

    // Certificate text
    doc.setFontSize(16);
    doc.text('This is to certify that', pageWidth / 2, 80, { align: 'center' });
    
    doc.setFontSize(24);
    doc.text(intern.studentName, pageWidth / 2, 100, { align: 'center' });
    
    doc.setFontSize(16);
    const completionText = [
      `has successfully completed an internship as`,
      `${intern.internshipTitle}`,
      `at ${intern.company}`,
      `from ${intern.startDate} to ${intern.endDate}`
    ];
    
    let yPos = 120;
    completionText.forEach((line) => {
      doc.text(line, pageWidth / 2, yPos, { align: 'center' });
      yPos += 20;
    });

    // Signature line
    doc.line(50, pageHeight - 50, 150, pageHeight - 50);
    doc.line(pageWidth - 150, pageHeight - 50, pageWidth - 50, pageHeight - 50);
    
    doc.setFontSize(12);
    doc.text('Company Representative', 100, pageHeight - 40, { align: 'center' });
    doc.text('Date', pageWidth - 100, pageHeight - 40, { align: 'center' });

    // Save the PDF
    doc.save(`${intern.studentName.replace(/\s+/g, '_')}_certificate.pdf`);
  };

  const generateInternDetailsPDF = (intern) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Header
    doc.setFontSize(20);
    doc.text('Intern Details Report', pageWidth / 2, 20, { align: 'center' });

    // Personal Information
    doc.setFontSize(16);
    doc.text('Personal Information', 20, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${intern.studentName}`, 20, 55);
    doc.text(`Email: ${intern.email}`, 20, 65);
    doc.text(`Phone: ${intern.phoneNumber}`, 20, 75);
    doc.text(`Education: ${intern.education}`, 20, 85);

    // Internship Information
    doc.setFontSize(16);
    doc.text('Internship Information', 20, 105);
    doc.setFontSize(12);
    doc.text(`Position: ${intern.internshipTitle}`, 20, 120);
    doc.text(`Company: ${intern.company}`, 20, 130);
    doc.text(`Department: ${intern.industry}`, 20, 140);
    doc.text(`Start Date: ${intern.startDate}`, 20, 150);
    doc.text(`End Date: ${intern.endDate || 'Ongoing'}`, 20, 160);

    // Experience and Skills
    doc.setFontSize(16);
    doc.text('Experience & Skills', 20, 180);
    doc.setFontSize(12);
    const splitExperience = doc.splitTextToSize(`Experience: ${intern.experience}`, pageWidth - 40);
    doc.text(splitExperience, 20, 195);
    const splitSkills = doc.splitTextToSize(`Skills: ${intern.skills}`, pageWidth - 40);
    doc.text(splitSkills, 20, 215);

    // Save the PDF
    doc.save(`${intern.studentName.replace(/\s+/g, '_')}_details.pdf`);
  };

  return (
    <div>
      <Navbar />
      <h2 className="dashboard-title">Welcome, Company</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2em' }} className="tab-navigation">
        <button onClick={() => handleTabChange('internships')}>Internships</button>
        <button onClick={() => handleTabChange('applications')}>Applications</button>
        <button onClick={() => handleTabChange('current-interns')}>Current Interns</button>
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
                <p>Applications: {job.applications || 0}</p>
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
          <p><strong>Applications Received:</strong> {selectedInternship.applications || 0}</p>
          <button onClick={() => handleTabChange('internships')}>Back</button>
        </div>
      )}

      {activeTab === 'applications' && !selectedApplication && (
        <div className="applications-section">
          <h3>Applications Management</h3>
          
          <div className="filters" style={{ 
            padding: '1em',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '1em'
          }}>
            <input
              type="text"
              placeholder="Search by student name or internship title..."
              value={applicationFilters.search}
              onChange={(e) => setApplicationFilters({
                ...applicationFilters,
                search: e.target.value
              })}
              style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
            />

            <select 
              value={applicationFilters.status}
              onChange={(e) => setApplicationFilters({
                ...applicationFilters,
                status: e.target.value
              })}
              style={{ marginLeft: '1em' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="current_intern">Current Intern</option>
              <option value="internship_completed">Internship Completed</option>
            </select>
          </div>

          <div className="applications-list">
            {filteredApplications.map((application) => (
              <div key={application.id} className="application-card" style={{ 
                border: '1px solid #ddd',
                padding: '1em',
                marginBottom: '1em',
                borderRadius: '4px'
              }}>
                <h4>{application.studentName}</h4>
                <p><strong>Internship:</strong> {application.internshipTitle}</p>
                <p><strong>Company:</strong> {application.company}</p>
                <p><strong>Applied Date:</strong> {application.appliedDate}</p>
                <p><strong>Status:</strong> <span style={{
                  textTransform: 'capitalize',
                  color: application.status === 'accepted' ? 'green' : 
                         application.status === 'rejected' ? 'red' : 
                         application.status === 'current_intern' ? '#0066cc' :
                         application.status === 'internship_completed' ? '#006600' :
                         application.status === 'under_review' ? 'orange' : 'gray'
                }}>{application.status.replace(/_/g, ' ')}</span></p>
                <p><strong>Email:</strong> {application.email}</p>
                <div style={{ marginTop: '1em' }}>
                  <button onClick={() => setSelectedApplication(application)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'applications' && selectedApplication && (
        <div className="application-details" style={{ padding: '2em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
            <h3>Application Details</h3>
            <button 
              onClick={() => setSelectedApplication(null)}
              style={{ padding: '0.5em 1em' }}
            >
              Back to Applications
            </button>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2em',
            backgroundColor: 'white',
            padding: '2em',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div>
              <h4>Personal Information</h4>
              <p><strong>Name:</strong> {selectedApplication.studentName}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Phone:</strong> {selectedApplication.phoneNumber}</p>
              <p><strong>Education:</strong> {selectedApplication.education}</p>
              <p><strong>Experience:</strong> {selectedApplication.experience}</p>
              <p><strong>Skills:</strong> {selectedApplication.skills}</p>
            </div>

            <div>
              <h4>Application Information</h4>
              <p><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
              <p><strong>Company:</strong> {selectedApplication.company}</p>
              <p><strong>Applied Date:</strong> {selectedApplication.appliedDate}</p>
              <p><strong>Status:</strong> {selectedApplication.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              {selectedApplication.startDate && (
                <p><strong>Start Date:</strong> {selectedApplication.startDate}</p>
              )}
              {selectedApplication.endDate && (
                <p><strong>End Date:</strong> {selectedApplication.endDate}</p>
              )}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <h4>Cover Letter</h4>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.coverLetter}</p>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <h4>Documents</h4>
              <div style={{ display: 'flex', gap: '1em' }}>
                <button onClick={() => window.open(selectedApplication.resumeUrl, '_blank')}>
                  View Resume
                </button>
                <button onClick={() => window.open(selectedApplication.portfolio, '_blank')}>
                  View Portfolio
                </button>
              </div>
            </div>

            <div style={{ 
              gridColumn: '1 / -1',
              marginTop: '2em',
              padding: '1em',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <h4>Update Application Status</h4>
              <div style={{ display: 'flex', gap: '1em' }}>
                <select 
                  value={selectedApplication.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    let startDate = null;
                    let endDate = null;
                    
                    if (newStatus === 'current_intern') {
                      startDate = new Date().toISOString().split('T')[0];
                    } else if (newStatus === 'internship_completed') {
                      endDate = new Date().toISOString().split('T')[0];
                    }
                    
                    handleStatusUpdate(selectedApplication.id, newStatus, startDate, endDate);
                  }}
                  style={{ padding: '0.5em', flex: '1' }}
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="current_intern">Current Intern</option>
                  <option value="internship_completed">Internship Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'current-interns' && !selectedApplication && (
        <div className="current-interns-section">
          <h3>Interns Management</h3>
          
          <div className="filters" style={{ 
            padding: '1.5em',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '1.5em',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '1em' }}>
              <input
                type="text"
                placeholder="Search by name or position..."
                value={applicationFilters.search}
                onChange={(e) => setApplicationFilters({
                  ...applicationFilters,
                  search: e.target.value
                })}
                style={{ 
                  width: '100%',
                  padding: '0.8em',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1em'
                }}
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1em'
            }}>
              <select 
                value={applicationFilters.internshipId}
                onChange={(e) => setApplicationFilters({
                  ...applicationFilters,
                  internshipId: e.target.value
                })}
                style={{ 
                  padding: '0.8em',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white'
                }}
              >
                <option value="">All Departments</option>
                {internships.map(internship => (
                  <option key={internship.id} value={internship.id}>
                    {internship.title} - {internship.company}
                  </option>
                ))}
              </select>

              <select 
                value={applicationFilters.internStatus}
                onChange={(e) => setApplicationFilters({
                  ...applicationFilters,
                  internStatus: e.target.value
                })}
                style={{ 
                  padding: '0.8em',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">All Interns</option>
                <option value="current_intern">Current Interns</option>
                <option value="internship_completed">Completed Internships</option>
              </select>
            </div>
          </div>

          <div className="interns-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5em',
            padding: '0.5em'
          }}>
            {applications
              .filter(app => ['current_intern', 'internship_completed'].includes(app.status))
              .filter(app => {
                const matchSearch = 
                  app.studentName.toLowerCase().includes(applicationFilters.search.toLowerCase()) ||
                  app.internshipTitle.toLowerCase().includes(applicationFilters.search.toLowerCase());
                const matchInternship = applicationFilters.internshipId ? 
                  app.internshipId === parseInt(applicationFilters.internshipId) : true;
                const matchStatus = applicationFilters.internStatus === 'all' ? 
                  true : app.status === applicationFilters.internStatus;
                return matchSearch && matchInternship && matchStatus;
              })
              .map(intern => (
                <div 
                  key={intern.id}
                  className="intern-card"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '1.5em',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e1e1e1',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1em',
                    right: '1em',
                    padding: '0.4em 0.8em',
                    borderRadius: '20px',
                    fontSize: '0.8em',
                    backgroundColor: intern.status === 'current_intern' ? '#e6f3ff' : '#e6ffe6',
                    color: intern.status === 'current_intern' ? '#0066cc' : '#006600',
                    fontWeight: '500'
                  }}>
                    {intern.status === 'current_intern' ? 'Current' : 'Completed'}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '1.5em'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '30px',
                      backgroundColor: '#e1e1e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1em',
                      fontSize: '1.4em',
                      fontWeight: 'bold',
                      color: '#555'
                    }}>
                      {intern.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 style={{ margin: '0', fontSize: '1.2em' }}>{intern.studentName}</h4>
                      <p style={{ margin: '0.2em 0 0 0', color: '#666' }}>{intern.email}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5em' }}>
                    <p style={{ margin: '0.3em 0', fontSize: '1.1em' }}>
                      <strong>Position:</strong> {intern.internshipTitle}
                    </p>
                    <p style={{ margin: '0.3em 0' }}>
                      <strong>Department:</strong> {intern.industry}
                    </p>
                    <p style={{ margin: '0.3em 0' }}>
                      <strong>Start Date:</strong> {intern.startDate}
                    </p>
                    {intern.endDate && (
                      <p style={{ margin: '0.3em 0' }}>
                        <strong>End Date:</strong> {intern.endDate}
                      </p>
                    )}
                  </div>

                  <div style={{ 
                    borderTop: '1px solid #e1e1e1',
                    paddingTop: '1em',
                    marginTop: '1em',
                    display: 'flex',
                    gap: '0.8em'
                  }}>
                    <button
                      onClick={() => setSelectedApplication(intern)}
                      style={{
                        padding: '0.8em',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1,
                        fontSize: '0.9em',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      View Details
                    </button>
                    {intern.status === 'current_intern' && (
                      <button
                        onClick={() => {
                          handleStatusUpdate(
                            intern.id,
                            'internship_completed',
                            intern.startDate,
                            new Date().toISOString().split('T')[0]
                          );
                          // Keep the list view after status update
                          setSelectedApplication(null);
                        }}
                        style={{
                          padding: '0.8em',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          flex: 1,
                          fontSize: '0.9em',
                          fontWeight: '500',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        Complete Internship
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
          
          {applications.filter(app => 
            ['current_intern', 'internship_completed'].includes(app.status) &&
            (applicationFilters.internStatus === 'all' || app.status === applicationFilters.internStatus)
          ).length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3em',
              color: '#666',
              backgroundColor: 'white',
              borderRadius: '8px',
              margin: '2em 0'
            }}>
              <p style={{ fontSize: '1.1em', margin: '0' }}>
                {applicationFilters.search ? 
                  'No interns found matching your search criteria.' :
                  applicationFilters.internStatus === 'current_intern' ?
                  'No current interns found.' :
                  applicationFilters.internStatus === 'internship_completed' ?
                  'No completed internships found.' :
                  'No interns found.'}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'current-interns' && selectedApplication && (
        <div className="intern-details" style={{ padding: '2em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
            <h3>Intern Details</h3>
            <button 
              onClick={() => setSelectedApplication(null)}
              style={{ 
                padding: '0.8em 1.5em',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back to Interns List
            </button>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2em',
            backgroundColor: 'white',
            padding: '2em',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {/* Profile Header */}
            <div style={{ 
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2em',
              padding: '1.5em',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '40px',
                backgroundColor: '#e1e1e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.5em',
                fontSize: '1.8em',
                fontWeight: 'bold',
                color: '#555'
              }}>
                {selectedApplication.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 style={{ margin: '0', fontSize: '1.5em' }}>{selectedApplication.studentName}</h2>
                <p style={{ margin: '0.3em 0 0 0', color: '#666' }}>{selectedApplication.internshipTitle}</p>
                <div style={{
                  marginTop: '0.5em',
                  padding: '0.3em 1em',
                  display: 'inline-block',
                  borderRadius: '15px',
                  fontSize: '0.9em',
                  backgroundColor: selectedApplication.status === 'current_intern' ? '#e6f3ff' : '#e6ffe6',
                  color: selectedApplication.status === 'current_intern' ? '#0066cc' : '#006600'
                }}>
                  {selectedApplication.status === 'current_intern' ? 'Current Intern' : 'Completed'}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h4 style={{ 
                marginTop: 0,
                paddingBottom: '0.5em',
                borderBottom: '2px solid #007bff'
              }}>Personal Information</h4>
              <div style={{ display: 'grid', gap: '1em' }}>
                <p style={{ margin: '0' }}><strong>Email:</strong> {selectedApplication.email}</p>
                <p style={{ margin: '0' }}><strong>Phone:</strong> {selectedApplication.phoneNumber}</p>
                <p style={{ margin: '0' }}><strong>Education:</strong> {selectedApplication.education}</p>
                <p style={{ margin: '0' }}><strong>Experience:</strong> {selectedApplication.experience}</p>
                <p style={{ margin: '0' }}><strong>Skills:</strong> {selectedApplication.skills}</p>
              </div>
            </div>

            {/* Internship Information */}
            <div>
              <h4 style={{ 
                marginTop: 0,
                paddingBottom: '0.5em',
                borderBottom: '2px solid #28a745'
              }}>Internship Information</h4>
              <div style={{ display: 'grid', gap: '1em' }}>
                <p style={{ margin: '0' }}><strong>Position:</strong> {selectedApplication.internshipTitle}</p>
                <p style={{ margin: '0' }}><strong>Company:</strong> {selectedApplication.company}</p>
                <p style={{ margin: '0' }}><strong>Department:</strong> {selectedApplication.industry}</p>
                <p style={{ margin: '0' }}><strong>Start Date:</strong> {selectedApplication.startDate}</p>
                {selectedApplication.endDate && (
                  <p style={{ margin: '0' }}><strong>End Date:</strong> {selectedApplication.endDate}</p>
                )}
                <p style={{ margin: '0' }}><strong>Applied Date:</strong> {selectedApplication.appliedDate}</p>
              </div>
            </div>

            {/* Documents Section */}
            <div style={{ 
              gridColumn: '1 / -1',
              marginTop: '1em',
              padding: '1.5em',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 1em 0' }}>Documents</h4>
              <div style={{ display: 'flex', gap: '1em' }}>
                <button
                  onClick={() => window.open(selectedApplication.resumeUrl, '_blank')}
                  style={{
                    padding: '0.8em 1.5em',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Resume
                </button>
                <button
                  onClick={() => window.open(selectedApplication.portfolio, '_blank')}
                  style={{
                    padding: '0.8em 1.5em',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Portfolio
                </button>
              </div>
            </div>

            {/* Cover Letter Section */}
            <div style={{ 
              gridColumn: '1 / -1',
              marginTop: '1em'
            }}>
              <h4 style={{ 
                marginTop: 0,
                paddingBottom: '0.5em',
                borderBottom: '2px solid #6c757d'
              }}>Cover Letter</h4>
              <div style={{ 
                padding: '1.5em',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                whiteSpace: 'pre-wrap'
              }}>
                {selectedApplication.coverLetter}
              </div>
            </div>

            {/* Status Update Section - Only show for current interns */}
            {selectedApplication.status === 'current_intern' && (
              <div style={{ 
                gridColumn: '1 / -1',
                marginTop: '2em',
                padding: '1.5em',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => {
                    handleStatusUpdate(
                      selectedApplication.id,
                      'internship_completed',
                      selectedApplication.startDate,
                      new Date().toISOString().split('T')[0]
                    );
                    // Return to the list view after completing the internship
                    setSelectedApplication(null);
                  }}
                  style={{
                    padding: '0.8em 1.5em',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1em'
                  }}
                >
                  Complete Internship
                </button>
              </div>
            )}

            {/* Add Evaluation Section for completed internships */}
            {selectedApplication.status === 'internship_completed' && (
              <div style={{ 
                gridColumn: '1 / -1',
                marginTop: '2em',
                padding: '1.5em',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                  <h4 style={{ margin: 0 }}>Internship Evaluation</h4>
                  {!evaluations.find(evaluation => evaluation.applicationId === selectedApplication.id) && (
                    <button
                      onClick={() => handleCreateEvaluation(selectedApplication.id)}
                      style={{
                        padding: '0.8em 1.5em',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Create Evaluation
                    </button>
                  )}
                </div>

                {evaluations.filter(evaluation => evaluation.applicationId === selectedApplication.id).map(evaluation => (
                  <div key={evaluation.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5em',
                    borderRadius: '8px',
                    marginBottom: '1em'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1em', marginBottom: '1em' }}>
                      <div>
                        <strong>Overall Rating:</strong> {evaluation.overallRating}/5
                      </div>
                      <div>
                        <strong>Technical Skills:</strong> {evaluation.technicalSkills}/5
                      </div>
                      <div>
                        <strong>Soft Skills:</strong> {evaluation.softSkills}/5
                      </div>
                      <div>
                        <strong>Work Quality:</strong> {evaluation.workQuality}/5
                      </div>
                      <div>
                        <strong>Punctuality:</strong> {evaluation.punctuality}/5
                      </div>
                      <div>
                        <strong>Adaptability:</strong> {evaluation.adaptability}/5
                      </div>
                    </div>

                    <div style={{ marginBottom: '1em' }}>
                      <strong>Comments:</strong>
                      <p style={{ margin: '0.5em 0' }}>{evaluation.comments}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <small>Evaluated by {evaluation.evaluatedBy} on {evaluation.evaluationDate}</small>
                      </div>
                      <div style={{ display: 'flex', gap: '1em' }}>
                        <button
                          onClick={() => handleEditEvaluation(evaluation)}
                          style={{
                            padding: '0.5em 1em',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvaluation(evaluation.id)}
                          style={{
                            padding: '0.5em 1em',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Evaluation Form Modal */}
            {showEvaluationForm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999
              }}>
                <EvaluationForm 
                  application={selectedApplication}
                  initialData={currentEvaluation}
                  onSubmit={(formData) => {
                    handleSubmitEvaluation(
                      { preventDefault: () => {} },
                      selectedApplication.id,
                      formData
                    );
                  }}
                  onCancel={() => setShowEvaluationForm(false)}
                />
              </div>
            )}

            {/* Download Options */}
            <div style={{ 
              gridColumn: '1 / -1',
              marginTop: '2em',
              padding: '1.5em',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              display: 'flex',
              gap: '1em',
              flexWrap: 'wrap'
            }}>
              <h4 style={{ width: '100%', margin: '0 0 1em 0' }}>Download Documents</h4>
              
              <button
                onClick={() => generateInternDetailsPDF(selectedApplication)}
                style={{
                  padding: '0.8em 1.5em',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5em'
                }}
              >
                Download Intern Details
              </button>

              {selectedApplication.status === 'internship_completed' && (
                <>
                  <button
                    onClick={() => generateInternshipCertificate(selectedApplication)}
                    style={{
                      padding: '0.8em 1.5em',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em'
                    }}
                  >
                    Download Certificate
                  </button>

                  {evaluations.find(evaluation => evaluation.applicationId === selectedApplication.id) && (
                    <button
                      onClick={() => {
                        const evaluation = evaluations.find(
                          evaluation => evaluation.applicationId === selectedApplication.id
                        );
                        generateEvaluationPDF(evaluation, selectedApplication);
                      }}
                      style={{
                        padding: '0.8em 1.5em',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5em'
                      }}
                    >
                      Download Evaluation Report
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
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
