import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Edit3, Save, X, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface CVProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV: React.FC<CVProps> = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: "Hemanth Kumar M",
      title: "AI/ML Engineering Student & Full Stack Developer",
      email: "info_notzspace@yahoo.com",
      phone: "+91 91081-18198",
      location: "Bengaluru, Karnataka, India",
      website: "www.notzspace.dev",
      github: "github.com/Notzspace",
      linkedin: "linkedin.com/in/og-hemanth-kumar-m"
    },
    summary: "Passionate AI/ML engineering student and full-stack developer with expertise in modern web technologies. Currently pursuing Bachelor's in AI/ML Engineering with hands-on experience in Python, React, and machine learning. Completed Young's Innovative Internship Program at Scaler School of Technology.",
    experience: [
      {
        title: "Intern - Young's Innovative Internship Program",
        company: "Scaler School of Technology",
        period: "June - July 2025",
        description: [
          "Participated in intensive technology and innovation program",
          "Gained hands-on experience in modern development practices",
          "Collaborated on real-world projects with industry mentors",
          "Developed skills in AI/ML applications and full-stack development"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "Personal Projects",
        period: "2024 - Present",
        description: [
          "Built responsive web applications using React and TypeScript",
          "Developed space-themed portfolio with advanced animations",
          "Implemented real-time features and interactive visualizations",
          "Created comprehensive design systems and component libraries"
        ]
      },
      {
        title: "Student Developer",
        company: "Academic Projects",
        period: "2023 - Present",
        description: [
          "Completed various programming projects in Python and JavaScript",
          "Developed machine learning models for academic assignments",
          "Participated in coding competitions and hackathons",
          "Mentored junior students in programming fundamentals"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor's in AI/ML Engineering",
        institution: "Currently Pursuing",
        year: "2025 - 2029"
      },
      {
        degree: "Class 12 CBSE (PCM with Computer Science)",
        institution: "St Joseph's School",
        year: "2025 - 72%"
      },
      {
        degree: "Class 10 CBSE",
        institution: "St Joseph's School",
        year: "2023 - 89%"
      }
    ],
    skills: [
      "Python", "JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS",
      "Machine Learning", "Data Analysis", "Git", "Linux", "Tailwind CSS",
      "Framer Motion", "PostgreSQL", "MongoDB", "REST APIs", "Responsive Design"
    ],
    projects: [
      {
        name: "Space-Themed Portfolio",
        description: "Interactive portfolio with cosmic animations and visual effects",
        technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"]
      },
      {
        name: "Machine Learning Projects",
        description: "Various ML models for classification and prediction tasks",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"]
      },
      {
        name: "Web Development Projects",
        description: "Full-stack applications with modern UI/UX design",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
      }
    ]
  });

  const handleDownload = () => {
    const element = document.getElementById('cv-content');
    if (element) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${cvData.personalInfo.name} - CV</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                .header { text-align: center; margin-bottom: 30px; }
                .name { font-size: 28px; font-weight: bold; color: #8b5cf6; }
                .title { font-size: 18px; color: #666; margin: 5px 0; }
                .contact { display: flex; justify-content: center; gap: 20px; margin: 15px 0; }
                .section { margin: 25px 0; }
                .section-title { font-size: 20px; font-weight: bold; color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 5px; }
                .experience-item { margin: 15px 0; }
                .job-title { font-weight: bold; }
                .company { color: #666; }
                .period { float: right; color: #666; }
                .skills { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill { background: #f3f4f6; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
                ul { margin: 10px 0; padding-left: 20px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="name">${cvData.personalInfo.name}</div>
                <div class="title">${cvData.personalInfo.title}</div>
                <div class="contact">
                  <span>${cvData.personalInfo.email}</span>
                  <span>${cvData.personalInfo.phone}</span>
                  <span>${cvData.personalInfo.location}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <p>${cvData.summary}</p>
              </div>
              
              <div class="section">
                <div class="section-title">Experience</div>
                ${cvData.experience.map(exp => `
                  <div class="experience-item">
                    <div class="job-title">${exp.title}</div>
                    <div class="company">${exp.company} <span class="period">${exp.period}</span></div>
                    <ul>
                      ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
              
              <div class="section">
                <div class="section-title">Education</div>
                ${cvData.education.map(edu => `
                  <div class="experience-item">
                    <div class="job-title">${edu.degree}</div>
                    <div class="company">${edu.institution} <span class="period">${edu.year}</span></div>
                  </div>
                `).join('')}
              </div>
              
              <div class="section">
                <div class="section-title">Technical Skills</div>
                <div class="skills">
                  ${cvData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">Key Projects</div>
                ${cvData.projects.map(project => `
                  <div class="experience-item">
                    <div class="job-title">${project.name}</div>
                    <p>${project.description}</p>
                    <div class="skills">
                      ${project.technologies.map(tech => `<span class="skill">${tech}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const updateCvData = (section: string, field: string, value: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof CVData],
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional CV
          </h2>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
            >
              {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </motion.button>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <Download size={16} />
              <span>Download</span>
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* CV Content */}
        <div id="cv-content" className="p-8 text-white">
          {/* Personal Info */}
          <div className="text-center mb-8">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={cvData.personalInfo.name}
                  onChange={(e) => updateCvData('personalInfo', 'name', e.target.value)}
                  className="text-4xl font-bold bg-transparent border-b border-purple-500/30 text-center w-full focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={cvData.personalInfo.title}
                  onChange={(e) => updateCvData('personalInfo', 'title', e.target.value)}
                  className="text-xl bg-transparent border-b border-purple-500/30 text-center w-full focus:outline-none focus:border-purple-500 text-gray-300"
                />
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {cvData.personalInfo.name}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{cvData.personalInfo.title}</p>
              </>
            )}
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span>{cvData.personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>{cvData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{cvData.personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Professional Summary</h2>
            {isEditing ? (
              <textarea
                value={cvData.summary}
                onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full bg-black/30 border border-purple-500/30 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-purple-500 resize-none"
                rows={4}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed">{cvData.summary}</p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Experience</h2>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-purple-500/30 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                      <p className="text-purple-300">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Education</h2>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-purple-500/30 pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <p className="text-purple-300">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-400">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Key Projects</h2>
            <div className="space-y-4">
              {cvData.projects.map((project, index) => (
                <div key={index} className="bg-black/20 border border-purple-500/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CV;