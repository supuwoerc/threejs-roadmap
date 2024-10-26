import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// const sizes = {
//   width: 800,
//   height: 600,
// };

const sizes = {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
};

// 创建一个场景
const scene = new THREE.Scene();

// 创建几何形状
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 组合geometry和material
const mesh = new THREE.Mesh(geometry, material);
// 添加到场景中
scene.add(mesh);
// 创建一个相机
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   1,
//   5.7 // 此处的5.7 < 5.744562646538029(相机和立方体的距离)
// );
// const ratio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * ratio, 1 * ratio, 1, -1, 0.1, 100);
// 原生事件绑定鼠标交互到相机
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// 移动相机(threejs使用的是右手坐标系)
camera.position.z = 3;
console.log(mesh.position.distanceTo(camera.position)); // 5.744562646538029
// 添加到场景
scene.add(camera);
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl") as HTMLCanvasElement,
});
// 设置渲染画布大小
renderer.setSize(sizes.width, sizes.height);
camera.lookAt(mesh.position);
// const clock = new THREE.Clock();
// const tick = () => {
//   const time = clock.getElapsedTime();
//   mesh.rotation.y = time * Math.PI;
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX / sizes.width - 0.5;
//   cursor.y = -(e.clientY / sizes.height - 0.5);
// });

// const tick = () => {
//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
//   camera.position.y = cursor.y * 5;
//   // 相机视角朝向立方体
//   camera.lookAt(mesh.position);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.01;
const tick = () => {
  window.requestAnimationFrame(tick);
  // 相机视角朝向立方体
  camera.lookAt(mesh.position);
  // 当 controls.enableDamping 或者 controls.autoRotate 设置为 true 时候必须调用 controls.update
  controls.update();
  renderer.render(scene, camera);
};
controls.update();
tick();
