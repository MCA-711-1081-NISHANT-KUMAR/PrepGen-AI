const express = require('express');
const router = express.Router();
const db = require('../database/db');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// AI Question Generator
router.get('/questions/:field', async (req, res) => {
  try {
    const field = req.params.field;
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional technical interviewer." },
        { role: "user", content: `Generate 10 interview questions for ${field}. Return only JSON array like ["q1","q2"]` }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7
    });
    const text = completion.choices[0].message.content;
    let questions = [];
    try {
      const match = text.match(/\[[\s\S]*\]/);
      questions = JSON.parse(match ? match[0] : text);
    } catch { questions = [text]; }
    res.json(questions.map((q, i) => ({ id: i + 1, question: q })));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'AI question generation failed' });
  }
});

// Create Session
router.post('/session', (req, res) => {
  const { field, userId } = req.body;
  db.run('INSERT INTO sessions (user_id, field) VALUES (?,?)', [userId || null, field || 'General'],
    function(err) {
      if (err) return res.json({ success: true, sessionId: Date.now() });
      res.json({ success: true, sessionId: this.lastID });
    });
});

// Save Answer
router.post('/answer', (req, res) => {
  const { session_id, question, answer, feedback, score } = req.body;
  db.run('INSERT INTO answers (session_id, question, answer, feedback, score) VALUES (?,?,?,?,?)',
    [session_id, question, answer, feedback, score || 0],
    function(err) {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
});

// History
router.get('/history', (req, res) => {
  db.all(`SELECT s.*, COUNT(a.id) as answers_count,
    ROUND(AVG(a.score),1) as avg_score
    FROM sessions s LEFT JOIN answers a ON a.session_id = s.id
    GROUP BY s.id ORDER BY s.started_at DESC LIMIT 20`,
    [], (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows || []);
    });
});

// History by user
router.get('/history/:userId', (req, res) => {
  db.all(`SELECT s.*, COUNT(a.id) as answers_count,
    ROUND(AVG(a.score),1) as avg_score
    FROM sessions s LEFT JOIN answers a ON a.session_id = s.id
    WHERE s.user_id=?
    GROUP BY s.id ORDER BY s.started_at DESC LIMIT 20`,
    [req.params.userId], (err, rows) => {
      if (err) return res.status(500).json([]);
      res.json(rows || []);
    });
});

module.exports = router;
