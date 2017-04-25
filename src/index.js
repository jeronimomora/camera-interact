import * as THREE from 'three';
import OrbitControlsInit from 'three-orbit-controls';

import 'mathbox';

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
  range: [[-2, 2], [-1, 1], [-1, 1]],
  scale: [2, 1, 1],
})

const present = view.present({ index: 1 });

const camera = view.camera({
  proxy: true,
  position: [0, 0, 3],
  lookAt: [0, 0, 0],
});

present
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
    .end()
    .slide()
      .reveal()
        .voxel({
          data: [
            -0.7, -0.7, 0.7,
            -0.3, -0.1, 0,
          ],
          items: 2,
          channels: 3,
        })
        .vector({
          color: 0x0000FF,
          end: true,
          width: 6,
        })
      .end()
      .slide()
        .reveal()
          .voxel({
            data: [
              0.6, -0.7, 0.7,
              0.3, 0.1, 0,
            ],
            items: 2,
            channels: 3,
          })
          .vector({
            color: 0xFF0000,
            end: true,
            width: 6,
          });

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

// TODO: Draw blurred image on grid
present
  .slide()
    .reveal()
      .transform({
        position: [-1, 0, 0],
      })
      .step({
        script: [
          [{ position: [-1, 0, 0] }],
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
    .end()
    .slide()
      .reveal()

// Adds a vector from the image through the origin and onto the sensor
function addPinholeVec(slide, from = [0, 0, 1], color = 0xcccccc) {
  debugger;
}

present
  .slide()
    .reveal()
      .transform({
        position: [-1, 0, 0],
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

// TODO: Insert animation for rendering an image

// TODO: Insert explanation for changing either distance to pinhole or
// sensor size for FOV
