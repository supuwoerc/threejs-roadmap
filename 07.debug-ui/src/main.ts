import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import gsap from "gsap";

const gui = new GUI({
  // 面板宽度
  width: 300,
  // 名称
  title: "调试器",
  // 关闭全部文件夹
  closeFolders: true,
});

// 隐藏面板
gui.hide();

const callback = () => {
  if (window.location.hash == "#debug") {
    gui.show();
  }
};
callback();
// 根据hash判断要不要展示面板
window.addEventListener("onhashchange", () => {
  callback();
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// 00 创建调试对象
const debugObject: any = {
  materialColor: "#00ff00",
  spin: null,
  segment: 1,
};
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  debugObject.segment,
  debugObject.segment,
  debugObject.segment
);

const material = new THREE.MeshBasicMaterial({
  color: debugObject.materialColor,
});
const mesh = new THREE.Mesh(geometry, material);

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    z: mesh.rotation.z - Math.PI * 2,
    duration: 2,
  });
};
// 添加需要调整的属性到gui

// 00 创建文件夹
const meshGui = gui.addFolder("mesh");
const materialGui = gui.addFolder("material");
materialGui.open();

// 01 添加数字类型的属性
meshGui
  .add(mesh.position, "y")
  .min(-2)
  .max(2)
  .step(0.01)
  .name("mesh.pisition.y");

// 02 添加boolean属性
meshGui.add(mesh, "visible").name("mesh.visible");
materialGui.add(material, "wireframe").name("material.wireframe");

// 03 添加color-picker(由于色彩管理，直接设置material的颜色会使得渲染结果颜色不一样，需要借助自定义对象去设置）
materialGui
  .addColor(debugObject, "materialColor")
  .name("material.color")
  .onChange(() => {
    // 直接修改颜色material会根据颜色做一次色彩空间的转换，所以存在色差
    console.log(material.color.getHexString());
    // set 方法接受srgb的颜色参数，内部就处理这种转换
    material.color.set(debugObject.materialColor);
    // 符合预期，渲染的颜色和color-picker选择的颜色一致
    console.log(material.color.getHexString());
  });

// 04 自定义方法
meshGui.add(debugObject, "spin").name("spin");

// 05 添加下拉选择
meshGui
  .add(debugObject, "segment", [1, 2, 3])
  .name("geometry.segments")
  .onFinishChange((c: number) => {
    // 重新创建几何对象（不推荐的行为）
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, c, c, c);
    // 销毁旧几何对象
    geometry.dispose();
  });

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
