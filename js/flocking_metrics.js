// === flocking_metrics.js ===
// Utility functions to measure flocking behavior and current influence

function getAverageAlignment(boids) {
	let sum = new V2D();
	boids.forEach(b => sum.add(b.vel.normalized()));
	sum.div(boids.length);
	return sum.mag(); // Closer to 1 = more aligned
}

function getAverageSpeed(boids) {
	let total = 0;
	boids.forEach(b => total += b.vel.mag());
	return total / boids.length;
}

function getDirectionStdDev(boids) {
	let angles = boids.map(b => b.vel.angle());
	let mean = angles.reduce((a, b) => a + b, 0) / angles.length;
	let variance = angles.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / angles.length;
	return Math.sqrt(variance);
}

function getAveragePairDistance(boids) {
	let total = 0, count = 0;
	for (let i = 0; i < boids.length; i++) {
		for (let j = i + 1; j < boids.length; j++) {
			total += boids[i].dist(boids[j]);
			count++;
		}
	}
	return count > 0 ? total / count : 0;
}

function getAverageAlignmentWithCurrent(boids, current) {
	let angle = (current.direction * Math.PI) / 180;
	let currentVec = new V2D(Math.cos(angle), Math.sin(angle));
	let dotSum = 0;
	boids.forEach(b => {
		dotSum += b.vel.normalized().dot(currentVec);
	});
	return dotSum / boids.length; // 1 = perfectly aligned with current
}

// Optional: periodic logging (every second)
function logFlockingMetrics(boids, current) {
	console.log("\n=== Flocking Metrics ===");
	console.log("Avg Alignment:", getAverageAlignment(boids).toFixed(2));
	console.log("Avg Speed:", getAverageSpeed(boids).toFixed(2));
	console.log("Direction StdDev:", getDirectionStdDev(boids).toFixed(2));
	console.log("Avg Pair Distance:", getAveragePairDistance(boids).toFixed(2));
	console.log("Alignment With Current:", getAverageAlignmentWithCurrent(boids, current).toFixed(2));
}

// You can run this interval from main.js
// setInterval(() => logFlockingMetrics(flock.boids, current), 1000);
