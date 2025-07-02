import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Code, Palette, Zap } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code"
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Crafting beautiful and intuitive user interfaces"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed and reliability"
    },
    {
      icon: User,
      title: "User Experience",
      description: "Creating delightful experiences for end users"
    }
  ];

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with a love for creating digital experiences 
            that push the boundaries of what's possible. With expertise in modern web technologies, 
            I bring ideas to life through code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                responsive, user-friendly applications that deliver exceptional user experiences. 
                My journey in tech has been driven by curiosity and a constant desire to learn 
                and grow.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring the latest technologies, 
                contributing to open-source projects, or stargazing and dreaming about the 
                future of technology.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-lg backdrop-blur-sm"
              >
                <feature.icon size={32} className="text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;