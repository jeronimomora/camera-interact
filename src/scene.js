/**
 * This file exports the scene contents for rendering.
 */
import * as THREE from 'three';

/********************************************
 * Initialize scene
 ********************************************/
const scene = new THREE.Scene();

/********************************************
 * Static scene elements
 ********************************************/
// Box that represents scene camera
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshLambertMaterial({ color: 0xff0000 }),
);
box.position.set(0, 1, -1);
scene.add(box);

// Grass
const planeW = 200;
const planeH = 200;
const planeZ = planeH / 2 + 1;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(planeW, planeH),
  new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  }),
);
plane.lookAt(new THREE.Vector3(0, 1, 0));
plane.position.set(0, 0, planeZ);
scene.add(plane);

//Blue sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 8),
  new THREE.MeshLambertMaterial({ color: 0x0000ff }),
);
sphere.position.set(0, 1, planeZ / 4);
scene.add(sphere);

//Mountains
let radius = 10;
let height = 20;
const rSegments = 100;
const conemat = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
const cylinderCone1 = new THREE.Mesh(
  (() => {
    const geom = new THREE.CylinderBufferGeometry(
      0,
      radius,
      height,
      rSegments,
      1,
      true,
    );
    geom.translate(0, height / 2, 0);
    return geom;
  })(),
  conemat,
);
cylinderCone1.position.set(-15, 0, 49);
scene.add(cylinderCone1);
radius = 30;
height = 50;
const cylinderCone2 = new THREE.Mesh(
  (() => {
    const geom = new THREE.CylinderBufferGeometry(
      0,
      radius,
      height,
      rSegments,
      1,
      true,
    );
    geom.translate(0, height / 2, 0);
    return geom;
  })(),
  conemat,
);
cylinderCone2.position.set(20, 0, 80);
scene.add(cylinderCone2);
radius = 60;
height = 75;
const cylinderCone3 = new THREE.Mesh(
  (() => {
    const geom = new THREE.CylinderBufferGeometry(
      0,
      radius,
      height,
      rSegments,
      1,
      true,
    );
    geom.translate(0, height / 2, 0);
    return geom;
  })(),
  conemat,
);
cylinderCone3.position.set(-40, 0, 120);
scene.add(cylinderCone3);

/********************************************
 * Lights
 ********************************************/
//Hemisphere light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.7); //1.7
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

//Pointlight and geometry
const sphereLight = new THREE.SphereGeometry(0.5, 16, 8);
const light = new THREE.PointLight(0xffffff, 2, 150, 2); //color, I, dist, decay
light.add(
  new THREE.Mesh(
    sphereLight,
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  ),
);
light.position.set(0, 100, planeZ - planeZ / 2);
light.intensity = 5;
scene.add(light);

/********************************************
 * Dynamic elements
 ********************************************/
// TODO(sam): DRY up positions
const left_line_geom = new THREE.CylinderGeometry(0.5, 0.5, 200);
const right_line_geom = new THREE.CylinderGeometry(0.5, 0.5, 200);

const line_mat = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const left_line = new THREE.Mesh(
  left_line_geom,
  line_mat,
);

const right_line = new THREE.Mesh(
  right_line_geom,
  line_mat,
);

// TODO(sam): Work out the math for these to be the correct position and angle
left_line.rotation.z = Math.PI / 2;
left_line.rotation.y = Math.PI / 4;

right_line.rotation.z = Math.PI / 2;
right_line.rotation.y = -Math.PI / 4;

scene.add(left_line);
scene.add(right_line);

export default scene;
