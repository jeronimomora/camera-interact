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
  moveTreeOver,
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

const present = view.present({ index: 18 });

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

pinholeScene = addTree(pinholeScene, C.treeLeavesData, C.treeTrunkData);
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
  .face({ color: C.treeTrunkColor });

let imageIsCutOff = present
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

imageIsCutOff = addTree(imageIsCutOff);
imageIsCutOff = addVectors(
  imageIsCutOff,
  [coordsThroughPinhole(toSensorCoords(-10, 10), 1)],
  { color: C.treeLeavesColor },
  true,
);
imageIsCutOff = addVectors(
  imageIsCutOff,
  [coordsThroughPinhole(toSensorCoords(24, 10), 1.25)],
  { color: C.treeTrunkColor },
  true,
);

let sensorSizeIncrease = present
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
    rangeX: [-2, 2],
    rangeY: [-2, 2],
    divideX: 20,
    divideY: 20,
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

sensorSizeIncrease = addTree(sensorSizeIncrease);
sensorSizeIncrease = addVectors(
  sensorSizeIncrease,
  [coordsThroughPinhole(toSensorCoords(-10, 10), 1)],
  { color: C.treeLeavesColor },
  true,
);
sensorSizeIncrease = addVectors(
  sensorSizeIncrease,
  [coordsThroughPinhole(toSensorCoords(24, 10), 1.25)],
  { color: C.treeTrunkColor },
  false,
);

let sensorCloser = present
  .slide()
  .reveal()
  .transform({
    position: [C.sensor.xPos, 0, 0],
  })
  .step({
    script: [
      { position: [C.sensor.xPos, 0, 0] },
      { position: [C.sensor.xPos + 1, 0, 0] },
    ],
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

sensorCloser = addTree(sensorCloser);
sensorCloser = addVector(
  sensorCloser.slide({ early: 1 }).reveal(),
  ...coordsThroughPinhole(toSensorCoords(-10, 10), 1),
  { color: C.treeLeavesColor },
);
sensorCloser = addVector(
  sensorCloser,
  ...coordsThroughPinhole(toSensorCoords(24, 10), 1.25),
  { color: C.treeTrunkColor },
);

let sensorCloserImage = present
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
      toPixelCoords(0, 5),
      toPixelCoords(10, 5),
      toPixelCoords(10, 15),
      toPixelCoords(0, 15),
    ],
    items: 4,
    channels: 3,
  })
  .face({ color: C.treeLeavesColor })
  .voxel({
    data: [
      toPixelCoords(10, 8),
      toPixelCoords(10, 12),
      toPixelCoords(18, 12),
      toPixelCoords(18, 8),
    ],
    items: 4,
    channels: 3,
  })
  .face({ color: C.treeTrunkColor });

/**
 * End FOV slides
 *
 * Begin depth of field slides
 */

let focused = present
  .slide()
  .reveal()
  .transform({
    position: [-3, 0, 0],
  })
  .grid({
    axes: [2, 3],
    width: 3,
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
    data: [-0.1, -2, 0, -0.1, 2, 0, 0.1, 2, 0, 0.1, -2, 0],
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
    data: [1.5, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  });

focused = moveTreeOver(1, 0, 0, focused);
focused = addVector(focused.slide().reveal(), [3, 1, 0], [0, 1, 0], {
  color: C.treeLeavesColor,
}).end();
focused = addVector(focused.slide().reveal(), [0, 1, 0], [-3, -1, 0], {
  color: C.treeLeavesColor,
}).end();
focused = addVector(focused.slide().reveal(), [3, 1, 0], [-3, -1, 0], {
  color: C.treeLeavesColor,
}).end();
focused = addVector(focused.slide().reveal(), [3, 1, 0], [0, -1, 0], {
  color: C.treeLeavesColor,
}).end();
focused = addVector(focused.slide().reveal(), [0, -1, 0], [-3, -1, 0], {
  color: C.treeLeavesColor,
}).end();

let notFocused = present
  .slide()
  .reveal()
  .transform({
    position: [-3, 0, 0],
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
    data: [-0.1, -2, 0, -0.1, 2, 0, 0.1, 2, 0, 0.1, -2, 0],
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
    data: [1.5, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  });

notFocused = moveTreeOver(2, 0, 0, notFocused);
notFocused = addVector(notFocused.slide().reveal(), [4, 1, 0], [0, 1, 0], {
  color: C.treeLeavesColor,
}).end();
notFocused = addVector(notFocused.slide().reveal(), [0, 1, 0], [-3, -1, 0], {
  color: C.treeLeavesColor,
}).end();
notFocused = addVector(
  notFocused.slide().reveal(),
  [4, 1, 0],
  [-3, -0.75, 0],
  {
    color: C.treeLeavesColor,
  },
).end();
notFocused = addVector(notFocused.slide().reveal(), [4, 1, 0], [0, -0.6, 0], {
  color: C.treeLeavesColor,
}).end();
notFocused = addVector(
  notFocused.slide().reveal(),
  [0, -0.6, 0],
  [-3, -0.6, 0],
  {
    color: C.treeLeavesColor,
  },
).end();

let smallerAp = present
  .slide()
  .reveal()
  .transform({
    position: [-3, 0, 0],
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
    data: [-0.1, -0.75, 0, -0.1, 0.75, 0, 0.1, 0.75, 0, 0.1, -0.75, 0],
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
    data: [1.5, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  });

smallerAp = moveTreeOver(2, 0, 0, smallerAp);
smallerAp = addVector(smallerAp.slide().reveal(), [4, 1, 0], [0, 0.6, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp = addVector(smallerAp.slide().reveal(), [0, 0.6, 0], [-3, -0.6, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp = addVector(smallerAp.slide().reveal(), [4, 1, 0], [-3, -0.75, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp = addVector(smallerAp.slide().reveal(), [4, 1, 0], [0, -0.6, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp = addVector(
  smallerAp.slide().reveal(),
  [0, -0.6, 0],
  [-3, -0.6, 0],
  {
    color: C.treeLeavesColor,
  },
).end();

let smallerAp2 = present
  .slide()
  .reveal()
  .transform({
    position: [-3, 0, 0],
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
    data: [-0.1, -0.3, 0, -0.1, 0.3, 0, 0.1, 0.3, 0, 0.1, -0.3, 0],
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
    data: [1.5, 0, 0],
    items: 1,
    channels: 3,
  })
  .point({
    size: 8,
    color: 0x222222,
  });

smallerAp2 = moveTreeOver(2, 0, 0, smallerAp2);
smallerAp2 = addVector(smallerAp2.slide().reveal(), [4, 1, 0], [0, 0.3, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp2 = addVector(
  smallerAp2.slide().reveal(),
  [0, 0.3, 0],
  [-3, -0.67, 0],
  {
    color: C.treeLeavesColor,
  },
).end();
smallerAp2 = addVector(
  smallerAp2.slide().reveal(),
  [4, 1, 0],
  [-3, -0.70, 0],
  {
    color: C.treeLeavesColor,
  },
).end();
smallerAp2 = addVector(smallerAp2.slide().reveal(), [4, 1, 0], [0, -0.3, 0], {
  color: C.treeLeavesColor,
}).end();
smallerAp2 = addVector(
  smallerAp2.slide().reveal(),
  [0, -0.3, 0],
  [-3, -0.65, 0],
  {
    color: C.treeLeavesColor,
  },
).end();
