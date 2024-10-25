import * as THREE from "three";
import gsap from "gsap";

const sizes = {
  width: 800,
  height: 600,
};

// 创建一个场景
const scene = new THREE.Scene();
// 创建几何形状
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: "red" });
// 组合mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// 创建相机
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 3;
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl") as HTMLCanvasElement,
});
renderer.setSize(sizes.width, sizes.height);

// 借助时间抹平渲染差异
// let lastRenderTime = Date.now();
// const tick = () => {
//   const current = Date.now();
//   const offset = current - lastRenderTime;
//   lastRenderTime = current;
//   // 更新物体
//   mesh.rotation.z += Math.PI * 0.001 * offset;
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 借助 clock 计算当前运行时长来解决渲染差异
// const clock = new THREE.Clock();
// const tick = () => {
//   // 更新物体：clock.getElapsedTime()获取clock运行到现在的秒数
//   mesh.rotation.z = Math.PI * clock.getElapsedTime();
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 圆周动画
// const clock = new THREE.Clock();
// const tick = () => {
//   // 更新物体
//   mesh.position.x = Math.cos(clock.getElapsedTime());
//   mesh.position.y = Math.sin(clock.getElapsedTime());
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 圆周动画-更新相机位置
// const clock = new THREE.Clock();
// const tick = () => {
//   // 更新物体
//   camera.position.x = Math.cos(clock.getElapsedTime());
//   camera.position.y = Math.sin(clock.getElapsedTime());
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 更新相机位置的同时保持lookAt立方体中心
// const clock = new THREE.Clock();
// const tick = () => {
//   // 更新物体
//   camera.position.x = Math.cos(clock.getElapsedTime());
//   camera.position.y = Math.sin(clock.getElapsedTime());
//   camera.lookAt(mesh.position)
//   // 渲染
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// 借助gasp实现动画
gsap.to(mesh.rotation, {
  duration: 2,
  x: 2,
  y: 2,
  yoyo: true,
  repeat: -1,
});
const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(() => {
    tick();
  });
};
tick();
