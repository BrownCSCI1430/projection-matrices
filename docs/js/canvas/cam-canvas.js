import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { Scene } from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { DepthFormat, Vector3 } from 'three';

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
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0, 5)
camera.lookAt(0,0, 0)
scene.add(camera) 
// const controls = new OrbitControls(camera, renderer.domElement);

export function start(){
    
    const light = new THREE.AmbientLight(0xffffff,0.0001, 10000 );
    light.position.set(0, 10, 10)
    light.intensity = 1
    scene.add(light)

    const gridHelper = new THREE.GridHelper(60, 60);
    // gridHelper.scale.set(0.5, 0.5,0.5)
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
    const dotGeometry = new THREE.SphereGeometry(0.07, 64, 64)
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
    dot1.position.set(arr[0]/4, arr[1]/4, 0);
    dot2.position.set(arr[2]/4, arr[3]/4, 0);
    dot3.position.set(arr[4]/4, arr[5]/4, 0);
    dot4.position.set(arr[6]/4, arr[7]/4, 0);
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

    // add lines
    if (point1Valid){
        if (point2Valid){
            points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
            points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
            if (point3Valid){
                points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
                points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                if (point4Valid){
                    points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                    points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                    points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                    points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
                }else{
                    points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                    points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
                }
            }else if(point4Valid){
                points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
                points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
            }
        }else if(point3Valid){
            points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
            points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
            if (point4Valid){
                points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
            }
        }else if(point4Valid){
            points.push(new THREE.Vector2(arr[0]/4, arr[1]/4));
            points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
        }
    }else{
        if(point2Valid){
            if (point3Valid){
                points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
                points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                if (point4Valid){
                    points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
                    points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                    points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
                    points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
                }
            }else if(point4Valid){
                points.push(new THREE.Vector2(arr[2]/4, arr[3]/4));
                points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
            }
        }else if(point3Valid && point4Valid){
            points.push(new THREE.Vector2(arr[4]/4, arr[5]/4));
            points.push(new THREE.Vector2(arr[6]/4, arr[7]/4));
        }
    }


    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh)
    renderer.render(scene, camera);
}

export function camRenderSphere(rotateY){
    if (rotateY == undefined){
        rotateY = 0;
    }
    let radius = 35;
    // preparations
    clearBunnyDots();
    clearScene();
    start();
    // generates the random point clouds
    const points = [];
    for (let i = 0; i < 50; i ++){
        const phi = Math.PI / 50 * i
        const num = Math.sin(phi) * 40
        for (let j = 0; j < num + 1; j ++){
            const theta = 2 * Math.PI / num * j
            // points[3 * (i * num + j)] = radius * Math.sin(phi) * Math.cos(theta)
            // points[3 * (i * num + j) + 1] = radius * Math.sin(phi) * Math.sin(theta) 
            // points[3 * (i * num + j) + 2] = radius * Math.cos(phi)
            points.push(new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)))
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
        -arr[2], -arr[5], -arr[8], -arr[11]+50,
        0, 0, 0, 1);
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
    const dotGeometry = new THREE.SphereGeometry(0.02, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    for (let i = 0; i < points.length; i ++){
        // const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        // const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        // const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] + arr[11])
        // const x = arr[0] * points[i].x + arr[3] * points[i].y + arr[6] * points[i].z + arr[9]
        // const y = arr[1] * points[i].x + arr[4] * points[i].y + arr[7] * points[i].z + arr[10]
        // const w = -(arr[2] * points[i].x + arr[5] * points[i].y + arr[8] * points[i].z + arr[11])
        let point2 = points[i].applyMatrix4(pers_proj)
        // point2.z *= -1
        // console.log(pers_proj)
        // console.log(arr[11])
        // let point2 = transformPoint(points[i].clone(), 0, rotateY, 0, 0, 0, 0)
        // console.log('hi')
        // console.log(rotateY)
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= parseFloat(near.value) && w >= parseFloat(far.value)){
        // if (w <= 0 && w >= -100){
            // dot.position.set(x/w , y/w, 0);
            dot.position.set(point2.x / point2.z, point2.y / point2.z)
            scene.add(dot)
        // }
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
    for (let i = 0; i < 30; i ++){
        // top
        points.push(new THREE.Vector3(- len / 2 + (len / 30) * i,len / 2, len / 2 + 7))
        points.push(new THREE.Vector3( - len / 2 + (len / 30) * i, - len / 2 , len / 2 + 7))
        points.push(new THREE.Vector3(- len / 2,- len / 2 + (len / 30) * i, len / 2 + 7))
        points.push(new THREE.Vector3(len / 2, - len / 2 + (len / 30) * i,len / 2 + 7 ))
        // bottom
        points.push(new THREE.Vector3(- len / 2 + (len / 30) * i, len / 2, - len / 2 + 7))
        points.push(new THREE.Vector3(- len / 2 + (len / 30) * i, - len / 2 ,- len / 2 + 7))
        points.push(new THREE.Vector3( - len / 2, - len / 2 + (len / 30) * i, - len / 2 + 7))
        points.push(new THREE.Vector3(len / 2, - len / 2 + (len / 30) * i, - len / 2 + 7 ))
         // bridges
        points.push(new THREE.Vector3( len / 2 ,len / 2,   - len / 2 + (len / 30) * i + 7))
        points.push(new THREE.Vector3(- len / 2, - len / 2 ,  - len / 2 + (len / 30) * i + 7))
        points.push(new THREE.Vector3(- len / 2,len / 2,  - len / 2 + (len / 30) * i + 7))
        points.push(new THREE.Vector3(len / 2, - len / 2, - len / 2 + (len / 30) * i + 7 ))
    }
    // projection matrix
    let pers_proj = new THREE.Matrix4();
    let arr = []
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(cameraMatrixHTML[i].innerHTML * 100) / 100;
    }
    pers_proj.set (arr[0], arr[3], arr[6],  -arr[9],
        arr[1], arr[4], arr[7],  -arr[10],
        -arr[2], -arr[5], -arr[8], arr[11]-8, 
        0, 0, 0, 1);
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
    const dotGeometry = new THREE.SphereGeometry(0.05, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
    for (let i = 0; i < points.length; i ++){
        // const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        // const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        // const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] -10)
        let point = points[i].applyMatrix4(pers_proj)
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= parseFloat(near.value) && w >= parseFloat(far.value)){
        // if (w <= 0 && w >= -100){
            if (point.z <= 0 && point.z >= -100){
            //dot.position.set(x/w , y/w, 0);
            dot.position.set(point.x / point.z, point.y / point.z)
            scene.add(dot)
       }
    }
    renderer.render(scene, camera)
}
let bunnyDots = [];
function rotationMatrixX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new THREE.Matrix4().set(
      1, 0, 0, 0,
      0, cos, -sin, 0,
      0, sin, cos, 0,
      0, 0, 0, 1
    );
  }
  
  function rotationMatrixY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new THREE.Matrix4().set(
      cos, 0, sin, 0,
      0, 1, 0, 0,
      -sin, 0, cos, 0,
      0, 0, 0, 1
    );
  }
  function rotationMatrixZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new THREE.Matrix4().set(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
  function translationMatrix(dx, dy, dz) {
    return new THREE.Matrix4().set(
      1, 0, 0, dx,
      0, 1, 0, dy,
      0, 0, 1, dz,
      0, 0, 0, 1
    );
  }
  function transformPoint(point, rotateX, rotateY, rotateZ, dx, dy, dz) {
    // Extrinsic matrix (camera transformation matrix)
    const extrinsicMatrix = new THREE.Matrix4().copy(camera.matrixWorld).invert()
    // const extrinsicMatrix = new THREE.Matrix4().identity();
    // Intrinsic matrix (we'll keep it as identity for this example)
    const intrinsicMatrix = new THREE.Matrix4().identity();
  
    // Rotation matrices based on input angles
    const rotateXMatrix = rotationMatrixX(rotateX);
    const rotateYMatrix = rotationMatrixY(rotateY);
    const rotateZMatrix = rotationMatrixZ(rotateZ);

    const translateMatrix = translationMatrix(dx, dy, dz);
  
    // Compute the full transformation matrix
    let fullTransform = new THREE.Matrix4()
      .multiply(intrinsicMatrix)
      .multiply(extrinsicMatrix)
      .multiply(translateMatrix)
      .multiply(rotateXMatrix)
      .multiply(rotateYMatrix)
      .multiply(rotateZMatrix);
  
    // console.log(fullTransform)
    // Transform the point
    point.applyMatrix4(fullTransform);
    return point;
}
// /*
// creates bunny
// */
// export function camRenderBunny(rotateX, rotateY, rotateZ, dx, dy, dz){
//     // preparations
//     clearScene();
//     start();
//     // points
//     let points = [];
//     fetch('bunny4.json')
//     .then(response => response.json())
//     .then(pointCloud => {
//         for (let i = 0; i < pointCloud.length; i ++ ){
//             points.push(new THREE.Vector3(pointCloud[i][0], pointCloud[i][1], pointCloud[i][2]))
//         }
//     const dotGeometry = new THREE.SphereGeometry(0.03, 64, 64)
//     const dotMaterial = new THREE.MeshStandardMaterial({
//         color: '#00ff40',
//         roughness: 0.3,
//     })
//     for (let i = 0; i < points.length; i ++){
//         points[i] = transformPoint(points[i].clone(), rotateX, rotateY, rotateZ, 7 * dx, 7 * dy, 7 * dz-10);
//         if (points[i].z <= near.value){
//             const dot = new THREE.Mesh(dotGeometry, dotMaterial)
//             dot.position.set(-points[i].x / points[i].z, -points[i].y / points[i].z)
//             scene.add(dot)
//             bunnyDots.push(dot)
//         }
//     }
//     renderer.render(scene, camera)
//     });
// }
export function camRenderBunny(){
    // preparations
    clearScene();
    start();
    // points
    var points = [];
    fetch('bunny2.json')
    .then(response => response.json())
    .then(pointCloud => {
        for (let i = 0; i < pointCloud.length; i ++ ){
            // points.push(new THREE.Vector3(pointCloud[i][0], pointCloud[i][1], pointCloud[i][2]))
            for (let j = 0; j < 3; j ++){
                points.push(pointCloud[i][j])
            }
        }
    const dotGeometry = new THREE.SphereGeometry(0.03, 64, 64)
    const dotMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff40',
        roughness: 0.3,
    })
        // projection matrix
    let pers_proj = new THREE.Matrix4();
    let arr = []
    
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(cameraMatrixHTML[i].innerHTML * 100) / 100;
    }
    pers_proj.set (arr[0], arr[3], arr[6],  arr[9],
        arr[1], arr[4], arr[7],  arr[10],
        -arr[2], -arr[5], -arr[8], -arr[11], 
        0, 0, 0, 1);
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
    for (let i = 0; i < points.length/3; i ++){
        const x = arr[0] * points[3 * i] + arr[3] * points[3 * i + 1] + arr[6] * points[3 * i + 2] + arr[9]
        const y = arr[1] * points[3 * i] + arr[4] * points[3 * i + 1] + arr[7] * points[3 * i + 2] + arr[10]
        const w = -(arr[2] * points[3 * i] + arr[5] * points[3 * i + 1] + arr[8] * points[3 * i + 2] + arr[11] - 2)
        // let point = points[i].applyMatrix4(pers_proj)
        const dot = new THREE.Mesh(dotGeometry, dotMaterial)
        // if (w <= 0 && w >= -100){
            // if(point.z >= -0.1){
            dot.position.set(x / w, y / w);
            scene.add(dot)
            bunnyDots.push(dot);
        // }
    }
    renderer.render(scene, camera)
})}
export function clearBunnyDots(){
    for (let i = 0; i < bunnyDots.length; i ++){
        scene.remove(bunnyDots[i]);
    }
    bunnyDots = []
}