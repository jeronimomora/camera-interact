import * as THREE from 'three';
import dat from '../lib/dat.gui.min';
import CONSTANTS from './constants';

import OrbitControlsInit from 'three-orbit-controls';
const OrbitControls = OrbitControlsInit(THREE);

import generateObjects from './objects';

/********************************************
 * Main and static renderers
 ********************************************/
const mainRenderer = new THREE.WebGLRenderer();
mainRenderer.setSize(window.innerWidth, window.innerHeight / 2);

const staticRenderer = new THREE.WebGLRenderer();
staticRenderer.setSize(CONSTANTS.staticDimension, CONSTANTS.staticDimension);

document.body.appendChild(mainRenderer.domElement);
document.body.appendChild(staticRenderer.domElement);

/********************************************
 * Initialize scene
 ********************************************/
const mainScene = new THREE.Scene();
const staticScene = new THREE.Scene();

const mainSceneObjs = generateObjects('main');
Object.values(mainSceneObjs).map(obj => mainScene.add(obj));
var staticSceneObjs = generateObjects('static');
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
  1,
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
    this.shutterSpeed = 17;
    this.fStop = 10;
  }
}

const controls = new Controls();
const gui = new dat.GUI();
gui.add(controls, 'fov', 5, 200);
gui.add(controls, 'shutterSpeed', 1, 500);
gui.add(controls, 'fStop', 1, 22);

function setFov(fov) {
  controls.fov = fov;
  gui.__controllers[0].updateDisplay();
  renderingCamera.fov = fov;
  renderingCamera.updateProjectionMatrix();
}

function setIntensity(shutterSpeed, fStop) {
    staticSceneObjs.light.intensity = ((shutterSpeed/17) + (10/fStop))*(5/2);
    staticSceneObjs.hemiLight.intensity = ((shutterSpeed/17) + (10/fStop))*(1.7/2);
    renderingCamera.updateProjectionMatrix();
}

function updateLines(fov) {
  var fov_rad = fov*3.1415926/360;
  var r_direction = new THREE.Vector3((CONSTANTS.fov_line_length*Math.sin(fov_rad)),2-1,(CONSTANTS.fov_line_length*Math.cos(fov_rad)+1));
  mainSceneObjs.r_arrowHelper.setDirection(r_direction.normalize());
  var l_direction = new THREE.Vector3(-(CONSTANTS.fov_line_length*Math.sin(fov_rad)),-(2-1),(CONSTANTS.fov_line_length*Math.cos(fov_rad)+1));
  mainSceneObjs.l_arrowHelper.setDirection(l_direction.normalize());
}
/********************************************
 * Rendering
 ********************************************/
const render = () => {
  requestAnimationFrame(render, { antialias: true });

    setFov(controls.fov);
    setIntensity(controls.shutterSpeed, controls.fStop);
    updateLines(controls.fov);

  mainRenderer.render(mainScene, sceneCamera);
  staticRenderer.render(staticScene, renderingCamera);
};

render();
