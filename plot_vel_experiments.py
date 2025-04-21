import pandas as pd
import matplotlib.pyplot as plt
import glob
import os
from collections import defaultdict

# Define metrics from your actual CSV
metrics = [
    "avg_alignment",
    "direction_std_dev",
    "avg_pair_distance",
    "alignment_with_current"
]

# Find and group CSVs by velocity
files = glob.glob("results/vel_*.csv")
grouped = defaultdict(list)

for file in files:
    # Extract velocity from filename
    basename = os.path.basename(file)
    parts = basename.split("_")
    try:
        velocity = float(parts[1])
        grouped[velocity].append(file)
    except ValueError:
        continue

# Sort velocity keys
sorted_velocities = sorted(grouped.keys())

# Plot each metric
for metric in metrics:
    plt.figure(figsize=(10, 5))

    for vel in sorted_velocities:
        dfs = []

        for f in grouped[vel]:
            df = pd.read_csv(f)

            # Drop any completely empty columns
            df = df.dropna(axis=1, how='all')

            if metric in df.columns:
                dfs.append(df)

        if not dfs:
            continue

        # Trim to shortest run for consistent averaging
        min_len = min(len(df) for df in dfs)
        trimmed_dfs = [df.iloc[:min_len] for df in dfs]

        # Average across all experiments at this velocity
        avg_df = pd.concat(trimmed_dfs).groupby(level=0).mean()

        times = avg_df["time"]
        values = avg_df[metric]

        plt.plot(times, values, label=f"vel {vel:.1f}")

    plt.title(f"{metric.replace('_', ' ').title()} vs Time")
    plt.xlabel("Time (s)")
    plt.ylabel(metric.replace('_', ' ').title())
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"{metric}_vs_time.png")
    plt.show()
