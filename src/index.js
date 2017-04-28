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
        console.log('Slide: ', present.get('index'));
        break;
      case 39:
      case 40:
        present.set('index', present.get('index') + 1);
        console.log('Slide: ', present.get('index'));
        break;
    }
  }
}

// Create cartesian view
var view = mathbox.cartesian({
  range: [[-1, 1], [-1, 1], [-1, 1]],
  scale: [1, 1, 1],
})

const present = view.present({ index: 7 });

const camera = view.camera({
  proxy: true,
  position: [0, 0, 3],
  lookAt: [0, 0, 0],
});

/**
 * Draws a vector on the slide. Assumes that you're calling this in a slide
 * context, for example:
 *
 * let slide = present.slide().reveal();
 * slide = addVector(slide, [0, 0, 0], [1, 1, 1]);
 * slide = slide.end(); // Puts next vector on separate slide
 * slide = addVector(slide, [-1, -1, -1], [1, 1, 1]);
 *
 * @param {slide} slide - The mathbox presentation
 * @param {Array[3]} from - Coordinate of vector start
 * @param {Array[3]} to - Coordinate of vector end
 * @param {object} vecOpts - Arguments to pass into vector()
 */
const DEFAULT_VEC_OPTS = {
  width: 6,
  end: true,
};
function addVector(slide, from, to, vecOpts = {}) {
  return slide
    .voxel({
      data: [
        ...from,
        ...to,
      ],
      items: 2,
      channels: 3,
    })
    .vector(Object.assign({}, DEFAULT_VEC_OPTS, vecOpts));
}

/**
 * Draws multiple vectors on the slide.
 *
 * @param {slide} slide - The mathbox presentation
 * @param {Array[n][2][3]} coords - Array containing from, to pairs
 * @param {object} vecOpts - Arguments to pass into vector()
 * @param {bool} sequential - If true, the vectors will each be added one by
 *     one
 */
function addVectors(slide, coords, vecOpts = {}, sequential = true) {
  return coords.reduce((sl, [from, to]) => {
      if (sequential)
        sl = sl.slide().reveal();
      return addVector(sl, from, to, vecOpts);
    },
    slide,
  );
}

/**
 * Adds a simple box tree to a slide.
 *
 * @param {slide} slide - The mathbox presentation
 */
function addTree(slide) {
  return slide
    .voxel(C.treeLeavesData)
    .face({ color: C.treeLeavesColor })
    .voxel(C.treeTrunkData)
    .face({ color: C.treeTrunkColor });
}


/**
 * Returns the 3D world coordinates of a pixel on the sensor.
 *
 * @param {int} i - Height position on the sensor
 * @param {int} j - Width position on the sensor
 */
function toSensorCoords(i, j) {
  return [-2, (i - 10) * 0.1 + 0.05, (10 - j) * 0.1 + 0.05];
}

/**
 * Returns a pair of 3D coordinates used to draw a vector onto the sensor
 * through the pinhole.
 *
 * @param {Array[3]} sensorCoord - World coordinates of the sensor pixel
 * @param {float} fromXPos - Starting x position of the light ray.
 */
function coordsThroughPinhole(sensorCoord, fromXPos) {
  const [x, y, z] = sensorCoord;
  const multiple = (fromXPos - x) / x;
  return [
    [x + multiple * x, y + multiple * y, z + multiple * z],
    sensorCoord,
  ];
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
  sensor.slide().reveal(),
  [-0.7, -0.7, 0.7],
  [-0.3, -0.1, 0],
  { color: 0x0000FF },
).end();
sensor = addVector(
  sensor.slide().reveal(),
  [0.6, -0.7, 0.7],
  [0.3, 0.1, 0],
  { color: 0xFF0000 },
).end();

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
let blurred = present
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

addTree(blurred);

let blurredImage = present
  .slide()
    .reveal()
      .grid({
        axes: [1, 2],
        width: 2,
        color: 0xcccccc,
        depth: 0.5,
      })

/**
 * Pinhole camera and vectors
 */
let pinholeScene = present
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
        size: 8,
        color: 0x222222,
      });

pinholeScene = addTree(pinholeScene);
pinholeScene = addVectors(
  pinholeScene,
  [
    coordsThroughPinhole(toSensorCoords(5, 3), 1),
    coordsThroughPinhole(toSensorCoords(8, 5), 1),
  ],
  { color: C.treeLeavesColor },
  true,
);
pinholeScene = addVectors(
  pinholeScene,
  [
    coordsThroughPinhole(toSensorCoords(18, 12), 1.25),
    coordsThroughPinhole(toSensorCoords(15, 9), 1.25),
  ],
  { color: C.treeTrunkColor },
  true,
);

// TODO(sam): Add tree image to this grid
let treeImage = present
  .slide()
    .reveal()
      .grid({
        axes: [1, 2],
        width: 2,
        color: 0xcccccc,
        depth: 0.5,
      })

// TODO: Insert explanation for changing either distance to pinhole or
// sensor size for FOV

