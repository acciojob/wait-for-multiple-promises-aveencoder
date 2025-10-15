document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const temprow = document.createElement('tr');
  temprow.innerHTML = `<td colspan="2">Loading...</td>`;
  output.appendChild(temprow);

  function createPromise(name) {
    const delay = 1000 + Math.random() * 2000; // Random delay between 1000 and 3000 ms
    const start = Date.now();
    return new Promise(resolve => {
      setTimeout(() => {
        const end = Date.now();
        const elapsedMs = end - start;
        const elapsedSec = elapsedMs / 1000;
        resolve({ name, elapsedSec });
      }, delay);
    });
  }

  let p1 = createPromise('Promise 1');
  let p2 = createPromise('Promise 2');
  let p3 = createPromise('Promise 3');

  Promise.all([p1, p2, p3]).then(results => {
    output.removeChild(temprow);

    results.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.name}</td><td>${r.elapsedSec.toFixed(3)}</td>`;
      output.appendChild(tr);
    });

    const max = Math.max(...results.map(r => r.elapsedSec));
    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `<td>Total</td><td>${max.toFixed(3)}</td>`;
    output.appendChild(trTotal);
  });
});


	