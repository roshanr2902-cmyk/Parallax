# 🕸️ SPINDLE — One Web. Every Aspect of Your Everyday Life.

> A Personal Safety · Productivity · Wellbeing · Finance & Learning Platform — six connected modules woven into one private profile.

---

## 📌 Overview

**SPINDLE** is a unified, all-in-one web application designed to solve the fragmentation of modern everyday digital tools. Instead of juggling separate, disconnected apps for budgeting, studying, scheduling, mental health, parking, and safety, **SPINDLE** integrates all six core everyday domains under a single private profile powered by a central AI intelligence layer.

Built with a bold **Spider-Man / Web-inspired comic aesthetic**, SPINDLE delivers an immersive visual experience complete with custom canvas-based spider cursor particle dynamics, Web Audio API sound synthesis, web-slinging page transitions, and interactive module interfaces.

---

## 🌟 Key Features

### 🕸️ 6 Integrated Everyday Modules
1. **🚨 Emergency Safety System (SOS):** 
   - One-tap SOS emergency trigger.
   - Captures live location only upon explicit user permission.
   - Automatically identifies the 5 nearest available emergency responders.
   - Shares pre-authorized medical notes, emergency contacts, and instructions.

2. **🗓️ Smart Schedule & Personal Assistant:**
   - Dynamic daily timetable with interactive task management.
   - AI-generated day plans that adapt to your deadlines and study load.

3. **💳 Personal Finance Manager:**
   - Visual budget tracking with spending breakdown categories (Food, Travel, Study, etc.).
   - Interactive SVG budget gauge and expense logging.
   - Savings goal progress tracker.

4. **🅿️ Smart Queue & Crowd Management:**
   - Real-time campus parking/zone occupancy monitoring.
   - Predictive demand modeling based on historical patterns, time of day, and duration.
   - Virtual queue reservation system to reduce waiting times.

5. **📘 AI Study Tracker & Learning Assistant:**
   - Visual syllabus completion tracker.
   - AI-generated multi-week study roadmaps and exam preparation plans.
   - Subject breakdown (Completed, In Progress, Needs Attention).

6. **🌙 Daily Wellbeing Check-In:**
   - Low-friction mood logging (Calm, Okay, Stressed, Very Stressed, Overwhelmed).
   - Instant, personalized wellness recommendations.
   - Focus on continuous self-care (non-medical, privacy-first).

---

## 🔒 Privacy by Design

Privacy isn't an afterthought in SPINDLE — it is built directly into the system architecture:
- **Private by Default:** All medical, location, and personal notes remain locked (`🔒 Private`).
- **Emergency-Aware Disclosure:** Sensitive data is unencrypted and disclosed (`🔓 Shared with responders`) **only** during an active SOS event to pre-authorized recipients.
- **Zero Public Profile Leakage:** Minimal data collection with explicit user permissions for geolocation and sensor access.

---

## 🎨 Interactive Features & Easter Eggs

- **Web Audio Synthesis:** Custom synthesized sound effects for actions (`thwip`, `pluck`, `webShoot`, `alarm`) using the native browser Web Audio API — zero external audio assets required.
- **Custom Canvas Spider Cursor:** Interactive web-particle physics trail following mouse movements.
- **Web-Slinging Transitions:** Custom page switching animation featuring a web-hand sweep effect.
- **Shift Key Easter Egg:** Pressing the `Shift` key toggles a swinging spider hanging from the top navigation bar!
- **SPINDLE AI Floating Assistant (FAB):** Quick access menu for instant module navigation and AI prompt assistance.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & UI Design**
- **HTML5 & CSS3:** Responsive custom CSS using dynamic CSS variables (`--crimson`, `--red-glow`, `--cyan`, etc.).
- **Typography:** Google Fonts (*Bangers*, *Oswald*, *Inter*).
- **JavaScript (Vanilla ES6+):** Pure client-side dynamic rendering, canvas graphics, and state management.
- **Web Audio API:** Real-time sound synthesis.

### **System Architecture Flow**
```text
[ User / PWA ] ──> [ Frontend (HTML/CSS/JS) ] ──> [ Backend API (Node.js/Express) ]
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                                  ▼                                                   ▼
                     [ Auth & Database (MongoDB/Firebase) ]               [ AI Engine (Gemini API / LLM) ]
                                  │                                                   │
                                  └─────────────────────────┬─────────────────────────┘
                                                            ▼
                                          [ Location / Maps / Notification Services ]
```

---

## 🚀 Quick Start / Local Setup

Because SPINDLE is crafted as a self-contained, high-performance web application, getting it running locally takes seconds:

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/your-username/spindle.git
   cd spindle
   ```

2. **Open in Browser:**
   - Simply double-click `index.html` or open it directly in any modern browser (Chrome, Firefox, Edge, Safari).
   - Alternatively, serve it via a local development server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js live-server
     npx live-server
     ```

3. **Interact:**
   - Navigate to `http://localhost:8000`.
   - Click **"Enter the Web"** to explore the dashboard.
   - Press `Shift` to trigger the hidden hanging spider!

---

## 🗺️ Project Roadmap

- [x] Functional HTML/CSS/JS Web/PWA prototype with 6 connected modules.
- [x] Synthesized Web Audio & Custom Canvas Spider Physics.
- [x] Emergency SOS modal flow & Privacy Mode toggles.
- [ ] Native Mobile App build (React Native / Flutter).
- [ ] Wearable device sensor integration for auto-SOS detection.
- [ ] Real-time IoT sensor feed for live parking queue management.
- [ ] Deep Gemini API integration for real-time schedule & study plan generation.

---

## 🏆 Event & Credit

**Event:** HACKVERSE: INTO THE WEB  
**Tagline:** *"One Web. Every Aspect of Your Everyday Life."*
https://drive.google.com/file/d/17cjwX9UKxXzNIhShMaHoQAdEYUeLc-qk/view?usp=sharing
