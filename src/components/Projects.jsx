import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Text, Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { 
  ExternalLink, 
  Github, 
  Eye, 
  X, 
  ArrowLeft, 
  ArrowRight,
  Database,
  Brain,
  Shield,
  TrendingUp,
  Code,
  Globe
} from 'lucide-react'

// 3D Project Card
function ProjectCard3D({ project, index, total, isActive, onClick }) {
  const meshRef = useRef()
  const angle = (index / total) * Math.PI * 2
  const radius = 3
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate around the carousel
      meshRef.current.position.x = Math.cos(angle) * radius
      meshRef.current.position.z = Math.sin(angle) * radius
      
      // Scale and opacity based on active state
      const targetScale = isActive ? 1.2 : 0.8
      const targetOpacity = isActive ? 1 : 0.6
      
      meshRef.current.scale.lerp([targetScale, targetScale, targetScale], 0.1)
      
      // Rotate to face center
      meshRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={meshRef} onClick={onClick}>
      <Box args={[2, 1.5, 0.1]}>
        <meshStandardMaterial
          color={isActive ? "#3A5A9B" : "#666"}
          emissive={isActive ? "#3A5A9B" : "#333"}
          emissiveIntensity={isActive ? 0.3 : 0.1}
          transparent
          opacity={isActive ? 0.9 : 0.7}
        />
      </Box>
      
      {/* Project title floating above card */}
      <Html position={[0, 1, 0]} center>
        <div className="text-center">
          <h3 className="text-accent font-semibold text-sm">{project.title}</h3>
        </div>
      </Html>
    </group>
  )
}

// 3D Carousel
function ProjectCarousel({ projects, activeIndex, setActiveIndex }) {
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </group>
  )
}

// Floating Tech Icons
function FloatingTechIcons() {
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.x += delta * 0.05
    }
  })

  const icons = [
    { icon: Database, position: [2, 1, 0], color: "#3A5A9B" },
    { icon: Brain, position: [-2, 1, 0], color: "#3A5A9B" },
    { icon: Shield, position: [0, 2, 1], color: "#3A5A9B" },
    { icon: TrendingUp, position: [0, -2, 1], color: "#3A5A9B" },
    { icon: Code, position: [1, 0, 2], color: "#3A5A9B" },
    { icon: Globe, position: [-1, 0, 2], color: "#3A5A9B" }
  ]

  return (
    <group ref={groupRef}>
      {icons.map((item, index) => (
        <group key={index} position={item.position}>
          <Box args={[0.3, 0.3, 0.3]}>
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Box>
        </group>
      ))}
    </group>
  )
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Student Performance Analytics Dashboard",
      description: "A comprehensive Power BI dashboard for analyzing student enrollment trends, academic performance, and institutional metrics. Features interactive visualizations, drill-down capabilities, and automated data refresh.",
      image: "/projects/dashboard.jpg",
      technologies: ["Power BI", "SQL", "Python", "DAX", "Excel"],
      features: [
        "Real-time enrollment analytics with trend analysis",
        "Interactive drill-down capabilities for detailed insights",
        "Automated data refresh and ETL processes",
        "Custom DAX measures for complex calculations",
        "Responsive design for multiple device access"
      ],
      github: "https://github.com/balajibestha/student-analytics",
      live: "https://student-analytics-demo.com",
      category: "Data Analytics",
      icon: TrendingUp,
      color: "#3A5A9B"
    },
    {
      id: 2,
      title: "Machine Learning Credit Risk Model",
      description: "A predictive model for credit risk assessment using machine learning algorithms. Analyzes customer data to predict loan default probability with high accuracy.",
      image: "/projects/ml-model.jpg",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "Random Forest and XGBoost ensemble methods",
        "Feature engineering and selection techniques",
        "Cross-validation and hyperparameter tuning",
        "Model interpretability with SHAP values",
        "Real-time prediction API with Flask"
      ],
      github: "https://github.com/balajibestha/credit-risk-model",
      live: "https://credit-risk-predictor.com",
      category: "Machine Learning",
      icon: Brain,
      color: "#3A5A9B"
    },
    {
      id: 3,
      title: "Cybersecurity Threat Detection System",
      description: "An automated system for detecting and analyzing security threats using log analysis and pattern recognition. Provides real-time alerts and threat intelligence.",
      image: "/projects/security.jpg",
      technologies: ["Python", "ELK Stack", "Regex", "Security Tools", "Docker"],
      features: [
        "Real-time log parsing and threat detection",
        "Pattern recognition for anomaly identification",
        "Automated alert generation and escalation",
        "Threat intelligence integration",
        "Comprehensive security dashboard"
      ],
      github: "https://github.com/balajibestha/threat-detection",
      live: "https://threat-detection-demo.com",
      category: "Cybersecurity",
      icon: Shield,
      color: "#3A5A9B"
    },
    {
      id: 4,
      title: "E-commerce Data Analysis Platform",
      description: "A comprehensive data analysis platform for e-commerce businesses. Provides insights into customer behavior, sales trends, and inventory optimization.",
      image: "/projects/ecommerce.jpg",
      technologies: ["SQL", "Python", "Tableau", "AWS", "PostgreSQL"],
      features: [
        "Customer segmentation and behavior analysis",
        "Sales forecasting and trend prediction",
        "Inventory optimization algorithms",
        "Real-time dashboard with live data feeds",
        "Automated reporting and alerting system"
      ],
      github: "https://github.com/balajibestha/ecommerce-analytics",
      live: "https://ecommerce-analytics-demo.com",
      category: "Business Intelligence",
      icon: Database,
      color: "#3A5A9B"
    },
    {
      id: 5,
      title: "Weather Data Visualization App",
      description: "An interactive web application for visualizing weather data with real-time updates. Features multiple chart types and location-based weather insights.",
      image: "/projects/weather.jpg",
      technologies: ["React", "D3.js", "Node.js", "MongoDB", "Weather API"],
      features: [
        "Real-time weather data integration",
        "Interactive charts and visualizations",
        "Location-based weather insights",
        "Historical weather trend analysis",
        "Mobile-responsive design"
      ],
      github: "https://github.com/balajibestha/weather-viz",
      live: "https://weather-viz-app.com",
      category: "Data Visualization",
      icon: Globe,
      color: "#3A5A9B"
    }
  ]

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="section-padding relative bg-off-white">
      {/* Remove the decorative background Canvas here */}

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="heading-text">Projects</span>
            </h2>
            <p className="text-2xl text-[#555] max-w-3xl mx-auto">
              A showcase of my technical projects spanning data analysis, machine learning, 
              cybersecurity, and web development
            </p>
          </motion.div>

          {/* 3D Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[32rem] relative"
          >
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <ProjectCarousel 
                projects={projects} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <motion.button
                onClick={prevProject}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto p-3 bg-white/20 backdrop-blur-md rounded-full text-accent hover:text-neon-cyan transition-colors duration-200"
              >
                <ArrowLeft size={28} />
              </motion.button>
              <motion.button
                onClick={nextProject}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto p-3 bg-white/20 backdrop-blur-md rounded-full text-accent hover:text-neon-cyan transition-colors duration-200"
              >
                <ArrowRight size={28} />
              </motion.button>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="glass-effect p-12 rounded-2xl max-w-3xl mx-auto bg-white/90 shadow-lg">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="p-3 rounded-lg bg-accent/10">
                  {(() => {
                    const IconComponent = projects[activeIndex].icon;
                    return <IconComponent size={32} style={{ color: '#3A5A9B' }} />;
                  })()}
                </div>
                <span className="text-lg text-accent font-semibold">{projects[activeIndex].category}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-charcoal mb-4">{projects[activeIndex].title}</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{projects[activeIndex].description}</p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {projects[activeIndex].technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    className="px-4 py-2 bg-light-gray text-accent text-base rounded-full border border-accent/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex justify-center space-x-6">
                <motion.button
                  onClick={() => setSelectedProject(projects[activeIndex])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-accent text-[#2C3E50] px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  <Eye size={20} />
                  <span>View Details</span>
                </motion.button>
                
                <motion.a
                  href={projects[activeIndex].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 border border-accent text-accent px-8 py-3 rounded-lg font-semibold text-lg hover:bg-accent hover:text-[#2C3E50] transition-all duration-300"
                >
                  <Github size={20} />
                  <span>Code</span>
                </motion.a>
                
                <motion.a
                  href={projects[activeIndex].live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 border border-accent text-accent px-8 py-3 rounded-lg font-semibold text-lg hover:bg-accent hover:text-[#2C3E50] transition-all duration-300"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-effect max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `#3A5A9B20` }}>
                    <selectedProject.icon size={24} style={{ color: '#3A5A9B' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#2C3E50]">{selectedProject.title}</h2>
                    <p className="text-accent">{selectedProject.category}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-[#2C3E50] transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-3">Description</h3>
                  <p className="text-[#555] leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-[#555]">
                        <span className="text-accent mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-light-gray text-accent text-sm rounded-full border border-accent/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-accent text-[#2C3E50] px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </motion.a>
                  
                  <motion.a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 border border-accent text-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-[#2C3E50] transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects 