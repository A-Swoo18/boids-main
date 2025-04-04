let current = {
  velocity: 5,  // Default velocity
  direction: 0  // Default direction in degrees
};

// Select the input elements
const velocityInput = document.getElementById('velocity');
const directionInput = document.getElementById('direction');
const velocityValueDisplay = document.getElementById('velocity-value');
const directionValueDisplay = document.getElementById('direction-value');
const applyCurrentButton = document.getElementById('apply-current');

// Event listeners to update the displayed values and current object
velocityInput.addEventListener('input', () => {
  velocityValueDisplay.textContent = velocityInput.value;
  current.velocity = parseFloat(velocityInput.value);
});

directionInput.addEventListener('input', () => {
  directionValueDisplay.textContent = directionInput.value;
  current.direction = parseFloat(directionInput.value);
});

// Apply current to the boid simulation when button is clicked
applyCurrentButton.addEventListener('click', () => {
  applyCurrentToBoids(current.velocity, current.direction);
});

// Function to apply the current to the boid simulation (example)
function applyCurrentToBoids(velocity, direction) {
  console.log(`Applying current: Velocity = ${velocity}, Direction = ${direction}`);
  // Here you would apply the current to the boids, for example:
  boids.forEach(boid => {
    boid.velocity.x += Math.cos(direction * Math.PI / 180) * velocity;
    boid.velocity.y += Math.sin(direction * Math.PI / 180) * velocity;
  });
}
