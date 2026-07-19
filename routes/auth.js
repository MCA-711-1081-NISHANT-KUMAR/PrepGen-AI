const express = require('express');
const router = express.Router();
const db = require('../database/db');
const crypto = require('crypto');

function hashPass(p) {
  return crypto.createHash('sha256').update(p + 'prepgenai_salt_2024').digest('hex');
}

router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  db.run('INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)',
    [name, email, phone || '', hashPass(password)],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE'))
          return res.status(400).json({ success: false, message: 'Email already registered' });
        return res.status(500).json({ success: false, message: 'Registration failed' });
      }
      res.json({ success: true, userId: this.lastID, name });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password required' });
  db.get('SELECT id, name, email FROM users WHERE email=? AND password=?',
    [email, hashPass(password)],
    (err, user) => {
      if (err) return res.status(500).json({ success: false, message: 'Server error' });
      if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
      res.json({ success: true, userId: user.id, name: user.name, email: user.email });
    });
});

module.exports = router;
