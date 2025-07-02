import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CosmicVisualEffectsProps {
  isActive: boolean;
  onComplete: () => void;
}

const CosmicVisualEffects: React.FC<CosmicVisualEffectsProps> = ({ isActive, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showText, setShowText] = useState(false);

  const phases = [
    {
      title: "The Big Bang",
      subtitle: "13.8 billion years ago",
      description: "The universe begins with an explosive expansion",
      duration: 3000
    },
    {
      title: "Cosmic Inflation",
      subtitle: "First moments",
      description: "Space expands faster than light",
      duration: 2500
    },
    {
      title: "Formation of Matter",
      subtitle: "380,000 years later",
      description: "First atoms form as universe cools",
      duration: 2500
    },
    {
      title: "Birth of Stars",
      subtitle: "100 million years later",
      description: "Gravity pulls matter together, igniting the first stars",
      duration: 3000
    },
    {
      title: "Galaxy Formation",
      subtitle: "1 billion years later",
      description: "Stars cluster into magnificent galaxies",
      duration: 2500
    },
    {
      title: "Solar System Birth",
      subtitle: "4.6 billion years ago",
      description: "Our Sun ignites, planets begin to form",
      duration: 3000
    },
    {
      title: "Earth Formation",
      subtitle: "4.5 billion years ago",
      description: "Our beautiful blue planet takes shape",
      duration: 3000
    }
  ];

  useEffect(() => {
    if (!isActive) return;

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

    let animationId: number;
    let startTime = Date.now();
    let phaseStartTime = Date.now();

    // Particle systems for different phases
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
      life: number;
      maxLife: number;
      type: string;
    }> = [];

    const createBigBangParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 5;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 2,
          color: `hsl(${Math.random() * 60 + 10}, 100%, ${Math.random() * 50 + 50}%)`, // Red to yellow
          opacity: 1,
          life: 0,
          maxLife: 3000,
          type: 'explosion'
        });
      }
    };

    const createInflationParticles = () => {
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 1,
          color: `hsl(${Math.random() * 120 + 200}, 80%, 70%)`, // Blue to purple
          opacity: 0.8,
          life: 0,
          maxLife: 2500,
          type: 'inflation'
        });
      }
    };

    const createMatterParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 2,
          color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`, // Purple to magenta
          opacity: 0.9,
          life: 0,
          maxLife: 2500,
          type: 'matter'
        });
      }
    };

    const createStarParticles = () => {
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 6 + 3,
          color: `hsl(${Math.random() * 60 + 40}, 100%, 80%)`, // Yellow to white
          opacity: 1,
          life: 0,
          maxLife: 3000,
          type: 'star'
        });
      }
    };

    const createGalaxyParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 200 + 50;
        particles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: Math.cos(angle + Math.PI/2) * 2,
          vy: Math.sin(angle + Math.PI/2) * 2,
          size: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 120 + 200}, 80%, 70%)`,
          opacity: 0.8,
          life: 0,
          maxLife: 2500,
          type: 'galaxy'
        });
      }
    };

    const createSolarSystemParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Sun
      particles.push({
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        size: 30,
        color: '#FFD700',
        opacity: 1,
        life: 0,
        maxLife: 3000,
        type: 'sun'
      });

      // Planets
      const planetColors = ['#8C7853', '#FFC649', '#6B93D6', '#C1440E', '#D8CA9D', '#FAD5A5'];
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 80 + i * 30;
        particles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: Math.cos(angle + Math.PI/2) * (3 - i * 0.3),
          vy: Math.sin(angle + Math.PI/2) * (3 - i * 0.3),
          size: Math.random() * 8 + 4,
          color: planetColors[i],
          opacity: 1,
          life: 0,
          maxLife: 3000,
          type: 'planet'
        });
      }
    };

    const createEarthParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Earth
      particles.push({
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        size: 50,
        color: '#4A90E2',
        opacity: 1,
        life: 0,
        maxLife: 3000,
        type: 'earth'
      });

      // Atmosphere
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 60 + Math.random() * 20;
        particles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: Math.cos(angle) * 0.5,
          vy: Math.sin(angle) * 0.5,
          size: Math.random() * 3 + 1,
          color: '#87CEEB',
          opacity: 0.6,
          life: 0,
          maxLife: 3000,
          type: 'atmosphere'
        });
      }
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const phaseElapsed = currentTime - phaseStartTime;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Phase transitions
      if (phaseElapsed > phases[currentPhase]?.duration && currentPhase < phases.length - 1) {
        setCurrentPhase(prev => prev + 1);
        phaseStartTime = currentTime;
        particles.length = 0; // Clear particles for new phase
        setShowText(true);
        setTimeout(() => setShowText(false), 2000);

        // Create particles for new phase
        switch (currentPhase + 1) {
          case 0: createBigBangParticles(); break;
          case 1: createInflationParticles(); break;
          case 2: createMatterParticles(); break;
          case 3: createStarParticles(); break;
          case 4: createGalaxyParticles(); break;
          case 5: createSolarSystemParticles(); break;
          case 6: createEarthParticles(); break;
        }
      }

      // Initialize first phase
      if (particles.length === 0 && currentPhase === 0) {
        createBigBangParticles();
        setShowText(true);
        setTimeout(() => setShowText(false), 2000);
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.life += 16; // Assuming 60fps
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply gravity for certain types
        if (particle.type === 'matter' || particle.type === 'galaxy') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0) {
            particle.vx += (dx / distance) * 0.01;
            particle.vy += (dy / distance) * 0.01;
          }
        }

        // Orbital motion for planets
        if (particle.type === 'planet') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const angle = Math.atan2(dy, dx) + 0.02;
          const radius = Math.sqrt(dx * dx + dy * dy);
          particle.x = centerX + Math.cos(angle) * radius;
          particle.y = centerY + Math.sin(angle) * radius;
        }

        // Fade out over time
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0, 1 - lifeRatio);

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (particle.type === 'star' || particle.type === 'sun') {
          // Draw glowing effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (particle.type === 'earth') {
          // Draw Earth with continents
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Add green continents
          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(particle.x - 15, particle.y - 10, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(particle.x + 10, particle.y + 15, 8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particles.splice(index, 1);
        }
      });

      // Check if sequence is complete
      if (currentPhase >= phases.length - 1 && particles.length === 0) {
        setTimeout(() => {
          onComplete();
        }, 1000);
        return;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isActive, currentPhase, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              <motion.h1
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
              >
                {phases[currentPhase]?.title}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-purple-400 mb-2"
              >
                {phases[currentPhase]?.subtitle}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 max-w-2xl mx-auto"
              >
                {phases[currentPhase]?.description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= currentPhase 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Skip button */}
      <motion.button
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        className="absolute top-8 right-8 px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
      >
        Skip Animation
      </motion.button>
    </div>
  );
};

export default CosmicVisualEffects;