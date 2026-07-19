require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const interviewRoutes = require('./routes/interview');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');

app.use('/api/interview', interviewRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Interviewer API running 🚀' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 AI Interviewer running at http://localhost:${PORT}`);
  console.log(`📊 API at http://localhost:${PORT}/api`);
  console.log(`🤖 Using Groq AI (Llama 3)\n`);
});
