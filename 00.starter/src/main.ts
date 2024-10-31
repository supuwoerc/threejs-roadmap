import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const sizes = {
  width: 800,
  height: 600,
};
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector<HTMLCanvasElement>(".webgl")!,
});
renderer.setSize(sizes.width, sizes.height);
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.01;
const tick = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
