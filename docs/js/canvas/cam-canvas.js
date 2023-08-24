import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { Scene } from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

export const camPoint1 = document.getElementById('cam-point1').getElementsByTagName('span');
export const camPoint2 = document.getElementById('cam-point2').getElementsByTagName('span');
export const camPoint3 = document.getElementById('cam-point3').getElementsByTagName('span');
export const camPoint4 = document.getElementById('cam-point4').getElementsByTagName('span');

export const camZ1 = document.getElementById('cam-coefficient1')
export const camZ2 = document.getElementById('cam-coefficient2')
export const camZ3 = document.getElementById('cam-coefficient3')
export const camZ4 = document.getElementById('cam-coefficient4')

const far = document.getElementById('far-clipping')
const near = document.getElementById('near-clipping')
const fx = document.getElementById('focal-x')
const fy = document.getElementById('focal-y')

const firstZ = document.getElementById('first-z');
const secondZ = document.getElementById('second-z');
const thirdZ = document.getElementById('third-z');
const fourthZ = document.getElementById('fourth-z');

const cameraMatrixHTML = document.getElementById('camera-proj').getElementsByTagName('span');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');
const sizes = {
    width: 600,
    height: 350,
}
const canvas = document.querySelector('.cam-canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);

// const camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 100);
const camera = new THREE.PerspectiveCamera(55, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0, 20)
camera.lookAt(0,0, 0)
scene.add(camera) 
// const controls = new OrbitControls(camera, renderer.domElement);

export function start(){
    
    const light = new THREE.AmbientLight(0xffffff,0.0001, 10000 );
    light.position.set(0, 10, 10)
    light.intensity = 1
    scene.add(light)

    const gridHelper = new THREE.GridHelper(60, 60);
    // const gridHelper = new THREE.GridHelper(30);
    gridHelper.material.color.set('#ff0000');
    gridHelper.rotation.x = Math.PI/2;
    scene.add(gridHelper);
    renderer.render(scene, camera);
}


// const geometry = new THREE.SphereGeometry(0.5, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff40',
//     roughness: 0.3,
// })
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)
export function clearScene(){
    while (scene.children.length > 0){
        const child = scene.children[0];
        scene.remove(child);
    }
}


export function camRenderDots(){
    clearBunnyDots();
    clearScene();
    start();
    const points = [];
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff40,
        linewidth: 10,
    })
    const arr = [camPoint1[0].innerHTML, camPoint1[1].innerHTML, 
                 camPoint2[0].innerHTML, camPoint2[1].innerHTML, 
                 camPoint3[0].innerHTML, camPoint3[1].innerHTML, 
                 camPoint4[0].innerHTML, camPoint4[1].innerHTML, ]
    const dotGeometry = new THREE.SphereGeometry(0.5, 64, 64)
    const dotMaterial1 = new THREE.MeshStandardMaterial({
        color: '#ff00a2',
        roughness: 0.3,
    })
    const dotMaterial2 = new THREE.MeshStandardMaterial({
        color: '#ffaa00',
        roughness: 0.3,
    })
    const dotMaterial3 = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    const dotMaterial4 = new THREE.MeshStandardMaterial({
        color: '#0000ff',
        roughness: 0.3,
    })
    const dot1 = new THREE.Mesh(dotGeometry, dotMaterial1)
    const dot2 = new THREE.Mesh(dotGeometry, dotMaterial2);
    const dot3 = new THREE.Mesh(dotGeometry, dotMaterial3);
    const dot4 = new THREE.Mesh(dotGeometry, dotMaterial4);
    dot1.position.set(arr[0], arr[1], 0);
    dot2.position.set(arr[2], arr[3], 0);
    dot3.position.set(arr[4], arr[5], 0);
    dot4.position.set(arr[6], arr[7], 0);
    if (near.value === ""){
        near.value = -0.5
    }
    if (far.value === ""){
        far.value = -1
    }
    if (fx.value === ""){
        fx.value = 1;
    }
    if (fy.value === ""){
        fy.value = 1;
    }
    let point1Valid = parseFloat(-camZ1.innerHTML) <= parseFloat(near.value) && parseFloat(-camZ1.innerHTML) >= parseFloat(far.value);
    let point2Valid = parseFloat(-camZ2.innerHTML) <= parseFloat(near.value) && parseFloat(-camZ2.innerHTML) >= parseFloat(far.value);
    let point3Valid = parseFloat(-camZ3.innerHTML) <= parseFloat(near.value) && parseFloat(-camZ3.innerHTML) >= parseFloat(far.value);
    let point4Valid = parseFloat(-camZ4.innerHTML) <= parseFloat(near.value) && parseFloat(-camZ4.innerHTML) >= parseFloat(far.value);
    if (point1Valid){
        scene.add(dot1);
    }
    if (point2Valid){
        scene.add(dot2);
    }
    if (point3Valid){
        scene.add(dot3);
    }
    if (point4Valid){
        scene.add(dot4);
    }

    if (point1Valid){
        if (point2Valid){
            points.push(new THREE.Vector2(arr[0], arr[1]));
            points.push(new THREE.Vector2(arr[2], arr[3]));
            if (point3Valid){
                points.push(new THREE.Vector2(arr[2], arr[3]));
                points.push(new THREE.Vector2(arr[4], arr[5]));
                if (point4Valid){
                    points.push(new THREE.Vector2(arr[4], arr[5]));
                    points.push(new THREE.Vector2(arr[6], arr[7]));
                    points.push(new THREE.Vector2(arr[6], arr[7]));
                    points.push(new THREE.Vector2(arr[0], arr[1]));
                }else{
                    points.push(new THREE.Vector2(arr[4], arr[5]));
                    points.push(new THREE.Vector2(arr[0], arr[1]));
                }
            }else if(point4Valid){
                points.push(new THREE.Vector2(arr[2], arr[3]));
                points.push(new THREE.Vector2(arr[6], arr[7]));
                points.push(new THREE.Vector2(arr[6], arr[7]));
                points.push(new THREE.Vector2(arr[0], arr[1]));
            }
        }else if(point3Valid){
            points.push(new THREE.Vector2(arr[0], arr[1]));
            points.push(new THREE.Vector2(arr[4], arr[5]));
            if (point4Valid){
                points.push(new THREE.Vector2(arr[4], arr[5]));
                points.push(new THREE.Vector2(arr[6], arr[7]));
                points.push(new THREE.Vector2(arr[6], arr[7]));
                points.push(new THREE.Vector2(arr[0], arr[1]));
            }
        }else if(point4Valid){
            points.push(new THREE.Vector2(arr[0]), arr[1]);
            points.push(new THREE.Vector2(arr[6], arr[7]));
        }
    }else{
        if(point2Valid){
            if (point3Valid){
                points.push(new THREE.Vector2(arr[2], arr[3]));
                points.push(new THREE.Vector2(arr[4], arr[5]));
                if (point4Valid){
                    points.push(new THREE.Vector2(arr[4], arr[5]));
                    points.push(new THREE.Vector2(arr[6], arr[7]));
                    points.push(new THREE.Vector2(arr[6], arr[7]));
                    points.push(new THREE.Vector2(arr[2], arr[3]));
                }
            }else if(point4Valid){
                points.push(new THREE.Vector2(arr[2], arr[3]));
                points.push(new THREE.Vector2(arr[6], arr[7]));
            }
        }else if(point3Valid && point4Valid){
            points.push(new THREE.Vector2(arr[4], arr[5]));
            points.push(new THREE.Vector2(arr[6], arr[7]));
        }
    }


    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh)
    renderer.render(scene, camera);
}

export function camRenderSphere(){
    let radius = 5;
    // preparations
    clearBunnyDots();
    clearScene();
    start();
    // generates the random point clouds
    const points = [];
    for (let i = 0; i < 50; i ++){
        const phi = Math.PI / 50 * i
        const num = Math.sin(phi) * 40
        for (let j = 0; j < num; j ++){
            const theta = 2 * Math.PI / num * j
            points[3 * (i * 40 + j)] = radius * Math.sin(phi) * Math.cos(theta)
            points[3 * (i * 40 + j) + 1] = radius * Math.sin(phi) * Math.sin(theta) 
            points[3 * (i * 40 + j) + 2] = radius * Math.cos(phi) + 5.5
        }
    }
    let numDots = points.length;
    // projection matrix
    let pers_proj = new THREE.Matrix4();
    let arr = []
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(cameraMatrixHTML[i].innerHTML * 100) / 100;
    }
    pers_proj.set (arr[0], arr[3], arr[6],  arr[9],
        arr[1], arr[4], arr[7],  arr[10],
        arr[2], arr[5], arr[8], arr[11]);
    // projected points
    if (near.value === ""){
        near.value = -0.5
    }
    if (far.value === ""){
        far.value = -1
    }
    if (fx.value === ""){
        fx.value = 1;
    }
    if (fy.value === ""){
        fy.value = 1;
    }
    const dotGeometry = new THREE.SphereGeometry(0.1, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    for (let i = 0; i < numDots; i ++){
        const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] + arr[11])
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= parseFloat(near.value) && w >= parseFloat(far.value)){
        if (w <= 0 && w >= -100){
            dot.position.set(x/w , y/w, 0);
            scene.add(dot)
        }
        // dot.position.set(x / w, y / w, 0)
        // scene.add(dot)
    }
    renderer.render(scene, camera)
}
/*
renders cube
*/
export function camRenderCube(){
    let len = 10;
    let numDots = 1080
    // preparations
    clearBunnyDots();
    clearScene();
    start();
    // generates the point cloud
    const points = [];
    // top
    for (let i = 0; i < 30; i ++){
        points[3 * i] = - len / 2 + (len / 30) * i
        points[3 * i + 1] = len / 2;
        points[3 * i + 2] = len / 2 + 7;
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 90] = - len / 2 + (len / 30) * i
        points[3 * i + 91] = - len / 2 
        points[3 * i + 92] = len / 2 + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 180] = - len / 2
        points[3 * i + 181] = - len / 2 + (len / 30) * i
        points[3 * i + 182] = len / 2 + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 270] = len / 2
        points[3 * i + 271] = - len / 2 + (len / 30) * i
        points[3 * i + 272] = len / 2 + 7
    }
    // bottom
    for (let i = 0; i < 30; i ++){
        points[3 * i + 360] = - len / 2 + (len / 30) * i
        points[3 * i + 361] = len / 2;
        points[3 * i + 362] = - len / 2 + 7;
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 450] = - len / 2 + (len / 30) * i
        points[3 * i + 451] = - len / 2 
        points[3 * i + 452] = - len / 2 + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 540] = - len / 2
        points[3 * i + 541] = - len / 2 + (len / 30) * i
        points[3 * i + 542] = - len / 2 + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 630] = len / 2
        points[3 * i + 631] = - len / 2 + (len / 30) * i
        points[3 * i + 632] = - len / 2 + 7
    }
    // bridges
    for (let i = 0; i < 30; i ++){
        points[3 * i + 720] = len / 2 
        points[3 * i + 721] = len / 2;
        points[3 * i + 722] = - len / 2 + (len / 30) * i + 7;
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 810] = - len / 2
        points[3 * i + 811] = - len / 2 
        points[3 * i + 812] = - len / 2 + (len / 30) * i + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 900] = - len / 2
        points[3 * i + 901] = len / 2
        points[3 * i + 902] = - len / 2 + (len / 30) * i + 7
    }
    for (let i = 0; i < 30; i ++){
        points[3 * i + 990] = len / 2
        points[3 * i + 991] = - len / 2
        points[3 * i + 992] = - len / 2 + (len / 30) * i + 7
    }
    // projection matrix
    let pers_proj = new THREE.Matrix4();
    let arr = []
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(cameraMatrixHTML[i].innerHTML * 100) / 100;
    }
    pers_proj.set (arr[0], arr[3], arr[6],  arr[9],
        arr[1], arr[4], arr[7],  arr[10],
        arr[2], arr[5], arr[8], arr[11]);
    // projected points
    if (near.value === ""){
        near.value = -0.5
    }
    if (far.value === ""){
        far.value = -1
    }
    if (fx.value === ""){
        fx.value = 1;
    }
    if (fy.value === ""){
        fy.value = 1;
    }
    const dotGeometry = new THREE.SphereGeometry(0.15, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    for (let i = 0; i < numDots; i ++){
        const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] + arr[11])
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= parseFloat(near.value) && w >= parseFloat(far.value)){
        if (w <= 0 && w >= -100){
            dot.position.set(x/w , y/w, 0);
            scene.add(dot)
        }
    }
    renderer.render(scene, camera)
}
let bunnyDots = [];
/*
creates bunny
*/
export function camRenderBunny(){
    // preparations
    clearScene();
    start();
    // points
    let points = [];
    fetch('bunny.json')
    .then(response => response.json())
    .then(pointCloud => {
        // Use pointCloud data as needed
        for (let i = 0; i < pointCloud.length; i ++ ){
            for (let j = 0;j < 3; j ++){
                // points[3 * i + j] = pointCloud[i][j]
                points.push(pointCloud[i][j])
            }

        }
        // projection matrix
    let pers_proj = new THREE.Matrix4();
    let arr = []
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(cameraMatrixHTML[i].innerHTML * 100) / 100;
    }
    pers_proj.set (arr[0], arr[3], arr[6],  arr[9],
        arr[1], arr[4], arr[7],  arr[10],
        arr[2], arr[5], arr[8], arr[11]);
    // projected points
    if (near.value === ""){
        near.value = -0.5
    }
    if (far.value === ""){
        far.value = -1
    }
    if (fx.value === ""){
        fx.value = 1;
    }
    if (fy.value === ""){
        fy.value = 1;
    }
    const dotGeometry = new THREE.SphereGeometry(0.15, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    for (let i = 0; i < points.length / 3; i ++){
        const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] + arr[11])
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= 0 && w >= -100){
            if(w >= -0.1){
            dot.position.set(x/w, y/w, 0);
            scene.add(dot)
            bunnyDots.push(dot);
        }
    }
    renderer.render(scene, camera)
    });
}
export function clearBunnyDots(){
    for (let i = 0; i < bunnyDots.length; i ++){
        scene.remove(bunnyDots[i]);
    }
    bunnyDots = []
}