import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SpaceAnimations: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Comet particles
    const comets: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
      size: number;
      color: string;
    }> = [];

    // Create comets
    for (let i = 0; i < 3; i++) {
      comets.push({
        x: -100,
        y: Math.random() * canvas.height,
        vx: Math.random() * 3 + 2,
        vy: (Math.random() - 0.5) * 2,
        trail: [],
        size: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 70%)` // Blue to purple range
      });
    }

    // Floating particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 260}, 60%, 70%)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update comets
      comets.forEach((comet, index) => {
        // Update position
        comet.x += comet.vx;
        comet.y += comet.vy;

        // Add to trail
        comet.trail.push({ x: comet.x, y: comet.y, opacity: 1 });
        if (comet.trail.length > 20) {
          comet.trail.shift();
        }

        // Draw trail
        comet.trail.forEach((point, i) => {
          const opacity = (i / comet.trail.length) * point.opacity * 0.8;
          const size = (i / comet.trail.length) * comet.size;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = comet.color.replace('70%)', `70%, ${opacity})`);
          ctx.fill();
        });

        // Draw comet head
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
        ctx.fillStyle = comet.color;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = comet.color;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Reset comet when it goes off screen
        if (comet.x > canvas.width + 100) {
          comet.x = -100;
          comet.y = Math.random() * canvas.height;
          comet.trail = [];
        }
      });

      // Draw and update floating particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('70%)', `70%, ${particle.opacity})`);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

// Floating Planets Component
export const FloatingPlanets: React.FC = () => {
  const planets = [
    {
      size: 60,
      color: 'from-blue-400 to-blue-600',
      position: { top: '15%', left: '10%' },
      duration: 20,
      rings: true
    },
    {
      size: 40,
      color: 'from-red-400 to-red-600',
      position: { top: '60%', right: '15%' },
      duration: 25,
      rings: false
    },
    {
      size: 35,
      color: 'from-purple-400 to-purple-600',
      position: { bottom: '20%', left: '20%' },
      duration: 30,
      rings: true
    },
    {
      size: 25,
      color: 'from-yellow-400 to-orange-500',
      position: { top: '30%', right: '25%' },
      duration: 15,
      rings: false
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {planets.map((planet, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={planet.position}
          animate={{
            rotate: 360,
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            rotate: {
              duration: planet.duration,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="relative">
            {/* Planet */}
            <div
              className={`rounded-full bg-gradient-to-br ${planet.color} opacity-30 blur-sm`}
              style={{
                width: planet.size,
                height: planet.size,
                boxShadow: `0 0 ${planet.size}px rgba(139, 92, 246, 0.3)`
              }}
            />
            
            {/* Planet rings */}
            {planet.rings && (
              <div
                className="absolute inset-0 border-2 border-purple-400/20 rounded-full"
                style={{
                  width: planet.size * 1.5,
                  height: planet.size * 0.3,
                  left: -planet.size * 0.25,
                  top: planet.size * 0.35,
                  transform: 'rotateX(75deg)'
                }}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Shooting Stars Component
export const ShootingStars: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 50}%`,
            left: '-10px'
          }}
          animate={{
            x: [0, window.innerWidth + 100],
            y: [0, Math.random() * 200 + 100],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeOut"
          }}
        >
          {/* Shooting star trail */}
          <div className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent -translate-x-20 -translate-y-0.5" />
        </motion.div>
      ))}
    </div>
  );
};

// Nebula Background Component
export const NebulaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated nebula clouds */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            'radial-gradient(circle at 70% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 90%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 90% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SpaceAnimations;