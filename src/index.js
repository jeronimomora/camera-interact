import * as THREE from 'three';
import OrbitControlsInit from 'three-orbit-controls';

import 'mathbox';

import C from './constants';
import {
  addVector,
  addVectors,
  addTree,
  addImage,
  toSensorCoords,
  toPixelCoords,
  coordsThroughPinhole,
} from './slide_utils';

const mathbox = window.mathBox({
  plugins: ['core', 'cursor', 'controls'],
  controls: { klass: OrbitControlsInit(THREE) },
  element: document.querySelector('#cameras'),
});

const three = mathbox.three;
three.renderer.setClearColor(0xffffff, 1.0);

// Set mathbox units and place camera
mathbox.set({ scale: 720, focus: 3 });

if (window == top) {
  window.onkeydown = e => {
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
  };
}

// Create cartesian view
var view = mathbox.cartesian({
  range: [[-1, 1], [-1, 1], [-1, 1]],
  scale: [1, 1, 1],
});

const present = view.present({ index: 12 });

const camera = view.camera({
  proxy: true,
  position: [0, 0, 3],
  lookAt: [0, 0, 0],
});

/*
 * Sensor intro
 */
let sensor = present
  .slide()
  .reveal()
  .voxel({
    data: [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0],
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
      [{ color: 0x0000ff }],
      [{ color: 0xff00ff }],
    ],
  })
  .end();

sensor = addVector(
  sensor.slide().reveal(),
  [-0.7, -0.7, 0.7],
  [-0.3, -0.1, 0],
  {
    color: 0x0000ff,
  },
).end();
sensor = addVector(sensor.slide().reveal(), [0.6, -0.7, 0.7], [0.3, 0.1, 0], {
  color: 0xff0000,
}).end();

// TODO: Draw simple picture on grid
present.slide().reveal().grid({
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
    position: [C.sensor.xPos, 0, 0],
  })
  .grid({
    axes: [2, 3],
    width: 2,
    color: 0xcccccc,
    depth: 0.5,
  })
  .end();

addTree(blurred);

let blurredImage = present.slide().reveal().grid({
  axes: [1, 2],
  width: 2,
  color: 0xcccccc,
  depth: 0.5,
});

/**
 * Pinhole camera and vectors
 */
let pinholeScene = present
  .slide()
  .reveal()
  .transform({
    position: [C.sensor.xPos, 0, 0],
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
  .voxel({
    data: [
      toPixelCoords(0, 0),
      toPixelCoords(10, 0),
      toPixelCoords(10, 20),
      toPixelCoords(0, 20),
    ],
    items: 4,
    channels: 3,
  })
  .face({ color: C.treeLeavesColor })
  .voxel({
    data: [
      toPixelCoords(10, 5),
      toPixelCoords(10, 15),
      toPixelCoords(20, 15),
      toPixelCoords(20, 5),
    ],
    items: 4,
    channels: 3,
  })
  .face({ color: C.treeTrunkColor })

// TODO: Insert explanation for changing either distance to pinhole or
// TODO: sensor size for FOV
let sensorSizeIncreasing = present
  .slide()
  .reveal()
  .transform({
    position: [C.sensor.xPos, 0, 0],
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

sensorSizeIncreasing = addTree(sensorSizeIncreasing);

let FOV = present
  .slide()
  .reveal()
  .transform({
    position: [-2, 0, 0],
  })
  .grid({
    axes: [2, 3],
    width: 2,
    color: 0x000000,
    depth: 0.5,
  })
  .end()
  .voxel({
    data: [-1.5, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  })
  .voxel({
    data: [-0.6, -2, 0, -0.6, 2, 0, -0.4, 2, 0, -0.4, -2, 0],
    items: 4,
    channels: 3,
  })
  .face({
    color: 0xcccccc,
    width: 3,
    shaded: true,
    line: true,
  })
  .voxel({
    data: [0.35, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  });

FOV = addTree(FOV);
FOV = addVector(FOV.slide().reveal(), [2, 1, 0], [-0.5, 1, 0], {
  color: C.treeLeavesColor,
}).end();
FOV = addVector(FOV.slide().reveal(), [-0.5, 1, 0], [-2, -0.5, 0], {
  color: C.treeLeavesColor,
}).end();
FOV = addVector(FOV.slide().reveal(), [2, 1, 0], [-2, -0.5, 0], {
  color: C.treeLeavesColor,
}).end();
FOV = addVector(FOV.slide().reveal(), [2, 1, 0], [-0.5, -0.5, 0], {
  color: C.treeLeavesColor,
}).end();
FOV = addVector(FOV.slide().reveal(), [-0.5, -0.5, 0], [-2, -0.5, 0], {
  color: C.treeLeavesColor,
}).end();
