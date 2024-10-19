import * as THREE from "three";

const sizes = {
  width: 800,
  height: 600,
};
// 创建场景
const scene = new THREE.Scene();
// 创建几何形状
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 创建mesh
const mesh = new THREE.Mesh(geometry, material);
// 设置位置-方法1
// mesh.position.x = 2;
// mesh.position.y = 1;
// mesh.position.z = 1;
// 设置位置-方法2
mesh.position.set(2, 1, 1);
// 输出对象到坐标原点的距离
console.log(mesh.position.length());
console.log(mesh.position.distanceTo(new THREE.Vector3(0, 0, 0)));
// 归一化
mesh.position.normalize();
// 再次输出对象到坐标原点的距离
console.log(mesh.position.length());
console.log(mesh.position.distanceTo(new THREE.Vector3(0, 0, 0)));
// 添加到场景
// scene.add(mesh);
// 创建相机
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// 为了方便看到axesHelper，移除mesh
// scene.remove(mesh)
// 为了方便看到axesHelper,调整相机位置
camera.position.set(1, 1, 3);
scene.add(camera);
// 获取两个对象的距离
console.log(mesh.position.distanceTo(camera.position));
// 创建轴线辅助器
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
// scale 缩放
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
mesh.scale.set(2, 0.5, 1);
// 旋转
// mesh.rotation.x = Math.PI / 2;
// mesh.rotation.y = Math.PI / 2;
// mesh.rotation.z = Math.PI / 2;

// mesh.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2, "XYZ");

// mesh.rotateX(Math.PI / 2)
// mesh.rotateY(Math.PI / 2)
// mesh.rotateZ(Math.PI / 2)

// mesh.setRotationFromQuaternion(new THREE.Quaternion(0.2, 0.2, 0.2, 1));

// lookAt
// camera.lookAt(mesh.position.x, mesh.position.y, mesh.position.z);
camera.lookAt(mesh.position);

// 创建组
const group = new THREE.Group();
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
const box2 = box.clone();
box2.material = new THREE.MeshBasicMaterial({ color: "green" });
box2.position.x = 2;
group.add(mesh, box, box2);
group.scale.set(1.2, 1.2, 1.2);
scene.add(group);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl") as HTMLCanvasElement,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
