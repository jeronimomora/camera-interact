/**
 * This file exports the scene contents for rendering.
 */
import * as THREE from 'three';
import CONSTANTS from './constants';

/********************************************
 * Initialize scene
 ********************************************/
const mainScene = new THREE.Scene();
const staticScene = new THREE.Scene();

function generateObjects() {
    /********************************************
     * Static scene elements
     ********************************************/
// Box that represents scene camera
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({color: 0xff0000}),
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
        new THREE.MeshLambertMaterial({color: 0x0000ff}),
    );
    sphere.position.set(0, 1, planeZ / 4);

//Mountains
    let radius = 10;
    let height = 20;
    const rSegments = 100;
    const conemat = new THREE.MeshLambertMaterial({color: 0x8b4513});
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
            new THREE.MeshBasicMaterial({color: 0xffff00}),
        ),
    );
    light.position.set(0, 100, planeZ - planeZ / 2);
    light.intensity = 5;

    /********************************************
     * Dynamic elements
     ********************************************/
// TODO(sam): DRY up positions
    const left_line_geom = new THREE.CylinderGeometry(0.5, 0.5, 200);
    const right_line_geom = new THREE.CylinderGeometry(0.5, 0.5, 200);

    const line_mat = new THREE.MeshBasicMaterial({color: 0xcccccc});
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

    return [box, plane, sphere, light, hemiLight,
        cylinderCone1, cylinderCone2, cylinderCone3, left_line, right_line]
}

generateObjects().map(obj => mainScene.add(obj));
generateObjects().map(obj => staticScene.add(obj));

export {mainScene, staticScene};
