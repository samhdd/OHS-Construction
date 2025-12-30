# OHS CONSTRUCTION - Official Website

Modern corporate website for **OHS CONSTRUCTION**, an Algerian company specializing in public works, hydraulics, buildings, and railway infrastructures.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation & Development](#installation--development)
- [Site Pages](#site-pages)
- [Deployment](#deployment)
- [Contribution](#contribution)

---

## Overview

Professional website showcasing the services, projects, and expertise of OHS CONSTRUCTION. The site highlights over 15 years of experience in the BTPH sector in Algeria.

**Production URL:** `https://ohs-construction.com` *(to be configured)*

---

## Features

- **Modern and Responsive Design** - Compatible with mobile, tablet, and desktop
- **Animated Hero Section** - Image carousel with smooth transitions
- **Services Section with Images** - 4 main services with hover effects
- **Projects Gallery** - Complete portfolio of realized projects
- **Contact Form** - Functional email integration
- **SEO Optimized** - Meta tags, semantic HTML5 structure
- **Optimized Performance** - Fast loading, optimized images
- **Multilingual Ready** - Structure prepared (currently in French)

---

## Project Structure

```text
site web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── assets/
│   ├── css/
│   │   └── style.css           # Main styles
│   ├── js/
│   │   └── main.js             # JavaScript scripts
│   └── images/
│       ├── logo.jpg
│       ├── penetrante_tizi/    # Road project images
│       ├── ferroviaire_thenia/ # Railway project images
│       ├── entretien_dellys/   # Hydraulic project images
│       ├── hotel_africana/     # Building project images
│       └── ...                 # Other projects
├── index.html                  # Home page
├── apropos.html                # About page
├── services.html               # Detailed services
├── projets.html                # Project portfolio
├── contact.html                # Contact page
├── README.md                   # This file
└── CI-CD.md                    # Deployment documentation
```

---

## Technologies Used

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - Interactivity (carousel, mobile navigation)

### Fonts & Icons
- **Google Fonts** - Inter (headings), Roboto (text)
- **Font Awesome 6.4** - Icons

### Development Tools
- **Git** - Version control
- **GitHub Actions** - Automated CI/CD
- **Python HTTP Server** - Local development server

### Hosting
- **cPanel** - Production hosting
- **SSH/rsync** - Automated deployment

---

## Installation & Development

### Prerequisites
- Git installed
- Modern web browser
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ohs-construction.git
   cd ohs-construction
   ```

2. **Start the development server**
   
   Option 1 - Python (recommended):
   ```bash
   python3 -m http.server 8080
   ```
   
   Option 2 - PHP:
   ```bash
   php -S localhost:8080
   ```
   
   Option 3 - Node.js (with http-server):
   ```bash
   npx http-server -p 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### Development

#### Modifying Styles
Edit `assets/css/style.css`. CSS variables are defined in `:root`:
```css
:root {
    --primary-color: #002B5B;    /* Navy Blue */
    --secondary-color: #E85D04;  /* Construction Orange */
    --accent-color: #FCA311;     /* Yellow/Gold */
}
```

#### Adding Images
Place images in `assets/images/` and reference them:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

#### Testing Responsiveness
Use browser DevTools (F12) to test:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

---

## Site Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hero, services, stats, presentation |
| **About** | `apropos.html` | History, values, team |
| **Services** | `services.html` | Details of 4 main services |
| **Projects** | `projets.html` | Project portfolio |
| **Contact** | `contact.html` | Form, contact info, map |

### Services Featured

1. **Public Works & Roads** - Roads, highways, earthworks
2. **Railway Infrastructures** - Stations, tracks, electrification
3. **Hydraulic & Port** - Water supply, sanitation, ports
4. **Building & Development** - Construction, utilities, improvements

---

## Deployment

### Automatic Deployment (Production)

The site uses **GitHub Actions** for automatic deployment to cPanel.

**See full documentation:** [`CI-CD.md`](./CI-CD.md)

**Workflow:**
```
git push origin main → GitHub Actions → cPanel (SSH/rsync)
```

### Manual Deployment (FTP)

If you prefer manual deployment:

1. Connect to your cPanel via FTP
2. Upload all files to `/public_html/`
3. Check permissions (644 for files, 755 for folders)

---

## Customization

### Changing Colors

Modify CSS variables in `assets/css/style.css`:
```css
:root {
    --primary-color: #YOUR_COLOR;
    --secondary-color: #YOUR_COLOR;
}
```

### Modifying the Logo

Replace `assets/images/logo.jpg` with your logo (recommended format: transparent PNG, 200x80px)

### Adding a Project

1. Create a folder in `assets/images/project_name/`
2. Add your images
3. Edit `projets.html` to add the project

---

## Contribution

### Git Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push the branch:
   ```bash
   git push origin feature/feature-name
   ```

4. Create a Pull Request on GitHub

### Code Standards

- **HTML:** 4-space indentation, lowercase tags
- **CSS:** Organized by section, clear comments
- **JavaScript:** ES6+, JSDoc comments
- **Commits:** Descriptive messages

---

## Contact & Support

**OHS CONSTRUCTION**
- Tizi Ouzou, Algeria
- contact@ohs-construction.com
- [ohs-construction.com](https://ohs-construction.com)

**Web Development**
- Issues: [GitHub Issues](https://github.com/your-username/ohs-construction/issues)
- Documentation: This README + `CI-CD.md`

---

## License

© 2025 OHS CONSTRUCTION. All rights reserved.

This website is the property of OHS CONSTRUCTION. The source code is available under the MIT license for reference and learning.

---

## Changelog

### Version 1.0.0 (December 2025)
- Initial site launch
- 5 complete pages (Home, About, Services, Projects, Contact)
- Services section with images and hover effects
- Hero section with animated carousel
- Fully responsive design
- CI/CD with GitHub Actions
- cPanel integration

---

**Developed for OHS CONSTRUCTION**
