import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code, FileText, Zap } from 'lucide-react';

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    github: string;
    live: string;
    features: string[];
    codeSnippet: string;
    challenges: string[];
    solutions: string[];
  };
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-50 overflow-y-auto"
    >
      <div className="container mx-auto px-6 py-8">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 text-purple-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Project Image and Basic Info */}
          <div>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="flex space-x-4 mb-8">
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <Github size={20} />
                <span>View Code</span>
              </motion.a>
              <motion.a
                href={project.live}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-3 border border-purple-500 rounded-lg font-semibold hover:bg-purple-500/20 transition-all"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </motion.a>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Zap size={20} className="mr-2 text-purple-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-8">
            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FileText size={20} className="mr-2 text-purple-400" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Code size={20} className="mr-2 text-purple-400" />
                Code Snippet
              </h3>
              <div className="bg-gray-900 border border-purple-500/20 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-400">Challenges</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-400 text-sm">
                      • {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-400">Solutions</h3>
                <ul className="space-y-2">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="text-gray-400 text-sm">
                      • {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;