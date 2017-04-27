import * as THREE from 'three';
import OrbitControlsInit from 'three-orbit-controls';

import 'mathbox';

import C from './constants';

const mathbox = window.mathBox({
  plugins: ['core', 'cursor', 'controls'],
  controls: { klass: OrbitControlsInit(THREE) },
  element: document.querySelector('#cameras'),
});

const three = mathbox.three;
three.renderer.setClearColor(0xFFFFFF, 1.0);

// Set mathbox units and place camera
mathbox.set({ scale: 720, focus: 3 });

if (window == top) {
  window.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
      case 38:
        present.set('index', present.get('index') - 1);
        break;
      case 39:
      case 40:
        present.set('index', present.get('index') + 1);
        break;
    }
  }
}

// Create cartesian view
var view = mathbox.cartesian({
  range: [[-1, 1], [-1, 1], [-1, 1]],
  scale: [1, 1, 1],
})

const present = view.present({ index: 5 });

const camera = view.camera({
  proxy: true,
  position: [0, 0, 3],
  lookAt: [0, 0, 0],
});

/**
 * Draws a vector on the presentation.
 *
 * Note that the .end() call only closes the reveal(), not the slide(). This
 * allows you to draw multiple vectors in the same scene by repeatedly calling
 * this function.
 *
 * @param {present} present - The mathbox presentation
 * @param {from} Array[3] - Coordinate of vector start
 * @param {to} Array[3] - Coordinate of vector end
 * @param {object} vecOpts - Arguments to pass into vector()
 */
const DEFAULT_VEC_OPTS = {
  width: 6,
  end: true,
};
function addVector(present, from, to, vecOpts = {}) {
  return present.slide()
    .reveal()
      .voxel({
        data: [
          ...from,
          ...to,
        ],
        items: 2,
        channels: 3,
      })
      .vector(Object.assign({}, DEFAULT_VEC_OPTS, vecOpts))
    .end();
}

/**
 * Adds a simple box tree to a new slide.
 *
 * @param {present} present - The mathbox presentation
 */
function addTree(present) {
  debugger;
}

/**
 * Sensor intro
 */
let sensor = present
  .slide()
    .reveal()
      .voxel({
        data: [
          -0.5, -0.5, 0,
          0.5, -0.5, 0,
          0.5, 0.5, 0,
          -0.5, 0.5, 0,
        ],
        items: 4,
        channels: 3,
      })
      .face({
        color: 0x000,
        width: 3,
        shaded: true,
        line: true,
      })
      .step({
        script: [
          [{ color: 0xcccccc }],
          [{ color: 0x0000FF }],
          [{ color: 0xFF00FF }],
        ],
      })
    .end();

sensor = addVector(
  sensor,
  [-0.7, -0.7, 0.7],
  [-0.3, -0.1, 0],
  { color: 0x0000FF },
);
sensor = addVector(
  sensor,
  [0.6, -0.7, 0.7],
  [0.3, 0.1, 0],
  { color: 0xFF0000 },
);

// TODO: Draw simple picture on grid
present
  .slide()
    .reveal()
      .grid({
        axes: [1, 2],
        width: 2,
        color: 0xcccccc,
        depth: 0.5,
      });

/**
 * Blurred sensor image
 */
// TODO: Draw blurred image on grid
present
  .slide()
    .reveal()
      .transform({
        position: [-2, 0, 0],
      })
      .step({
        script: [
          [{ position: [-2, 0, 0] }],
          [{
            position: [0, 0, 0],
            rotation: [0, -π / 2, 0],
          }],
        ],
      })
      .grid({
        axes: [2, 3],
        width: 2,
        color: 0xcccccc,
        depth: 0.5,
      })
      .end()
      .voxel(C.treeLeavesData)
      .face({ color: C.treeLeavesColor })
      .voxel(C.treeTrunkData)
      .face({ color: C.treeTrunkColor })
    .end()
    .slide()
      .reveal()

/**
 * Pinhole camera and vectors
 */
present
  .slide()
    .reveal()
      .transform({
        position: [-2, 0, 0],
      })
      .grid({
        axes: [2, 3],
        width: 2,
        color: 0xcccccc,
        depth: 0.5,
      })
      .end()
      .voxel({
        data: [0, 0, 0],
        items: 1,
        channels: 3,
      })
      .point({
        size: 4,
        color: 0x222222,
      })
    .end()
    .slide()
      .reveal()
        .transform({
          position: [2, 0, 0],
        })
        .grid({
          axes: [2, 3],
          width: 2,
          color: 0xcccccc,
          depth: 0.5,
        })

// TODO: Insert animation for rendering an image

// TODO: Insert explanation for changing either distance to pinhole or
// sensor size for FOV

