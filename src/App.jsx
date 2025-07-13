// src/App.jsx
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import Background3D from './components/Background3D';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    // The main container for your entire site
    <div className="bg-white text-charcoal">
      <Background3D />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        {/* <Projects /> */}
        <Contact />
      </main>
    </div>
  );
}

export default App;