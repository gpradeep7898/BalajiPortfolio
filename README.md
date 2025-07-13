# Balaji Bestha - Portfolio Website

A stunning, fully responsive 3D portfolio website built with modern web technologies showcasing Balaji Bestha's expertise in data analysis, machine learning, and cloud platforms.

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
   - Detailed work experience at Phoenix Global and Cisco
   - Technology tags and achievement lists
   - Interactive hover effects

4. **Projects Showcase**:
   - 3D carousel-style project navigation
   - Featured projects with detailed descriptions
   - Technology stacks and feature lists
   - GitHub and demo links

5. **GitHub Integration**:
   - Auto-fetch repository data (mock implementation)
   - Sort and filter functionality
   - Repository stats (stars, forks, watchers)
   - Language color coding

6. **Contact Section**:
   - Modern animated contact form
   - Social media links with 3D hover effects
   - LinkedIn profile integration
   - Form validation and submission feedback

### 🛠 Technical Stack
- **Frontend**: React 18 with Vite
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: GSAP and Framer Motion
- **Styling**: TailwindCSS with custom animations
- **Icons**: Lucide React
- **Type Animation**: React Type Animation
- **Intersection Observer**: React Intersection Observer

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/balajibestha/portfolio.git
   cd portfolio
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
- `src/components/GitHub.jsx` - GitHub repositories
- `src/components/Contact.jsx` - Contact information

### 3D Elements
Modify 3D objects in individual component files:
- Hero: `AnimatedSphere` in `Hero.jsx`
- About: `FloatingCube` in `About.jsx`
- Projects: `ProjectTorus` in `Projects.jsx`
- Contact: `ContactOctahedron` in `Contact.jsx`

## 🔧 Configuration

### GitHub Integration
To enable real GitHub API integration, replace the mock data in `GitHub.jsx`:

```javascript
// Replace mock data with actual API call
const response = await fetch('https://api.github.com/users/balajibestha/repos')
const data = await response.json()
```

### Form Submission
Update the contact form submission in `Contact.jsx` to integrate with your backend or email service.

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

- **Email**: balajibestha4@gmail.com
- **LinkedIn**: [Balaji Bestha](https://linkedin.com/in/balaji-bestha-0129b029b)
- **GitHub**: [balajibestha](https://github.com/balajibestha)

---

Built with ❤️ using React, Three.js, and modern web technologies. 