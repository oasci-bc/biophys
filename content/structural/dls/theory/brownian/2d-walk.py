import os

import imageio
import matplotlib.pyplot as plt
import numpy as np

os.chdir(os.path.dirname(__file__))

# Parameters
num_steps = 1000
step_size = 1
gif_filename = "brownian_motion_tracking.gif"

# Create output directory
output_dir = "frames"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)


def random_walk_2d(num_steps, step_size):
    """Simulate a 2D random walk."""
    x, y = [0], [0]
    for _ in range(num_steps):
        angle = np.random.uniform(0, 2 * np.pi)
        x.append(x[-1] + step_size * np.cos(angle))
        y.append(y[-1] + step_size * np.sin(angle))
    return x, y


def save_frames(x, y, output_dir):
    """Save frames of the random walk with tracking line and mean squared displacement."""
    for i in range(1, len(x)):
        plt.figure(figsize=(6, 6))
        # Plot the path of the random walk
        plt.plot(x[: i + 1], y[: i + 1], "b-", alpha=0.7)
        plt.plot(
            x[i], y[i], "ro", markersize=12
        )  # Current position as a large red sphere
        plt.xlim(-50, 50)
        plt.ylim(-50, 50)
        plt.xlabel("X")
        plt.ylabel("Y")
        plt.grid()

        frame_filename = os.path.join(output_dir, f"frame_{i:04d}.png")
        plt.savefig(frame_filename)
        plt.close()


def create_gif(output_dir, gif_filename):
    """Create a GIF from the saved frames."""
    frames = []
    frame_files = sorted(
        [
            os.path.join(output_dir, f)
            for f in os.listdir(output_dir)
            if f.endswith(".png")
        ]
    )
    for frame_file in frame_files:
        frames.append(imageio.imread(frame_file))
    imageio.mimsave(gif_filename, frames, fps=30)


def cleanup(output_dir):
    """Remove the temporary frame files."""
    frame_files = [
        os.path.join(output_dir, f)
        for f in os.listdir(output_dir)
        if f.endswith(".png")
    ]
    for frame_file in frame_files:
        os.remove(frame_file)
    os.rmdir(output_dir)


# Main script
x, y = random_walk_2d(num_steps, step_size)
save_frames(x, y, output_dir)
create_gif(output_dir, gif_filename)
cleanup(output_dir)

print(f"GIF saved as {gif_filename}")
