# Design Implementation Notes

This portfolio has been updated to match the Figma design specifications.

## Pages Implemented

### 1. Home Page (`/`)
- Bio section with multidisciplinary designer introduction
- Project list with lock icons for protected projects
- Social links (Email, Behance, Dribble, Github)
- **Route:** `src/pages/index.js`

### 2. Experience Page (`/experience`)
- Complete work history with job positions
- Current positions highlighted in orange
- Download CV button (fixed position)
- Timeline format with dates, roles, and descriptions
- **Route:** `src/pages/experience.js`

### 3. Work/Portfolio Page (`/portfolio` or wrk)
- Large project cards with images
- Project metadata (brand name, year, lock status)
- Card hover effects
- **Route:** `src/pages/portfolio.js`

### 4. Sandbox Page (`/sndbx`)
- Simple list of projects
- Minimal design with project names, brands, years
- Lock icons for protected content
- **Route:** `src/pages/sndbx.js`

### 5. Photography Page (`/photography` or phtgrphy)
- Photo gallery with varying heights
- Photo titles and locations
- Responsive image grid
- **Route:** `src/pages/photography.js`

### 6. Case Study Page (`/case-study`)
- Full-width hero image
- Detailed project breakdown
- Sections: The Ask, Discovery, Strategy
- Side panel with related projects
- Dark theme background
- **Route:** `src/pages/case-study.js`

### 7. Contact Page (`/contact`)
- Contact information cards
- Social media links
- Call-to-action section
- **Route:** `src/pages/contact.js`

## Design System

### Colors (CSS Variables)
```css
--white-not-wyt: #F9F9F8   /* Off-white background */
--black-pitch-nah: #1D1C1C /* Primary text color */
--orange: #EE550E           /* Primary accent color */
--grey-misty: #A3A3A3       /* Secondary text/metadata */
--black-nue-ish-black: #26282B /* Dark backgrounds */
--white-heavenly: #FFF      /* Pure white */
--grey-just: #777           /* Tertiary text */
--black-nue-black: #232020  /* Case study background */
--yellow: #FBBF24           /* Tag highlights */
```

### Typography
- **Font Family:** 'Neue Haas Display' with fallback to 'Inter', -apple-system
- **Font Files Location:** `src/Assets/Font/`
- All font weights (100, 200, 300, 400, 500, 700, 900) and italic variants loaded

### Spacing & Layout
- Container max-width: 600px for content
- Padding: 100px left margin for main content
- Navigation height: 85px fixed
- Consistent gaps: 10px, 20px, 40px, 50px

## Navigation Structure
The site includes a hamburger menu with links to all pages:
- Home
- Experience
- wrk (Portfolio)
- sndbx (Sandbox)
- phtgrphy (Photography)
- Case Study
- Contact

## Assets Needed

If you want to fully customize the design, you may need to provide:

### Images
1. **Hero images** for case studies (large format, ~1400px width)
2. **Project images** for portfolio cards (800x250px recommended)
3. **Photography collection** (various sizes, portrait and landscape)
4. **Background texture** (noise.png for overlay effect)

### Icons/SVGs
- Lock icon (already included for protected projects)
- Social media icons (currently using simplified versions)
- Arrow/download icons (already implemented)

### Logo
The current logo SVG is the "TOBI" design from the Figma file. You can replace it in:
- `src/components/layout.js` (navigation logo)
- Each page navigation if needed

## Responsive Breakpoints
- **Desktop:** Default (1440px design base)
- **Tablet:** 768px and below
- **Mobile:** Adjusted layouts with stacked elements

## Special Features

### Download CV Button
- Located on the Experience page
- Fixed position on desktop
- Layered shadow effect with orange and black
- **Note:** You'll need to add an actual PDF link for the download functionality

### Lock Icons
Projects can be marked as "locked" to show they're private/under NDA:
```javascript
{ title: "Project Name", locked: true }
```

### Case Study Structure
The case study page uses a unique dark theme and side panel layout:
- Main content on the left
- Related projects panel on the right (fixed on desktop)
- Tag system for sections (Discovery, Strategy, etc.)

## Next Steps

1. **Add Real Content:**
   - Replace placeholder text with your actual bio, project descriptions
   - Add real project names, dates, and companies
   - Update social media links with your actual profiles

2. **Add Real Images:**
   - Replace Unsplash placeholder URLs with your actual project images
   - Add your photography to the photography page
   - Upload case study images

3. **Customize:**
   - Update the CV download link to your actual resume
   - Modify color scheme if needed (update CSS variables)
   - Add your actual email and contact information

4. **Deploy:**
   - Build the Gatsby site: `npm run build`
   - Deploy to Netlify, Vercel, or your preferred hosting
   - Set up custom domain if desired

## File Structure
```
src/
  components/
    layout.js          # Main layout with navigation
    layout.css         # Global styles and fonts
    seo.js            # SEO component
  pages/
    index.js          # Home page
    experience.js     # Experience/about page
    portfolio.js      # Work/portfolio page
    sndbx.js         # Sandbox page
    photography.js    # Photography gallery
    case-study.js     # Case study template
    contact.js        # Contact page
  Assets/
    Font/            # Neue Haas Display fonts
    icons/           # SVG icons
    logo/            # Logo assets
```

## Notes
- The design uses a minimal, professional aesthetic
- All pages are fully responsive
- Consistent spacing and typography throughout
- Smooth hover effects and transitions
- The site maintains the exact color palette from Figma
- Font loading optimized with font-display: swap
