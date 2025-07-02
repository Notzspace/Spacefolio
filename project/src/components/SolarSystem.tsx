import React from 'react';
import { motion } from 'framer-motion';

const SolarSystem: React.FC = () => {
  const planets = [
    { name: 'Mercury', size: 8, distance: 80, speed: 4, color: 'bg-gray-400' },
    { name: 'Venus', size: 12, distance: 100, speed: 7, color: 'bg-yellow-400' },
    { name: 'Earth', size: 14, distance: 120, speed: 10, color: 'bg-blue-500' },
    { name: 'Mars', size: 10, distance: 140, speed: 15, color: 'bg-red-500' },
    { name: 'Jupiter', size: 28, distance: 180, speed: 25, color: 'bg-orange-400' },
    { name: 'Saturn', size: 24, distance: 220, speed: 30, color: 'bg-yellow-600' }
  ];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-20">
      {/* Sun */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
        style={{ left: -32, top: -32 }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse opacity-50" />
      </motion.div>

      {/* Orbital paths */}
      {planets.map((planet, index) => (
        <div
          key={`orbit-${index}`}
          className="absolute border border-purple-500/10 rounded-full"
          style={{
            width: planet.distance * 2,
            height: planet.distance * 2,
            left: -planet.distance,
            top: -planet.distance
          }}
        />
      ))}

      {/* Planets */}
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{
            duration: planet.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className={`${planet.color} rounded-full absolute`}
            style={{
              width: planet.size,
              height: planet.size,
              left: planet.distance - planet.size / 2,
              top: -planet.size / 2
            }}
          >
            {planet.name === 'Saturn' && (
              <div
                className="absolute border-2 border-yellow-600/50 rounded-full"
                style={{
                  width: planet.size * 1.8,
                  height: planet.size * 0.4,
                  left: -planet.size * 0.4,
                  top: planet.size * 0.3,
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

export default SolarSystem;