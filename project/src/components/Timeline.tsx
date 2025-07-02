import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, GraduationCap, Award, Rocket, ChevronRight } from 'lucide-react';
import DetailedTimeline from './DetailedTimeline';

const Timeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showDetailedTimeline, setShowDetailedTimeline] = useState(false);

  const handleShowDetailedTimeline = () => {
    console.log('Opening detailed timeline'); // Debug log
    setShowDetailedTimeline(true);
  };

  const handleBackFromDetailedTimeline = () => {
    console.log('Closing detailed timeline'); // Debug log
    setShowDetailedTimeline(false);
  };

  const timelineEvents = [
    {
      year: "2007",
      title: "Born",
      description: "The beginning of a cosmic journey",
      icon: Rocket,
      type: "birth"
    },
    {
      year: "2009-2019",
      title: "Prassidhi School",
      description: "Foundation years from Play Home to Class 6 (ICSE Syllabus)",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2019-2023",
      title: "St Joseph's School",
      description: "Class 7-10 CBSE • Passed 10th with 89%",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2023-2025",
      title: "St Joseph's School",
      description: "Class 11-12 CBSE (PCM with Computer Science) • Passed 12th with 72%",
      icon: GraduationCap,
      type: "education"
    },
    {
      year: "2025",
      title: "Scaler School of Technology",
      description: "Young's Innovative Internship Program (YIIP) • June-July 2025",
      icon: Rocket,
      type: "internship"
    },
    {
      year: "Future",
      title: "AI/ML Engineering",
      description: "Pursuing Bachelor's in AI/ML Engineering",
      icon: Rocket,
      type: "future"
    }
  ];

  const certifications = [
    {
      title: "Python (Basic)",
      provider: "HackerRank",
      year: "2024",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "Generative AI",
      provider: "Outskill",
      year: "2024",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Cyber Security (Basic)",
      provider: "TuteDude",
      year: "2024",
      color: "from-red-400 to-red-600"
    },
    {
      title: "More Courses",
      provider: "In Progress",
      year: "2024",
      color: "from-blue-400 to-blue-600"
    }
  ];

  if (showDetailedTimeline) {
    return <DetailedTimeline onBack={handleBackFromDetailedTimeline} />;
  }

  return (
    <section id="timeline" className="py-20 relative z-10 overflow-hidden">
      {/* Floating Timeline Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Cosmic Timeline Line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-30"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A cosmic voyage through education, growth, and discovery
          </p>
        </motion.div>

        {/* Timeline Events */}
        <div className="relative max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={16} className="text-purple-400" />
                    <span className="text-purple-400 font-semibold">{event.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </motion.div>
              </div>

              {/* Timeline Node */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-black shadow-lg shadow-purple-500/25">
                    <event.icon size={24} className="text-white" />
                  </div>
                  
                  {/* Glowing effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Detailed Timeline Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={handleShowDetailedTimeline}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
          >
            <span>View Detailed Timeline</span>
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Award size={24} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                <p className="text-purple-400 text-sm mb-1">{cert.provider}</p>
                <p className="text-gray-400 text-xs">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;