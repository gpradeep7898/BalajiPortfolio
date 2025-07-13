import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Line } from '@react-three/drei'
import { gsap } from 'gsap'
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Database,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

// 3D Timeline Node
function TimelineNode({ position, color, isActive }) {
  const nodeRef = useRef()
  
  useFrame((state, delta) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.y += delta * 0.5
      if (isActive) {
        nodeRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        nodeRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        nodeRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      }
    }
  })

  return (
    <group ref={nodeRef} position={position}>
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Glowing ring around active nodes */}
      {isActive && (
        <Sphere args={[0.3, 16, 16]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.6}
          />
        </Sphere>
      )}
    </group>
  )
}

// 3D Connection Lines
function ConnectionLines({ nodes }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (index < nodes.length - 1) {
          const nextNode = nodes[index + 1]
          return (
            <Line
              key={`line-${index}`}
              points={[node.position, nextNode.position]}
              color="#3A5A9B"
              lineWidth={2}
              transparent
              opacity={0.6}
            />
          )
        }
        return null
      })}
    </>
  )
}

// Floating Data Cubes
function FloatingCubes() {
  const cubesRef = useRef()
  
  useFrame((state, delta) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y += delta * 0.2
      cubesRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <group ref={cubesRef}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          args={[0.3, 0.3, 0.3]}
          position={[
            Math.sin(i * 1.5) * 3,
            Math.cos(i * 1.2) * 2 + 2,
            Math.sin(i * 0.8) * 2
          ]}
        >
          <meshStandardMaterial
            color="#3A5A9B"
            emissive="#3A5A9B"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
            wireframe
          />
        </Box>
      ))}
    </group>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: "Data Analyst Intern",
      company: "Phoenix Global",
      location: "Hyderabad, India",
      period: "Jan 2023 – Aug 2023",
      description: [
        "Collected, profiled, and cleaned raw business data from multiple sources, including internal databases and third-party APIs using Python (Pandas, NumPy) and SQL, improving data reliability across analytics teams.",
        "Designed and developed automated Power BI dashboards to visualize sales trends, customer acquisition metrics, and operational KPIs, reducing reporting turnaround time by 35%.",
        "Conducted comprehensive Exploratory Data Analysis (EDA) on structured and semi-structured datasets to identify hidden patterns and outliers that informed senior leadership decisions.",
        "Wrote advanced SQL queries with joins, aggregations, subqueries, and CTEs to extract insights from normalized data schemas and build repeatable data models.",
        "Identified data quality issues through root cause analysis and implemented validation logic to ensure data integrity and compliance, leading to a 20% improvement in reporting accuracy.",
        "Developed and delivered over 10+ ad hoc analysis reports for marketing, finance, and operations teams to support initiatives such as budget allocation, retention modeling, and revenue forecasting.",
        "Collaborated with cross-functional stakeholders to understand business requirements and convert them into scalable, data-driven solutions through KPIs and visual storytelling.",
        "Documented all data pipelines, queries, and dashboards with clear metadata and standardized templates to align with internal data governance protocols and facilitate onboarding for new analysts."
      ],
      technologies: ["Python", "Pandas", "NumPy", "SQL", "Power BI", "EDA", "Data Quality", "Data Modeling"],
      icon: Database,
      color: "#4A908C"
    },
    {
      title: "Cybersecurity Intern",
      company: "Cisco Systems",
      location: "Remote",
      period: "Apr 2022 – Oct 2022",
      description: [
        "Developed and deployed Python-based tools for log parsing, alert generation, and anomaly detection, enabling real-time monitoring and reducing manual triage time by over 40%.",
        "Performed penetration testing, threat modeling, and vulnerability assessments on application codebases and system configurations, identifying key security gaps that were remediated before release.",
        "Built structured security dashboards in Excel and internal tools to monitor trends in threat types, frequency of alerts, and escalation effectiveness over time.",
        "Leveraged regular expressions (regex) and pattern recognition to build classifiers for detecting brute force attacks, phishing attempts, and port scanning behaviors in server logs.",
        "Worked closely with the Security Operations Center (SOC) team to create playbooks and escalation procedures for handling critical and high-severity alerts efficiently.",
        "Applied cybersecurity principles such as the CIA triad (Confidentiality, Integrity, Availability) and OWASP Top 10 to the development of scripts and detection logic.",
        "Delivered a presentation series to junior security analysts and interns on secure scripting practices, highlighting common misconfigurations, injection risks, and log hygiene practices.",
        "Documented all automation scripts and tool configurations with thorough change logs and user guides to maintain audit readiness and support internal training efforts."
      ],
      technologies: ["Python", "Log Parsing", "Regex", "Penetration Testing", "SOC", "OWASP", "Security Dashboards"],
      icon: Shield,
      color: "#4A908C"
    }
  ]

  // 3D timeline nodes positions
  const timelineNodes = experiences.map((_, index) => ({
    position: [0, -index * 2, 0],
    color: experiences[index].color,
    isActive: index === 0
  }))

  // GSAP animations for timeline
  useEffect(() => {
    if (inView) {
      gsap.fromTo('.timeline-item', 
        { 
          opacity: 0, 
          x: index => index % 2 === 0 ? -100 : 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index => index * 0.2,
          ease: "power2.out"
        }
      )
    }
  }, [inView])

  return (
    <section id="experience" className="section-padding relative bg-off-white">
      {/* Remove the decorative background Canvas here */}

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="heading-text">Experience</span>
            </h2>
            <p className="text-xl text-[#555] max-w-3xl mx-auto">
              My professional journey through data analysis, machine learning, and cybersecurity roles
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* 3D Timeline Visualization */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-64 h-full">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ConnectionLines nodes={timelineNodes} />
                {timelineNodes.map((node, index) => (
                  <TimelineNode
                    key={index}
                    position={node.position}
                    color={node.color}
                    isActive={node.isActive}
                  />
                ))}
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>

            {/* Experience Items */}
            <div className="space-y-8 lg:ml-32">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  className="timeline-item glass-effect p-6 rounded-lg relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${experience.color}20` }}>
                          <experience.icon size={24} style={{ color: '#3A5A9B' }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#2C3E50]">{experience.title}</h3>
                          <p className="text-accent font-medium">{experience.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{experience.period}</p>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <MapPin size={14} />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {experience.description.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                            className="flex items-start space-x-2 text-[#555]"
                          >
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.2 + techIndex * 0.05 }}
                          className="px-3 py-1 bg-light-gray text-accent text-sm rounded-full border border-accent/30"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center pt-8"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <Briefcase size={20} />
              <span>View Full Resume</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 