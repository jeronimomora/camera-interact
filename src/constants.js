import { Vector3 } from 'three';

export default {
  origin: [0, 0, 0],

  // This direction points along the y-axis, which we define as upward
  up: new Vector3(0, 1, 0),

  // This refers to the camera overlooking the whole scene
  scene_camera_pos: [-70, 40, 30],

  // This refers to the simulated camera
  render_camera_pos: [0, 1, -1],

  // Size of the plane that objects sit on top of
  plane_size: 300,

  // Length of the FOV lines
  fov_line_length: 2000,

  //Static viewing dimension
  staticDimension: 500,

};
