// === experiment_logger.js ===
// Tracks boid metrics over time during user-defined experiments

let experimentData = [];
let experimentInterval = null;

// function startExperiment(duration = 30, sampleRate = 1) {
// 	experimentData = [];

// 	let time = 0;
// 	experimentInterval = setInterval(() => {
// 		const avgAlign = getAverageAlignment(flock.boids);
// 		const dirStd = getDirectionStdDev(flock.boids);
// 		const pairDist = getAveragePairDistance(flock.boids);
// 		const alignWithCurrent = getAverageAlignmentWithCurrent(flock.boids, current);

// 		experimentData.push({
// 			time,
// 			velocity: current.velocity,
// 			avgAlignment: avgAlign,
// 			directionStdDev: dirStd,
// 			avgPairDistance: pairDist,
// 			alignmentWithCurrent: alignWithCurrent
// 		});

// 		time += sampleRate;
// 		if (time > duration) stopExperiment();
// 	}, sampleRate * 1000);
// }

function startExperiment(duration = 30, sampleRate = 1) {
	const startBtn = document.getElementById("start-experiment");
	startBtn.textContent = "Collecting Data...";
	startBtn.style.backgroundColor = "#ff9800";
	startBtn.disabled = true;

	experimentData = [];

	let ticks = 0;
	const maxTicks = Math.floor(duration / sampleRate);

	experimentInterval = setInterval(() => {
		const avgAlign = getAverageAlignment(flock.boids);
		const dirStd = getDirectionStdDev(flock.boids);
		const pairDist = getAveragePairDistance(flock.boids);
		const alignWithCurrent = getAverageAlignmentWithCurrent(flock.boids, current);

		experimentData.push({
			time: ticks * sampleRate,
			velocity: current.velocity,
			avgAlignment: avgAlign,
			directionStdDev: dirStd,
			avgPairDistance: pairDist,
			alignmentWithCurrent: alignWithCurrent
		});

		ticks++;
		if (ticks >= maxTicks) {
			stopExperiment();
		}
	}, sampleRate * 1000);
}


// function stopExperiment() {
// 	clearInterval(experimentInterval);
// 	experimentInterval = null;
// 	console.log("Experiment complete", experimentData);
// }

function stopExperiment() {
	clearInterval(experimentInterval);
	experimentInterval = null;

	const startBtn = document.getElementById("start-experiment");
	startBtn.textContent = "Start Experiment";
	startBtn.style.backgroundColor = "";
	startBtn.disabled = false;
    
    const popup = document.getElementById("experiment-popup");
    popup.style.display = "block";
}


// function downloadCSV() {
// 	if (experimentData.length === 0) return;

// 	let csv = "time,current_velocity,avg_alignment,direction_std_dev,avg_pair_distance,alignment_with_current\n";
// 	experimentData.forEach(row => {
// 		csv += `${row.time},${row.velocity.toFixed(2)},${row.avgAlignment.toFixed(4)},${row.directionStdDev.toFixed(4)},${row.avgPairDistance.toFixed(4)},${row.alignmentWithCurrent.toFixed(4)}\n`;
// 	});

// 	const blob = new Blob([csv], { type: "text/csv" });
// 	const url = URL.createObjectURL(blob);

// 	const a = document.createElement("a");
// 	a.href = url;
// 	a.download = "boid_experiment.csv";
// 	document.body.appendChild(a);
// 	a.click();
// 	document.body.removeChild(a);
// 	URL.revokeObjectURL(url);
// }

function downloadCSV() {
	if (experimentData.length === 0) {
		alert("No experiment data to download. Did you run the experiment?");
		return;
	}

	let csv = "time,current_velocity,avg_alignment,direction_std_dev,avg_pair_distance,alignment_with_current\n";
	experimentData.forEach(row => {
		csv += `${row.time},${row.velocity.toFixed(2)},${row.avgAlignment.toFixed(4)},${row.directionStdDev.toFixed(4)},${row.avgPairDistance.toFixed(4)},${row.alignmentWithCurrent.toFixed(4)}\n`;
	});

	const blob = new Blob([csv], { type: "text/csv" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "boid_experiment.csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}


document.getElementById("start-experiment").addEventListener("click", () => startExperiment(30));
document.getElementById("download-csv").addEventListener("click", downloadCSV);
document.getElementById("close-popup").addEventListener("click", () => {
	document.getElementById("experiment-popup").style.display = "none";
});
