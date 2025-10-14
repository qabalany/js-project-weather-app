# Weather App Project - AI Coding Assistant Instructions

## 📚 Bootcamp Context & Student Knowledge Level

This is a **Week 8-9 TypeScript Weather App** built by 3 bootcamp students. **CRITICAL**: Always match suggestions to their actual curriculum knowledge - no advanced concepts not covered in Weeks 1-9.

### 🎓 What Students Know (Weeks 1-9 Curriculum)

**Week 1-2**: HTML structure, CSS basics, Grid, Flexbox, responsive design
**Week 3**: HTML forms, hero images, clean code practices  
**Week 4**: JavaScript basics, DOM manipulation, variables, functions
**Week 5**: Functions, conditionals, control flow, closures and scope
**Week 6**: Objects, arrays, array methods (forEach, filter, map), loops
**Week 7**: APIs, fetch(), JSON, Promise basics, error handling
**Week 8**: TypeScript basics, interfaces, union types, optional properties, Date() object
**Week 9**: Git branches, teamwork, TypeScript continuation

### ❌ What Students DON'T Know (Avoid These)
- Advanced build tools (Webpack, Vite, Rollup)
- Complex bundling or module systems
- Advanced TypeScript (generics, decorators, advanced types)
- Modern frameworks (React, Vue, Angular)
- Advanced testing frameworks
- Advanced deployment strategies
- Complex state management

## 🏗️ Project Technical Setup (Bootcamp Level)

### Simple TypeScript Compilation (No Complex Build Tools)
```
├── index.html              # Main HTML file
├── package.json            # Basic TypeScript + http-server setup
├── tsconfig.json           # Simple TypeScript config
├── main.ts                 # Main app file (Week 4 DOM knowledge)
├── weather-types.ts        # Basic interfaces (Week 8 knowledge)
├── weather-service.ts      # API calls (Week 7 fetch knowledge)
├── formatters.ts           # Helper functions (Week 5 functions)
└── style.css               # Responsive CSS (Week 2 knowledge)
```

### Development Commands (Keep Simple)
- `npm run build` - Compile TypeScript with `tsc`
- `npm run watch` - Auto-compile on file changes
- `npm run serve` - Simple HTTP server (http-server package)

## 🎯 Project Requirements (From Assessment)

**Grade G (Pass) Requirements:**
- TypeScript implementation (Week 8 level)
- SMHI API integration using fetch() (Week 7 knowledge)
- Display: city name, current temperature, weather description, 4-day forecast
- Responsive design (320px-1600px+) using Week 2 CSS knowledge
- Follow Figma Design #2 closely
- Clean code practices (Week 3 standards)

**Grade VG (Distinction) Stretch Goals:**
- Sunrise & Sunset times
- Multiple cities/search functionality  
- Geolocation API usage
- Additional API endpoints
- CSS animations

## 👥 Team Collaboration (Bootcamp Practice)

### Week 8: Mob Programming (New Concept)
- **45-minute rotations**: Driver → Navigator → Observer
- **Roles**: Driver (codes), Navigator (guides), Observer (researches)
- **Commits**: Every 30-45 minutes (building git habits)
- **Focus**: Learning TypeScript together, core features

### Week 9: Git Branches (New Concept)  
- **Feature branches**: Individual features (`feature/responsive-design`)
- **Pull requests**: Team code review practice
- **Focus**: Polish, responsive design, stretch goals

## 🎨 Design Implementation (Figma Design #2)

### Visual Themes (Conditional Styling)
- **Night theme**: Dark purple gradient (#6264A2 → #222350) with moon
- **Day theme**: Light purple gradient (#8589FF → #EAEFFB) with sun  
- **Weather-based**: Icons and particles change based on conditions

### Responsive Approach (Week 2 Knowledge)
- **Mobile-first CSS** (320px starting point)
- **CSS Grid and Flexbox** for layout (Week 2 curriculum)
- **Media queries** for tablet (768px) and desktop (1024px+)

## 🔧 Code Style & Patterns (Match Bootcamp Level)

### TypeScript Usage (Week 8 Basics Only)
```typescript
// Basic interfaces (Week 8 level)
interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

// Union types (Week 8 knowledge)
type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'snow';

// Optional properties (Week 8 concept)
interface ForecastDay {
  day: string;
  maxTemp: number;
  minTemp?: number; // optional
}
```

### API Integration (Week 7 Knowledge)
```javascript
// Basic fetch() usage (Week 7 level)
async function fetchWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API error:', error);
  }
}
```

### DOM Manipulation (Week 4 Knowledge)
```javascript
// Basic DOM updates (Week 4 level)
const temperatureElement = document.getElementById('temperature');
temperatureElement.textContent = `${temp}°C`;
```

## 🚨 AI Assistant Guidelines

### Always Consider Bootcamp Level
1. **Explain TypeScript concepts** - Students are learning (Week 8)
2. **Use simple patterns** - Avoid advanced JavaScript features
3. **Reference Week curriculum** - "This uses the array methods from Week 6"
4. **Show step-by-step** - Break down complex tasks
5. **Validate against assessment** - Ensure Grade G requirements met

### Code Suggestions Should Be
- **Beginner-friendly** with clear comments
- **Curriculum-aligned** using Weeks 1-9 knowledge only
- **Mobile-first responsive** (Week 2 approach)
- **TypeScript basic** (Week 8 level interfaces and types)
- **Clean and readable** (Week 3 standards)

### Avoid Suggesting
- Complex build tools or bundlers
- Advanced TypeScript features not in Week 8
- Modern framework patterns
- Complex state management
- Advanced testing concepts

## 🎯 Success Criteria

### Technical Implementation
- TypeScript compiles without errors
- SMHI API integration working
- All responsive breakpoints tested
- Figma design matched closely
- Error states handled properly

### Learning Objectives
- Team practices mob programming effectively
- Git workflow with branches understood
- TypeScript basics mastered
- API integration patterns learned
- Clean code principles applied

## 📝 Demo Preparation (Friday Oct 24)





**Format**: Live presentation + code walkthrough
**Requirements**: Working Netlify deployment, team presentation

This project is both a technical challenge and a learning experience - prioritize education and teamwork alongside the final product quality.