import * as THREE from 'three';
import OrbitControlsInit from 'three-orbit-controls';

import 'mathbox';

console.log('Hello world!');

const mathbox = window.mathBox({
  plugins: ['core', 'cursor', 'controls'],
  controls: { klass: OrbitControlsInit(THREE) },
  element: document.querySelector('#cameras'),
});
mathbox.camera({ proxy: true, position: [0, 0, 3] });

const three = mathbox.three;
three.renderer.setClearColor(0xFFFFFF, 1.0);

// Set mathbox units and place camera
mathbox.set({ scale: 720, focus: 3 });
mathbox.camera({ proxy: true, position: [0, 0, 3] });

// Create cartesian view
const view = mathbox.cartesian({
  range: [[-10, 10], [-5, 5], [-1, 1]],
  scale: [6/4, 3/4, 3/4],
});

// 2D axes / grid
view.axis({ axis: 1, width: 3 });
view.axis({ axis: 2, width: 3 });
view.grid({ width: 1.5, divideX: 20, divideY: 10 });

// Sine Wave Curve
view
  .interval({
    width: 32,
    channels: 2,
    expr: function (emit, x, i, t) {
      emit(x, 0.5 * Math.sin(x + t));
    },
  })
  .line({
    width: 5,
    color: '#3090FF',
  })
  .point({
    size: 10,
    color: '#3090FF',
  });
