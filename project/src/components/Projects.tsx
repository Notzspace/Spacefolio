import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Rocket, Database, Palette } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'spacex-mission-control',
      title: "SpaceX Mission Control",
      description: "A real-time mission control dashboard for SpaceX launches with live data feeds, interactive visualizations, and mission tracking.",
      longDescription: "This comprehensive mission control dashboard provides real-time monitoring and control capabilities for space missions. Built with modern web technologies, it features live telemetry data visualization, mission timeline tracking, and interactive 3D spacecraft models. The system handles thousands of data points per second and provides critical mission information to ground control teams.",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "TypeScript", "WebSocket", "D3.js", "Three.js", "Node.js"],
      github: "https://github.com/spacex/mission-control",
      live: "https://mission-control-demo.vercel.app",
      icon: Rocket,
      features: [
        "Real-time telemetry data visualization",
        "Interactive 3D spacecraft models",
        "Mission timeline and event tracking",
        "Alert system for critical parameters",
        "Multi-screen dashboard support",
        "Historical data analysis and reporting"
      ],
      codeSnippet: `// Real-time telemetry data handler
const TelemetryHandler = () => {
  const [telemetryData, setTelemetryData] = useState({});
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.spacex.com/telemetry');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTelemetryData(prev => ({
        ...prev,
        [data.parameter]: {
          value: data.value,
          timestamp: data.timestamp,
          status: data.status
        }
      }));
    };
    
    return () => ws.close();
  }, []);
  
  return (
    <TelemetryDisplay data={telemetryData} />
  );
};`,
      challenges: [
        "Handling high-frequency real-time data streams",
        "Ensuring zero-latency critical alerts",
        "Managing complex 3D visualizations performance",
        "Synchronizing multiple data sources"
      ],
      solutions: [
        "Implemented WebSocket connection pooling",
        "Used Web Workers for background processing",
        "Optimized Three.js rendering with LOD",
        "Created custom data synchronization layer"
      ]
    },
    {
      id: 'cosmic-database-explorer',
      title: "Cosmic Database Explorer",
      description: "An interactive tool for exploring astronomical databases with advanced filtering, visualization, and data export capabilities.",
      longDescription: "A powerful data exploration platform that connects to multiple astronomical databases including NASA's exoplanet archive, stellar catalogs, and deep space object databases. Features advanced search capabilities, interactive visualizations, and comprehensive data export options for researchers and space enthusiasts.",
      image: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "PostgreSQL", "GraphQL", "Chart.js", "Python", "FastAPI"],
      github: "https://github.com/cosmic/database-explorer",
      live: "https://cosmic-explorer.vercel.app",
      icon: Database,
      features: [
        "Multi-database query interface",
        "Advanced filtering and search",
        "Interactive data visualizations",
        "Custom chart generation",
        "Data export in multiple formats",
        "Collaborative research tools"
      ],
      codeSnippet: `// GraphQL resolver for astronomical data
const resolvers = {
  Query: {
    searchCelestialObjects: async (_, { filters, limit = 100 }) => {
      const query = buildDynamicQuery(filters);
      
      const results = await db.query(\`
        SELECT * FROM celestial_objects 
        WHERE \${query.conditions}
        ORDER BY magnitude ASC
        LIMIT \${limit}
      \`, query.params);
      
      return results.map(obj => ({
        ...obj,
        coordinates: {
          ra: obj.right_ascension,
          dec: obj.declination
        }
      }));
    }
  }
};`,
      challenges: [
        "Querying massive astronomical datasets efficiently",
        "Handling complex coordinate transformations",
        "Visualizing multi-dimensional data",
        "Ensuring data accuracy and validation"
      ],
      solutions: [
        "Implemented database indexing strategies",
        "Used specialized astronomy libraries",
        "Created custom visualization components",
        "Built comprehensive data validation pipeline"
      ]
    },
    {
      id: 'stellar-design-system',
      title: "Stellar Design System",
      description: "A comprehensive design system and component library inspired by cosmic aesthetics, used across multiple space-themed applications.",
      longDescription: "A complete design system that provides a unified visual language for space-themed applications. Includes a comprehensive component library, design tokens, accessibility guidelines, and documentation. Used across multiple projects to ensure consistent user experience and accelerated development.",
      image: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Storybook", "Tailwind CSS", "React", "TypeScript", "Figma", "Chromatic"],
      github: "https://github.com/stellar/design-system",
      live: "https://stellar-design-system.netlify.app",
      icon: Palette,
      features: [
        "50+ reusable React components",
        "Comprehensive design tokens",
        "Dark/light theme support",
        "Accessibility compliance (WCAG 2.1)",
        "Interactive documentation",
        "Automated visual regression testing"
      ],
      codeSnippet: `// Design token system implementation
const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#8b5cf6',
      900: '#312e81'
    },
    cosmic: {
      nebula: '#ff6b9d',
      starlight: '#ffd93d',
      void: '#0f0f23'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};

export const Button = styled.button\`
  background: \${props => 
    props.variant === 'cosmic' 
      ? \`linear-gradient(45deg, \${tokens.colors.cosmic.nebula}, \${tokens.colors.cosmic.starlight})\`
      : tokens.colors.primary[500]
  };
  padding: \${tokens.spacing.md} \${tokens.spacing.lg};
  border-radius: \${tokens.spacing.sm};
\`;`,
      challenges: [
        "Maintaining consistency across multiple projects",
        "Ensuring accessibility compliance",
        "Managing component API evolution",
        "Coordinating with design team workflows"
      ],
      solutions: [
        "Implemented automated testing and linting",
        "Created comprehensive accessibility guidelines",
        "Used semantic versioning and migration guides",
        "Integrated with Figma for design-dev handoff"
      ]
    }
  ];

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore some of my recent work and the technologies behind them
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl overflow-hidden backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <project.icon size={24} className="text-purple-400" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProjectData && (
        <ProjectDetail
          project={selectedProjectData}
          onBack={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;