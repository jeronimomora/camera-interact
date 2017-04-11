var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var fakeCamera = new THREE.Mesh( geometry, material );
scene.add( fakeCamera );

fakeCamera.position.set(0,0,-1);

camera.position.set(-70,40,30);
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,20));

var geometry = new THREE.PlaneGeometry(50,50);
var pmaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
var plane = new THREE.Mesh( geometry, pmaterial );
plane.lookAt(new THREE.Vector3(0, 1, 0));
plane.position.set(0,0,26);
scene.add( plane );


var plane = new THREE.Plane
var render = function () {
  requestAnimationFrame( render );

  fakeCamera.rotation.x += 0.1;
  fakeCamera.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();
