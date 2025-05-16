import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { jsPDF } from 'jspdf';
import Notification from "../components/Notification";
import { useNavigate } from 'react-router-dom';

// Add new imports for icons
import { 
  FaUsers, 
  FaBuilding, 
  FaVideo, 
  FaChartBar, 
  FaFileAlt, 
  FaCalendarAlt,
  FaBell,
  FaSearch
} from 'react-icons/fa';

// At the top, add a global style block for font and background
<style>{`
  body {
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: #f3f4f6;
    color: #222;
  }
`}</style>

export default function SCADOfficeDashboard() {
  const navigate = useNavigate();
  // Add notifications state
  const [notifications, setNotifications] = useState([]);

  // Company applications with more detailed information
  const [companyApplications, setCompanyApplications] = useState([]);
  const [acceptedCompanies, setAcceptedCompanies] = useState([]);
  const [rejectedCompanies, setRejectedCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");
  const [acceptedSearchTerm, setAcceptedSearchTerm] = useState("");
  const [rejectedSearchTerm, setRejectedSearchTerm] = useState("");
  const [pendingIndustryFilter, setPendingIndustryFilter] = useState("all");
  const [acceptedIndustryFilter, setAcceptedIndustryFilter] = useState("all");
  const [rejectedIndustryFilter, setRejectedIndustryFilter] = useState("all");
  const [internshipSearchTerm, setInternshipSearchTerm] = useState("");
  const [internshipIndustryFilter, setInternshipIndustryFilter] = useState("all");
  const [internshipDurationFilter, setInternshipDurationFilter] = useState("all");
  const [internshipPaymentFilter, setInternshipPaymentFilter] = useState("all");

  // Sample internship data
  const [availableInternships] = useState([
    {
      id: 1,
      companyName: "TechCorp Solutions",
      jobTitle: "Software Development Intern",
      duration: "3 months",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      location: "Cairo, Egypt",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Knowledge of JavaScript, React, and Node.js",
        "Strong problem-solving skills",
        "Good communication abilities"
      ],
      responsibilities: [
        "Assist in developing web applications",
        "Participate in code reviews",
        "Work on bug fixes and feature implementation",
        "Collaborate with the development team"
      ],
      benefits: [
        "Flexible work hours",
        "Remote work options",
        "Professional development budget",
        "Mentorship program",
        "Free access to premium learning platforms",
        "Team building activities"
      ],
      stipend: "3,000 - 4,000 EGP/month",
      companyBrief: "Leading technology solutions provider specializing in enterprise software and cloud services.",
      industry: "Technology",
      applicationDeadline: "2024-05-15",
      spotsAvailable: 5,
      size: "500-1000 employees",
      founded: "2015",
      companyLocation: "Cairo, Egypt",
      companyWebsite: "www.techcorp.com",
      companyEmail: "hr@techcorp.com"
    },
    {
      id: 2,
      companyName: "EduSoft International",
      jobTitle: "Educational Technology Intern",
      duration: "4 months",
      startDate: "2024-07-01",
      endDate: "2024-10-31",
      location: "Alexandria, Egypt",
      requirements: [
        "Background in Education or Computer Science",
        "Interest in educational technology",
        "Basic programming knowledge",
        "Creative thinking and innovation"
      ],
      responsibilities: [
        "Assist in developing educational software",
        "Help create interactive learning materials",
        "Support in user testing and feedback collection",
        "Participate in educational content development"
      ],
      benefits: [
        "Competitive stipend",
        "Work from home options",
        "Access to educational resources",
        "Networking opportunities",
        "Certificate of completion",
        "Potential full-time offer"
      ],
      stipend: "2,500 - 3,500 EGP/month",
      companyBrief: "Innovative ed-tech company developing learning management systems and educational software.",
      industry: "Education Technology",
      applicationDeadline: "2024-06-15",
      spotsAvailable: 3,
      size: "100-500 employees",
      founded: "2018",
      companyLocation: "Alexandria, Egypt",
      companyWebsite: "www.edusoft.com",
      companyEmail: "contact@edusoft.com"
    },
    {
      id: 3,
      companyName: "GreenEnergy Solutions",
      jobTitle: "Renewable Energy Intern",
      duration: "3 months",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      location: "Giza, Egypt",
      requirements: [
        "Background in Engineering or Environmental Science",
        "Interest in renewable energy",
        "Basic knowledge of solar/wind systems",
        "Project management skills"
      ],
      responsibilities: [
        "Assist in solar panel installation projects",
        "Support in energy efficiency assessments",
        "Help with data collection and analysis",
        "Participate in environmental impact studies"
      ],
      benefits: [
        "Field work experience",
        "Sustainability training",
        "Professional equipment access",
        "Environmental certification support",
        "Green energy workshops",
        "Project site visits"
      ],
      stipend: "2,800 - 3,800 EGP/month",
      companyBrief: "Sustainable energy solutions provider focusing on solar and wind power projects.",
      industry: "Renewable Energy",
      applicationDeadline: "2024-05-15",
      spotsAvailable: 2,
      size: "50-100 employees",
      founded: "2019",
      companyLocation: "Giza, Egypt",
      companyWebsite: "www.greenenergy.com",
      companyEmail: "info@greenenergy.com"
    },
    {
      id: 4,
      companyName: "HealthTech Innovations",
      jobTitle: "Healthcare Technology Intern",
      duration: "6 months",
      startDate: "2024-07-01",
      endDate: "2024-12-31",
      location: "Cairo, Egypt",
      requirements: [
        "Background in Healthcare or Computer Science",
        "Interest in healthcare technology",
        "Basic programming knowledge",
        "Understanding of healthcare systems"
      ],
      responsibilities: [
        "Assist in developing healthcare applications",
        "Support in medical data analysis",
        "Help with user interface testing",
        "Participate in healthcare system integration"
      ],
      benefits: [
        "Healthcare industry exposure",
        "Medical software training",
        "Health data privacy certification",
        "Professional networking events",
        "Research publication opportunities",
        "Healthcare technology workshops"
      ],
      stipend: "3,200 - 4,200 EGP/month",
      companyBrief: "Healthcare technology company developing innovative medical software solutions.",
      industry: "Healthcare Technology",
      applicationDeadline: "2024-06-15",
      spotsAvailable: 4,
      size: "100-500 employees",
      founded: "2016",
      companyLocation: "Cairo, Egypt",
      companyWebsite: "www.healthtech.com",
      companyEmail: "careers@healthtech.com"
    },
    {
      id: 5,
      companyName: "FinTech Dynamics",
      jobTitle: "Financial Technology Intern",
      duration: "4 months",
      startDate: "2024-06-01",
      endDate: "2024-09-30",
      location: "Cairo, Egypt",
      requirements: [
        "Background in Finance, Economics, or Computer Science",
        "Interest in financial technology",
        "Basic programming knowledge",
        "Understanding of financial markets"
      ],
      responsibilities: [
        "Assist in developing financial applications",
        "Support in market research",
        "Help with data analysis",
        "Participate in product testing"
      ],
      benefits: [
        "Competitive compensation",
        "Hybrid work model",
        "Financial industry exposure",
        "Professional certification support",
        "Career development workshops",
        "Access to financial databases"
      ],
      stipend: "3,500 - 4,500 EGP/month",
      companyBrief: "Financial technology company providing innovative banking and payment solutions.",
      industry: "Financial Technology",
      applicationDeadline: "2024-05-15",
      spotsAvailable: 3,
      size: "50-100 employees",
      founded: "2017",
      companyLocation: "Cairo, Egypt",
      companyWebsite: "www.fintech.com",
      companyEmail: "hr@fintech.com"
    }
  ]);

  // Get unique industries for filter options
  const industries = ["all", ...new Set(companyApplications.map(company => company.industry))];

  // Get unique values for filters
  const internshipIndustries = ["all", ...new Set(availableInternships.map(internship => internship.industry))];
  const internshipDurations = ["all", ...new Set(availableInternships.map(internship => internship.duration))];
  const internshipPaymentTypes = ["all", "paid", "unpaid"];

  // Handle company decision
  const handleCompanyDecision = (company, decision) => {
    const decisionDate = new Date().toISOString().split('T')[0];
    
    if (decision === 'accept') {
      // Remove from pending applications
      const updatedApplications = companyApplications.filter(app => app.id !== company.id);
      setCompanyApplications(updatedApplications);
      localStorage.setItem('companyApplications', JSON.stringify(updatedApplications));

      // Add to accepted companies
      const acceptedCompany = {
        ...company,
        status: 'accepted',
        decisionDate
      };
      const acceptedCompanies = JSON.parse(localStorage.getItem('acceptedCompanies') || '[]');
      acceptedCompanies.push(acceptedCompany);
      localStorage.setItem('acceptedCompanies', JSON.stringify(acceptedCompanies));
      setAcceptedCompanies(acceptedCompanies);
    } else {
      // Remove from pending applications
      const updatedApplications = companyApplications.filter(app => app.id !== company.id);
      setCompanyApplications(updatedApplications);
      localStorage.setItem('companyApplications', JSON.stringify(updatedApplications));

      // Add to rejected companies
      const rejectedCompany = {
        ...company,
        status: 'rejected',
        decisionDate
      };
      const rejectedCompanies = JSON.parse(localStorage.getItem('rejectedCompanies') || '[]');
      rejectedCompanies.push(rejectedCompany);
      localStorage.setItem('rejectedCompanies', JSON.stringify(rejectedCompanies));
      setRejectedCompanies(rejectedCompanies);
    }

    // Close the modal
    setSelectedCompany(null);
  };

  // Filter companies based on search term and industry
  const filteredPendingCompanies = companyApplications.filter(company =>
    (company.name.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(pendingSearchTerm.toLowerCase())) &&
    (pendingIndustryFilter === "all" || company.industry === pendingIndustryFilter)
  );

  const filteredAcceptedCompanies = acceptedCompanies.filter(company =>
    (company.name.toLowerCase().includes(acceptedSearchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(acceptedSearchTerm.toLowerCase())) &&
    (acceptedIndustryFilter === "all" || company.industry === acceptedIndustryFilter)
  );

  const filteredRejectedCompanies = rejectedCompanies.filter(company =>
    (company.name.toLowerCase().includes(rejectedSearchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(rejectedSearchTerm.toLowerCase())) &&
    (rejectedIndustryFilter === "all" || company.industry === rejectedIndustryFilter)
  );

  // Filter internships based on search term and filters
  const filteredInternships = availableInternships.filter(internship => {
    const searchTerm = internshipSearchTerm.toLowerCase();
    const matchesSearch = internship.companyName.toLowerCase().includes(searchTerm) ||
                         internship.jobTitle.toLowerCase().includes(searchTerm);
    
    const matchesIndustry = internshipIndustryFilter === "all" || 
                           internship.industry === internshipIndustryFilter;
    
    const matchesDuration = internshipDurationFilter === "all" || 
                           internship.duration === internshipDurationFilter;
    
    const matchesPayment = internshipPaymentFilter === "all" || 
                          (internshipPaymentFilter === "paid" && internship.stipend !== "Unpaid") ||
                          (internshipPaymentFilter === "unpaid" && internship.stipend === "Unpaid");

    return matchesSearch && matchesIndustry && matchesDuration && matchesPayment;
  });

  // Function to handle file download
  const handleFileDownload = async (doc) => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      
      // For PDFs, we'll use the direct URL
      if (doc.type === "pdf") {
        link.href = doc.url;
        link.download = doc.downloadName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } 
      // For images (logos), we'll convert them to PDF before download
      else if (doc.type === "image") {
        try {
          // Create a canvas to convert image to PDF
          const canvas = document.createElement('canvas');
          const img = new Image();
          img.crossOrigin = "Anonymous";
          
          // Create a promise to handle the image loading
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = doc.url;
          });
          
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Convert canvas to PDF using jsPDF
          const pdf = new jsPDF({
            orientation: img.width > img.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [img.width, img.height]
          });
          
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, img.width, img.height);
          const pdfBlob = pdf.output('blob');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = doc.downloadName.replace(/\.[^/.]+$/, '.pdf');
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the object URL
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Error converting image to PDF:', error);
          alert('Error converting image to PDF. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  // Internship Details Modal
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Update the document display in the modal
  const renderDocuments = (documents) => (
    <div style={{ marginTop: "1rem" }}>
      <strong>Documents:</strong>
      <div style={{ marginTop: "0.5rem" }}>
        {documents.map((doc, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem",
            background: "#f5f5f5",
            borderRadius: "4px",
            marginBottom: "0.5rem"
          }}>
            <span style={{ color: "#666" }}>{doc.name}</span>
            <span style={{ color: "#999", fontSize: "0.9rem" }}>
              ({doc.type.toUpperCase()}, {doc.size})
            </span>
            <button
              onClick={() => handleFileDownload(doc)}
              style={{
                padding: "0.25rem 0.5rem",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <span>📄</span> Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Add state for internship cycles
  const [internshipCycles, setInternshipCycles] = useState([
    {
      id: 1,
      name: "Summer 2024",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
      createdAt: "2024-03-01",
      createdBy: "SCAD Office"
    },
    {
      id: 2,
      name: "Fall 2024",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
      status: "scheduled",
      createdAt: "2024-03-15",
      createdBy: "SCAD Office"
    },
    {
      id: 3,
      name: "Spring 2025",
      startDate: "2025-01-01",
      endDate: "2025-04-30",
      status: "scheduled",
      createdAt: "2024-03-15",
      createdBy: "SCAD Office"
    },
    {
      id: 4,
      name: "Summer 2025",
      startDate: "2025-05-01",
      endDate: "2025-08-31",
      status: "scheduled",
      createdAt: "2024-03-15",
      createdBy: "SCAD Office"
    },
    {
      id: 5,
      name: "Fall 2025",
      startDate: "2025-09-01",
      endDate: "2025-12-31",
      status: "scheduled",
      createdAt: "2024-03-15",
      createdBy: "SCAD Office"
    }
  ]);

  const [showCycleModal, setShowCycleModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [newCycle, setNewCycle] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "scheduled"
  });

  // Function to handle creating/editing internship cycle
  const handleCycleSubmit = (e) => {
    e.preventDefault();
    if (selectedCycle) {
      // Edit existing cycle
      setInternshipCycles(cycles => 
        cycles.map(cycle => 
          cycle.id === selectedCycle.id 
            ? { ...cycle, ...newCycle }
            : cycle
        )
      );
    } else {
      // Create new cycle
      const cycle = {
        id: Date.now(),
        ...newCycle,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: "SCAD Office"
      };
      setInternshipCycles(cycles => [...cycles, cycle]);
    }
    setShowCycleModal(false);
    setSelectedCycle(null);
    setNewCycle({
      name: "",
      startDate: "",
      endDate: "",
      status: "scheduled"
    });
  };

  // Function to handle cycle status change
  const handleCycleStatusChange = (cycleId, newStatus) => {
    setInternshipCycles(cycles =>
      cycles.map(cycle =>
        cycle.id === cycleId
          ? { ...cycle, status: newStatus }
          : cycle
      )
    );
  };

  // Update the students state with more sample reports
  const [students, setStudents] = useState([
    {
      id: "52-1111",
      fullName: "Ahmed Mohamed Ali",
      email: "ahmed.mohamed@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Computer Science",
      gpa: 3.8,
      phoneNumber: "+20 123 456 7890",
      address: "Cairo, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "TechCorp Solutions",
          position: "Software Development Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "approved",
              fileUrl: "/reports/52-1111-final.pdf",
              content: {
                learningObjectives: [
                  "Gained hands-on experience in software development",
                  "Learned about enterprise software architecture",
                  "Developed skills in team collaboration"
                ],
                keyResponsibilities: [
                  "Developed web applications using React",
                  "Participated in code reviews",
                  "Fixed bugs and implemented features"
                ],
                skillsAcquired: [
                  "React.js",
                  "Node.js",
                  "Git",
                  "Agile methodologies"
                ],
                challengesOvercome: [
                  "Learning new technologies",
                  "Meeting project deadlines",
                  "Working in a team environment"
                ],
                achievements: [
                  "Successfully implemented 3 major features",
                  "Reduced bug count by 40%",
                  "Received positive feedback from team lead"
                ],
                futureGoals: [
                  "Master full-stack development",
                  "Learn cloud technologies",
                  "Contribute to open-source projects"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "55-2222",
      fullName: "Sarah Hassan Ibrahim",
      email: "sarah.hassan@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Business Administration",
      gpa: 3.9,
      phoneNumber: "+20 123 456 7891",
      address: "Alexandria, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "EduSoft International",
          position: "Business Development Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "pending",
              fileUrl: "/reports/55-2222-final.pdf",
              content: {
                learningObjectives: [
                  "Gained experience in business development",
                  "Learned about market analysis",
                  "Developed skills in client relations"
                ],
                keyResponsibilities: [
                  "Conducted market research",
                  "Assisted in business proposals",
                  "Participated in client meetings"
                ],
                skillsAcquired: [
                  "Market analysis",
                  "Business strategy",
                  "Client management",
                  "Project management"
                ],
                challengesOvercome: [
                  "Understanding market dynamics",
                  "Managing client expectations",
                  "Working under tight deadlines"
                ],
                achievements: [
                  "Contributed to 2 successful business proposals",
                  "Improved client satisfaction by 25%",
                  "Received recognition for innovative solutions"
                ],
                futureGoals: [
                  "Pursue a career in business development",
                  "Develop strategic planning skills",
                  "Lead business development projects"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "58-3333",
      fullName: "Mohamed Ali Hassan",
      email: "mohamed.ali@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Mechanical Engineering",
      gpa: 3.7,
      phoneNumber: "+20 123 456 7892",
      address: "Giza, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "GreenEnergy Solutions",
          position: "Engineering Research Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "flagged",
              fileUrl: "/reports/58-3333-final.pdf",
              content: {
                learningObjectives: [
                  "Gained experience in renewable energy systems",
                  "Learned about mechanical design",
                  "Developed skills in research methodology"
                ],
                keyResponsibilities: [
                  "Assisted in mechanical design",
                  "Conducted energy efficiency analysis",
                  "Participated in research projects"
                ],
                skillsAcquired: [
                  "CAD software",
                  "Energy analysis",
                  "Research methodology",
                  "Technical documentation"
                ],
                challengesOvercome: [
                  "Complex mechanical systems",
                  "Data analysis challenges",
                  "Technical documentation"
                ],
                achievements: [
                  "Improved system efficiency by 15%",
                  "Contributed to 2 research papers",
                  "Developed new testing methodology"
                ],
                futureGoals: [
                  "Specialize in renewable energy",
                  "Pursue advanced research",
                  "Develop sustainable solutions"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "64-4444",
      fullName: "Nour Ibrahim Mohamed",
      email: "nour.ibrahim@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Electrical Engineering",
      gpa: 3.6,
      phoneNumber: "+20 123 456 7893",
      address: "Cairo, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "FinTech Dynamics",
          position: "Hardware Development Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "rejected",
              fileUrl: "/reports/64-4444-final.pdf",
              content: {
                learningObjectives: [
                  "Gained experience in hardware development",
                  "Learned about circuit design",
                  "Developed skills in testing and validation"
                ],
                keyResponsibilities: [
                  "Assisted in circuit design",
                  "Conducted hardware testing",
                  "Participated in product development"
                ],
                skillsAcquired: [
                  "Circuit design",
                  "Hardware testing",
                  "PCB design",
                  "Technical documentation"
                ],
                challengesOvercome: [
                  "Complex circuit designs",
                  "Testing challenges",
                  "Documentation requirements"
                ],
                achievements: [
                  "Successfully tested 5 new circuits",
                  "Improved testing efficiency by 20%",
                  "Contributed to product documentation"
                ],
                futureGoals: [
                  "Specialize in hardware development",
                  "Learn advanced circuit design",
                  "Contribute to innovative products"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "52-5555",
      fullName: "Omar Hassan Ali",
      email: "omar.hassan@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Civil Engineering",
      gpa: 3.5,
      phoneNumber: "+20 123 456 7894",
      address: "Cairo, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "Construction Plus",
          position: "Civil Engineering Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "approved",
              fileUrl: "/reports/52-5555-final.pdf",
              content: {
                learningObjectives: [
                  "Gained experience in construction management",
                  "Learned about structural design",
                  "Developed skills in project planning"
                ],
                keyResponsibilities: [
                  "Assisted in structural analysis",
                  "Participated in site inspections",
                  "Helped with project documentation"
                ],
                skillsAcquired: [
                  "Structural analysis",
                  "Project management",
                  "AutoCAD",
                  "Site inspection"
                ],
                challengesOvercome: [
                  "Complex structural calculations",
                  "Site safety management",
                  "Project timeline constraints"
                ],
                achievements: [
                  "Contributed to 3 successful projects",
                  "Improved inspection efficiency by 30%",
                  "Received safety recognition"
                ],
                futureGoals: [
                  "Specialize in structural engineering",
                  "Obtain professional certification",
                  "Lead construction projects"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "55-6666",
      fullName: "Layla Ahmed Hassan",
      email: "layla.ahmed@student.guc.edu.eg",
      registrationDate: "2022-09-01",
      major: "Architecture",
      gpa: 3.9,
      phoneNumber: "+20 123 456 7895",
      address: "Alexandria, Egypt",
      graduationYear: "2025",
      internships: [
        {
          id: 1,
          companyName: "Design Studio",
          position: "Architectural Design Intern",
          startDate: "2024-01-01",
          endDate: "2024-03-31",
          status: "completed",
          reports: [
            {
              id: 1,
              title: "Final Internship Report",
              submissionDate: "2024-03-15",
              status: "approved",
              fileUrl: "/reports/55-6666-final.pdf",
              content: {
                learningObjectives: [
                  "Gained experience in architectural design",
                  "Learned about sustainable architecture",
                  "Developed skills in 3D modeling"
                ],
                keyResponsibilities: [
                  "Assisted in design development",
                  "Created 3D models",
                  "Participated in client presentations"
                ],
                skillsAcquired: [
                  "AutoCAD",
                  "Revit",
                  "3D modeling",
                  "Design presentation"
                ],
                challengesOvercome: [
                  "Complex design requirements",
                  "Client feedback integration",
                  "Software learning curve"
                ],
                achievements: [
                  "Contributed to 4 design projects",
                  "Improved design efficiency by 25%",
                  "Received client appreciation"
                ],
                futureGoals: [
                  "Specialize in sustainable architecture",
                  "Develop innovative designs",
                  "Lead architectural projects"
                ]
              }
            }
          ]
        }
      ]
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Update the filter students function
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(studentSearchTerm.toLowerCase());
    
    const matchesStatus = 
      studentStatusFilter === "all" || 
      student.internships.some(internship => internship.status === studentStatusFilter);

    return matchesSearch && matchesStatus;
  });

  // Function to generate PDF report
  const generateReportPDF = (student, internship, report) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Add header
    pdf.setFontSize(16);
    pdf.setTextColor(25, 118, 210); // #1976d2
    pdf.text("Internship Final Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    // Add student information
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Student Information:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Name: ${student.fullName}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`ID: ${student.id}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Major: ${student.major}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Email: ${student.email}`, margin, yPosition);
    yPosition += 15;

    // Add internship information
    pdf.setFontSize(12);
    pdf.text("Internship Details:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Company: ${internship.companyName}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Position: ${internship.position}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Duration: ${internship.startDate} to ${internship.endDate}`, margin, yPosition);
    yPosition += 15;

    // Add report content
    pdf.setFontSize(12);
    pdf.text("Internship Experience:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);

    // Learning Objectives
    pdf.text("Learning Objectives:", margin, yPosition);
    yPosition += 7;
    report.content.learningObjectives.forEach(objective => {
      pdf.text(`• ${objective}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Key Responsibilities
    pdf.text("Key Responsibilities:", margin, yPosition);
    yPosition += 7;
    report.content.keyResponsibilities.forEach(responsibility => {
      pdf.text(`• ${responsibility}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Skills Acquired
    pdf.text("Skills Acquired:", margin, yPosition);
    yPosition += 7;
    report.content.skillsAcquired.forEach(skill => {
      pdf.text(`• ${skill}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Challenges Overcome
    pdf.text("Challenges Overcome:", margin, yPosition);
    yPosition += 7;
    report.content.challengesOvercome.forEach(challenge => {
      pdf.text(`• ${challenge}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Achievements
    pdf.text("Achievements:", margin, yPosition);
    yPosition += 7;
    report.content.achievements.forEach(achievement => {
      pdf.text(`• ${achievement}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Future Goals
    pdf.text("Future Goals:", margin, yPosition);
    yPosition += 7;
    report.content.futureGoals.forEach(goal => {
      pdf.text(`• ${goal}`, margin + 5, yPosition);
      yPosition += 7;
    });

    return pdf;
  };

  // Function to handle report download
  const handleReportDownload = (student, internship, report) => {
    try {
      const pdf = generateReportPDF(student, internship, report);
      pdf.save(`${student.id}-${internship.companyName.toLowerCase().replace(/\s+/g, '-')}-report.pdf`);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Error generating report. Please try again.');
    }
  };

  // Render report section
  const renderReportSection = (internship) => {
    if (internship.reports.length > 0 && internship.status === "completed") {
      return (
        <div style={{ marginTop: "0.5rem" }}>
          <p style={{ color: "#666", marginBottom: "0.25rem" }}>
            <strong>Final Report:</strong>
          </p>
          {internship.reports.map((report, reportIndex) => (
            <div key={reportIndex} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              background: "#f8f9fa",
              borderRadius: "4px",
              marginTop: "0.25rem"
            }}>
              <div>
                <span style={{ color: "#666", fontSize: "0.9rem" }}>
                  {report.title} ({report.submissionDate})
                </span>
                <div style={{ marginTop: "0.25rem" }}>
                  <span style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    background: report.status === "approved" ? "#e8f5e9" : "#e3f2fd",
                    color: report.status === "approved" ? "#2e7d32" : "#1976d2"
                  }}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleReportDownload(selectedStudent, internship, report)}
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Download Report
              </button>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render student information section
  const renderStudentInfo = (student) => {
    return (
      <div>
        <h4 style={{ color: "#1976d2", marginBottom: "1rem" }}>Personal Information</h4>
        <div style={{ 
          background: "#f8f9fa", 
          padding: "1rem",
          borderRadius: "8px"
        }}>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Full Name:</strong> {student.fullName}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Student ID:</strong> {student.id}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Email:</strong> {student.email}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Phone:</strong> {student.phoneNumber}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Address:</strong> {student.address}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Major:</strong> {student.major}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>GPA:</strong> {student.gpa}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Graduation Year:</strong> {student.graduationYear}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Registration Date:</strong> {student.registrationDate}
          </p>
        </div>
      </div>
    );
  };

  // Add state for reports modal
  const [showReportsModal, setShowReportsModal] = useState(false);

  // Function to get all submitted reports
  const getAllSubmittedReports = () => {
    const allReports = [];
    students.forEach(student => {
      student.internships.forEach(internship => {
        if (internship.status === "completed" && internship.reports.length > 0) {
          internship.reports.forEach(report => {
            allReports.push({
              student: student,
              internship: internship,
              report: report
            });
          });
        }
      });
    });
    return allReports;
  };

  // Add state for reports search
  const [reportsSearchTerm, setReportsSearchTerm] = useState("");

  // Add state for report filters
  const [reportStatusFilter, setReportStatusFilter] = useState("all");
  const [reportMajorFilter, setReportMajorFilter] = useState("all");

  // Update the getFilteredReports function to include status and major filtering
  const getFilteredReports = () => {
    const searchTerm = reportsSearchTerm.toLowerCase();
    return getAllSubmittedReports().filter(item => {
      const matchesSearch = 
        item.student.fullName.toLowerCase().includes(searchTerm) ||
        item.internship.companyName.toLowerCase().includes(searchTerm) ||
        item.internship.position.toLowerCase().includes(searchTerm) ||
        item.student.id.toLowerCase().includes(searchTerm);
      
      const matchesStatus = 
        reportStatusFilter === "all" || 
        item.report.status === reportStatusFilter;
      
      const matchesMajor = 
        reportMajorFilter === "all" || 
        item.student.major === reportMajorFilter;

      return matchesSearch && matchesStatus && matchesMajor;
    });
  };

  // Get unique majors for filter
  const majors = ["all", ...new Set(students.map(student => student.major))];

  // Add state for evaluation reports
  const [evaluationReports, setEvaluationReports] = useState([
    {
      id: 1,
      student: {
        id: "52-1111",
        fullName: "Ahmed Mohamed Ali",
        major: "Computer Science",
        email: "ahmed.mohamed@student.guc.edu.eg"
      },
      company: {
        name: "TechCorp Solutions",
        supervisor: "Dr. Mahmoud Hassan",
        supervisorPosition: "Senior Software Architect",
        supervisorEmail: "mahmoud.hassan@techcorp.com",
        supervisorPhone: "+20 123 456 7890"
      },
      internship: {
        position: "Software Development Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 4.5,
        problemSolving: 4.0,
        communication: 4.2,
        teamwork: 4.3,
        initiative: 4.1,
        overallRating: 4.2,
        strengths: [
          "Excellent coding skills",
          "Strong problem-solving abilities",
          "Good team player",
          "Quick learner"
        ],
        areasForImprovement: [
          "Documentation skills",
          "Time management",
          "Presentation skills"
        ],
        comments: "Ahmed demonstrated exceptional technical skills and was a valuable addition to our team. He showed great initiative in learning new technologies and contributed significantly to our projects.",
        recommendation: "Highly recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Dr. Mahmoud Hassan"
      }
    },
    {
      id: 2,
      student: {
        id: "55-2222",
        fullName: "Sarah Hassan Ibrahim",
        major: "Business Administration",
        email: "sarah.hassan@student.guc.edu.eg"
      },
      company: {
        name: "EduSoft International",
        supervisor: "Ms. Fatima Ali",
        supervisorPosition: "Business Development Manager",
        supervisorEmail: "fatima.ali@edusoft.com",
        supervisorPhone: "+20 123 456 7891"
      },
      internship: {
        position: "Business Development Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 4.0,
        problemSolving: 4.3,
        communication: 4.5,
        teamwork: 4.4,
        initiative: 4.2,
        overallRating: 4.3,
        strengths: [
          "Excellent communication skills",
          "Strong analytical abilities",
          "Great team player",
          "Professional attitude"
        ],
        areasForImprovement: [
          "Technical knowledge",
          "Report writing",
          "Data analysis"
        ],
        comments: "Sarah showed great potential in business development. Her communication skills and professional attitude were outstanding. She needs to work on her technical knowledge and data analysis skills.",
        recommendation: "Recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Ms. Fatima Ali"
      }
    },
    {
      id: 3,
      student: {
        id: "58-3333",
        fullName: "Mohamed Ali Hassan",
        major: "Mechanical Engineering",
        email: "mohamed.ali@student.guc.edu.eg"
      },
      company: {
        name: "GreenEnergy Solutions",
        supervisor: "Eng. Karim Mohamed",
        supervisorPosition: "Senior Mechanical Engineer",
        supervisorEmail: "karim.mohamed@greenenergy.com",
        supervisorPhone: "+20 123 456 7892"
      },
      internship: {
        position: "Engineering Research Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 4.7,
        problemSolving: 4.6,
        communication: 4.3,
        teamwork: 4.4,
        initiative: 4.5,
        overallRating: 4.5,
        strengths: [
          "Outstanding technical knowledge",
          "Excellent problem-solving skills",
          "Strong research capabilities",
          "Innovative thinking"
        ],
        areasForImprovement: [
          "Presentation skills",
          "Project management",
          "Client communication"
        ],
        comments: "Mohamed exceeded our expectations in every aspect. His technical knowledge and problem-solving abilities were exceptional. He contributed significantly to our research projects and showed great potential for future leadership roles.",
        recommendation: "Highly recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Eng. Karim Mohamed"
      }
    },
    {
      id: 4,
      student: {
        id: "64-4444",
        fullName: "Nour Ibrahim Mohamed",
        major: "Electrical Engineering",
        email: "nour.ibrahim@student.guc.edu.eg"
      },
      company: {
        name: "FinTech Dynamics",
        supervisor: "Eng. Hala Ahmed",
        supervisorPosition: "Hardware Development Lead",
        supervisorEmail: "hala.ahmed@fintech.com",
        supervisorPhone: "+20 123 456 7893"
      },
      internship: {
        position: "Hardware Development Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 3.8,
        problemSolving: 3.7,
        communication: 4.0,
        teamwork: 4.2,
        initiative: 3.9,
        overallRating: 3.9,
        strengths: [
          "Good technical foundation",
          "Team collaboration",
          "Communication skills",
          "Willingness to learn"
        ],
        areasForImprovement: [
          "Circuit design skills",
          "Technical documentation",
          "Time management"
        ],
        comments: "Nour showed good potential and was a valuable team member. While her technical skills need improvement, she demonstrated strong communication abilities and a positive attitude. With more experience, she will become a competent engineer.",
        recommendation: "Recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Eng. Hala Ahmed"
      }
    },
    {
      id: 5,
      student: {
        id: "52-5555",
        fullName: "Omar Hassan Ali",
        major: "Civil Engineering",
        email: "omar.hassan@student.guc.edu.eg"
      },
      company: {
        name: "Construction Plus",
        supervisor: "Eng. Yasser Mohamed",
        supervisorPosition: "Project Manager",
        supervisorEmail: "yasser.mohamed@constructionplus.com",
        supervisorPhone: "+20 123 456 7894"
      },
      internship: {
        position: "Civil Engineering Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 4.2,
        problemSolving: 4.1,
        communication: 4.3,
        teamwork: 4.4,
        initiative: 4.0,
        overallRating: 4.2,
        strengths: [
          "Strong technical knowledge",
          "Good problem-solving abilities",
          "Excellent team player",
          "Site safety awareness"
        ],
        areasForImprovement: [
          "Project planning",
          "Cost estimation",
          "Client management"
        ],
        comments: "Omar performed well during his internship. He showed good technical knowledge and was particularly strong in site safety management. His team collaboration skills were excellent, and he contributed positively to our projects.",
        recommendation: "Recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Eng. Yasser Mohamed"
      }
    },
    {
      id: 6,
      student: {
        id: "55-6666",
        fullName: "Layla Ahmed Hassan",
        major: "Architecture",
        email: "layla.ahmed@student.guc.edu.eg"
      },
      company: {
        name: "Design Studio",
        supervisor: "Arch. Rania Hassan",
        supervisorPosition: "Senior Architect",
        supervisorEmail: "rania.hassan@designstudio.com",
        supervisorPhone: "+20 123 456 7895"
      },
      internship: {
        position: "Architectural Design Intern",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        duration: "3 months"
      },
      evaluation: {
        technicalSkills: 4.6,
        problemSolving: 4.5,
        communication: 4.4,
        teamwork: 4.3,
        initiative: 4.7,
        overallRating: 4.5,
        strengths: [
          "Exceptional design skills",
          "Strong technical knowledge",
          "Creative problem-solving",
          "Client presentation skills"
        ],
        areasForImprovement: [
          "Project timeline management",
          "Cost estimation",
          "Construction documentation"
        ],
        comments: "Layla demonstrated exceptional talent in architectural design. Her creative approach and technical skills were outstanding. She showed great initiative in learning new software and contributed innovative ideas to our projects.",
        recommendation: "Highly recommended for future opportunities",
        evaluationDate: "2024-03-31",
        evaluator: "Arch. Rania Hassan"
      }
    }
  ]);

  // Function to generate evaluation report PDF
  const generateEvaluationPDF = (report) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Add header
    pdf.setFontSize(16);
    pdf.setTextColor(25, 118, 210); // #1976d2
    pdf.text("Internship Evaluation Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    // Add student information
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Student Information:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Name: ${report.student.fullName}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`ID: ${report.student.id}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Major: ${report.student.major}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Email: ${report.student.email}`, margin, yPosition);
    yPosition += 15;

    // Add company information
    pdf.setFontSize(12);
    pdf.text("Company Information:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Company Name: ${report.company.name}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Supervisor: ${report.company.supervisor}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Position: ${report.company.supervisorPosition}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Email: ${report.company.supervisorEmail}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Phone: ${report.company.supervisorPhone}`, margin, yPosition);
    yPosition += 15;

    // Add internship details
    pdf.setFontSize(12);
    pdf.text("Internship Details:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Position: ${report.internship.position}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Duration: ${report.internship.duration}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Start Date: ${report.internship.startDate}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`End Date: ${report.internship.endDate}`, margin, yPosition);
    yPosition += 15;

    // Add evaluation scores
    pdf.setFontSize(12);
    pdf.text("Evaluation Scores:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Technical Skills: ${report.evaluation.technicalSkills}/5`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Problem Solving: ${report.evaluation.problemSolving}/5`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Communication: ${report.evaluation.communication}/5`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Teamwork: ${report.evaluation.teamwork}/5`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Initiative: ${report.evaluation.initiative}/5`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Overall Rating: ${report.evaluation.overallRating}/5`, margin, yPosition);
    yPosition += 15;

    // Add strengths
    pdf.setFontSize(12);
    pdf.text("Strengths:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    report.evaluation.strengths.forEach(strength => {
      pdf.text(`• ${strength}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Add areas for improvement
    pdf.setFontSize(12);
    pdf.text("Areas for Improvement:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    report.evaluation.areasForImprovement.forEach(area => {
      pdf.text(`• ${area}`, margin + 5, yPosition);
      yPosition += 7;
    });
    yPosition += 5;

    // Add comments
    pdf.setFontSize(12);
    pdf.text("Comments:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    const comments = pdf.splitTextToSize(report.evaluation.comments, pageWidth - 2 * margin);
    pdf.text(comments, margin, yPosition);
    yPosition += comments.length * 7 + 5;

    // Add recommendation
    pdf.setFontSize(12);
    pdf.text("Recommendation:", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(report.evaluation.recommendation, margin, yPosition);
    yPosition += 15;

    // Add evaluation details
    pdf.setFontSize(10);
    pdf.text(`Evaluation Date: ${report.evaluation.evaluationDate}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Evaluator: ${report.evaluation.evaluator}`, margin, yPosition);

    return pdf;
  };

  // Function to handle evaluation report download
  const handleEvaluationDownload = (report) => {
    try {
      const pdf = generateEvaluationPDF(report);
      pdf.save(`${report.student.id}-${report.company.name.toLowerCase().replace(/\s+/g, '-')}-evaluation.pdf`);
    } catch (error) {
      console.error('Error generating evaluation PDF:', error);
      alert('Error generating evaluation report. Please try again.');
    }
  };

  // Add state for evaluation search and filters
  const [evaluationSearchTerm, setEvaluationSearchTerm] = useState("");
  const [evaluationMajorFilter, setEvaluationMajorFilter] = useState("all");
  const [evaluationRatingFilter, setEvaluationRatingFilter] = useState("all");

  // Function to filter evaluation reports
  const getFilteredEvaluations = () => {
    const searchTerm = evaluationSearchTerm.toLowerCase();
    return evaluationReports.filter(report => {
      const matchesSearch = 
        report.student.fullName.toLowerCase().includes(searchTerm) ||
        report.student.id.toLowerCase().includes(searchTerm) ||
        report.company.name.toLowerCase().includes(searchTerm) ||
        report.internship.position.toLowerCase().includes(searchTerm);
      
      const matchesMajor = 
        evaluationMajorFilter === "all" || 
        report.student.major === evaluationMajorFilter;
      
      const matchesRating = 
        evaluationRatingFilter === "all" || 
        (evaluationRatingFilter === "excellent" && report.evaluation.overallRating >= 4.5) ||
        (evaluationRatingFilter === "good" && report.evaluation.overallRating >= 4.0 && report.evaluation.overallRating < 4.5) ||
        (evaluationRatingFilter === "average" && report.evaluation.overallRating >= 3.0 && report.evaluation.overallRating < 4.0) ||
        (evaluationRatingFilter === "below" && report.evaluation.overallRating < 3.0);

      return matchesSearch && matchesMajor && matchesRating;
    });
  };

  // Add state for statistics
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Function to calculate statistics
  const calculateStatistics = () => {
    // Get the selected cycle
    const selectedCycle = internshipCycles.find(cycle => cycle.id === selectedCycleId);
    
    // Sample data for each cycle
    const cycleData = {
      1: { // Summer 2024
        reports: { total: 35, accepted: 25, rejected: 5, flagged: 3, pending: 2 },
        companies: [
          { name: "TechCorp Solutions", rating: 4.8, internshipCount: 12 },
          { name: "EduSoft International", rating: 4.6, internshipCount: 10 },
          { name: "GreenEnergy Solutions", rating: 4.5, internshipCount: 8 }
        ],
        majors: [
          { name: "Computer Science", count: 15 },
          { name: "Business Administration", count: 10 },
          { name: "Mechanical Engineering", count: 8 }
        ],
        courses: [
          { name: "Software Engineering", count: 25 },
          { name: "Database Systems", count: 20 },
          { name: "Web Development", count: 18 },
          { name: "Mobile Development", count: 15 }
        ],
        totalCompanies: 8,
        totalStudents: 35
      },
      2: { // Fall 2024
        reports: { total: 42, accepted: 30, rejected: 7, flagged: 3, pending: 2 },
        companies: [
          { name: "FinTech Dynamics", rating: 4.9, internshipCount: 15 },
          { name: "MediTech Innovations", rating: 4.7, internshipCount: 12 },
          { name: "Construction Plus", rating: 4.6, internshipCount: 10 }
        ],
        majors: [
          { name: "Electrical Engineering", count: 18 },
          { name: "Civil Engineering", count: 12 },
          { name: "Architecture", count: 10 }
        ],
        courses: [
          { name: "Circuit Design", count: 22 },
          { name: "Structural Analysis", count: 20 },
          { name: "Digital Systems", count: 18 },
          { name: "Power Systems", count: 15 }
        ],
        totalCompanies: 10,
        totalStudents: 42
      },
      3: { // Spring 2025
        reports: { total: 38, accepted: 28, rejected: 6, flagged: 2, pending: 2 },
        companies: [
          { name: "Design Studio", rating: 4.8, internshipCount: 14 },
          { name: "TechCorp Solutions", rating: 4.7, internshipCount: 12 },
          { name: "EduSoft International", rating: 4.6, internshipCount: 10 }
        ],
        majors: [
          { name: "Computer Science", count: 16 },
          { name: "Business Administration", count: 12 },
          { name: "Mechanical Engineering", count: 8 }
        ],
        courses: [
          { name: "UI/UX Design", count: 24 },
          { name: "Mobile App Development", count: 20 },
          { name: "Cloud Computing", count: 16 },
          { name: "Web Development", count: 14 }
        ],
        totalCompanies: 9,
        totalStudents: 38
      },
      4: { // Summer 2025
        reports: { total: 50, accepted: 35, rejected: 8, flagged: 4, pending: 3 },
        companies: [
          { name: "GreenEnergy Solutions", rating: 4.9, internshipCount: 18 },
          { name: "MediTech Innovations", rating: 4.8, internshipCount: 15 },
          { name: "FinTech Dynamics", rating: 4.7, internshipCount: 12 },
          { name: "TechCorp Solutions", rating: 4.6, internshipCount: 10 },
          { name: "EduSoft International", rating: 4.5, internshipCount: 8 }
        ],
        majors: [
          { name: "Computer Science", count: 20 },
          { name: "Electrical Engineering", count: 15 },
          { name: "Business Administration", count: 10 }
        ],
        courses: [
          { name: "Machine Learning", count: 30 },
          { name: "Data Science", count: 25 },
          { name: "Cybersecurity", count: 22 },
          { name: "Cloud Architecture", count: 20 }
        ],
        totalCompanies: 12,
        totalStudents: 50
      },
      5: { // Fall 2025
        reports: { total: 45, accepted: 32, rejected: 7, flagged: 3, pending: 3 },
        companies: [
          { name: "Construction Plus", rating: 4.8, internshipCount: 16 },
          { name: "Design Studio", rating: 4.7, internshipCount: 14 },
          { name: "MediTech Innovations", rating: 4.6, internshipCount: 12 }
        ],
        majors: [
          { name: "Civil Engineering", count: 18 },
          { name: "Architecture", count: 15 },
          { name: "Mechanical Engineering", count: 10 }
        ],
        courses: [
          { name: "Sustainable Design", count: 28 },
          { name: "Building Information Modeling", count: 25 },
          { name: "Structural Engineering", count: 22 },
          { name: "Environmental Design", count: 18 }
        ],
        totalCompanies: 11,
        totalStudents: 45
      }
    };

    // Get data for selected cycle
    const cycleStats = cycleData[selectedCycle.id];

    // Report status statistics
    const reportStats = cycleStats.reports;

    // Company statistics
    const companyStats = {
      totalInternships: {},
      averageRatings: {},
      totalStudents: {}
    };

    // Add company data
    cycleStats.companies.forEach(company => {
      companyStats.totalInternships[company.name] = company.internshipCount;
      companyStats.averageRatings[company.name] = {
        total: company.rating * 10,
        count: 10
      };
    });

    // Course statistics
    const courseStats = {};
    cycleStats.majors.forEach(major => {
      courseStats[major.name] = major.count;
    });

    // Most used courses
    const mostUsedCourses = cycleStats.courses;

    // Calculate average review time (varying by cycle)
    const averageReviewTime = selectedCycle.id === 1 ? 7 : // Summer 2024
                            selectedCycle.id === 2 ? 5 : // Fall 2024
                            selectedCycle.id === 3 ? 6 : // Spring 2025
                            selectedCycle.id === 4 ? 8 : // Summer 2025
                            7; // Fall 2025

    return {
      reportStats,
      companyStats,
      courseStats,
      mostUsedCourses,
      averageReviewTime,
      cycleName: selectedCycle.name,
      totalCompanies: cycleStats.totalCompanies,
      totalStudents: cycleStats.totalStudents
    };
  };

  // Function to generate statistics PDF
  const generateStatisticsPDF = () => {
    const pdf = new jsPDF();
    const margin = 20;
    let yPosition = 20;
    const stats = calculateStatistics();

    // Title
    pdf.setFontSize(16);
    pdf.text("Internship Statistics Report", margin, yPosition);
    yPosition += 10;

    // Cycle Information
    pdf.setFontSize(12);
    pdf.text(`Cycle: ${stats.cycleName}`, margin, yPosition);
    yPosition += 10;

    // Report Status
    pdf.setFontSize(14);
    pdf.text("Report Status", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Total Reports: ${stats.reportStats.total}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Accepted: ${stats.reportStats.accepted}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Rejected: ${stats.reportStats.rejected}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Flagged: ${stats.reportStats.flagged}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Pending: ${stats.reportStats.pending}`, margin, yPosition);
    yPosition += 10;

    // Top Companies
    pdf.setFontSize(14);
    pdf.text("Top Companies by Internship Count", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    const companies = Object.entries(stats.companyStats.totalInternships)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    companies.forEach(([company, count]) => {
      pdf.text(`${company}: ${count} internships`, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 8;

    // Most Used Courses
    pdf.setFontSize(14);
    pdf.text("Most Used Courses in Internships", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    stats.mostUsedCourses.forEach(course => {
      pdf.text(course.name, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 8;

    // Performance Metrics
    pdf.setFontSize(14);
    pdf.text("Performance Metrics", margin, yPosition);
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Average Review Time: ${stats.averageReviewTime} days`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Total Companies: ${stats.totalCompanies}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Total Students: ${stats.totalStudents}`, margin, yPosition);

    return pdf;
  };

  // Function to handle statistics PDF download
  const handleStatisticsDownload = () => {
    generateStatisticsPDF();
  };

  // Add state for selected cycle at the top, after internshipCycles state
  const [selectedCycleId, setSelectedCycleId] = useState(internshipCycles.length > 0 ? internshipCycles[0].id : null);

  const [selectedStatsCycleId, setSelectedStatsCycleId] = useState("summer2024");
  const [videoCallSearchTerm, setVideoCallSearchTerm] = useState("");
  const [selectedStudentForCall, setSelectedStudentForCall] = useState(null);
  const [selectedCallDate, setSelectedCallDate] = useState("");
  const [selectedCallTime, setSelectedCallTime] = useState("");
  const [videoCallRequests, setVideoCallRequests] = useState([]);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [incomingVideoCallRequests, setIncomingVideoCallRequests] = useState([]);
  const [callReason, setCallReason] = useState("");
  const [notification, setNotification] = useState(null);
  const [hasCheckedNotifications, setHasCheckedNotifications] = useState(false);
  const [viewedNotificationIds, setViewedNotificationIds] = useState([]);
  const [outgoingVideoCallRequests, setOutgoingVideoCallRequests] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  // Add state to track last notified incoming call request
  const [lastIncomingCallId, setLastIncomingCallId] = useState(null);
  // Add state for video call modal and video enabled toggle
  const [showVideoCallSimModal, setShowVideoCallSimModal] = useState(false);
  const [currentCallAppointment, setCurrentCallAppointment] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  // Add state for microphone mute toggle
  const [micMuted, setMicMuted] = useState(false);
  // Add state for screen sharing toggle
  const [screenSharing, setScreenSharing] = useState(false);
  // Add after call-related state declarations
  const [otherPartyLeft, setOtherPartyLeft] = useState(false);

  // Effect to show notification for new incoming call requests
  useEffect(() => {
    if (incomingVideoCallRequests.length > 0) {
      // Find the most recent pending request
      const latestPending = incomingVideoCallRequests.find(r => r.status === 'pending' && r.id !== lastIncomingCallId);
      if (latestPending) {
        setNotification({
          message: `Incoming video call request from ${latestPending.studentName} (${latestPending.studentId}) for ${latestPending.date} at ${latestPending.time}.`,
          type: 'info',
          id: latestPending.id
        });
        setLastIncomingCallId(latestPending.id);
        // Auto-dismiss after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      }
    }
  }, [incomingVideoCallRequests]);

  // Load notifications and student requests from localStorage
  useEffect(() => {
    const loadNotificationsAndRequests = () => {
      // Load notifications
      const notifications = JSON.parse(localStorage.getItem('scadNotifications') || '[]');
      const viewedIds = JSON.parse(localStorage.getItem('viewedNotificationIds') || '[]');
      
      // Check for new notifications that haven't been viewed
      if (!hasCheckedNotifications) {
        const unviewedNotifications = notifications.filter(notification => 
          !viewedIds.includes(notification.id)
        );
        
        if (unviewedNotifications.length > 0) {
          // Get the most recent unviewed notification
          const latestNotification = unviewedNotifications.reduce((latest, current) => 
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
          );
          
          setNotification({
            message: latestNotification.message,
            type: latestNotification.type,
            id: latestNotification.id
          });
          
          // Mark this notification as viewed
          const updatedViewedIds = [...viewedIds, latestNotification.id];
          setViewedNotificationIds(updatedViewedIds);
          localStorage.setItem('viewedNotificationIds', JSON.stringify(updatedViewedIds));
        }
        setHasCheckedNotifications(true);
      }

      // Load student requests
      const studentRequests = JSON.parse(localStorage.getItem('studentVideoCallRequests') || '[]');
      const incomingRequests = studentRequests.filter(request => 
        request.type === 'incoming' && request.status === 'pending'
      );
      setIncomingVideoCallRequests(incomingRequests);
    };

    // Load initial data
    loadNotificationsAndRequests();

    // Set up an interval to check for new data
    const interval = setInterval(loadNotificationsAndRequests, 5000);

    return () => clearInterval(interval);
  }, [hasCheckedNotifications]);

  // Update notification close handler to mark as viewed
  const handleNotificationClose = () => {
    if (notification?.id) {
      const viewedIds = JSON.parse(localStorage.getItem('viewedNotificationIds') || '[]');
      if (!viewedIds.includes(notification.id)) {
        const updatedViewedIds = [...viewedIds, notification.id];
        localStorage.setItem('viewedNotificationIds', JSON.stringify(updatedViewedIds));
        setViewedNotificationIds(updatedViewedIds);
      }
    }
    setNotification(null);
  };

  const handleIncomingCallRequest = (requestId, decision) => {
    // Update local state
    setIncomingVideoCallRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: decision }
          : request
      )
    );

    // Update localStorage
    const storedRequests = JSON.parse(localStorage.getItem('studentVideoCallRequests') || '[]');
    const updatedRequests = storedRequests.map(request =>
      request.id === requestId
        ? { ...request, status: decision }
        : request
    );
    localStorage.setItem('studentVideoCallRequests', JSON.stringify(updatedRequests));

    // If accepted, add to confirmed appointments
    if (decision === 'accepted') {
      const acceptedRequest = incomingVideoCallRequests.find(req => req.id === requestId);
      if (acceptedRequest) {
        const newAppointment = {
          id: Date.now(),
          studentName: acceptedRequest.studentName,
          studentId: acceptedRequest.studentId,
          date: acceptedRequest.date,
          time: acceptedRequest.time,
          reason: acceptedRequest.reason,
          status: 'confirmed',
          type: 'confirmed',
          timestamp: new Date().toISOString()
        };

        // Update confirmed appointments in state
        setConfirmedAppointments(prev => [...prev, newAppointment]);

        // Update confirmed appointments in localStorage
        const storedAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
        localStorage.setItem('confirmedAppointments', JSON.stringify([...storedAppointments, newAppointment]));

        // Create notification for student
        const studentNotifications = JSON.parse(localStorage.getItem('studentNotifications') || '[]');
        studentNotifications.push({
          id: Date.now(),
          message: `Your video call request for ${acceptedRequest.date} at ${acceptedRequest.time} has been accepted`,
          type: 'success',
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('studentNotifications', JSON.stringify(studentNotifications));
      }
    }
  };

  // Add state for filtered student search results
  const [studentSearchResults, setStudentSearchResults] = useState([]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  const JUDY_TAREK = { id: "58-3661", fullName: "Judy Tarek" };

  const handleVideoCallStudentSearch = (searchTerm) => {
    setVideoCallSearchTerm(searchTerm);
    let results = [];
    if (searchTerm.length > 0) {
      results = students.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Always include Judy Tarek if search matches her name or ID and she's not already in results
      if ((JUDY_TAREK.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           JUDY_TAREK.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !results.some(s => s.id === JUDY_TAREK.id)) {
        results = [JUDY_TAREK, ...results];
      }
      setStudentSearchResults(results);
      setShowStudentDropdown(true);
    } else {
      setStudentSearchResults([]);
      setShowStudentDropdown(false);
    }
  };

  const handleVideoCallRequest = () => {
    if (!selectedCallDate || !selectedCallTime || !callReason) {
      alert("Please fill in all fields");
      return;
    }

    const newRequest = {
      id: Date.now(),
      studentName: selectedStudentForCall?.name || "Unknown Student",
      studentId: selectedStudentForCall?.id || "Unknown ID",
      date: selectedCallDate,
      time: selectedCallTime,
      reason: callReason,
      status: "pending",
      type: "outgoing",
      timestamp: new Date().toISOString()
    };

    // Add to local state
    setOutgoingVideoCallRequests(prev => [...prev, newRequest]);
    setVideoCallRequests(prev => [...prev, newRequest]);

    // Write to localStorage for SCAD office
    const scadRequests = JSON.parse(localStorage.getItem('scadVideoCallRequests') || '[]');
    localStorage.setItem('scadVideoCallRequests', JSON.stringify([...scadRequests, newRequest]));

    // Write to localStorage for student to see
    const studentRequests = JSON.parse(localStorage.getItem('studentVideoCallRequests') || '[]');
    localStorage.setItem('studentVideoCallRequests', JSON.stringify([...studentRequests, newRequest]));

    // Create notification for student
    const studentNotifications = JSON.parse(localStorage.getItem('studentNotifications') || '[]');
    studentNotifications.push({
      id: Date.now(),
      message: `New video call request from SCAD Office for ${selectedCallDate} at ${selectedCallTime}`,
      type: 'info',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('studentNotifications', JSON.stringify(studentNotifications));

    // Close modal and reset fields
    setShowVideoCallModal(false);
    setShowStudentDropdown(false);
    setStudentSearchResults([]);
    setVideoCallSearchTerm("");
    setSelectedStudentForCall(null);
    setSelectedCallDate("");
    setSelectedCallTime("");
    setCallReason("");
  };

  // Function to sort appointments by date and time
  const getSortedAppointments = () => {
    return confirmedAppointments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Load confirmed appointments from localStorage
  useEffect(() => {
    const loadConfirmedAppointments = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
      setConfirmedAppointments(storedAppointments);
    };

    loadConfirmedAppointments();
  }, []);

  // Render incoming video call requests
  const renderIncomingRequests = () => {
    return incomingVideoCallRequests.map((request, index) => (
      <div key={index} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
        background: "#f8f9fa",
        borderRadius: "4px",
        marginBottom: "0.5rem"
      }}>
        <div>
          <span style={{ color: "#666" }}>{request.studentName} ({request.studentId})</span>
          <div style={{ marginTop: "0.25rem" }}>
            <span style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
              background: request.status === "accepted" ? "#e8f5e9" : "#e3f2fd",
              color: request.status === "accepted" ? "#2e7d32" : "#1976d2"
            }}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {request.status === "pending" && (
            <>
              <button
                onClick={() => handleIncomingCallRequest(request.id, 'accept')}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Accept
              </button>
              <button
                onClick={() => handleIncomingCallRequest(request.id, 'reject')}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    ));
  };

  // Add this function to render confirmed appointments
  const renderConfirmedAppointments = () => {
    return (
      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "#1976d2", marginBottom: "1rem" }}>Confirmed Video Call Appointments</h3>
        <div style={{ 
          background: "white",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          overflow: "hidden"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            padding: "1rem",
            background: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
            fontWeight: "bold",
            color: "#1976d2"
          }}>
            <div>Student</div>
            <div>Date</div>
            <div>Time</div>
            <div>Reason</div>
            <div>Initiated By</div>
            <div>Status</div>
            <div>Online Status</div>
            <div>Actions</div>
          </div>
          {getSortedAppointments().map((appointment, index) => (
            <div key={appointment.id} style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              padding: "1rem",
              borderBottom: "1px solid #e0e0e0",
              alignItems: "center",
              background: index % 2 === 0 ? "white" : "#f8f9fa"
            }}>
              <div style={{ color: "#333" }}>{appointment.studentName} ({appointment.studentId})</div>
              <div style={{ color: "#333" }}>{appointment.date}</div>
              <div style={{ color: "#333" }}>{appointment.time}</div>
              <div style={{ color: "#333" }}>{appointment.reason}</div>
              <div style={{ color: "#333" }}>
                {appointment.type === 'incoming' ? 'Student' : 'SCAD Office'}
              </div>
              <div>
                <span style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  background: "#e8f5e9",
                  color: "#2e7d32"
                }}>
                  Confirmed
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: getStudentOnlineStatus(appointment.studentId) ? "#43a047" : "#bdbdbd",
                  marginRight: 6
                }} />
                <span style={{ color: "#333", fontWeight: 500 }}>
                  {getStudentOnlineStatus(appointment.studentId) ? "Online" : "Offline"}
                </span>
              </div>
              <div>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setCurrentCallAppointment(appointment);
                    setShowVideoCallSimModal(true);
                    setVideoEnabled(true);
                  }}
                >
                  Join Call
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Video Call Simulation Modal */}
        {showVideoCallSimModal && currentCallAppointment && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000
          }}>
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 350,
              maxWidth: 420,
              boxShadow: "0 8px 32px #1976d299",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h3 style={{ color: "#1976d2", marginBottom: 16 }}>Video Call with {currentCallAppointment.studentName}</h3>
              <div style={{
                width: 180,
                height: 120,
                background: videoEnabled ? "#e3f2fd" : "#bdbdbd",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                color: videoEnabled ? "#1976d2" : "#757575",
                fontSize: 22,
                fontWeight: 600,
                border: screenSharing ? "3px solid #1976d2" : undefined
              }}>
                {videoEnabled ? "[ Video On ]" : "[ Video Off ]"}
              </div>
              {screenSharing && (
                <div style={{
                  background: "#e3f2fd",
                  color: "#1976d2",
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  marginBottom: 8,
                  fontWeight: 500,
                  border: "1.5px solid #1976d2"
                }}>
                  🖥️ Screen is being shared
                </div>
              )}
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <button
                  style={{
                    padding: "0.5rem 1.2rem",
                    background: videoEnabled ? "#f44336" : "#43a047",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => setVideoEnabled(v => !v)}
                >
                  {videoEnabled ? "Disable Video" : "Enable Video"}
                </button>
                <button
                  style={{
                    padding: "0.5rem 1.2rem",
                    background: micMuted ? "#43a047" : "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => setMicMuted(m => !m)}
                >
                  {micMuted ? "Unmute Microphone" : "Mute Microphone"}
                </button>
                <button
                  style={{
                    padding: "0.5rem 1.2rem",
                    background: screenSharing ? "#1976d2" : "#757575",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => setScreenSharing(s => !s)}
                >
                  {screenSharing ? "Stop Sharing" : "Share Screen"}
                </button>
              </div>
              <div style={{ marginBottom: 16, fontSize: 18, color: micMuted ? "#f44336" : "#43a047" }}>
                {micMuted ? "🔇 Microphone Muted" : "🎤 Microphone On"}
              </div>
              <button
                style={{
                  padding: "0.5rem 1.2rem",
                  background: "#9e9e9e",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setShowVideoCallSimModal(false);
                  setVideoEnabled(true);
                  setMicMuted(false);
                  setScreenSharing(false);
                  setCurrentCallAppointment(null);
                }}
              >
                Leave Call
              </button>
              {otherPartyLeft && (
                <div style={{
                  background: '#ffebee',
                  color: '#c62828',
                  padding: '0.75rem 1rem',
                  borderRadius: 6,
                  marginBottom: 12,
                  fontWeight: 500,
                  border: '1.5px solid #c62828',
                  textAlign: 'center'
                }}>
                  The student has left the call.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Add state for clarification modal and comments
  const [clarificationModal, setClarificationModal] = useState({ open: false, reportKey: null, comment: "" });
  const [clarifications, setClarifications] = useState(() => {
    // Load from localStorage if available
    try {
      const saved = localStorage.getItem('scadClarifications');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }); // { [reportKey]: comment }

  // Persist clarifications to localStorage
  useEffect(() => {
    localStorage.setItem('scadClarifications', JSON.stringify(clarifications));
  }, [clarifications]);

  // Helper function to simulate online status (for prototype)
  const getStudentOnlineStatus = (studentId) => {
    // For demo, randomly return true (online) or false (offline)
    return Math.random() > 0.5;
  };

  // Inside the Video Call Simulation Modal (in renderConfirmedAppointments), add useEffect for polling call status
  useEffect(() => {
    let timer;
    if (showVideoCallSimModal && currentCallAppointment) {
      setOtherPartyLeft(false);
      timer = setTimeout(() => {
        setOtherPartyLeft(true);
        // After 2 seconds, auto-close the call modal
        setTimeout(() => {
          setShowVideoCallSimModal(false);
          setVideoEnabled(true);
          setMicMuted(false);
          setScreenSharing(false);
          setCurrentCallAppointment(null);
          setOtherPartyLeft(false);
        }, 2000);
      }, 20000); // 20 seconds
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showVideoCallSimModal, currentCallAppointment]);

  // Add state for workshops
  const [workshops, setWorkshops] = useState(() => {
    const saved = localStorage.getItem('scadWorkshops');
    return saved ? JSON.parse(saved) : [];
  });
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [workshopForm, setWorkshopForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    speakerBio: '',
    agenda: ''
  });

  // Save workshops to localStorage on change
  useEffect(() => {
    localStorage.setItem('scadWorkshops', JSON.stringify(workshops));
  }, [workshops]);

  // Handlers
  const handleWorkshopFormChange = e => {
    const { name, value } = e.target;
    setWorkshopForm(f => ({ ...f, [name]: value }));
  };
  const handleWorkshopSubmit = e => {
    e.preventDefault();
    if (editingWorkshop) {
      setWorkshops(ws => ws.map(w => w.id === editingWorkshop.id ? { ...editingWorkshop, ...workshopForm } : w));
    } else {
      setWorkshops(ws => [
        ...ws,
        { ...workshopForm, id: Date.now() }
      ]);
    }
    setShowWorkshopModal(false);
    setEditingWorkshop(null);
    setWorkshopForm({ name: '', startDate: '', endDate: '', startTime: '', endTime: '', description: '', speakerBio: '', agenda: '' });
  };
  const handleEditWorkshop = w => {
    setEditingWorkshop(w);
    setWorkshopForm({ ...w });
    setShowWorkshopModal(true);
  };
  const handleDeleteWorkshop = id => {
    if (window.confirm('Delete this workshop?')) {
      setWorkshops(ws => ws.filter(w => w.id !== id));
    }
  };

  // Add new state for active section
  const [activeSection, setActiveSection] = useState('overview');

  // Add new state for search
  const [searchQuery, setSearchQuery] = useState('');

  // Add new styles object
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
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1.2rem',
      marginBottom: '0.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#1976d2',
      fontWeight: 500,
      fontSize: 17,
      transition: 'background 0.2s, color 0.2s',
    },
    activeNavItem: {
      background: '#e3f2fd',
      color: '#1976d2',
      fontWeight: 700,
      boxShadow: '0 2px 8px #1976d211',
    },
    card: {
      background: '#fff',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px #e0e0e055',
      border: '1.5px solid #e0e0e0',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
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
    buttonHover: {
      background: '#125ea2',
    },
  };

  // Add new navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { id: 'program_stats', label: 'Program Statistics', icon: <FaChartBar /> },
    { id: 'internship_cycles', label: 'Internship Cycles', icon: <FaCalendarAlt /> },
    { id: 'internships', label: 'Internships', icon: <FaBuilding /> },
    { id: 'students', label: 'Students', icon: <FaUsers /> },
    { id: 'companies', label: 'Companies', icon: <FaBuilding /> },
    { id: 'calls', label: 'Video Calls', icon: <FaVideo /> },
    { id: 'reports', label: 'Reports', icon: <FaFileAlt /> },
    { id: 'workshops', label: 'Workshops', icon: <FaCalendarAlt /> },
  ];

  // Filter video call requests to only show those that are not accepted
  const filteredVideoCallRequests = videoCallRequests.filter(req => req.status !== 'accepted');

  // On mount, load outgoing requests from localStorage into videoCallRequests
  useEffect(() => {
    const storedOutgoing = JSON.parse(localStorage.getItem('scadVideoCallRequests') || '[]');
    if (storedOutgoing.length > 0) {
      setVideoCallRequests(prev => {
        // Avoid duplicates
        const existingIds = new Set(prev.map(r => r.id));
        const merged = [...prev, ...storedOutgoing.filter(r => !existingIds.has(r.id))];
        return merged;
      });
    }
  }, []);

  // Load company applications from localStorage on component mount
  useEffect(() => {
    const loadCompanyApplications = () => {
      const storedApplications = JSON.parse(localStorage.getItem('companyApplications') || '[]');
      setCompanyApplications(storedApplications);
    };

    loadCompanyApplications();
  }, []);

  // Load all company data from localStorage on component mount
  useEffect(() => {
    const loadCompanyData = () => {
      const storedApplications = JSON.parse(localStorage.getItem('companyApplications') || '[]');
      const storedAccepted = JSON.parse(localStorage.getItem('acceptedCompanies') || '[]');
      const storedRejected = JSON.parse(localStorage.getItem('rejectedCompanies') || '[]');
      
      setCompanyApplications(storedApplications);
      setAcceptedCompanies(storedAccepted);
      setRejectedCompanies(storedRejected);
    };

    loadCompanyData();
  }, []);

  // Render company details modal
  const renderCompanyDetailsModal = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#1976d2', margin: 0 }}>Company Details</h2>
            <button
              onClick={() => setSelectedCompany(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>Basic Information</h3>
            <p><strong>Company Name:</strong> {selectedCompany.name}</p>
            <p><strong>Email:</strong> {selectedCompany.email}</p>
            <p><strong>Industry:</strong> {selectedCompany.industry}</p>
            <p><strong>Size:</strong> {selectedCompany.size}</p>
            <p><strong>Registration Date:</strong> {selectedCompany.registrationDate}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>Documents</h3>
            {renderDocuments(selectedCompany.documents)}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => handleCompanyDecision(selectedCompany, 'reject')}
              style={{
                padding: '0.8rem 1.5rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Reject
            </button>
            <button
              onClick={() => handleCompanyDecision(selectedCompany, 'accept')}
              style={{
                padding: '0.8rem 1.5rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render company applications section
  const renderCompanyApplications = () => {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Pending Company Applications</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search companies..."
            value={pendingSearchTerm}
            onChange={(e) => setPendingSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              marginBottom: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {companyApplications
            .filter(company => 
              company.name.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
              company.industry.toLowerCase().includes(pendingSearchTerm.toLowerCase())
            )
            .map(company => (
              <div
                key={company.id}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: '#1976d2' }}>{company.name}</h4>
                  <span style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    background: '#e3f2fd',
                    color: '#1976d2',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {company.industry}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0.5rem 0' }}><strong>Email:</strong> {company.email}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Size:</strong> {company.size}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Registration Date:</strong> {company.registrationDate}</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setSelectedCompany(company)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleCompanyDecision(company, 'reject')}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleCompanyDecision(company, 'accept')}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

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
            navigate('/');
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
          <h2 style={{ color: '#1976d2', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 900, letterSpacing: 1 }}>SCAD Office</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div style={{ ...styles.searchBar, width: '100%' }}>
              <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }}
              />
            </div>
          </div>
        </div>

        <nav>
          {navItems.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeSection === item.id ? styles.activeNavItem : {}),
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
        <div style={styles.header}>
          <h1 style={{ color: '#1F2937', fontSize: '1.875rem' }}>
            {navItems.find(item => item.id === activeSection)?.label}
          </h1>
        </div>

        {/* Content Sections */}
        {activeSection === 'program_stats' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: '#1976d2', fontWeight: 700, marginRight: 16 }}>Program Statistics</h2>
              <select
                value={selectedCycleId}
                onChange={e => setSelectedCycleId(Number(e.target.value))}
                style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0', fontSize: 16 }}
              >
                {internshipCycles.map(cycle => (
                  <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
                ))}
              </select>
            <button
                onClick={() => {
                  const pdf = generateStatisticsPDF();
                  pdf.save('statistics-report.pdf');
                }}
              style={{
                  marginLeft: 'auto',
                  background: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.5rem 1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span role="img" aria-label="download">📊</span> Download Statistics Report
            </button>
          </div>
            {/* Statistics Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {/* Report Status */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Report Status for {calculateStatistics().cycleName}</div>
                <div style={{ color: '#222', fontSize: 15, marginBottom: 6 }}>Total Reports: {calculateStatistics().reportStats.total}</div>
                <div style={{ color: '#2e7d32', fontWeight: 500 }}>Approved: {calculateStatistics().reportStats.accepted}</div>
                <div style={{ color: '#1976d2', fontWeight: 500 }}>Pending: {calculateStatistics().reportStats.pending}</div>
                <div style={{ color: '#c62828', fontWeight: 500 }}>Rejected: {calculateStatistics().reportStats.rejected}</div>
                <div style={{ color: '#ff9800', fontWeight: 500 }}>Flagged: {calculateStatistics().reportStats.flagged}</div>
                    </div>
              {/* Top Companies */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Top Companies for {calculateStatistics().cycleName}</div>
                {calculateStatistics().companyStats && Object.keys(calculateStatistics().companyStats.totalInternships).length > 0 && (
                  internshipCycles.find(c => c.id === selectedCycleId)?.name &&
                  calculateStatistics().companyStats &&
                  Object.entries(calculateStatistics().companyStats.averageRatings).slice(0, 3).map(([company, rating]) => (
                    <div key={company} style={{ color: '#222', fontSize: 15 }}>
                      {company}: {(rating.total / rating.count).toFixed(1)}/5.0
            </div>
                  ))
                )}
                      </div>
            {/* Major Distribution */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Major Distribution for {calculateStatistics().cycleName}</div>
                {calculateStatistics().courseStats && Object.entries(calculateStatistics().courseStats).map(([major, count]) => (
                  <div key={major} style={{ color: '#222', fontSize: 15 }}>
                    {major}: {count} internships
                      </div>
                    ))}
            </div>
            {/* Performance Metrics */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Performance Metrics for {calculateStatistics().cycleName}</div>
                <div style={{ color: '#222', fontSize: 15 }}>Average Review Time: {calculateStatistics().averageReviewTime} days</div>
                <div style={{ color: '#222', fontSize: 15 }}>Total Companies: {calculateStatistics().totalCompanies}</div>
                <div style={{ color: '#222', fontSize: 15 }}>Total Students: {calculateStatistics().totalStudents}</div>
            </div>
              {/* Most Used Courses */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Most Used Courses in Internships for {calculateStatistics().cycleName}</div>
                {calculateStatistics().mostUsedCourses && calculateStatistics().mostUsedCourses.map((course, idx) => (
                      <div key={course.name} style={{
                    background: idx === 0 ? '#e3f2fd' : '#f5f5f5',
                    fontWeight: idx === 0 ? 700 : 500,
                    color: '#222',
                    borderRadius: 6,
                    padding: '6px 12px',
                    marginBottom: 6
                  }}>{course.name}</div>
                    ))}
                  </div>
            {/* Top Companies by Internship Count */}
              <div style={{ flex: '1 1 220px', minWidth: 220, background: 'white', borderRadius: 10, boxShadow: '0 1px 4px #0001', padding: 20, marginBottom: 24 }}>
                <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>Top Companies by Internship Count for {calculateStatistics().cycleName}</div>
                {calculateStatistics().companyStats && Object.entries(calculateStatistics().companyStats.totalInternships).sort(([, a], [, b]) => b - a).slice(0, 3).map(([company, count], idx) => (
                      <div key={company} style={{
                    background: idx === 0 ? '#e3f2fd' : '#f5f5f5',
                    fontWeight: idx === 0 ? 700 : 500,
                    color: '#222',
                    borderRadius: 6,
                    padding: '6px 12px',
                    marginBottom: 6,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{company}</span>
                    <span style={{ color: '#1976d2', fontWeight: 600 }}>{count} internships</span>
                      </div>
                    ))}
                  </div>
            </div>
          </div>
        )}

        {activeSection === 'internship_cycles' && (
                  <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ color: '#1976d2', fontWeight: 700 }}>Internship Cycles</h2>
            <button
              onClick={() => {
                setSelectedCycle(null);
                  setNewCycle({ name: '', startDate: '', endDate: '', status: 'scheduled' });
                setShowCycleModal(true);
              }}
              style={{
                  background: '#43a047',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.5rem 1.2rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{ fontSize: 18, marginRight: 4 }}>✚</span> New Cycle
            </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {internshipCycles.map((cycle) => (
              <div key={cycle.id} style={{
                  background: 'white',
                  borderRadius: 10,
                  boxShadow: '0 1px 4px #0001',
                  padding: 24,
                  minWidth: 260,
                  maxWidth: 300,
                  flex: '1 1 260px',
                  marginBottom: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#1976d2', fontSize: 20, marginBottom: 6 }}>{cycle.name}</div>
                    <div style={{ marginBottom: 4 }}><b>Start Date:</b> {cycle.startDate}</div>
                    <div style={{ marginBottom: 4 }}><b>End Date:</b> {cycle.endDate}</div>
                    <div style={{ marginBottom: 4 }}><b>Created:</b> {cycle.createdAt}</div>
                    <div style={{ marginTop: 6 }}>
                  <span style={{
                        background: cycle.status === 'active' ? '#e8f5e9' : cycle.status === 'closed' ? '#ffebee' : '#e3f2fd',
                        color: cycle.status === 'active' ? '#388e3c' : cycle.status === 'closed' ? '#e53935' : '#1976d2',
                        borderRadius: 6,
                        padding: '2px 10px',
                        fontWeight: 600,
                        fontSize: 14,
                        border: cycle.status === 'active' ? '1px solid #43a047' : cycle.status === 'closed' ? '1.5px solid #e53935' : '1px solid #90caf9'
                      }}>{cycle.status.charAt(0).toUpperCase() + cycle.status.slice(1)}</span>
                </div>
                </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    {cycle.status === 'closed' ? (
                  <button
                        style={{
                          padding: '0.5rem 1.2rem',
                          background: '#bdbdbd',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontWeight: 600,
                          cursor: 'not-allowed',
                          width: 100
                        }}
                        disabled
                      >
                        Closed
                      </button>
                    ) : (
                      <>
                        <button
                          style={{
                            padding: '0.5rem 1.2rem',
                            background: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                    onClick={() => {
                      setSelectedCycle(cycle);
                            setNewCycle({ name: cycle.name, startDate: cycle.startDate, endDate: cycle.endDate, status: cycle.status });
                      setShowCycleModal(true);
                    }}
                  >
                    Edit
                  </button>
                        {cycle.status === 'active' ? (
                    <button
                      style={{
                              padding: '0.5rem 1.2rem',
                              background: '#e53935',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 600
                            }}
                            onClick={() => handleCycleStatusChange(cycle.id, 'closed')}
                          >
                            Close
                    </button>
                        ) : (
                    <button
                      style={{
                              padding: '0.5rem 1.2rem',
                              background: '#43a047',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 600
                            }}
                            onClick={() => handleCycleStatusChange(cycle.id, 'active')}
                          >
                            Activate
                    </button>
                        )}
                      </>
                  )}
                </div>
                </div>
              ))}
            </div>
            {/* Reuse the existing cycle modal for add/edit */}
        {showCycleModal && (
          <div style={{
                position: 'fixed',
            top: 0,
            left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem',
                  width: '80%',
                  maxWidth: '600px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1976d2' }}>{selectedCycle ? 'Edit Cycle' : 'Add Cycle'}</h2>
                    <button
                      onClick={() => setShowCycleModal(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                      }}
                    >
                      ×
                    </button>
                  </div>
              <form onSubmit={handleCycleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Cycle Name</label>
                  <input
                    type="text"
                        name="name"
                    value={newCycle.name}
                        onChange={e => setNewCycle(c => ({ ...c, name: e.target.value }))}
                    style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0'
                        }}
                        required
                  />
                </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Start Date</label>
                  <input
                    type="date"
                          name="startDate"
                    value={newCycle.startDate}
                          onChange={e => setNewCycle(c => ({ ...c, startDate: e.target.value }))}
                    style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                  />
                </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>End Date</label>
                  <input
                    type="date"
                          name="endDate"
                    value={newCycle.endDate}
                          onChange={e => setNewCycle(c => ({ ...c, endDate: e.target.value }))}
                    style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                  />
                </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    type="button"
                        onClick={() => setShowCycleModal(false)}
                    style={{
                          padding: '0.5rem 1rem',
                          background: '#9e9e9e',
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
                          padding: '0.5rem 1rem',
                          background: '#1976d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        {selectedCycle ? 'Save Changes' : 'Add Cycle'}
                  </button>
                </div>
              </form>
            </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'internships' && (
          <div>
            <h2 style={{ color: '#1976d2', marginBottom: '1.5rem' }}>Available Internships</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: 32, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <select
                value={internshipIndustryFilter}
                onChange={e => setInternshipIndustryFilter(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
              >
                {internshipIndustries.map(ind => (
                  <option key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</option>
                ))}
            </select>
              <select
                value={internshipDurationFilter}
                onChange={e => setInternshipDurationFilter(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
              >
                {internshipDurations.map(dur => (
                  <option key={dur} value={dur}>{dur === 'all' ? 'All Durations' : dur}</option>
                ))}
              </select>
              <select
                value={internshipPaymentFilter}
                onChange={e => setInternshipPaymentFilter(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
              >
                {internshipPaymentTypes.map(type => (
                  <option key={type} value={type}>{type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
              <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 8, padding: '0.5rem 1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
              <input
                type="text"
                  placeholder="Search by job title or company name..."
                  value={internshipSearchTerm}
                  onChange={e => setInternshipSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: 220 }}
              />
            </div>
          </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {filteredInternships.map(internship => (
                <div key={internship.id} style={{
                  background: 'white',
                  borderRadius: 12,
                  border: '1.5px solid #e0e0e0',
                  padding: 24,
                  minWidth: 300,
                  maxWidth: 340,
                  flex: '1 1 300px',
                  marginBottom: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 4px #0001'
                }}>
                  <div style={{ fontWeight: 700, color: '#1976d2', fontSize: 17, marginBottom: 6 }}>{internship.jobTitle}</div>
                  <div style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>{internship.companyName}</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}>Duration: {internship.duration}</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}>Location: {internship.location}</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}>Industry: {internship.industry}</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}>Spots Available: {internship.spotsAvailable}</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}>Application Deadline: {internship.applicationDeadline}</div>
                  <div style={{ color: '#222', fontWeight: 600, marginTop: 8, marginBottom: 2 }}>Company Brief:</div>
                  <div style={{ color: '#444', fontSize: 15, marginBottom: 12 }}>{internship.companyBrief}</div>
                <button
                  style={{
                      padding: '0.5rem 1.2rem',
                      background: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                      marginTop: 'auto'
                    }}
                    onClick={() => setSelectedInternship(internship)}
                  >
                    View Details
                </button>
              </div>
            ))}
            </div>
            {/* Internship Details Modal */}
            {selectedInternship && (
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
                zIndex: 2000
          }}>
            <div style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 32,
                  minWidth: 400,
                  maxWidth: 700,
                  boxShadow: '0 8px 32px #1976d299',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                      <h3 style={{ color: '#1976d2', marginBottom: 2 }}>{selectedInternship.jobTitle}</h3>
                      <div style={{ color: '#1976d2', fontWeight: 500, marginBottom: 2 }}>{selectedInternship.companyName}</div>
                </div>
                    {selectedInternship.stipend && selectedInternship.stipend.toLowerCase() !== 'unpaid' && (
                      <span style={{ background: '#e8f5e9', color: '#388e3c', fontWeight: 600, borderRadius: 6, padding: '4px 18px', fontSize: 16 }}>Paid</span>
                    )}
              </div>
                  <hr style={{ margin: '12px 0 18px 0', border: 0, borderTop: '1px solid #eee' }} />
                  {/* Two-column info */}
              <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 18,
                    background: '#fafbfc',
                    borderRadius: 10,
                    padding: 18,
                    marginBottom: 18,
                    fontSize: 15
                  }}>
                <div>
                      <div style={{ color: '#888' }}>Duration</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.duration}</div>
                          </div>
                    <div>
                      <div style={{ color: '#888' }}>Start Date</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.startDate}</div>
                        </div>
                    <div>
                      <div style={{ color: '#888' }}>End Date</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.endDate}</div>
                    </div>
                    <div>
                      <div style={{ color: '#888' }}>Location</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.location}</div>
                    </div>
                    <div>
                      <div style={{ color: '#888' }}>Industry</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.industry}</div>
                    </div>
                    <div>
                      <div style={{ color: '#888' }}>Application Deadline</div>
                      <div style={{ fontWeight: 600 }}>{selectedInternship.applicationDeadline}</div>
                    </div>
                  </div>
                  {/* Compensation */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 600, color: '#1976d2', marginBottom: 6 }}>Compensation</div>
                    <div style={{ background: '#e3f2fd', borderRadius: 8, padding: 16, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>Stipend Range:</span> {selectedInternship.stipend}
                      <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
                        * Final compensation will be determined based on candidate's qualifications and experience
                      </div>
                    </div>
                  </div>
                  {/* Skills Required */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 600, color: '#1976d2', marginBottom: 6 }}>Skills Required</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {selectedInternship.requirements && selectedInternship.requirements.map((req, idx) => (
                        <div key={idx} style={{
                          background: '#f5f5f5',
                          borderRadius: 8,
                          padding: '8px 14px',
                          fontSize: 15,
                          color: '#333',
                          fontWeight: 500
                        }}>{req}</div>
                      ))}
                    </div>
                  </div>
                  {/* Job Description */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 600, color: '#1976d2', marginBottom: 6 }}>Job Description</div>
                    <div style={{ background: '#fafbfc', borderRadius: 8, padding: 16 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>Responsibilities:</div>
                      {selectedInternship.responsibilities && selectedInternship.responsibilities.map((res, idx) => (
                        <div key={idx} style={{
                          background: '#fff',
                          borderRadius: 6,
                          padding: '7px 12px',
                          marginBottom: 6,
                          fontSize: 15,
                          color: '#333',
                          border: '1px solid #eee'
                        }}>• {res}</div>
                      ))}
                      <div style={{ fontWeight: 600, margin: '16px 0 6px 0' }}>Benefits & Perks:</div>
                      {(selectedInternship.benefits && selectedInternship.benefits.length > 0) ? (
                        selectedInternship.benefits.map((perk, idx) => (
                          <div key={idx} style={{
                            background: '#fff',
                            borderRadius: 6,
                            padding: '7px 12px',
                            marginBottom: 6,
                            fontSize: 15,
                            color: '#333',
                            border: '1px solid #eee'
                          }}>• {perk}</div>
                      ))
                    ) : (
                        <div style={{ color: '#888', fontSize: 15, fontStyle: 'italic', marginBottom: 6 }}>None listed</div>
                    )}
                  </div>
                </div>
                  {/* About Company */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 600, color: '#1976d2', marginBottom: 6 }}>About {selectedInternship.companyName}</div>
                    <div style={{ background: '#fafbfc', borderRadius: 8, padding: 16 }}>
                      <div style={{ color: '#333', marginBottom: 8 }}>{selectedInternship.companyBrief}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 15 }}>
                        <div><b>Industry:</b> {selectedInternship.industry}</div>
                        <div><b>Company Size:</b> {selectedInternship.size}</div>
                        <div><b>Location:</b> {selectedInternship.companyLocation}</div>
                        <div><b>Founded:</b> {selectedInternship.founded}</div>
                        <div><b>Website:</b> {selectedInternship.companyWebsite}</div>
                        <div><b>Contact Email:</b> {selectedInternship.companyEmail}</div>
              </div>
                    </div>
                  </div>
                  <hr style={{ margin: '18px 0 12px 0', border: 0, borderTop: '1px solid #eee' }} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                style={{
                        padding: '0.5rem 1.2rem',
                        background: '#9e9e9e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        minWidth: 90
                      }}
                      onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>
                  </div>
            </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={styles.card}>
                <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Total Students</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>{students.length}</p>
              </div>
              <div style={styles.card}>
                <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Active Companies</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>{companyApplications.length + acceptedCompanies.length}</p>
              </div>
              <div style={styles.card}>
                <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Pending Applications</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>{companyApplications.length}</p>
              </div>
            </div>
            {/* Upcoming Online Career Workshops Table */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Upcoming Online Career Workshops</h2>
              <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Name</div>
                  <div>Date</div>
                  <div>Time</div>
                  <div>Description</div>
                  <div>Speaker</div>
                  <div>Agenda</div>
                </div>
                {workshops && workshops.length > 0 && workshops.filter(w => {
                  // Show if endDate is today or in the future
                  const today = new Date();
                  const endDate = new Date(w.endDate);
                  endDate.setHours(23,59,59,999);
                  return endDate >= today;
                }).length > 0 ? (
                  workshops.filter(w => {
                    const today = new Date();
                    const endDate = new Date(w.endDate);
                    endDate.setHours(23,59,59,999);
                    return endDate >= today;
                  }).map((workshop, idx) => (
                    <div key={workshop.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 1fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div style={{ color: '#333', fontWeight: 500 }}>{workshop.name}</div>
                      <div style={{ color: '#333' }}>{workshop.startDate}</div>
                      <div style={{ color: '#333' }}>{workshop.startTime}</div>
                      <div style={{ color: '#333' }}>{workshop.description}</div>
                      <div style={{ color: '#333' }}>{workshop.speakerBio}</div>
                      <div style={{ color: '#333' }}>{workshop.agenda}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '1rem', color: '#888' }}>No upcoming workshops.</div>
                )}
              </div>
            </div>
            {/* Recent Activity */}
            <div style={styles.card}>
              <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Recent Activity</h3>
              <div style={{ 
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}>
                {[...companyApplications, ...acceptedCompanies, ...rejectedCompanies]
                  .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
                  .slice(0, 5)
                  .map((company, index) => (
                    <div key={company.id} style={{
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      background: index % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ color: '#1976d2', marginBottom: '0.25rem' }}>{company.name}</h4>
                          <p style={{ color: '#666', fontSize: '0.9rem' }}>{company.industry}</p>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          background: company.status === 'accepted' ? '#e8f5e9' : 
                                     company.status === 'rejected' ? '#ffebee' : '#e3f2fd',
                          color: company.status === 'accepted' ? '#2e7d32' : 
                                 company.status === 'rejected' ? '#c62828' : '#1976d2'
                        }}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'companies' && (
          <div>
            {renderCompanyApplications()}
            {renderCompanyDetailsModal()}
        {/* Accepted Companies Section */}
            <div style={{ marginTop: '2.5rem' }}>
              <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Accepted Companies</h2>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: 24 }}>
              <select
                value={acceptedIndustryFilter}
                  onChange={e => setAcceptedIndustryFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</option>
                ))}
            </select>
              <input
                type="text"
                placeholder="Search accepted companies..."
                value={acceptedSearchTerm}
                  onChange={e => setAcceptedSearchTerm(e.target.value)}
                  style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: '0.5rem', width: 220 }}
              />
            </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                {filteredAcceptedCompanies.length === 0 && (
                  <div style={{ color: '#888', fontStyle: 'italic' }}>No accepted companies.</div>
                )}
                {filteredAcceptedCompanies.map(company => (
              <div key={company.id} style={{
                    background: '#e8f5e9',
                    border: '1.5px solid #43a04733',
                    borderRadius: 12,
                    padding: 24,
                    minWidth: 300,
                    maxWidth: 340,
                    marginBottom: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px #0001'
                  }}>
                    <div style={{ fontWeight: 700, color: '#228B22', fontSize: 18, marginBottom: 6 }}>{company.name}</div>
                    <div style={{ color: '#333', marginBottom: 4 }}>{company.industry}</div>
                    <div style={{ color: '#555', marginBottom: 12 }}>Location: {company.location}</div>
                <button
                  onClick={() => setSelectedCompany(company)}
                  style={{
                        padding: '0.5rem 1.2rem',
                        background: '#388e3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        alignSelf: 'flex-start'
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
            </div>

        {/* Rejected Companies Section */}
            <div style={{ marginTop: '2.5rem' }}>
              <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Rejected Companies</h2>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: 24 }}>
              <select
                value={rejectedIndustryFilter}
                  onChange={e => setRejectedIndustryFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search rejected companies..."
                value={rejectedSearchTerm}
                  onChange={e => setRejectedSearchTerm(e.target.value)}
                  style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: '0.5rem', width: 220 }}
              />
            </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                {filteredRejectedCompanies.length === 0 && (
                  <div style={{ color: '#888', fontStyle: 'italic' }}>No rejected companies.</div>
                )}
                {filteredRejectedCompanies.map(company => (
              <div key={company.id} style={{
                    background: '#ffebee',
                    border: '1.5px solid #e5393533',
                    borderRadius: 12,
                    padding: 24,
                    minWidth: 300,
                    maxWidth: 340,
                    marginBottom: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px #0001'
                  }}>
                    <div style={{ fontWeight: 700, color: '#e53935', fontSize: 18, marginBottom: 6 }}>{company.name}</div>
                    <div style={{ color: '#333', marginBottom: 4 }}>{company.industry}</div>
                    <div style={{ color: '#555', marginBottom: 12 }}>Location: {company.location}</div>
                <button
                  onClick={() => setSelectedCompany(company)}
                  style={{
                        padding: '0.5rem 1.2rem',
                        background: '#c62828',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        alignSelf: 'flex-start'
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
            </div>
          </div>
        )}

        {activeSection === 'students' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#1976d2' }}>Student Management</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={styles.searchBar}>
                    <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={studentSearchTerm}
                      onChange={(e) => setStudentSearchTerm(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%' }}
                    />
                  </div>
              <select
                    value={studentStatusFilter}
                    onChange={(e) => setStudentStatusFilter(e.target.value)}
                style={{
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="not_started">Not Started</option>
              </select>
            </div>
          </div>

            <div style={{
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}>
            <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student ID</div>
                  <div>Full Name</div>
                  <div>Major</div>
                  <div>GPA</div>
                  <div>Graduation Year</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>

                {filteredStudents.map((student, index) => (
                  <div key={student.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                    padding: '1rem',
                    borderBottom: '1px solid #e0e0e0',
                    alignItems: 'center',
                    background: index % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <div>{student.id}</div>
                    <div>{student.fullName}</div>
                    <div>{student.major}</div>
                    <div>{student.gpa}</div>
                    <div>{student.graduationYear}</div>
                    <div>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        background: student.internships.some(i => i.status === 'completed') ? '#e8f5e9' : 
                                   student.internships.some(i => i.status === 'in_progress') ? '#e3f2fd' : '#fff3e0',
                        color: student.internships.some(i => i.status === 'completed') ? '#2e7d32' : 
                               student.internships.some(i => i.status === 'in_progress') ? '#1976d2' : '#e65100'
                      }}>
                        {student.internships.some(i => i.status === 'completed') ? 'Completed' :
                         student.internships.some(i => i.status === 'in_progress') ? 'In Progress' : 'Not Started'}
                      </span>
                  </div>
                    <div>
                  <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowStudentModal(true);
                        }}
                    style={{
                          padding: '0.5rem 1rem',
                          background: '#1976d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                    </div>
                </div>
              ))}
            </div>
            </div>

            {/* Student Details Modal */}
            {showStudentModal && selectedStudent && (
          <div style={{
                position: 'fixed',
            top: 0,
            left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem',
                  width: '80%',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1976d2' }}>Student Details</h2>
                  <button
                      onClick={() => setShowStudentModal(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                      }}
                    >
                      ×
                  </button>
                </div>

                  {renderStudentInfo(selectedStudent)}

                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Internship History</h3>
                    {selectedStudent.internships.map((internship, index) => (
                      <div key={index} style={{
                        background: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                            <h4 style={{ color: '#1976d2', marginBottom: '0.25rem' }}>{internship.position}</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{internship.companyName}</p>
                </div>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            background: internship.status === 'completed' ? '#e8f5e9' : '#e3f2fd',
                            color: internship.status === 'completed' ? '#2e7d32' : '#1976d2'
                          }}>
                            {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                          </span>
                </div>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          {internship.startDate} - {internship.endDate}
                        </p>
                        {renderReportSection(internship)}
              </div>
                    ))}
                </div>
                </div>
                </div>
            )}
                </div>
        )}

        {activeSection === 'calls' && (
                <div>
            {/* Original video call content (restored) */}
            {renderIncomingRequests()}
            {renderConfirmedAppointments()}
            {/* Confirmed Appointments Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Confirmed Appointments</h2>
              <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student Name</div>
                  <div>Student ID</div>
                  <div>Date</div>
                  <div>Time</div>
                  <div>Type</div>
                </div>
                {confirmedAppointments.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#888' }}>No confirmed appointments.</div>
                ) : (
                  confirmedAppointments.map((appt, idx) => (
                    <div key={appt.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div>{appt.studentName}</div>
                      <div>{appt.studentId}</div>
                      <div>{appt.date}</div>
                      <div>{appt.time}</div>
                <div>
                        <span style={{
                          background: '#e8f5e9',
                          color: '#2e7d32',
                          padding: '0.2rem 0.7rem',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 13,
                          border: '1px solid #b2dfdb'
                        }}>Office Request</span>
                </div>
              </div>
                  ))
                )}
              </div>
            </div>
            {/* Incoming Video Call Requests Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>Incoming Video Call Requests</h2>
              <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 2fr 1.2fr 1.2fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student Name</div>
                  <div>Student ID</div>
                  <div>Date</div>
                  <div>Time</div>
                  <div>Reason</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {incomingVideoCallRequests.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#888' }}>No incoming video call requests.</div>
                ) : (
                  incomingVideoCallRequests.map((req, idx) => (
                    <div key={req.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 2fr 1.2fr 1.2fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div>{req.studentName}</div>
                      <div>{req.studentId}</div>
                      <div>{req.date}</div>
                      <div>{req.time}</div>
                      <div>{req.reason}</div>
                    <div>
                        <span style={{
                          background: req.status === 'accepted' ? '#e8f5e9' : req.status === 'pending' ? '#fff3e0' : '#ffebee',
                          color: req.status === 'accepted' ? '#2e7d32' : req.status === 'pending' ? '#f57c00' : '#c62828',
                          padding: '0.2rem 0.7rem',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 13,
                          border: '1px solid #b2dfdb'
                        }}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                    </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleIncomingCallRequest(req.id, 'accepted')}
                              style={{ padding: '0.4rem 0.8rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
                            >Accept</button>
                            <button
                              onClick={() => handleIncomingCallRequest(req.id, 'rejected')}
                              style={{ padding: '0.4rem 0.8rem', background: '#f44336', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
                            >Reject</button>
                          </>
                  )}
                </div>
              </div>
                  ))
                )}
                    </div>
                </div>
            {/* Video Call Requests Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#1976d2' }}>Video Call Requests</h2>
                <button
                  style={{ background: '#1976d2', color: 'white', borderRadius: 6, border: 'none', padding: '0.6rem 1.4rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                  onClick={() => setShowVideoCallModal(true)}
                >
                  <span role="img" aria-label="video">🎥</span> Request New Call
                </button>
              </div>
              <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student Name</div>
                  <div>Student ID</div>
                  <div>Date</div>
                  <div>Time</div>
                  <div>Status</div>
                </div>
                {filteredVideoCallRequests.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#888' }}>Video Call Requests</div>
                ) : (
                  filteredVideoCallRequests.map((req, idx) => (
                    <div key={req.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div>{req.studentName}</div>
                      <div>{req.studentId}</div>
                      <div>{req.date}</div>
                      <div>{req.time}</div>
                      <div>
                        <span style={{
                          background: req.status === 'accepted' ? '#e8f5e9' : req.status === 'pending' ? '#fff3e0' : '#ffebee',
                          color: req.status === 'accepted' ? '#2e7d32' : req.status === 'pending' ? '#f57c00' : '#c62828',
                          padding: '0.2rem 0.7rem',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 13,
                          border: '1px solid #b2dfdb'
                        }}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                </div>
              </div>
                  ))
                )}
              </div>
            </div>
            {/* Video Call Request Modal (restored) */}
            {showVideoCallModal && (
                <div style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
              }}>
                  <div style={{ 
                  background: 'white',
                  borderRadius: 10,
                  padding: 32,
                  minWidth: 350,
                  maxWidth: 420,
                  boxShadow: '0 8px 32px #1976d299',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <h3 style={{ color: '#1976d2', marginBottom: 16 }}>Request Video Call with Student</h3>
                  <div style={{ width: '100%', marginBottom: 16, position: 'relative' }}>
                    <label style={{ color: '#666', fontWeight: 500 }}>Search Student</label>
                    <input
                      type="text"
                      placeholder="Enter student name or ID..."
                      value={videoCallSearchTerm}
                      onChange={e => handleVideoCallStudentSearch(e.target.value)}
                      onFocus={() => setShowStudentDropdown(true)}
                      style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e0e0e0', marginTop: 4, marginBottom: 8 }}
                    />
                    {showStudentDropdown && studentSearchResults.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: 48,
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: 6,
                        boxShadow: '0 2px 8px #0002',
                        zIndex: 10,
                        maxHeight: 180,
                        overflowY: 'auto'
                      }}>
                        {studentSearchResults.map(student => (
                          <div
                            key={student.id}
                            style={{
                              padding: '8px 12px',
                              cursor: 'pointer',
                              borderBottom: '1px solid #f0f0f0',
                              color: '#1976d2',
                              fontWeight: 500
                            }}
                            onClick={() => {
                              setSelectedStudentForCall({ id: student.id, name: student.fullName });
                              setVideoCallSearchTerm(`${student.fullName} (${student.id})`);
                              setShowStudentDropdown(false);
                            }}
                          >
                            {student.fullName} ({student.id})
                    </div>
                        ))}
                    </div>
                    )}
                    {selectedStudentForCall && (
                      <div style={{ color: '#1976d2', fontWeight: 600, marginBottom: 8 }}>
                        Selected: {selectedStudentForCall.name} ({selectedStudentForCall.id})
                  </div>
                    )}
                </div>
                  <div style={{ width: '100%', marginBottom: 16 }}>
                    <label style={{ color: '#666', fontWeight: 500 }}>Date</label>
                    <input
                      type="date"
                      value={selectedCallDate}
                      onChange={e => setSelectedCallDate(e.target.value)}
                      style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e0e0e0', marginTop: 4 }}
                    />
              </div>
                  <div style={{ width: '100%', marginBottom: 16 }}>
                    <label style={{ color: '#666', fontWeight: 500 }}>Time</label>
                    <input
                      type="time"
                      value={selectedCallTime}
                      onChange={e => setSelectedCallTime(e.target.value)}
                      style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e0e0e0', marginTop: 4 }}
                    />
                  </div>
                  <div style={{ width: '100%', marginBottom: 16 }}>
                    <label style={{ color: '#666', fontWeight: 500 }}>Reason for Call</label>
                    <textarea
                      value={callReason}
                      onChange={e => setCallReason(e.target.value)}
                      placeholder="Please provide a brief reason for requesting the video call..."
                      style={{ width: '100%', minHeight: 60, padding: 8, borderRadius: 6, border: '1px solid #e0e0e0', marginTop: 4 }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'flex-end' }}>
                <button
                  style={{
                        padding: '0.5rem 1.2rem',
                        background: '#9e9e9e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setShowVideoCallModal(false);
                        setShowStudentDropdown(false);
                        setStudentSearchResults([]);
                        setVideoCallSearchTerm("");
                        setSelectedStudentForCall(null);
                        setSelectedCallDate("");
                        setSelectedCallTime("");
                        setCallReason("");
                      }}
                    >
                      Cancel
                </button>
                <button
                  style={{
                        padding: '0.5rem 1.2rem',
                        background: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={handleVideoCallRequest}
                      disabled={!selectedStudentForCall || !selectedCallDate || !selectedCallTime || !callReason.trim()}
                    >
                      Request Call
                </button>
              </div>
            </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'reports' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#1976d2' }}>Submitted Reports</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={styles.searchBar}>
                    <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={reportsSearchTerm}
                      onChange={(e) => setReportsSearchTerm(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%' }}
                    />
                  </div>
                  <select
                    value={reportStatusFilter}
                    onChange={(e) => setReportStatusFilter(e.target.value)}
                  style={{
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select
                    value={reportMajorFilter}
                    onChange={(e) => setReportMajorFilter(e.target.value)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    {majors.map(major => (
                      <option key={major} value={major}>
                        {major === 'all' ? 'All Majors' : major}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ 
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
                  }}>
                    <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
                }}>
                  <div>Student</div>
                  <div>Company</div>
                  <div>Position</div>
                  <div>Submission Date</div>
                  <div>Status</div>
                  <div>Report</div>
                  <div>Clarification</div>
                    </div>

                {getFilteredReports().map((item, index) => {
                  const reportKey = `${item.student.id}-${item.internship.companyName}-${item.report.id}`;
                  const clarificationMsg = clarifications[reportKey];
                  return (
                    <div key={item.report.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      alignItems: 'center',
                      background: index % 2 === 0 ? 'white' : '#f8f9fa'
                    }}>
                      <div>
                        <div>{item.student.fullName}</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>{item.student.id}</div>
                      </div>
                      <div>{item.internship.companyName}</div>
                      <div>{item.internship.position}</div>
                      <div>{item.report.submissionDate}</div>
                      <div>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          background: item.report.status === 'approved' ? '#e8f5e9' : 
                                    item.report.status === 'rejected' ? '#ffebee' : item.report.status === 'flagged' ? '#fff3e0' : '#e3f2fd',
                          color: item.report.status === 'approved' ? '#2e7d32' : 
                                item.report.status === 'rejected' ? '#c62828' : item.report.status === 'flagged' ? '#e65100' : '#1976d2'
                        }}>
                          {item.report.status.charAt(0).toUpperCase() + item.report.status.slice(1)}
                        </span>
                      </div>
                      <div>
                      <button
                        onClick={() => handleReportDownload(item.student, item.internship, item.report)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                      >
                        Download Report
                      </button>
                    </div>
                      <div>
                        {(item.report.status === 'flagged' || item.report.status === 'rejected') && (
                          <>
                            <button
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#FFC107',
                                color: '#222',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 600
                              }}
                              onClick={() => setClarificationModal({ open: true, reportKey, comment: clarificationMsg || '' })}
                            >
                              {clarificationMsg ? 'Edit Clarification' : 'Add Clarification'}
                            </button>
                            {clarificationMsg && (
                              <div style={{ marginTop: 6, color: '#666', fontSize: '0.95rem', background: '#fffde7', borderRadius: 4, padding: '6px 10px', border: '1px solid #ffe082' }}>
                                <b>Comment:</b> {clarificationMsg}
                  </div>
                            )}
                          </>
                        )}
              </div>
            </div>
                  );
                })}
          </div>
            </div>
        {/* Evaluation Reports Section */}
            <div style={{ marginTop: '2.5rem', background: '#f8f9fa', borderRadius: 10, padding: 24 }}>
              <h2 style={{ color: '#1976d2', marginBottom: 18 }}>Evaluation Reports</h2>
              <div style={{ display: 'flex', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
              <select
                value={evaluationMajorFilter}
                  onChange={e => setEvaluationMajorFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
                >
                  <option value="all">All Majors</option>
                  {majors.filter(m => m !== 'all').map(major => (
                    <option key={major} value={major}>{major}</option>
                ))}
              </select>
              <select
                value={evaluationRatingFilter}
                  onChange={e => setEvaluationRatingFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #e0e0e0' }}
              >
                <option value="all">All Ratings</option>
                <option value="excellent">Excellent (4.5+)</option>
                  <option value="good">Good (4.0-4.49)</option>
                  <option value="average">Average (3.0-3.99)</option>
                  <option value="below">Below 3.0</option>
              </select>
                <div style={styles.searchBar}>
                  <FaSearch style={{ color: '#9CA3AF', marginRight: '0.5rem' }} />
                <input
                  type="text"
                  placeholder="Search by student name, ID, company, or position..."
                  value={evaluationSearchTerm}
                    onChange={e => setEvaluationSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: 220 }}
                  />
              </div>
            </div>
              <div style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
          <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  fontWeight: 'bold',
                  color: '#1976d2'
            }}>
              <div>Student Name</div>
              <div>Student ID</div>
              <div>Major</div>
              <div>Company</div>
              <div>Supervisor</div>
              <div>Duration</div>
              <div>Actions</div>
            </div>
                {getFilteredEvaluations().map((report, idx) => (
              <div key={report.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr',
                    padding: '1rem',
                    borderBottom: '1px solid #e0e0e0',
                    alignItems: 'center',
                    background: idx % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <div>{report.student.fullName}</div>
                    <div>{report.student.id}</div>
                    <div>{report.student.major}</div>
                    <div>{report.company.name}</div>
                    <div>{report.company.supervisor}</div>
                    <div>{report.internship.startDate} to {report.internship.endDate}</div>
                <div>
                  <button
                    onClick={() => handleEvaluationDownload(report)}
                    style={{
                          background: '#1976d2',
                          color: 'white',
                          borderRadius: 4,
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          width: '100%'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
            </div>
        )}

        {activeSection === 'workshops' && (
                <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#1976d2' }}>Workshops</h2>
                <button
                  onClick={() => {
                    setEditingWorkshop(null);
                    setWorkshopForm({
                      name: '',
                      startDate: '',
                      endDate: '',
                      startTime: '',
                      endTime: '',
                      description: '',
                      speakerBio: '',
                      agenda: ''
                    });
                    setShowWorkshopModal(true);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add Workshop
                </button>
                </div>

          <div style={{ 
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}>
                {workshops.map((workshop, index) => (
                  <div key={workshop.id} style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #e0e0e0',
                    background: index % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                        <h3 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>{workshop.name}</h3>
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                          {new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}
                        </p>
                        <p style={{ color: '#666' }}>
                          {workshop.startTime} - {workshop.endTime}
                        </p>
                </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                          onClick={() => handleEditWorkshop(workshop)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                      </button>
                      <button
                          onClick={() => handleDeleteWorkshop(workshop.id)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#f44336',
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
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>Description</h4>
                      <p style={{ color: '#666' }}>{workshop.description}</p>
          </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>Speaker Bio</h4>
                      <p style={{ color: '#666' }}>{workshop.speakerBio}</p>
          </div>
                <div>
                      <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>Agenda</h4>
                      <p style={{ color: '#666' }}>{workshop.agenda}</p>
                </div>
              </div>
            ))}
          </div>
            </div>

            {/* Workshop Modal */}
            {showWorkshopModal && (
          <div style={{
                position: 'fixed',
            top: 0,
            left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '2rem',
                  width: '80%',
                  maxWidth: '600px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: '#1976d2' }}>{editingWorkshop ? 'Edit Workshop' : 'Add Workshop'}</h2>
                    <button
                      onClick={() => setShowWorkshopModal(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleWorkshopSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Workshop Name</label>
              <input
                  type="text"
                        name="name"
                        value={workshopForm.name}
                        onChange={handleWorkshopFormChange}
                  style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={workshopForm.startDate}
                          onChange={handleWorkshopFormChange}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={workshopForm.endDate}
                          onChange={handleWorkshopFormChange}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                        />
                        </div>
              </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Start Time</label>
                        <input
                          type="time"
                          name="startTime"
                          value={workshopForm.startTime}
                          onChange={handleWorkshopFormChange}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                        />
                </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>End Time</label>
              <input
                          type="time"
                          name="endTime"
                          value={workshopForm.endTime}
                          onChange={handleWorkshopFormChange}
                  style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0'
                          }}
                          required
                        />
                      </div>
            </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Description</label>
                      <textarea
                        name="description"
                        value={workshopForm.description}
                        onChange={handleWorkshopFormChange}
                  style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0',
                          minHeight: '100px'
                        }}
                        required
                      />
        </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Speaker Bio</label>
                <textarea
                        name="speakerBio"
                        value={workshopForm.speakerBio}
                        onChange={handleWorkshopFormChange}
                  style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0',
                          minHeight: '100px'
                        }}
                        required
                />
      </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Agenda</label>
                      <textarea
                        name="agenda"
                        value={workshopForm.agenda}
                        onChange={handleWorkshopFormChange}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0',
                          minHeight: '100px'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowWorkshopModal(false)}
                  style={{
                          padding: '0.5rem 1rem',
                          background: '#9e9e9e',
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
                          padding: '0.5rem 1rem',
                          background: '#1976d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {editingWorkshop ? 'Save Changes' : 'Add Workshop'}
                </button>
              </div>
                  </form>
            </div>
              </div>
            )}
          </div>
        )}

        {/* Keep existing modals and notifications */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleNotificationClose}
          />
        )}
        {/* Clarification Modal */}
        {clarificationModal.open && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
          <div style={{ 
              background: 'white',
              borderRadius: 10,
              padding: 32,
              minWidth: 350,
              maxWidth: 420,
              boxShadow: '0 8px 32px #1976d299',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <h3 style={{ color: '#1976d2', marginBottom: 16 }}>Add Clarification</h3>
              <textarea
                value={clarificationModal.comment}
                onChange={e => setClarificationModal(modal => ({ ...modal, comment: e.target.value }))}
                placeholder="Enter your clarification message..."
                style={{ width: '100%', minHeight: 100, marginBottom: 20, borderRadius: 6, border: '1px solid #e0e0e0', padding: 10, fontSize: 15 }}
              />
              <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'flex-end' }}>
                <button
                  style={{
                    padding: '0.5rem 1.2rem',
                    background: '#9e9e9e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setClarificationModal({ open: false, reportKey: null, comment: '' })}
                >
                  Cancel
                </button>
            <button
              style={{
                    padding: '0.5rem 1.2rem',
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  onClick={() => {
                    setClarifications(prev => ({ ...prev, [clarificationModal.reportKey]: clarificationModal.comment }));
                    setClarificationModal({ open: false, reportKey: null, comment: '' });
                  }}
                  disabled={!clarificationModal.comment.trim()}
                >
                  Save
            </button>
          </div>
                    </div>
            </div>
        )}
        {selectedCompany && (
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
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              borderRadius: 12,
              padding: 32,
              minWidth: 350,
              maxWidth: 500,
              boxShadow: '0 8px 32px #1976d299',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <h3 style={{ color: '#1976d2', marginBottom: 12 }}>{selectedCompany.name}</h3>
              <div style={{ marginBottom: 8 }}><b>Industry:</b> {selectedCompany.industry}</div>
              <div style={{ marginBottom: 8 }}><b>Founded:</b> {selectedCompany.founded}</div>
              <div style={{ marginBottom: 8 }}><b>Size:</b> {selectedCompany.size}</div>
              <div style={{ marginBottom: 8 }}><b>Location:</b> {selectedCompany.location}</div>
              <div style={{ marginBottom: 8 }}><b>Email:</b> {selectedCompany.email}</div>
              <div style={{ marginBottom: 8 }}><b>Website:</b> {selectedCompany.website}</div>
              <div style={{ marginBottom: 8 }}><b>Contact Person:</b> {selectedCompany.contactPerson}</div>
              <div style={{ marginBottom: 8 }}><b>Phone Number:</b> {selectedCompany.phoneNumber}</div>
              <div style={{ marginBottom: 8 }}><b>Registration Date:</b> {selectedCompany.registrationDate}</div>
              <div style={{ marginBottom: 8 }}><b>Description:</b> {selectedCompany.description}</div>
              <div style={{ marginBottom: 8 }}><b>Documents:</b></div>
              <div style={{ width: '100%' }}>
                {selectedCompany.documents.map((doc, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    marginBottom: '0.5rem',
                    width: '100%'
                  }}>
                    <span style={{ color: '#666', flex: 1 }}>{doc.name} <span style={{ fontSize: '0.9rem', color: '#999' }}>({doc.type.toUpperCase()}, {doc.size})</span></span>
                <button
                      onClick={() => handleFileDownload(doc)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <span role="img" aria-label="pdf">📄</span> Download PDF
                </button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 18, width: '100%', justifyContent: 'flex-end' }}>
                {selectedCompany.status === 'pending' && (
                  <>
                <button
                      style={{
                        padding: '0.5rem 1.2rem',
                        background: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => handleCompanyDecision(selectedCompany, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 1.2rem',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => handleCompanyDecision(selectedCompany, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  style={{
                    padding: '0.5rem 1.2rem',
                    background: '#9e9e9e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  onClick={() => setSelectedCompany(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}