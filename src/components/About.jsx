import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Torus, Text } from '@react-three/drei'
import { gsap } from 'gsap'
import { 
  GraduationCap, 
  Code, 
  Database, 
  Cloud, 
  Brain, 
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  User
} from 'lucide-react'

// Minimalist 3D Data Node Cluster (Avatar)
function DataNodeAvatar() {
  const groupRef = useRef()
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  // Node positions (abstract, geometric)
  const nodes = [
    [0, 0, 0],
    [0.7, 0.5, 0.3],
    [-0.7, 0.6, -0.2],
    [0.5, -0.7, 0.4],
    [-0.6, -0.5, -0.3],
    [0.2, 0.9, -0.5],
    [-0.9, -0.2, 0.7],
    [0.8, -0.3, -0.6],
  ]
  // Edges (lines between nodes)
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 6], [3, 7], [4, 6], [5, 7],
  ]
  return (
    <group ref={groupRef}>
      {/* Central node */}
      <Sphere args={[0.18, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4A908C" opacity={0.9} transparent />
      </Sphere>
       {/* Outer nodes */}
      {nodes.slice(1).map((pos, i) => (
        <Sphere key={i} args={[0.11, 20, 20]} position={pos}>
          <meshStandardMaterial color="#B0BEC5" opacity={0.7} transparent />
        </Sphere>
      ))}
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...nodes[a], ...nodes[b]])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#4A908C" linewidth={1} opacity={0.5} transparent />
        </line>
      ))}
    </group>
  )
}

// Minimalist 3D Wireframe Ring
function WireframeRing() {
  const ringRef = useRef()
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.15
      ringRef.current.rotation.y += delta * 0.25
    }
  })
  return (
    <group ref={ringRef}>
      <Torus args={[1, 0.04, 32, 100]}>
        <meshStandardMaterial color="#3A5A9B" wireframe opacity={0.7} transparent />
      </Torus>
      {/* Optionally, add a few floating spheres for subtlety */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sphere key={i} args={[0.07, 16, 16]} position={[
          Math.cos((i / 6) * Math.PI * 2) * 1.2,
          Math.sin((i / 6) * Math.PI * 2) * 1.2,
          0
        ]}>
          <meshStandardMaterial color="#3A5A9B" opacity={0.7} transparent />
        </Sphere>
      ))}
    </group>
  )
}

function FloatingCube() {
  return (
    <Box args={[1, 1, 1]} scale={2}>
      <meshStandardMaterial
        color="#3A5A9B"
        wireframe
        transparent
        opacity={0.2}
      />
    </Box>
  )
}

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skills = [
    { name: 'Python', icon: Code, level: 90 },
    { name: 'SQL', icon: Database, level: 95 },
    { name: 'Machine Learning', icon: Brain, level: 85 },
    { name: 'Cloud Platforms', icon: Cloud, level: 85 },
    { name: 'Data Visualization', icon: TrendingUp, level: 90 },
  ]

  const education = [
    {
      degree: "Master's in Computer Science",
      school: "Pace University, New York",
      period: "Sep 2023 - May 2025",
      icon: GraduationCap
    },
    {
      degree: "Bachelor's in Computer Science",
      school: "Srinivasa Ramanujan Institute of Technology, India",
      period: "Aug 2019 - May 2023",
      icon: GraduationCap
    }
  ]

  // GSAP animations for skills
  useEffect(() => {
    if (inView) {
      gsap.fromTo('.skill-bar', 
        { width: 0 },
        { 
          width: (i, el) => el.dataset.level + '%',
          duration: 1.5,
          delay: 0.5,
          ease: "power2.out",
          stagger: 0.2
        }
      )
    }
  }, [inView])

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        '.about-fade',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );
    }
  }, [inView]);

  return (
    <section id="about" className="section-padding relative bg-off-white">
      {/* Preview the new Crystalline Icon family */}
      <div className="mb-12 flex justify-center">
        {/* Removed the Crystalline Icons component */}
      </div>

      <div className="container-custom">
        <motion.div
          ref={ref}
          className="about-fade grid lg:grid-cols-2 gap-12 items-center bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-10"
        >
          {/* Left Column - 3D Avatar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-96 relative"
            >
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <DataNodeAvatar />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
              {/* Removed the '3D avatar' label here */}
            </motion.div>

            {/* Minimalist 3D Wireframe Ring */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-64 relative"
            >
              <Canvas camera={{ position: [0, 0, 3] }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <WireframeRing />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
              {/* Removed the 'Minimalist 3D Ring' label here */}
            </motion.div>
          </div>

          {/* Right Column - About Text & Skills */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="heading-text">About Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-[#555] leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  I'm a passionate Computer Science graduate with 2+ years of experience in data analysis, 
                  business intelligence, and machine learning. My journey spans from internships to academic 
                  projects, where I've developed expertise in transforming complex data into actionable insights.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  I specialize in SQL, Python, data visualization, and cloud platforms (Azure, AWS). 
                  My work involves building dashboards, conducting exploratory data analysis (EDA), 
                  and developing predictive models using machine learning algorithms.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  I'm passionate about using data to uncover trends, reduce uncertainty, and drive 
                  smarter decisions across business units. My strong understanding of data quality, 
                  risk metrics, and root cause analysis helps me excel in operational and reporting environments.
                </motion.p>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-xl font-semibold text-accent mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-[#555]">
                  <MapPin size={20} className="text-accent" />
                  <span>Jersey City, NJ</span>
                </div>
                <div className="flex items-center space-x-3 text-[#555]">
                  <Phone size={20} className="text-accent" />
                  <span>+1 551-328-3929</span>
                </div>
                <div className="flex items-center space-x-3 text-[#555]">
                  <Mail size={20} className="text-accent" />
                  <span>balajibestha4@gmail.com</span>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-accent mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <skill.icon size={20} className="text-accent" />
                        <span className="text-[#555] font-medium">{skill.name}</span>
                      </div>
                      <span className="text-accent text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="skill-bar bg-accent h-2 rounded-full"
                        data-level={skill.level}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-accent mb-6">Education</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="glass-effect p-4 rounded-lg"
                  >
                    <div className="flex items-start space-x-3">
                      <edu.icon size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-[#2C3E50]">{edu.degree}</h4>
                        <p className="text-[#555]">{edu.school}</p>
                        <p className="text-accent text-sm">{edu.period}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 