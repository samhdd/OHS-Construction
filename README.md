# OHS CONSTRUCTION - Official Website

Corporate website for **OHS CONSTRUCTION**, an Algerian company specializing in public works, hydraulics, buildings, and railway infrastructure.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation & Development](#installation--development)
- [Pages](#pages)
- [Deployment](#deployment)
- [Contribution](#contribution)

---

## Overview

Professional website presenting the services, projects, and expertise of OHS CONSTRUCTION. The site highlights over 15 years of experience in the BTPH sector in Algeria.

**Production URL:** `https://ohs-construction.com`

---

## Features

- **Modern and Responsive Design**: Compatible with mobile, tablet, and desktop
- **Animated Hero Section**: Image carousel with smooth transitions
- **Services Section**: 4 main services with hover effects
- **Project Gallery**: Portfolio of completed works
- **Contact Form**: Functional email integration
- **SEO Optimized**: Meta tags, semantic HTML5 structure
- **Optimized Performance**: Fast loading, optimized images
- **Multilingual Structure**: Prepared structure (currently in French)

---

## Project Structure

```text
site web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── assets/
│   ├── css/
│   │   └── style.css           # Main Styles
│   ├── js/
│   │   └── main.js             # JavaScript
│   └── images/
│       ├── logo.jpg
│       ├── penetrante_tizi/    # Road project images
│       ├── ferroviaire_thenia/ # Railway project images
│       ├── entretien_dellys/   # Hydraulic project images
│       ├── hotel_africana/     # Building project images
│       └── ...                 # Other projects
├── index.html                  # Homepage
├── apropos.html                # About Us
├── services.html               # Services
├── projets.html                # Projects Portfolio
├── contact.html                # Contact
├── README.md                   # This file
└── CI-CD.md                    # Deployment Documentation
```

---

## Technologies

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: Interactivity (carousel, mobile navigation)

### Fonts & Icons
- **Google Fonts**: Inter (headings), Roboto (body text)
- **Font Awesome 6.4**: Icons

### Development Tools
- **Git**: Version control
- **GitHub Actions**: Automated CI/CD
- **Python HTTP Server**: Local development server

### Hosting
- **cPanel**: Production hosting
- **FTP**: Automated deployment

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

2. **Start development server**
   
   Option 1 - Python (Recommended):
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

#### modifying Styles
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

---

## Pages

| Page | File | Description |
|------|---------|-------------|
| **Home** | `index.html` | Hero, services, stats, overview |
| **About** | `apropos.html` | History, values, team |
| **Services** | `services.html` | Details of the 4 main services |
| **Projects** | `projets.html` | Portfolio |
| **Contact** | `contact.html` | Form, contact info, map |

---

## Deployment

### Automated Deployment (Production)

The site uses **GitHub Actions** for automated deployment to cPanel via FTP.

**See complete documentation:** [`CI-CD.md`](./CI-CD.md)

**Workflow:**
```
git push origin main → GitHub Actions → cPanel (FTP)
```

### Manual Deployment

1. Connect to cPanel via FTP
2. Upload all files to `/public_html/`
3. Verify permissions (644 for files, 755 for directories)

---

## Contribution

### Git Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push the branch:
   ```bash
   git push origin feature/feature-name
   ```

4. Create a Pull Request on GitHub

---

## Contact & Support

**OHS CONSTRUCTION**
- Tizi Ouzou, Algeria
- Email: contact@ohs-construction.com
- Web: [ohs-construction.com](https://ohs-construction.com)

**Web Development**
- Issues: [GitHub Issues](https://github.com/your-username/ohs-construction/issues)
- Documentation: This README + `CI-CD.md`

---

## License

© 2025 OHS CONSTRUCTION. All rights reserved.

The source code is available under the MIT license for reference and learning purposes.
