// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-screen text-center -mt-16">
      <div className="bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-7xl font-bold text-charcoal">
          BALAJI BESTHA
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Software Engineer | Full-Stack Developer | Cloud Architect
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/resume.pdf" // Ensure your resume is in the /public folder
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-accent hover:text-white"
          >
            View Resume
          </a>
          <a
            href="https://www.linkedin.com/in/balaji-bestha-0129b029b/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-accent hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;