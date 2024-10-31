import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

const gui = new GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const segments = {
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  segments.widthSegments,
  segments.heightSegments,
  segments.depthSegments
);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});
const mesh = new THREE.Mesh(geometry, material);
// 添加需要调整的属性到gui

// 01 添加数字类型的属性
gui.add(mesh.position, "y").min(-2).max(2).step(0.01).name("mesh.pisition.y");

// 02 添加boolean属性
gui.add(mesh, "visible").name("mesh.visible");
gui.add(material, "wireframe").name("material.wireframe");

// 03 添加color-picker
gui.addColor(material, "color").name("material.color");

scene.add(mesh);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector<HTMLCanvasElement>(".webgl")!,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.01;
const tick = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});
