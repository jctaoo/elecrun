window.onload = () => {
  let count = 0;

  const counterLabel = document.querySelector(".label")!;
  const btn = document.querySelector(".add-btn")!;

  btn.addEventListener('click', () => {
    count += 1;
    counterLabel.textContent = `updated ${count}`;
  });
}
