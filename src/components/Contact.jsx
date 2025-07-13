import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Linkedin,
  Github,
  MessageSquare,
  User,
  FileText
} from 'lucide-react'
import * as random from 'maath/random'

// 3D Particle Field
function ParticleField() {
  const pointsRef = useRef()
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.1
      pointsRef.current.rotation.y -= delta * 0.15
    }
  })

  const sphere = random.inSphere(new Float32Array(3000), { radius: 5 })

  return (
    <Points
      ref={pointsRef}
      positions={sphere}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

// Floating Contact Icons
function FloatingContactIcons() {
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.x += delta * 0.05
    }
  })

  const icons = [
    { position: [2, 1, 0], color: "#00d4ff" },
    { position: [-2, 1, 0], color: "#00ffff" },
    { position: [0, 2, 1], color: "#ff6b6b" },
    { position: [0, -2, 1], color: "#4ecdc4" }
  ]

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <Sphere
          key={index}
          args={[0.1, 16, 16]}
          position={icon.position}
        >
          <meshStandardMaterial
            color={icon.color}
            emissive={icon.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  )
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle') // idle, loading, success, error
  const [focusedField, setFocusedField] = useState(null)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'balajibestha4@gmail.com',
      link: 'mailto:balajibestha4@gmail.com',
      color: '#00d4ff'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 551-328-3929',
      link: 'tel:+15513283929',
      color: '#00ffff'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Jersey City, NJ',
      link: 'https://maps.google.com/?q=Jersey+City+NJ',
      color: '#ff6b6b'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/balaji-bestha-0129b029b',
      color: '#0077b5'
    },
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/balajibestha',
      color: '#333'
    }
  ]

  // GSAP animations for form fields
  useEffect(() => {
    if (inView) {
      gsap.fromTo('.contact-field', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index => index * 0.1,
          ease: "power2.out"
        }
      )
    }
  }, [inView])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('loading')

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, you would send the form data to your backend
      console.log('Form submitted:', formData)
      
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName)
    // Create particle burst effect
    const burst = document.createElement('div')
    burst.className = 'fixed pointer-events-none z-50'
    burst.innerHTML = Array.from({ length: 10 }, () => 
      '<div class="absolute w-1 h-1 bg-neon-cyan rounded-full animate-ping"></div>'
    ).join('')
    
    const field = document.querySelector(`[name="${fieldName}"]`)
    if (field) {
      const rect = field.getBoundingClientRect()
      burst.style.left = `${rect.left + rect.width / 2}px`
      burst.style.top = `${rect.top + rect.height / 2}px`
    }
    
    document.body.appendChild(burst)
    setTimeout(() => document.body.removeChild(burst), 1000)
  }

  return (
    <section id="contact" className="section-padding relative bg-off-white">
      {/* Remove the decorative background Canvas here */}

      <div className="container-custom relative z-10">
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
              <span className="heading-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-[#555] max-w-3xl mx-auto">
              Ready to collaborate? Let's discuss your next project or opportunity
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="contact-field flex items-center space-x-4 p-4 glass-effect rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${info.color}20` }}>
                        <info.icon size={24} style={{ color: info.color }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="text-[#2C3E50] font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: `0 0 20px ${social.color}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 glass-effect rounded-lg hover:bg-white/5 transition-all duration-300"
                      style={{ borderColor: `${social.color}40` }}
                    >
                      <social.icon size={24} style={{ color: social.color }} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="p-6 glass-effect rounded-lg"
              >
                <h4 className="text-lg font-semibold text-[#2C3E50] mb-3">Current Status</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Available for opportunities</span>
                </div>
                <p className="text-[#555] text-sm">
                  Open to full-time positions, freelance projects, and collaborations
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-effect p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="contact-field"
                >
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    <User size={16} className="inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('name')}
                    required
                    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#2C3E50] placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-neon-cyan shadow-lg shadow-neon-cyan/20' 
                        : 'hover:border-neon-blue'
                    }`}
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="contact-field"
                >
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('email')}
                    required
                    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#2C3E50] placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-neon-cyan shadow-lg shadow-neon-cyan/20' 
                        : 'hover:border-neon-blue'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="contact-field"
                >
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    <FileText size={16} className="inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('subject')}
                    required
                    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#2C3E50] placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'subject' 
                        ? 'border-neon-cyan shadow-lg shadow-neon-cyan/20' 
                        : 'hover:border-neon-blue'
                    }`}
                    placeholder="What's this about?"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="contact-field"
                >
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFieldFocus('message')}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#2C3E50] placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                      focusedField === 'message' 
                        ? 'border-neon-cyan shadow-lg shadow-neon-cyan/20' 
                        : 'hover:border-neon-blue'
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ 
                    scale: formStatus === 'loading' ? 1 : 1.05,
                    boxShadow: formStatus === 'loading' ? 'none' : "0 0 30px rgba(0, 212, 255, 0.5)"
                  }}
                  whileTap={{ scale: formStatus === 'loading' ? 1 : 0.95 }}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    formStatus === 'loading'
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-neon-blue to-neon-cyan text-white hover:shadow-lg'
                  }`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message Sent!</span>
                    </>
                  ) : formStatus === 'error' ? (
                    <>
                      <AlertCircle size={20} />
                      <span>Error Sending Message</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 