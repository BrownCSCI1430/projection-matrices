// import '../style.css'

import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
// import * as np from 'numpy';
import * as CAM from './canvas/cam-canvas.js';
import * as PERS from './canvas/pers-canvas.js';
import * as WORLD from './textboxes/world-points.js'
import * as INTRINSICS from './textboxes/intrinsics.js'
import * as RENDER from './render.js'
import { ZeroCurvatureEnding } from 'https://unpkg.com/three@0.155.0/build/three.module.js';




CAM.start();
PERS.start();
WORLD.buildEventListeners();
INTRINSICS.buildEventListeners();
RENDER.buildEventListeners();
PERS.persRenderBunny();
CAM.camRenderBunny();


