var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
var fakeCamera = new THREE.Mesh( geometry, material );
scene.add( fakeCamera );
fakeCamera.position.set(0,0,-1);

var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(-70,40,30);
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,20));
controls = new THREE.OrbitControls(camera, renderer.domElement);

var planeW = 50;
var planeH = 50;
var geometry = new THREE.PlaneGeometry(planeW,planeH);
var pmaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});
var plane = new THREE.Mesh( geometry, pmaterial );
plane.lookAt(new THREE.Vector3(0, 1, 0));
var planeZ = (planeH)/2 + 1;
plane.position.set(0,0,planeZ);
scene.add( plane );


hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

var sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
var light = new THREE.PointLight( 0xffffff, 2, 50 );
light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffff00 } ) ) );
light.position.set(0,17,planeZ);
light.intensity = 5;
scene.add(light);

var render = function () {
  requestAnimationFrame( render, {antialias: true});

  fakeCamera.rotation.x += 0.1;
  fakeCamera.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();
