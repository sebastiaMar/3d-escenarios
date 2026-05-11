import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { createBaseScene } from '../core/baseScene.js';

const container = document.getElementById('app');
const { scene, camera, renderer } = createBaseScene(container);

// Niebla
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

// Cámara
camera.position.set(0, 200, -200);

// Controles
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// 500 cubos instanciados
const geometry = new THREE.BoxGeometry();
geometry.translate(0, 0.5, 0);
const material = new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true });
const mesh = new THREE.InstancedMesh(geometry, material, 500);
const dummy = new THREE.Object3D();

for (let i = 0; i < 500; i++) {
    dummy.position.x = Math.random() * 1600 - 800;
    dummy.position.y = 0;
    dummy.position.z = Math.random() * 1600 - 800;
    dummy.scale.x = 20;
    dummy.scale.y = Math.random() * 80 + 10;
    dummy.scale.z = 20;
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
}
scene.add(mesh);

// Luces
const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
dirLight1.position.set(1, 1, 1);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
dirLight2.position.set(-1, -1, -1);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

// GUI
const gui = new GUI();
gui.add(controls, 'zoomToCursor');
gui.add(controls, 'screenSpacePanning');

// Loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);