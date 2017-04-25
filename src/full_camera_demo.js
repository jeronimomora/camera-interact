import * as THREE from 'three';
import dat from '../lib/dat.gui.min';

import OrbitControlsInit from 'three-orbit-controls';
const OrbitControls = OrbitControlsInit(THREE);

import generateObjects from './objects';

/********************************************
 * Main and static renderers
 ********************************************/
const mainRenderer = new THREE.WebGLRenderer();
mainRenderer.setSize(window.innerWidth, window.innerHeight / 2);

const staticRenderer = new THREE.WebGLRenderer();
staticRenderer.setSize(window.innerWidth, window.innerHeight / 2);

document.body.appendChild(mainRenderer.domElement);
document.body.appendChild(staticRenderer.domElement);

/********************************************
 * Initialize scene
 ********************************************/
const mainScene = new THREE.Scene();
const staticScene = new THREE.Scene();

const mainSceneObjs = generateObjects();
Object.values(mainSceneObjs).map(obj => mainScene.add(obj));
const staticSceneObjs = generateObjects();
Object.values(staticSceneObjs).map(obj => staticScene.add(obj));

/********************************************
 * Camera set up
 ********************************************/
const sceneCamera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / (window.innerHeight / 2),
  0.1,
  1000,
);
sceneCamera.position.set(-70, 40, 30);
sceneCamera.up = new THREE.Vector3(0, 1, 0);
sceneCamera.lookAt(new THREE.Vector3(0, 0, 200));
const orbitControls = new OrbitControls(sceneCamera, mainRenderer.domElement);

// Camera for static rendering
const renderingCamera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / (window.innerHeight / 2),
  0.1,
  1000,
);
renderingCamera.position.set(0, 1, -1);
renderingCamera.up = new THREE.Vector3(0, 1, 0);
renderingCamera.lookAt(new THREE.Vector3(0, 1, 1));

/********************************************
 * Camera controls
 ********************************************/
class Controls {
  constructor() {
    this.fov = 75;
    this.shutterSpeed = 200;
    this.fStop = 8;
  }
}

const controls = new Controls();
const gui = new dat.GUI();
gui.add(controls, 'fov', 5, 200);
gui.add(controls, 'shutterSpeed', 1, 5000);
gui.add(controls, 'fStop', 1, 22);

function setFov(fov) {
  controls.fov = fov;
  gui.__controllers[0].updateDisplay();
  renderingCamera.fov = fov;
  renderingCamera.updateProjectionMatrix();
}

/********************************************
 * Rendering
 ********************************************/
const render = () => {
  requestAnimationFrame(render, { antialias: true });

  setFov(controls.fov);

  mainRenderer.render(mainScene, sceneCamera);
  staticRenderer.render(staticScene, renderingCamera);
};

render();
