
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Icosahedron

const geometry = new THREE.IcosahedronGeometry(15, 1, 16, 100);
const geometry2 = new THREE.IcosahedronGeometry(5, 5, 64, 8);
const material = new THREE.MeshStandardMaterial({ color: 'white', wireframe: true });
const material2 = new THREE.MeshStandardMaterial({ color: 'orange', wireframe: true });
const material3 = new THREE.MeshStandardMaterial({ color: 'black', wireframe: true });

const Icosahedron = new THREE.Mesh(geometry, material);
scene.add(Icosahedron);




// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)


// controls and stars
const controls = new OrbitControls(camera, renderer.domElement);
const starTexture = new THREE.TextureLoader().load('./Assets/textures/star.texture.jpg')
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: starTexture });
  const star = new THREE.Mesh(geometry, material);
  const test = new THREE.BufferGeometryLoader
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(250));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(addStar);




// Background

const spaceTexture = new THREE.TextureLoader().load('./Assets/textures/starz.jpg');
scene.background = spaceTexture;


// textures & positioning

const oilTexture = new THREE.TextureLoader().load('./Assets/textures/texture1.jpg');
const normalTexture = new THREE.TextureLoader().load('./Assets/textures/normal.jpg');
const normalTexture4 = new THREE.TextureLoader().load('./Assets/textures/normal4.jpg');
const fivek = new THREE.TextureLoader().load('./Assets/textures/5k.jpeg')
const lava = new THREE.TextureLoader().load('./Assets/textures/lava.jpg')
const paint = new THREE.TextureLoader().load('./Assets/textures/paint.jpg')

  
// planets
const texture = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: oilTexture,
    normalMap: normalTexture,
  })
);
texture.position.z = 30;
texture.position.setX(-10);

const  solarsystem = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: fivek,
    normalMap: normalTexture4
  })
)
solarsystem.position.z = 20;
solarsystem.position.x = 25;
const  solarsystem2 = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: lava,
  })
)
solarsystem2.position.z = -25;
solarsystem2.position.x = -50;


const  solarsystem3 = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: paint,
    normalMap: normalTexture4
  })
)
solarsystem3.position.z = -50;
solarsystem3.position.x = -90;
const  solarsystem4 = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: paint,
    normalMap: normalTexture4
  })
)
solarsystem4.position.z = 50;
solarsystem4.position.x = -20;

scene.add(texture, solarsystem, solarsystem2, solarsystem3, solarsystem4);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  texture.rotation.x += 0.005;
  texture.rotation.y += 0.075;
  texture.rotation.z += 0.05;
  solarsystem.rotation.x += 0.005;
  solarsystem.rotation.y += 0.075;
  solarsystem.rotation.z += 0.05;
  solarsystem2.rotation.x += 0.005;
  solarsystem2.rotation.y += 0.075;
  solarsystem2.rotation.z += 0.05;
  solarsystem3.rotation.x += 0.005;
  solarsystem3.rotation.y += 0.075;
  solarsystem3.rotation.z += 0.05;
  solarsystem4.rotation.x += 0.005;
  solarsystem4.rotation.y += 0.075;
  solarsystem4.rotation.z += 0.05; 
  camera.position.z = t * -0.03;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  Icosahedron.rotation.x += 0.01;
  Icosahedron.rotation.y += 0.0005;



  solarsystem.rotation.z += 0.001;
  solarsystem.rotation.x += 0.01;
  solarsystem2.rotation.y += 0.0005;
  solarsystem2.rotation.z += 0.001;
  solarsystem3.rotation.y += 0.0005;
  solarsystem3.rotation.z += 0.001;
  solarsystem4.rotation.y += 0.0005;
  solarsystem4.rotation.z += 0.001;

  texture.rotation.x += 0.005;
  solarsystem.rotation.x+= 0.005;
 
  // controls.update();

  renderer.render(scene, camera);
}

animate();
