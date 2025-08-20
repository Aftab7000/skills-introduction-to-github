const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let bets = [];
let winningColor = null;

// Player places a bet
app.post('/bet', (req, res) => {
  const { player, color } = req.body;
  if (!player || !color) {
    return res.status(400).json({ error: 'player and color required' });
  }
  bets.push({ player, color });
  res.json({ status: 'bet accepted' });
});

// Admin sets the winning color
app.post('/admin/set-winner', (req, res) => {
  const { color } = req.body;
  if (!color) {
    return res.status(400).json({ error: 'color required' });
  }
  winningColor = color;
  res.json({ status: 'winner set', color });
});

// Admin resolves the round
app.get('/admin/resolve', (req, res) => {
  if (!winningColor) {
    return res.status(400).json({ error: 'winner not set' });
  }
  const winners = bets.filter(b => b.color === winningColor);
  const losers = bets.filter(b => b.color !== winningColor);
  const result = { winningColor, winners, losers };
  // reset for next round
  bets = [];
  winningColor = null;
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
