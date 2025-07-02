import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import StarField from './components/StarField';
import SpaceAnimations, { FloatingPlanets, ShootingStars, NebulaBackground } from './components/SpaceAnimations';
import AsteroidBelt from './components/AsteroidBelt';
import SpaceDust from './components/SpaceDust';
import SolarSystem from './components/SolarSystem';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background layers */}
      <NebulaBackground />
      <StarField />
      <SpaceDust />
      <SpaceAnimations />
      <FloatingPlanets />
      <ShootingStars />
      <AsteroidBelt />
      <SolarSystem />
      
      {/* Content layers */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </div>
    </div>
  );
}

export default App;