# 🚀 Gatsby Portfolio - Complete Manual & Documentation

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Development Setup](#-development-setup)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Content Management](#-content-management)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Maintenance](#-maintenance)
- [Performance Optimization](#-performance-optimization)
- [Contributing](#-contributing)

---

## 🎯 Project Overview

This is a **modern, responsive portfolio website** built for UX/UI designers, showcasing:

- **Professional Experience** - Detailed work history and achievements
- **Project Portfolio** - Visual showcase of design work with case studies
- **Photography Section** - Personal photography collection
- **Contact Information** - Multiple ways to get in touch
- **Responsive Design** - Optimized for all device sizes
- **SEO Optimized** - Built with search engines in mind
- **Fast Loading** - Optimized images and code splitting

**Live Site:** `https://tobilobaodu.com/`

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Gatsby** | 5.14.6 | Static site generator & React framework |
| **React** | 18.2.0 | UI component library |
| **Node.js** | 18+ | Runtime environment |
| **CSS-in-JS** | Styled-jsx | Component-scoped styling |
| **Inter Font** | Google Fonts | Typography |

### Core Plugins
- `gatsby-plugin-image` - Optimized image handling
- `gatsby-plugin-manifest` - PWA manifest generation
- `gatsby-plugin-sharp` - Image processing
- `gatsby-source-filesystem` - File system data sourcing
- `gatsby-transformer-sharp` - Image transformations

---

## 📁 Project Structure

```
├── src/
│   ├── components/           # Reusable React components
│   │   ├── layout.js        # Main layout with navigation
│   │   ├── layout.css       # Global styles & CSS variables
│   │   ├── seo.js           # SEO meta tags component
│   │   └── header.js        # Header component (if used)
│   │
│   ├── pages/               # Gatsby pages (file-based routing)
│   │   ├── index.js         # Homepage with projects list
│   │   ├── about.js         # Experience & about section
│   │   ├── portfolio.js     # Portfolio showcase
│   │   ├── photography.js   # Photography gallery
│   │   ├── contact.js       # Contact information
│   │   ├── 404.js           # Error page
│   │   └── using-*.js       # Gatsby example pages
│   │
│   ├── images/              # Static assets
│   │   ├── example.png      # Example images
│   │   └── gatsby-icon.png  # Site icon
│   │
│   └── templates/           # Page templates
│       └── using-dsg.js     # Deferred static generation template
│
├── public/                  # Built static files (generated)
├── .cache/                  # Gatsby build cache (generated)
├── node_modules/            # Dependencies (generated)
│
├── gatsby-config.js         # Site configuration
├── gatsby-browser.js        # Browser-specific overrides
├── gatsby-node.js           # Node.js build process
├── gatsby-ssr.js            # Server-side rendering
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or later
- **npm** or **yarn** package manager

### One-Command Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd gatsby-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run develop

# 4. Open http://localhost:8000
```

**That's it!** Your portfolio is now running locally.

---

## ⚙️ Development Setup

### Detailed Installation

1. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd gatsby-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs all required packages including:
   - Gatsby and React
   - Image processing plugins
   - Development tools

3. **Environment Setup** (Optional)
   ```bash
   # Create .env file if needed for environment variables
   touch .env.development
   ```

4. **Start Development Server**
   ```bash
   npm run develop
   ```

5. **Verify Installation**
   - Server starts at `http://localhost:8000`
   - Hot reloading enabled
   - GraphQL playground at `http://localhost:8000/___graphql`

### Development Tools
- **Hot Reloading** - Changes appear instantly
- **Error Overlay** - Detailed error messages
- **GraphQL Explorer** - Query development tool

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run develop` | Start development server with hot reloading |
| `npm start` | Alias for `npm run develop` |
| `npm run build` | Create production build in `/public` |
| `npm run serve` | Serve production build locally |
| `npm run clean` | Clear Gatsby cache and build files |
| `npm run format` | Format code with Prettier |
| `gatsby clean` | Alternative cache clearing |

### Development Workflow
```bash
# Typical development cycle
npm run develop      # Start dev server
# Make changes to files
# Changes appear automatically

npm run build        # Test production build
npm run serve        # Preview production version
```

---

## 🔧 Configuration

### Site Metadata (`gatsby-config.js`)

```javascript
module.exports = {
  siteMetadata: {
    title: `UX Designer Portfolio`,
    description: `Professional UX designer portfolio showcasing case studies, design work, and creative projects.`,
    author: `UX Designer`,
    siteUrl: `https://tobilobaodu.com/`, // ⚠️ UPDATE THIS
  },
  plugins: [
    // Image optimization
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // File system
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    // PWA Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `UX Designer Portfolio`,
        short_name: `UX Portfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
```

### CSS Variables (`src/components/layout.css`)

```css
:root {
  --white-not-wyt: #F9F9F8;      /* Background */
  --black-pitch-nah: #1D1C1C;    /* Primary text */
  --orange: #EE550E;             /* Accent color */
  --grey-misty: #A3A3A3;         /* Secondary text */
  --black-nue-ish-black: #26282B; /* Dark sections */
  --white-heavenly: #FFF;        /* White text */
  --grey-just: #777;             /* Muted text */
}
```

---

## 📝 Content Management

### Updating Personal Information

#### 1. Site Metadata
Edit `gatsby-config.js`:
```javascript
siteMetadata: {
  title: `Your Name - UX Designer`,
  description: `Your professional description`,
  author: `Your Name`,
  siteUrl: `https://yourdomain.com/`,
}
```

#### 2. Homepage Bio
Edit `src/pages/index.js`:
```javascript
const bioText = "I'm a multidisciplinary designer passionate about..."
```

#### 3. Social Links
Update social links in `src/pages/index.js`:
```javascript
const socialLinks = [
  { name: "Email", url: "mailto:your.email@example.com" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile" },
  // Add more links
]
```

### Managing Projects

#### Portfolio Projects (`src/pages/portfolio.js`)
```javascript
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    brand: "Client/Company",
    year: "2024",
    locked: false, // true for private projects
    image: "path/to/image.jpg"
  }
]
```

#### Experience Timeline (`src/pages/about.js`)
```javascript
const experiences = [
  {
    period: "Start - End",
    title: "Job Title",
    company: "Company Name",
    description: "Detailed description of responsibilities and achievements",
    current: true // true for current position
  }
]
```

### Photography Gallery (`src/pages/photography.js`)
```javascript
const photos = [
  {
    title: "Photo Title",
    location: "Location",
    image: "path/to/photo.jpg",
    height: "400px" // Custom height for layout
  }
]
```

### Contact Information (`src/pages/contact.js`)
Update all contact cards with your actual information:
```javascript
const contactCards = [
  {
    title: "Email",
    info: "your.email@example.com",
    link: "mailto:your.email@example.com"
  }
  // Add more contact methods
]
```

---

## 🎨 Customization Guide

### Styling System

#### Color Scheme
All colors are defined as CSS variables in `src/components/layout.css`:
```css
:root {
  --primary-color: #EE550E;    /* Orange accent */
  --background: #F9F9F8;       /* Light background */
  --text-primary: #1D1C1C;     /* Dark text */
  /* Modify these to change the entire color scheme */
}
```

#### Typography
Font is loaded from Google Fonts in `layout.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

#### Component Styling
Each page uses `styled-jsx` for component-scoped CSS:
```jsx
<style jsx>{`
  .custom-component {
    color: var(--orange);
    font-family: 'Inter', sans-serif;
  }
`}</style>
```

### Adding New Sections

#### 1. Create New Page
```bash
# Create new page file
touch src/pages/newservice.js
```

#### 2. Add Navigation Link
Edit `src/components/layout.js`:
```jsx
<Link to="/newservice">New Service</Link>
```

#### 3. Update SEO
Add SEO component to new page:
```jsx
export const Head = () => <Seo title="New Service" />
```

### Responsive Design

#### Breakpoints Used:
- **Mobile:** `max-width: 768px`
- **Tablet:** `max-width: 1024px`
- **Desktop:** `min-width: 1025px`

#### Mobile-First Approach:
```css
/* Mobile styles (default) */
.container { padding: 20px; }

/* Desktop styles */
@media (min-width: 1025px) {
  .container { padding: 100px; }
}
```

---

## 🚢 Deployment

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   ```bash
   # Push code to GitHub/GitLab
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `public`
   - Node version: 18

3. **Custom Domain**
   - Add `tobilobaodu.com` in Netlify dashboard
   - Update DNS settings with your domain provider

### Option 2: Vercel

1. **Import Project**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

2. **Configure Settings**
   - Build Command: `npm run build`
   - Output Directory: `public`
   - Install Command: `npm install`

### Option 3: GitHub Pages

1. **Enable Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"

2. **Create GitHub Action**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: '18'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./public
   ```

### Environment Variables

For different environments, create:
- `.env.development` - Development settings
- `.env.production` - Production settings

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Dependencies Issues
```bash
# Delete lock file and reinstall
rm package-lock.json
npm install
```

#### 3. Port Already in Use
```bash
# Kill process using port 8000
npx kill-port 8000
# Or use different port
npm run develop -- --port 3000
```

#### 4. Images Not Loading
- Ensure images are in `src/images/`
- Use `gatsby-plugin-image` for optimized images
- Check file paths in components

#### 5. CSS Not Updating
```bash
# Clear Gatsby cache
npm run clean
npm run develop
```

### Debug Mode

#### Enable Verbose Logging
```bash
npm run develop -- --verbose
```

#### Check Build Process
```bash
npm run build -- --verbose
```

### Performance Issues

#### Check Bundle Size
```bash
npm run build
npx gatsby serve -- --open
```

#### Image Optimization
- Use WebP format for better compression
- Implement lazy loading
- Optimize image dimensions

---

## 🛠 Maintenance

### Regular Updates

#### Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update major versions carefully
npm install gatsby@latest react@latest
```

#### Security Updates
```bash
# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### Backup Strategy

#### Important Files to Backup
- `src/` - All source code
- `gatsby-config.js` - Site configuration
- `package.json` - Dependencies
- `.env*` files - Environment variables

#### Backup Command
```bash
# Create backup archive
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz \
  src/ \
  gatsby-*.js \
  package*.json \
  .env*
```

### Monitoring

#### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check Lighthouse scores regularly

#### Error Tracking
- Implement error boundaries in React
- Use analytics to track user interactions
- Monitor 404 errors

---

## ⚡ Performance Optimization

### Image Optimization

#### Current Setup
- **gatsby-plugin-sharp** - Image processing
- **gatsby-transformer-sharp** - Image transformations
- **gatsby-plugin-image** - Optimized image component

#### Best Practices
```jsx
// Use Gatsby Image component
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const image = getImage(imageData)
<GatsbyImage image={image} alt="Description" />
```

### Code Splitting

#### Automatic Splitting
Gatsby automatically splits code by pages and components.

#### Manual Optimization
```jsx
// Lazy load heavy components
import { lazy } from 'react'
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Bundle Analysis

#### Analyze Bundle Size
```bash
npm install -g webpack-bundle-analyzer
npx gatsby build --analyze
```

#### Common Optimizations
- Remove unused imports
- Use tree shaking
- Optimize third-party libraries

---

## 👥 Contributing

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-section
   ```

2. **Make Changes**
   - Follow existing code style
   - Test on multiple devices
   - Update documentation

3. **Test Thoroughly**
   ```bash
   npm run develop  # Test development
   npm run build    # Test production
   npm run serve    # Test built version
   ```

4. **Submit Changes**
   ```bash
   git add .
   git commit -m "Add new section with responsive design"
   git push origin feature/new-section
   ```

### Code Style

#### JavaScript/React
- Use functional components with hooks
- Follow ESLint configuration
- Use descriptive component names
- Comment complex logic

#### CSS
- Use CSS variables for theming
- Follow mobile-first approach
- Use semantic class names
- Keep specificity low

### Pull Request Process

1. **Describe Changes** - Explain what was added/changed
2. **Screenshots** - Include before/after images
3. **Testing** - Confirm all features work
4. **Documentation** - Update README if needed

---

## 📞 Support & Contact

### Getting Help

**For Issues:**
1. Check [Troubleshooting](#-troubleshooting) section
2. Search existing GitHub issues
3. Create new issue with details

**For Contributions:**
1. Read [Contributing](#-contributing) guidelines
2. Create feature branch
3. Submit pull request

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Current | Initial portfolio setup |
| 0.1.0 | Previous | Development version |

---

## 📄 License

This project is licensed under the BSD Zero Clause License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Gatsby** - Static site generator
- **React** - UI framework
- **Inter Font** - Typography
- **Unsplash** - Placeholder images
- **Contributors** - Everyone who helped build this

---

**Last Updated:** October 2025
**Maintainer:** UX Designer
**Status:** ✅ Active Development

---

## 🎯 Quick Reference

### Essential Commands
```bash
npm run develop    # Start development
npm run build      # Build for production
npm run serve      # Preview production build
npm run clean      # Clear cache
```

### Key Files
- `src/pages/index.js` - Homepage content
- `src/pages/about.js` - Experience timeline
- `src/pages/portfolio.js` - Project showcase
- `src/components/layout.js` - Navigation & layout
- `gatsby-config.js` - Site configuration

### Customization Points
- **Colors:** `src/components/layout.css` variables
- **Content:** Individual page files in `src/pages/`
- **SEO:** `gatsby-config.js` metadata
- **Images:** `src/images/` directory

---

*This README serves as the complete knowledge base for your Gatsby portfolio. Keep it updated as you make changes to ensure continuity for future development.*
