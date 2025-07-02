import React from 'react';
import { motion } from 'framer-motion';

const AsteroidBelt: React.FC = () => {
  const asteroids = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    size: Math.random() * 8 + 4,
    distance: 200 + Math.random() * 100,
    angle: (index / 15) * 360,
    speed: Math.random() * 0.5 + 0.2,
    opacity: Math.random() * 0.6 + 0.2
  }));

  return (
    <div className="fixed top-1/2 left-1/2 pointer-events-none z-0">
      {asteroids.map((asteroid) => (
        <motion.div
          key={asteroid.id}
          className="absolute bg-gray-400 rounded-full opacity-30"
          style={{
            width: asteroid.size,
            height: asteroid.size,
            opacity: asteroid.opacity
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 60 / asteroid.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="absolute bg-gray-400 rounded-full"
            style={{
              width: asteroid.size,
              height: asteroid.size,
              transform: `translate(-50%, -50%) translateX(${asteroid.distance}px) rotate(${asteroid.angle}deg)`,
              transformOrigin: '0 0'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default AsteroidBelt;