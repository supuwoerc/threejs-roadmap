import * as THREE from "three";

const sizes = {
  width: 800,
  height: 600,
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
// 移动相机(threejs使用的是右手坐标系)
camera.position.z = 5;
// 渲染
renderer.render(scene, camera);
