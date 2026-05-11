import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let camera, scene, renderer, controls;

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// ✅ Declaradas globalmente
const playerBox = new THREE.Box3();
const objectBox = new THREE.Box3();

init();

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 0, 750);

    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());

    document.addEventListener('keydown', function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveForward = true; break;
            case 'ArrowLeft': case 'KeyA': moveLeft = true; break;
            case 'ArrowDown': case 'KeyS': moveBackward = true; break;
            case 'ArrowRight': case 'KeyD': moveRight = true; break;
            case 'Space':
                if (canJump) velocity.y += 350;
                canJump = false;
                break;
        }
    });

    document.addEventListener('keyup', function (event) {
        switch (event.code) {
            case 'ArrowUp': case 'KeyW': moveForward = false; break;
            case 'ArrowLeft': case 'KeyA': moveLeft = false; break;
            case 'ArrowDown': case 'KeyS': moveBackward = false; break;
            case 'ArrowRight': case 'KeyD': moveRight = false; break;
        }
    });

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // Piso
    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    let position = floorGeometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;
        position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    floorGeometry = floorGeometry.toNonIndexed();
    position = floorGeometry.attributes.position;
    const colorsFloor = [];
    for (let i = 0; i < position.count; i++) {
        color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
        colorsFloor.push(color.r, color.g, color.b);
    }
    floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));
    const floor = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ vertexColors: true }));
    scene.add(floor);

    // Cubos
    const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();
    position = boxGeometry.attributes.position;
    const colorsBox = [];
    for (let i = 0; i < position.count; i++) {
        color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
        colorsBox.push(color.r, color.g, color.b);
    }
    boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));

    for (let i = 0; i < 500; i++) {
        const boxMaterial = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
        boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace);
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
        box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
        box.position.z = Math.floor(Math.random() * 20 - 10) * 20;
        scene.add(box);
        objects.push(box);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    const time = performance.now();

    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;
        const player = controls.getObject();

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight)       velocity.x -= direction.x * 400.0 * delta;

        // --- X ---
        const prevX = player.position.x;
        controls.moveRight(-velocity.x * delta);
        playerBox.setFromCenterAndSize(player.position, new THREE.Vector3(10, 20, 10));
        for (const obj of objects) {
            objectBox.setFromObject(obj);
            if (playerBox.intersectsBox(objectBox)) {
                // Solo bloquea si la colisión no es por estar parado encima
                const overlapY = Math.min(playerBox.max.y, objectBox.max.y) - Math.max(playerBox.min.y, objectBox.min.y);
                const overlapX = Math.min(playerBox.max.x, objectBox.max.x) - Math.max(playerBox.min.x, objectBox.min.x);
                const overlapZ = Math.min(playerBox.max.z, objectBox.max.z) - Math.max(playerBox.min.z, objectBox.min.z);
                if (overlapX < overlapY && overlapX < overlapZ) {
                    player.position.x = prevX;
                    velocity.x = 0;
                }
                break;
            }
        }

        // --- Z ---
        const prevZ = player.position.z;
        controls.moveForward(-velocity.z * delta);
        playerBox.setFromCenterAndSize(player.position, new THREE.Vector3(10, 20, 10));
        for (const obj of objects) {
            objectBox.setFromObject(obj);
            if (playerBox.intersectsBox(objectBox)) {
                const overlapY = Math.min(playerBox.max.y, objectBox.max.y) - Math.max(playerBox.min.y, objectBox.min.y);
                const overlapX = Math.min(playerBox.max.x, objectBox.max.x) - Math.max(playerBox.min.x, objectBox.min.x);
                const overlapZ = Math.min(playerBox.max.z, objectBox.max.z) - Math.max(playerBox.min.z, objectBox.min.z);
                if (overlapZ < overlapY && overlapZ < overlapX) {
                    player.position.z = prevZ;
                    velocity.z = 0;
                }
                break;
            }
        }

        // --- Y ---
        player.position.y += velocity.y * delta;

        if (player.position.y < 10) {
            velocity.y = 0;
            player.position.y = 10;
            canJump = true;
        }

        playerBox.setFromCenterAndSize(player.position, new THREE.Vector3(10, 20, 10));
        for (const obj of objects) {
            objectBox.setFromObject(obj);
            if (playerBox.intersectsBox(objectBox)) {
                if (velocity.y <= 0) {
                    player.position.y = objectBox.max.y + 10;
                    canJump = true;
                } else {
                    player.position.y = objectBox.min.y - 10;
                }
                velocity.y = 0;
                break;
            }
        }
    }

    prevTime = time;
    renderer.render(scene, camera);
}