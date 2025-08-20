const setBtn = document.getElementById('set-winner');
const resolveBtn = document.getElementById('resolve');
const resultEl = document.getElementById('result');

setBtn.addEventListener('click', async () => {
  const color = document.getElementById('winner').value;
  const res = await fetch('/admin/set-winner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color })
  });
  const data = await res.json();
  resultEl.textContent = JSON.stringify(data, null, 2);
});

resolveBtn.addEventListener('click', async () => {
  const res = await fetch('/admin/resolve');
  const data = await res.json();
  resultEl.textContent = JSON.stringify(data, null, 2);
});
