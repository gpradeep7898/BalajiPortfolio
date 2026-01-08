# Balaji Bestha - Portfolio Website

A stunning, fully responsive 3D portfolio website built with modern web technologies showcasing Balaji Bestha's expertise as a Software Engineer specializing in full-stack development, cloud platforms, and scalable system architecture.

## 🌟 Features

### ✨ Visual Design
- **Dark Mode First**: Modern dark theme with neon blue and cyan accents
- **3D Animations**: Interactive Three.js elements throughout the site
- **Smooth Animations**: GSAP and Framer Motion for fluid transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Particle Background**: Dynamic animated particles for immersive experience

### 🎯 Sections
1. **Hero Section**: 
   - Fullscreen 3D animated intro with rotating sphere
   - Typing animation for role titles
   - CTA buttons for Resume, GitHub, and LinkedIn
   - Mouse-following parallax effects

2. **About Section**:
   - 3D floating cube background
   - Animated skill progress bars
   - Education timeline with glass effects
   - Contact information display

3. **Experience Timeline**:
   - Vertical timeline with smooth animations
   - Detailed work experience at Databricks and LTIMindtree
   - Technology tags and achievement lists
   - Interactive hover effects

4. **Contact Section**:
   - Modern animated contact form
   - Social media links with 3D hover effects
   - LinkedIn profile integration
   - Form validation and submission feedback

### 🛠 Technical Stack
- **Frontend**: React 18 with Vite, TypeScript
- **3D Graphics**: Three.js with React Three Fiber and Drei
- **Animations**: GSAP and Framer Motion
- **Styling**: TailwindCSS with custom animations
- **Icons**: Lucide React
- **Intersection Observer**: React Intersection Observer
- **Backend Technologies**: Python (Django, FastAPI), Node.js
- **Databases**: PostgreSQL, MongoDB, Redis
- **Cloud & DevOps**: AWS, Azure, Docker, Kubernetes

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gpradeep7898/BalajiPortfolio.git
   cd BalajiPortfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  neon: {
    blue: '#00d4ff',
    cyan: '#00ffff',
    purple: '#8b5cf6',
  },
  dark: {
    100: '#1a1a1a',
    200: '#0f0f0f',
    300: '#000000',
  }
}
```

### Content
Update the following files to customize content:
- `src/components/Hero.jsx` - Hero section content
- `src/components/About.jsx` - About section and skills
- `src/components/Experience.jsx` - Work experience
- `src/components/Projects.jsx` - Project details
- `src/components/Contact.jsx` - Contact information

### 3D Elements
Modify 3D objects in individual component files:
- About: `DataNodeAvatar` and `WireframeRing` in `About.jsx`
- Experience: `TimelineNode` and `FloatingCubes` in `Experience.jsx`
- Projects: `ProjectCard3D` and `FloatingTechIcons` in `Projects.jsx`
- Contact: `ParticleField` and `FloatingContactIcons` in `Contact.jsx`
- Background: `GlowingOrb` in `Background3D.jsx`

## 🔧 Configuration

### Form Submission
Update the contact form submission in `Contact.jsx` to integrate with your backend or email service. Currently, the form simulates submission for demonstration purposes.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

### GSAP Animations
- Scroll-triggered animations
- Staggered element reveals
- Smooth transitions between sections

### Framer Motion
- Hover effects on cards and buttons
- Page transitions
- Interactive elements

### Three.js
- Rotating 3D objects
- Particle systems
- Interactive backgrounds

## 🚀 Performance

- **Lazy Loading**: Components load as needed
- **Optimized Images**: WebP format support
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code elimination

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: balajib@myjobemails.com
- **Phone**: +1 (551) 328-3929
- **Location**: New Jersey, USA
- **LinkedIn**: [Balaji Bestha](https://linkedin.com/in/balaji-bestha-0129b029b)
- **GitHub**: [balajibestha](https://github.com/balajibestha)

---

Built with ❤️ using React, Three.js, and modern web technologies. 