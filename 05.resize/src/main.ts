import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// 添加到场景
scene.add(camera);
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl") as HTMLCanvasElement,
});
// 设置渲染画布大小
renderer.setSize(sizes.width, sizes.height);
// 设置渲染的像素比,限制最大像素比为2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// 移动相机(threejs使用的是右手坐标系)
camera.position.z = 5;
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
// 渲染
const tick = () => {
  // 设置渲染的像素比,限制最大像素比为2
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(tick);
};
tick();

// 添加resize事件监听
window.addEventListener("resize", () => {
  console.log("resize");
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // 更新相机裁剪面宽高比例
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    document.querySelector(".webgl")?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
