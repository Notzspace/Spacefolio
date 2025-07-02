import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import CV from './CV';

const Hero: React.FC = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              SPACE
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl font-light mb-8 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Crafting digital experiences that are out of this world. 
              Building the future, one line of code at a time.
            </motion.p>
            
            <motion.div
              className="flex justify-center space-x-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {[
                { icon: Github, href: "https://github.com/Notzspace" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/og-hemanth-kumar-m?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { icon: Mail, href: "#", onClick: scrollToContact }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  onClick={social.onClick}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 border border-purple-500/30 rounded-full hover:bg-purple-500/20 transition-colors"
                >
                  <social.icon size={24} className="text-purple-400" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => setIsCVOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-purple-500 rounded-full font-semibold hover:bg-purple-500/20 transition-all"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} className="text-purple-400" />
          </motion.div>
        </div>
      </section>

      <CV isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
};

export default Hero;