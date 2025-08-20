const form = document.getElementById('bet-form');
const colorInput = document.getElementById('color');
const message = document.getElementById('message');

document.querySelectorAll('.color').forEach(btn => {
  btn.addEventListener('click', () => {
    colorInput.value = btn.dataset.color;
    message.textContent = `Selected ${btn.dataset.color}`;
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const player = document.getElementById('player').value;
  const color = colorInput.value;
  if (!color) {
    message.textContent = 'Choose a color first';
    return;
  }
  const res = await fetch('/bet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player, color })
  });
  const data = await res.json();
  message.textContent = data.status || data.error;
  form.reset();
});
