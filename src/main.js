//import Octree from "./data-structures/Octree";
import * as THREE from "three";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import DotGraph3D from "./data-structures/DotGraph3D";
// import Automata from "./Automata";
// import StateController from "./controllers/StateController";
// import RotationalController from "./controllers/RotationalController";
// import TranslationalController from "./controllers/TraslationalController";
// import FlexController from "./controllers/FlexController";
// import { createCubeAndConnectFaces, calculateCenter } from "./utils/createCube";

import { spiralMovement } from "./utils/spiralMovement";



// Create an octree
// const octree = new Octree();
// // Create your graph and add objects to the octree
// const graph = new DotGraph3D();
// createCubeAndConnectFaces(graph);
// const cubeCenter = calculateCenter();
// graph.add(cubeCenter.x, cubeCenter.y, cubeCenter.z, 0x00ff00, 0.2);

// const axisNode = graph.get(24); //get the center of the cube
// const automata = new Automata();
// const stateController = new StateController(automata, axisNode, octree, graph);
// const rotationalController = new RotationalController(automata, axisNode);
// const translationalController = new TranslationalController(automata, axisNode);
// const flexController = new FlexController(automata);
// automata.dispatch("enter", [{ octree: octree, dataStructure3D: graph }]);
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// const visibleObjects = octree.frustumCast(frustum);


  spiralMovement();
// function animate() {
//   controls.update();
//   // camera.updateMatrixWorld();
//   // camera.updateProjectionMatrix();
//   cameraHelper.update();
//   // const frustum = new THREE.Frustum();
//   // frustum.setFromProjectionMatrix(
//   //   camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse)
//   // );

//   //Matrix: [matrix.length/2][matrix.length/2]

//   // const clearScene = (scene) => {
//   //   scene.children.length = 0;
//   // };
//   // clearScene(scene);
//   spiralMovement(original_matrix);
//   // Render the scene
//   renderer.render(scene, camera);

//   // Request the next frame
//   requestAnimationFrame(animate);
// }

// // Start the animation loop
// animate();

//verticalMovementDown({matrix,top,right,left,bottom});
