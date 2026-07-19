# 🤖 PrepGenAI – Virtual Voice Interview App

A complete AI-powered voice interview web app with 6 fields, 20 questions each, real-time voice capture, and Google Gemini AI feedback.

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v16+ installed → https://nodejs.org
- A free Google Gemini API key → https://makersuite.google.com/app/apikey

### Step 1: Install Dependencies
```bash
cd ai-interviewer
npm install
```

### Step 2: Configure API Key
```bash
# Copy the example env file
cp .env.example .env

# Open .env and paste your Gemini API key:
# GEMINI_API_KEY=your_actual_key_here
```

### Step 3: Seed the Database (Run Once)
```bash
node database/seed.js
```

### Step 4: Start the Server
```bash
npm start
# OR for auto-reload during development:
npm run dev
```

### Step 5: Open the App
Visit http://localhost:3000 in your browser ✅

---

## 🏗️ Project Structure

```
ai-interviewer/
├── public/
│   └── index.html        # Complete frontend (HTML + CSS + JS)
├── routes/
│   ├── interview.js      # Interview API (questions, sessions, answers)
│   └── ai.js             # Gemini AI feedback API
├── database/
│   ├── db.js             # SQLite connection & schema
│   ├── seed.js           # Seed 120 questions (20 per field)
│   └── interview.db      # SQLite database (auto-created)
├── server.js             # Main Express server
├── package.json
├── .env.example
└── README.md
```

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 6 Interview Fields | Data Analytics, Web Dev, Backend, Cyber Security, UI/UX, DevOps |
| 20 Questions/Field | 120 total pre-defined expert questions |
| Voice Interview | Web Speech API for voice-to-text capture |
| ARIA AI Coach | Reads questions aloud using Text-to-Speech |
| AI Feedback | Google Gemini evaluates answers with score + suggestions |
| Interview History | SQLite stores all sessions and answers |
| Offline Fallback | Works without API key with mock feedback |

---

## 📡 API Endpoints

```
GET  /api/interview/fields              → List all fields
GET  /api/interview/questions/:field    → 20 questions for a field
POST /api/interview/session             → Create interview session
POST /api/interview/answer              → Save answer + feedback
GET  /api/interview/history             → Past sessions
POST /api/ai/feedback                   → Get Gemini AI feedback
GET  /api/health                        → Server health check
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | SQLite3 (lightweight, no setup needed) |
| AI | Google Gemini Pro API (free tier) |
| Voice Input | Web Speech API (built into Chrome/Edge) |
| Voice Output | SpeechSynthesis API (Text-to-Speech) |

---

## 💡 Tips

- **Best browser**: Google Chrome or Microsoft Edge (best Web Speech API support)
- **Without API key**: The app works with smart mock feedback
- **Voice recognition**: Speak clearly in a quiet environment
- **Manual input**: You can also type answers directly in the text area

---

## 🔧 Enhance Further

- [ ] Add user authentication (bcrypt + JWT)
- [ ] Add more question fields (Data Science, Cloud, etc.)
- [ ] Export interview results to PDF
- [ ] Add timer per question
- [ ] Deploy to Render.com (free) + Vercel frontend

---

## 📦 Deploy Free

**Backend (Render.com):**
1. Push to GitHub
2. Connect repo on render.com
3. Set `GEMINI_API_KEY` environment variable

**Frontend (Vercel):**
1. Set `public/` as root
2. Connect GitHub repo on vercel.com
