import numpy as np
import json

file_data_path = "bunny.xyz"
point_cloud = np.loadtxt(file_data_path, skiprows=0, max_rows=1000000)

# center it
# point_cloud -= np.mean(point_cloud, axis=0)
# point_cloud[:, 0:2] *= 100
point_cloud[:, 0:2] *= 15
point_cloud -= np.mean(point_cloud, axis=0)
# homogenize
point_cloud = np.concatenate((point_cloud, np.ones((point_cloud.shape[0], 1))), axis=1)

# move it in front of the camera
point_cloud += np.array([0, 0, -0.15, 0])

# Export to JSON
with open("bunny.json", "w") as outfile:
    json.dump(point_cloud.tolist(), outfile)