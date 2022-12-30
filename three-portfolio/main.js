
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
const material = new THREE.MeshStandardMaterial({ color: 'white', wireframe:true });
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

const controls = new OrbitControls(camera, renderer.domElement);
const starTexture = new THREE.TextureLoader().load('texture.jpg')
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: starTexture });
  const star = new THREE.Mesh(geometry, material);
  const test = new THREE.BufferGeometryLoader
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);



// Background

const spaceTexture = new THREE.TextureLoader().load('starz.jpg');
scene.background = spaceTexture;

// Avatar

// const mackTexture = new THREE.TextureLoader().load('mack.png');

// const mack = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: mackTexture }));

// scene.add(mack);

// texture

const oilTexture = new THREE.TextureLoader().load('oil.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const texture = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: oilTexture,
    normalMap: normalTexture,
  })
);

scene.add(texture);

texture.position.z = 30;
texture.position.setX(-10);

// mack.position.z = -5;
// mack.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  texture.rotation.x += 0.05;
  texture.rotation.y += 0.075;
  texture.rotation.z += 0.05;

  // mack.rotation.y += 0.01;
  // mack.rotation.z += 0.01;

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
  Icosahedron.rotation.z += 0.001;

  texture.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
