# Eventora — Event Discovery & Workshop Registration Platform

Eventora is a modern web application designed for discovering events and registering for workshops.

## Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)
- **Routing:** React Router DOM (v6)
- **Icons:** Font Awesome Free
- **Styling:** Standard CSS3 (modular stylesheets: global, components, responsive)

## Project Structure

```
event-discovery-platform/
│
├── public/
│   └── images/
│       ├── events/
│       ├── banners/
│       └── categories/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── EventCard.jsx
│   │   ├── EventGrid.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── EventModal.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ExploreEvents.jsx
│   │   └── MyRegistrations.jsx
│   │
│   ├── data/
│   │   └── events.js
│   │
│   ├── utils/
│   │   └── localStorage.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── components.css
│   │   └── responsive.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
