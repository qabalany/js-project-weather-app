# Weather App - Two-Week Development Plan (Weeks 8-9)

## 📋 Project Overview
- **Team**: 3 students 
- **Timeline**: 2 weeks (Oct 13-24, 2025)
- **Demo**: Friday, Oct 24 
- **Hand-in**: Sunday, Oct 26 (23:59)
- **Design**: Figma Design #2 (night/day)

## 🎯 Core Requirements (Grade G)
- ✅ TypeScript implementation
- ✅ SMHI API integration with fetch()
- ✅ Display: city name, current temp, weather description, 4-day forecast
- ✅ Responsive design (320px-1600px+)
- ✅ Follow Figma Design #2 closely
- ✅ Clean code practices

## 🌟 Stretch Goals (All for VG Grade)
- 🌅 Sunrise & Sunset times
- 🏙️ Multiple cities/search functionality
- 🗺️ Geolocation for current location
- 💽 Additional API endpoints
- ☀️ CSS Animations & particles

---

## 📅 WEEK 8 — Foundation & Core Features
*Mob Programming Approach*

### Monday - Project Setup & Planning
**rotations**: Driver → Navigator → Observer/researcher

**Milestones:**
- ✅ Repository setup and team collaboration
- ✅ TypeScript configuration (tsconfig.json, package.json)
- ✅ Basic TypeScript compilation setup
- ✅ Figma Design #2 analysis and breakdowns
- ✅ SMHI API exploration and testing

**Deliverables:**
- Working dev environment
- Project structure in place
- API access confirmed

### Tuesday - API Integration & TypeScript
**Driver rotation**: Navigation → Observer → Driver

**Milestones:**
- ✅ TypeScript interfaces for weather data
- ✅ SMHI API service implementation
- ✅ Basic fetch() calls working
- ✅ Error handling patterns

**Deliverables:**
- Weather data types defined
- API service fetching real data
- Basic error states handled

### Wednesday - Current Weather Display
**Driver rotation**: Observer → Driver → Navigator

**Milestones:**
- ✅ Current weather component
- ✅ Temperature display
- ✅ City name and description
- ✅ Basic responsive styling

**Deliverables:**
- Current weather fully functional
- Mobile-first CSS started
- Theme switching (day/night)

### Thursday - 4-Day Forecast
**Driver rotation**: Driver → Navigator → Observer

**Milestones:**
- ✅ Forecast data parsing
- ✅ Forecast UI components
- ✅ Date formatting utilities
- ✅ Weather icons implementation

**Deliverables:**
- Complete 4-day forecast
- Weather icons working
- Data formatting utilities

### Friday - Integration & Demo Prep
**45-min rotations** for full integration

**Milestones:**
- ✅ Full app integration testing
- ✅ Basic responsive design complete
- ✅ Error states polished
- ✅ Week 8 demo ready

**Deliverables:**
- Working weather app demo
- Week 8 retrospective
- Week 9 planning session

---

## 📅 WEEK 9 — Polish, Features & Presentation
*Git Branches & Feature Development*

### Monday - Git Workflow & Responsive Polish
**Team Split**: Individual feature branches

**Milestones:**
- ✅ Git branch strategy implemented
- ✅ Mobile responsive (320px) perfect
- ✅ Tablet responsive (768px) optimized
- ✅ Desktop responsive (1024px+) polished

**Branches:**
- `feature/mobile-responsive`
- `feature/tablet-responsive` 
- `feature/desktop-responsive`

### Tuesday - UI Polish & Stretch Goals
**Feature branches**: Choose stretch goals

**Milestones:**
- ✅ Figma Design #2 pixel-perfect implementation
- ✅ Choose and implement stretch goals
- ✅ CSS animations and micro-interactions
- ✅ Weather particles (rain/snow effects)

**Branches:**
- `feature/sunrise-sunset`
- `feature/geolocation`
- `feature/multiple-cities`
- `feature/css-animations`

### Wednesday - Testing & Bug Fixes
**Mob programming**: Bug fixing session

**Milestones:**
- ✅ Cross-browser testing
- ✅ Cross-device testing
- ✅ Error state improvements
- ✅ Performance optimization

**Focus:**
- Team code review
- Bug fixing session
- Integration testing

### Thursday - Presentation Preparation
**All hands**: Documentation and demo prep

**Milestones:**
- ✅ README documentation complete
- ✅ Netlify deployment working
- ✅ Demo script prepared
- ✅ Code walkthrough ready

**Deliverables:**
- Live deployed app
- Presentation materials
- Demo rehearsal

### Friday - Demo Day! 🎉
**Present to SMHI developers**

**Schedule:**
- Final polish (morning)
- Presentation to SMHI team
- Code walkthrough and Q&A
- Project celebration

---

## 🧑‍💻 Team Collaboration Framework

### Week 8: Mob Programming Rules
- **Rotation**: Every 45 minutes
- **Roles**: Driver (codes) → Navigator (guides) → Observer (researches)
- **Commits**: Every 30-45 minutes
- **Stand-up**: Daily 15min (yesterday/today/blockers)
- **Retrospective**: End of each day 15min

### Week 9: Branch-Based Development
- **Main branch**: Always deployable (protected)
- **Feature branches**: Individual features
- **Pull requests**: Require team code review
- **Merging**: Daily integration sessions
- **Communication**: Slack/Discord for coordination

---


### Development Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Auto-compile TypeScript when files change
- `npm run serve` - Start simple HTTP server to view the app

---

## 🎨 Design Implementation Guide

### Color Palette (From Figma)
- **Night Theme**: Linear gradient `#6264A2` → `#222350`
- **Day Theme**: Linear gradient `#8589FF` → `#EAEFFB`
- **Accent**: `#757AFF` (buttons, highlights)
- **Text**: `#FFFFFF` (primary), `#707070` (secondary)
- **Sun/Moon**: `#FFEC8D`

### Responsive Breakpoints
- **Mobile**: 320px-767px (mobile-first)
- **Tablet**: 768px-1023px
- **Desktop**: 1024px-1599px
- **Large**: 1600px+

### Typography Scale
- **Temperature**: 4rem (mobile) → 6rem (desktop)
- **City**: 1.5rem
- **Description**: 1rem
- **Forecast**: 0.9rem

---

## ✅ Weekly Checklists

### Week 8 Success Criteria
- [ ] TypeScript project fully configured
- [ ] SMHI API integration working
- [ ] Current weather display complete
- [ ] 4-day forecast functional
- [ ] Basic responsive design
- [ ] Team mob programming practiced
- [ ] Daily commits and standups
- [ ] Demo-ready application

### Week 9 Success Criteria
- [ ] Pixel-perfect Figma implementation
- [ ] Full responsive design (320px-1600px+)
- [ ] At least 1 stretch goal implemented
- [ ] Git branch workflow mastered
- [ ] Cross-browser/device testing complete
- [ ] Netlify deployment live
- [ ] Presentation materials ready
- [ ] Code documentation complete

---

## 🚀 Success Metrics

### Grade G (Pass) Requirements
✅ All core features implemented
✅ TypeScript used throughout
✅ Responsive design working
✅ Design fidelity to Figma
✅ Clean code practices

### Grade VG (Distinction) Requirements
✅ All Grade G requirements
✅ Minimum 1 stretch goal completed
✅ Exceptional code quality
✅ Advanced features implemented

---

## 📞 Support & Resources

### Daily Stand-up Questions
1. **Yesterday**: What did we complete?
2. **Today**: What's our focus?
3. **Blockers**: Any technical issues?
4. **Learning**: New concepts to explore?

### Code Review Checklist
- TypeScript types properly defined
- Responsive design tested
- Error handling implemented
- Code follows team conventions
- Figma design accurately implemented

### Emergency Contacts
- Bootcamp instructors for technical help
- SMHI API documentation
- Team communication channel

---
