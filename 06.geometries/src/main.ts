import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const sizes = {
  width: 800,
  height: 600,
};

// 创建一个场景
const scene = new THREE.Scene();

// 创建几何形状
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

// // 自定义几何-1.定义顶点信息
// const positions = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

// // 自定义几何-2.定义顶点位置attr
// const positionsAttr = new THREE.BufferAttribute(positions, 3);
// // 自定义几何-3.创建BufferGeometry
// const geometry = new THREE.BufferGeometry();
// // 自定义几何-4.将顶点位置attr设置到几何的顶点属性上
// geometry.setAttribute("position", positionsAttr);

// 定义需要count个三角形来描述
const count = 100;
// 创建数组来存储顶点位置坐标
const positions = new Float32Array(count * 3 * 3);
// 随机设置顶点位置
for (let index = 0; index < positions.length; index++) {
  positions[index] = (Math.random() - 0.5) * 2;
}
// 创建顶点的位置attr
const positionAttr = new THREE.BufferAttribute(positions, 3);
// 创建几何
const geometry = new THREE.BufferGeometry();
// 设置顶点信息到几何上
geometry.setAttribute("position", positionAttr);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
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
// 移动相机(threejs使用的是右手坐标系)
camera.position.z = 5;

const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.02;
const tick = () => {
  control.update();
  // 渲染
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
control.update();
tick();
