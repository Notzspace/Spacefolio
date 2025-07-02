import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, GraduationCap, Award, Star, Rocket, Play } from 'lucide-react';
import CosmicVisualEffects from './CosmicVisualEffects';

interface DetailedTimelineProps {
  onBack: () => void;
}

const DetailedTimeline: React.FC<DetailedTimelineProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCosmicAnimation, setShowCosmicAnimation] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating timeline particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: 'star' | 'dot' | 'ring';
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '#8b5cf6' : '#ec4899',
        type: Math.random() > 0.7 ? 'star' : Math.random() > 0.5 ? 'ring' : 'dot'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (particle.type === 'star') {
          // Draw star
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 144 * Math.PI) / 180;
            const x = particle.x + Math.cos(angle) * particle.size;
            const y = particle.y + Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else if (particle.type === 'ring') {
          // Draw ring
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Draw dot
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleBackClick = () => {
    console.log('Back button clicked'); // Debug log
    onBack();
  };

  const detailedEvents = [
    {
      year: "2007",
      title: "Born",
      description: "The beginning of an extraordinary journey",
      icon: Star,
      type: "milestone",
      details: "Born in 2007, marking the start of a cosmic adventure"
    },
    {
      year: "2009-2010",
      title: "Play Home",
      description: "Prassidhi School",
      icon: GraduationCap,
      type: "education",
      details: "First steps into the world of learning and discovery"
    },
    {
      year: "2010-2011",
      title: "Nursery",
      description: "Prassidhi School",
      icon: GraduationCap,
      type: "education",
      details: "Building foundational skills and making first friends"
    },
    {
      year: "2011-2012",
      title: "Lower Kindergarten",
      description: "Prassidhi School",
      icon: GraduationCap,
      type: "education",
      details: "Developing basic literacy and numeracy skills"
    },
    {
      year: "2012-2013",
      title: "Upper Kindergarten",
      description: "Prassidhi School",
      icon: GraduationCap,
      type: "education",
      details: "Preparing for formal education with advanced pre-school learning"
    },
    {
      year: "2013-2014",
      title: "Class 1",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Beginning formal education with ICSE curriculum"
    },
    {
      year: "2014-2015",
      title: "Class 2",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Continuing primary education with strong academic foundation"
    },
    {
      year: "2015-2016",
      title: "Class 3",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Developing critical thinking and problem-solving skills"
    },
    {
      year: "2016-2017",
      title: "Class 4",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Expanding knowledge across multiple subjects"
    },
    {
      year: "2017-2018",
      title: "Class 5",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Mastering intermediate concepts and preparing for higher classes"
    },
    {
      year: "2018-2019",
      title: "Class 6",
      description: "Prassidhi School (ICSE)",
      icon: GraduationCap,
      type: "education",
      details: "Completing primary education with excellent academic record"
    },
    {
      year: "2019-2020",
      title: "Class 7",
      description: "St Joseph's School (CBSE)",
      icon: GraduationCap,
      type: "education",
      details: "Transitioning to CBSE curriculum and new learning environment"
    },
    {
      year: "2020-2021",
      title: "Class 8",
      description: "St Joseph's School (CBSE)",
      icon: GraduationCap,
      type: "education",
      details: "Adapting to online learning during pandemic while maintaining excellence"
    },
    {
      year: "2021-2022",
      title: "Class 9",
      description: "St Joseph's School (CBSE)",
      icon: GraduationCap,
      type: "education",
      details: "Focusing on board preparation and subject specialization"
    },
    {
      year: "2022-2023",
      title: "Class 10",
      description: "St Joseph's School (CBSE)",
      icon: Award,
      type: "achievement",
      details: "Successfully completed 10th grade with outstanding 89% marks"
    },
    {
      year: "2023",
      title: "CBSE 10th Results",
      description: "Achieved 89%",
      icon: Award,
      type: "achievement",
      details: "Excellent performance in board examinations, setting foundation for future"
    },
    {
      year: "2023-2024",
      title: "Class 11",
      description: "St Joseph's School (CBSE) - PCM with Computer Science",
      icon: GraduationCap,
      type: "education",
      details: "Chose science stream with computer science, beginning specialization"
    },
    {
      year: "2024-2025",
      title: "Class 12",
      description: "St Joseph's School (CBSE) - PCM with Computer Science",
      icon: GraduationCap,
      type: "education",
      details: "Advanced studies in Physics, Chemistry, Mathematics, and Computer Science"
    },
    {
      year: "2025",
      title: "CBSE 12th Results",
      description: "Achieved 72%",
      icon: Award,
      type: "achievement",
      details: "Completed higher secondary education with good marks in science stream"
    },
    {
      year: "June-July 2025",
      title: "Scaler Internship",
      description: "Young's Innovative Internship Program (YIIP)",
      icon: Rocket,
      type: "internship",
      details: "Gained practical experience in technology and innovation at Scaler School of Technology"
    },
    {
      year: "Future",
      title: "AI/ML Engineering",
      description: "Bachelor's Degree Pursuit",
      icon: Rocket,
      type: "future",
      details: "Planning to pursue Bachelor's in Artificial Intelligence and Machine Learning"
    }
  ];

  return (
    <>
      <CosmicVisualEffects 
        isActive={showCosmicAnimation} 
        onComplete={() => {
          setShowCosmicAnimation(false);
          setAnimationCompleted(true);
        }} 
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40 overflow-y-auto"
      >
        {/* Animated Background */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
        />

        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-purple-500/20 p-6 z-20">
            <div className="container mx-auto flex items-center justify-between">
              <motion.button
                onClick={handleBackClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-white hover:bg-purple-500/30 transition-all cursor-pointer"
              >
                <ArrowLeft size={20} />
                <span>Back to Timeline</span>
              </motion.button>
              
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Detailed Journey Timeline
              </h1>
              
              <motion.button
                onClick={() => setShowCosmicAnimation(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all"
              >
                <Play size={16} />
                <span>Cosmic Journey</span>
              </motion.button>
            </div>
          </div>

          {/* Cosmic Animation Intro */}
          {!animationCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="container mx-auto px-6 py-12 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-sm max-w-2xl mx-auto mb-8"
              >
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  🌌 Experience the Cosmic Journey
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Before exploring my personal timeline, witness the incredible journey of the universe itself - 
                  from the Big Bang to the formation of Earth, setting the cosmic stage for all life and learning.
                </p>
                <motion.button
                  onClick={() => setShowCosmicAnimation(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  <Play size={20} />
                  <span>Begin Cosmic Journey</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Timeline Content */}
          <div className="container mx-auto px-6 py-12">
            <div className="relative max-w-4xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-50 transform -translate-x-1/2" />

              {detailedEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`bg-gradient-to-br ${
                        event.type === 'achievement' 
                          ? 'from-yellow-900/30 to-orange-900/30 border-yellow-500/20' 
                          : event.type === 'internship'
                          ? 'from-green-900/30 to-emerald-900/30 border-green-500/20'
                          : event.type === 'future'
                          ? 'from-blue-900/30 to-cyan-900/30 border-blue-500/20'
                          : 'from-purple-900/30 to-pink-900/30 border-purple-500/20'
                      } border rounded-xl p-6 backdrop-blur-sm`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar size={16} className={
                          event.type === 'achievement' 
                            ? 'text-yellow-400' 
                            : event.type === 'internship'
                            ? 'text-green-400'
                            : event.type === 'future'
                            ? 'text-blue-400'
                            : 'text-purple-400'
                        } />
                        <span className={`font-semibold ${
                          event.type === 'achievement' 
                            ? 'text-yellow-400' 
                            : event.type === 'internship'
                            ? 'text-green-400'
                            : event.type === 'future'
                            ? 'text-blue-400'
                            : 'text-purple-400'
                        }`}>
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                      <p className="text-gray-400 text-xs">{event.details}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${
                        event.type === 'achievement' 
                          ? 'from-yellow-500 to-orange-500' 
                          : event.type === 'internship'
                          ? 'from-green-500 to-emerald-500'
                          : event.type === 'future'
                          ? 'from-blue-500 to-cyan-500'
                          : 'from-purple-500 to-pink-500'
                      } rounded-full flex items-center justify-center border-4 border-black shadow-lg`}>
                        <event.icon size={24} className="text-white" />
                      </div>
                      
                      {/* Glowing effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          event.type === 'achievement' 
                            ? 'from-yellow-500 to-orange-500' 
                            : event.type === 'internship'
                            ? 'from-green-500 to-emerald-500'
                            : event.type === 'future'
                            ? 'from-blue-500 to-cyan-500'
                            : 'from-purple-500 to-pink-500'
                        } rounded-full opacity-50 blur-md`}
                        animate={{
                          scale: [1, 1.3, 1],
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
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DetailedTimeline;