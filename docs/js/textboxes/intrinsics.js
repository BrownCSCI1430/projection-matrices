import * as RENDER from '../render.js'
import * as CAM from '../canvas/cam-canvas.js'
import * as PERS from '../canvas/pers-canvas.js'
import { RenderTarget } from 'https://unpkg.com/three@0.155.0/build/three.module.js';

export const fx = document.getElementById('focal-x')
export const fy = document.getElementById('focal-y')
const far = document.getElementById('far-clipping')
const near = document.getElementById('near-clipping')

const submit = document.getElementById('submit-intrinsics')

function enter(){
    if (parseFloat(far.value) >= 0 || parseFloat(near.value) >= 0){
        alert('Please enter negative z coordinate values for clipping planes')
    }else{
        let c = - near.value / far.value
        RENDER.projMatrixHTML[10].innerHTML = Math.round(1 / (1 + c) * 100) / 100;
        RENDER.projMatrixHTML[14].innerHTML = Math.round(- c / (1 + c) * 100) / 100;

        RENDER.persMatrixHTML[0].innerHTML = Math.round(fx.value * 100) / 100;
        RENDER.persMatrixHTML[5].innerHTML = Math.round(fy.value * 100) / 100;

        RENDER.intrinsicMatrixHTML[0].innerHTML = Math.round(fx.value * 100) / 100;
        console.log(fx.value);
        RENDER.intrinsicMatrixHTML[4].innerHTML = Math.round(fy.value * 100) / 100;

        RENDER.scaleMatrixHTML[0].innerHTML = Math.round(- 1 / far.value * 100) / 100;
        RENDER.scaleMatrixHTML[5].innerHTML = Math.round(- 1 / far.value * 100) / 100;
        RENDER.scaleMatrixHTML[10].innerHTML = Math.round(- 1 / far.value * 100) / 100;

        RENDER.intrinsicMatrixFromPersHTML[0].innerHTML = Math.round(- fx.value * 1 / far.value * 100) / 100
        RENDER.intrinsicMatrixFromPersHTML[4].innerHTML = Math.round(- fy.value * 1 / far.value * 100) / 100

        RENDER.persMatrixFromCamHTML[0].innerHTML = Math.round(fx.value * 100) / 100;
        RENDER.persMatrixFromCamHTML[5].innerHTML = Math.round(fy.value * 100) / 100;

        RENDER.updateCamMatrix();
        RENDER.updatePersMatrix();
        RENDER.updatePersMatrixFromCam();
        if (RENDER.pointsUnready()){
            PERS.persRenderSphere();
          }else{
            RENDER.updateCamPoints();
            RENDER.updatePersPoints();
            CAM.camRenderDots();
            // CAM.animate();
            PERS.persRenderDots();
            // PERS.animate();
          }
    }
}
export function buildEventListeners(){
    submit.addEventListener('click', enter);

    far.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            near.focus();
        }
    })
    near.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            fx.focus();
        }
    })
    fx.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            fy.focus();
        }
    })
    fy.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            submit.click();
        }
    })
}
