# Weather App - Technigo fullstack Bootcamp Assignment

## Live Demo

🌐 **[View Live Demo](https://amazing-monstera-973740.netlify.app/)**

## Overview

This project is a comprehensive weather application developed as part of the Technigo Frontend Bootcamp. It showcases modern web development practices, including TypeScript integration, modular CSS architecture, responsive design, and API consumption. The app provides real-time weather data with an engaging user interface featuring animated themes and smooth transitions.

## Learning Objectives

This assignment demonstrates proficiency in:

- **TypeScript Fundamentals**: Type-safe development with interfaces, modules, and compilation
- **API Integration**: Fetching and processing data from external APIs (SMHI Weather API, Sunrise-Sunset API, Geolocation API)
- **Modular Architecture**: Separating concerns with dedicated files for logic, animations, and styles
- **Responsive Web Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animation & UX**: CSS keyframes, pseudo-elements, and theme switching
- **Version Control**: Git workflow with meaningful commits and documentation
- **Teamwork & Collaboration**: Mob coding practices, GitHub collaboration, and code reviews 

## Features

### Core Functionality
- **Real-time Weather Data**: Current conditions, hourly forecasts, and 7-day outlook
- **Location Services**: Geolocation support and predefined city selection
- **Weather Metrics**: Temperature, humidity, wind speed, and "real feel" calculations
- **Sunrise/Sunset Times**: Displays local sunrise and sunset times used also for theme automation

### User Experience
- **Animated Interface**: Smooth fade-in effects and staggered animations
- **Theme System**: Manual day/night toggle with automatic sunrise/sunset detection
- **Visual Effects**: Starry night backgrounds and lens flare (almost) for day mode
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Modular Code**: Separated concerns for maintainability
- **Performance**: Efficient API calls and DOM manipulation
- **Accessibility**: Semantic HTML and keyboard navigation support

## Technologies Used

- **Frontend**: HTML5, CSS3, TypeScript
- **Build Tools**: TypeScript Compiler (tsc)
- **APIs**: SMHI Open Data API, Sunrise-Sunset.org API, Geolocation API
- **Development**: Node.js, Git, VS Code

## Local Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/qabalany/js-project-weather-app.git
   cd js-project-weather-app
   ```

2. **Install Dependencies**
   ```bash
   npm install -g typescript
   ```

3. **Build the Project**
   ```bash
   npx tsc
   ```

4. **Start Local Server**
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve
   ```

5. **Open in Browser**
   Navigate to `http://localhost:8000`

## Usage Guide

### Basic Navigation
- **City Selection**: Use the dropdown menu to select Stockholm, Malmö, or Gothenburg
- **Geolocation**: Click the location button to fetch weather for your current position
- **Theme Toggle**: Switch between day and night modes manually, or let the app automatically adjust based on local sunrise and sunset times

### Weather Information
- **Current Weather**: Displays temperature, conditions, and key metrics
- **Hourly Forecast**: 12-hour outlook with 2-hour intervals
- **7-Day Forecast**: Daily high/low temperatures and conditions
- **Additional Data**: Humidity, wind speed, sunrise/sunset times, real feel temperature (Humidex)

## Project Structure

```
js-project-weather-app/
├── index.html              # Main HTML structure
├── index.ts                # Core application logic
├── animations.ts           # Theme and animation management
├── styles.css              # Main stylesheet
├── animations.css          # Animation definitions
├── tsconfig.json           # TypeScript configuration
├── icons/                  # Weather icon assets
│   ├── day/               # Daytime weather icons
│   └── night/             # Nighttime weather icons
└── README.md              # Project documentation
```

### Key Files Explained

- **`index.ts`**: Handles API calls, data processing, DOM manipulation, and event listeners
- **`animations.ts`**: Manages theme switching and animation triggers
- **`styles.css`**: Responsive layout, typography, and component styling
- **`animations.css`**: Keyframe definitions for all visual effects

## API Documentation

### SMHI Weather API
- **Endpoint**: `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/{lon}/lat/{lat}/data.json`
- **Data**: Temperature, weather codes, humidity, wind speed
- **Usage**: Fetches forecast data for specific coordinates

### Sunrise-Sunset API
- **Endpoint**: `https://api.sunrise-sunset.org/json?lat={lat}&lng={lon}&date={date}&formatted=0`
- **Data**: Sunrise and sunset times for theme automation
- **Usage**: Displays sunrise/sunset times and determines automatic day/night mode switching

### Geolocation API
- **Reference**: https://www.w3schools.com/html/html5_geolocation.asp
- **Data**: User's current latitude and longitude coordinates
- **Usage**: Retrieves user's location for personalized weather data


### Browser Support
- Modern browsers with ES6+ support
- Tested on Chrome, Firefox, Safari, duckduckgo and Edge


