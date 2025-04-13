// Define current globally
window.current = {
  velocity: parseFloat(document.querySelector('[data-model="velocity"]').value),
  direction: parseFloat(document.querySelector('[data-model="direction"]').value)
};

const velocityInput = document.querySelector('[data-model="velocity"]');
const directionInput = document.querySelector('[data-model="direction"]');
const applyCurrentButton = document.getElementById('apply-current');

// Optional: Show values live (if you want)
const velocityDisplay = document.querySelector('[data-show="velocity"]');
const directionDisplay = document.querySelector('[data-show="direction"]');

// Listen for slider changes
velocityInput.addEventListener('input', () => {
  current.velocity = parseFloat(velocityInput.value);
  if (velocityDisplay) velocityDisplay.textContent = velocityInput.value;
  console.log("Velocity changed to:", current.velocity);
});

directionInput.addEventListener('input', () => {
  current.direction = parseFloat(directionInput.value);
  if (directionDisplay) directionDisplay.textContent = directionInput.value;
  console.log("Direction changed to:", current.direction);
});

// Optional: apply button (not strictly needed now that it's real-time)
applyCurrentButton.addEventListener('click', () => {
  console.log(`Applied: Velocity = ${current.velocity}, Direction = ${current.direction}`);
});
