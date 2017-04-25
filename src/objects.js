/**
 * This file exports the scene contents for rendering.
 */
import * as THREE from 'three';
import CONSTANTS from './constants';

export default function generateObjects(key) {
  /********************************************
   * Static scene elements
   ********************************************/
  // Box that represents scene camera
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0xff0000 }),
  );
  box.position.set(...CONSTANTS.render_camera_pos);

  // Grass
  const planeZ = CONSTANTS.plane_size / 2;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(CONSTANTS.plane_size, CONSTANTS.plane_size),
    new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
    }),
  );
  plane.lookAt(CONSTANTS.up);
  plane.position.set(0, 0, planeZ);

  //Blue sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 8),
    new THREE.MeshLambertMaterial({ color: 0x0000ff }),
  );
  sphere.position.set(0, 1.5, planeZ / 4);

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

  /********************************************
   * Main Lights
   ********************************************/
  //Hemisphere light
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.7); //1.7
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);

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

  /********************************************
   * Dynamic elements
   ********************************************/
  // TODO(sam): DRY up positions
    var length = CONSTANTS.fov_line_length/100;
    var l_from = new THREE.Vector3(...CONSTANTS.render_camera_pos);
    var l_to = new THREE.Vector3( -60.87*length, 2, 79.33*length);
    var l_direction = l_to.clone().sub(l_from);
    var l_length = l_direction.length();
    var l_arrowHelper = new THREE.ArrowHelper(l_direction.normalize(), l_from, l_length, 0xffffff );

    var r_from = new THREE.Vector3(...CONSTANTS.render_camera_pos);
    var r_to = new THREE.Vector3( 60.87*length, 2, 79.33*length );
    var r_direction = r_to.clone().sub(r_from);
    var r_length = r_direction.length();
    var r_arrowHelper = new THREE.ArrowHelper(r_direction.normalize(), r_from, r_length, 0xffffff );

    if(key == 'static'){
        return {
            box,
            plane,
            sphere,
            light,
            hemiLight,
            cylinderCone1,
            cylinderCone2,
            cylinderCone3,
        };
    }
    else if(key == 'main') {
        return {
            box,
            plane,
            sphere,
            light,
            hemiLight,
            cylinderCone1,
            cylinderCone2,
            cylinderCone3,
            l_arrowHelper,
            r_arrowHelper,
        };
    }
}
