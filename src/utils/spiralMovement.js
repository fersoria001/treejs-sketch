import scene from "../Scene";
import { movement, check } from "./matrix";
import renderer from "../Renderer";
import camera from "../Camera";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { matrixFromArray } from "../utils/matrix";
const BOTTOM_COLOR = 0x00ffff; // cyan
const LEFT_COLOR = 0xe32636; // red

const LIMIT_DOWN_COLOR = 0xff0000; // red
const LIMIT_UP_COLOR = 0x000000; // black


// scene.children.length = 0;

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
const visibleObjects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const original_matrix = matrixFromArray({
  origin: { array: visibleObjects },
});
const matrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];
console.log("matrix", matrix);


let top = 0;
let left = 0;
let right = matrix.length - 1;
let bottom = matrix[0].length - 1;


export const spiralMovement = () => {

  //
  if (matrix.length === 0) {
    console.log("empty");
    return;
  }

  while (top <= bottom && left <= right) {
    //const horizontalMovementRight = () =>
      //this adds a new object to a scene
      movement({
        matrix: matrix,
        color: BOTTOM_COLOR,
        boundaries: { left: top, right:right },
        direction: top,
      });
      console.log("top", top);
      console.log("right", right);
    top++;
   // const verticalMovementDown = () =>
//this adds a new object to a scene
      movement({
        matrix: matrix,
        color: LEFT_COLOR,
        boundaries: { left: top, right: right },
        direction: bottom,
        sense: -1,
      });
      
   
    right--;

//this adds a new object to a scene
    check({
      matrix: matrix,
      selector: { previous: top, next: bottom },
      limit: { left: right, right: left },
      color: LIMIT_DOWN_COLOR,
      result: bottom,
    });
    bottom--;
//this adds a new object to a scene
    check({
      matrix: matrix,
      selector: { previous: left,  next: right },
      limit: { left: bottom,  right: top },
      color: LIMIT_UP_COLOR,
      result: bottom,
    });
    left++;

    //scene.children.length = 0;
 

  }

  controls.update();
  renderer.render(scene, camera);
  
  requestAnimationFrame(spiralMovement);
  //0xff0000
};
