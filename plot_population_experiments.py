import pandas as pd
import matplotlib.pyplot as plt
import glob
import os
from collections import defaultdict

# Flocking metrics to analyze
metrics = [
    "avg_alignment",
    "direction_std_dev",
    "avg_pair_distance",
    "alignment_with_current"
]

# Grab files in results/population/
files = glob.glob("results/population/pop_*.csv")
grouped = defaultdict(list)

# Group files by population count
for file in files:
    basename = os.path.basename(file)
    parts = basename.split("_")
    try:
        population = int(parts[1])
        grouped[population].append(file)
    except ValueError:
        continue

# Sort by population size
sorted_populations = sorted(grouped.keys())

# Plot each metric
for metric in metrics:
    plt.figure(figsize=(10, 5))

    for pop in sorted_populations:
        dfs = []

        for f in grouped[pop]:
            df = pd.read_csv(f)

            # Drop trailing empty columns if present
            df = df.dropna(axis=1, how='all')

            if metric in df.columns:
                dfs.append(df)

        if not dfs:
            continue

        # Trim to shortest run length
        min_len = min(len(df) for df in dfs)
        trimmed_dfs = [df.iloc[:min_len] for df in dfs]

        # Average across 10 runs
        avg_df = pd.concat(trimmed_dfs).groupby(level=0).mean()

        times = avg_df["time"]
        values = avg_df[metric]

        plt.plot(times, values, label=f"pop {pop}")

    plt.title(f"{metric.replace('_', ' ').title()} vs Time (by Population)")
    plt.xlabel("Time (s)")
    plt.ylabel(metric.replace('_', ' ').title())
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"{metric}_by_population.png")
    plt.show()
