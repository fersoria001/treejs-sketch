# Three.js Research Proof of Concept

This is a proof of concept of research conducted on the JavaScript library Three.js.

Three.js is a library that provides an engine for rendering graphics through WebGL. To visualize 3D graphics, we need to instantiate the base classes: Camera, Renderer, and Scene. Each rendering is composed of a Geometry, defining the position and shape, a Material specifying color and textures, and an object that inherits from Three.js 3DObject, representing the visible part of the rendering added to a scene.

In this example, I use basic shapes to initially render a point with an XYZ position. I opted for the Point class because a point represents a single dot. To construct more complex shapes with these dots, I organized them into a LinkedList structure and later into a Graph.

These custom data structures do not render by themselves; they simply instantiate the Dot class as nodes in the Graph. They have a method to connect the dots with an Edge, which is an object that, given two nodes, draws a Three.js Line connecting them and can be added to an Octree.

With these new custom objects, the need arises for custom translation, rotation, camera control, and shape manipulation. To address this, I developed a Finite State Machine interface implemented in the Automata class. It encapsulates states that enable control of translation and rotation with a fixed rotational axis defined as a point with XYZ coordinates. This axis can be fixed using the Three.js Quaternion class to rotate or serve as a reference point for applying translation to nodes and edges. The "flexion" state allows for using an edge as a hinge to manipulate the faces of a cube, although it's not yet fully implemented.

The cube is constructed using a utility function, createCube(), with a constant matrix of Vector3 vertices and connections between them.

Regarding the Octree suggestion by Gustavo Camargo, I conducted research on the subject and found that Octrees are often used to create and organize the world hierarchically, improving culling processes and enabling collision detection among objects inside it. I implemented the Octree, which includes OctreeNodes. Any object added to the Octree must have a precomputed boundingSphere and boundingBox property, with library methods available to assist in this task. The primary public method in use is frustumCast, which identifies objects that have bounding volumes intersecting with the tree and should be visible. Frustums determine what lies inside a camera's field of view, helping to optimize rendering by excluding objects located outside the frustum.

## Installation:

1. Run `npm install`

## Running the Program:

1. Run `npx vite`
2. The program will run on `localhost:5173` by default.

## Manipulating the Form:

- The initial state is STATIC. To switch states, use the following keys:
  - `R/r` => Rotational state with left/right arrow keys to rotate.
  - `T/t` => Translational state with left/right/up/down arrow keys to translate.
  - `F/f` => Flexion state with left/right arrows to select the hinge (flexion is not fully implemented yet).
  - `S/s` => Static state with no controls.
- You can also use the mouse to control the camera, and the mouse3 button to zoom.

## Additional Notes:

- JavaScript is used because of the unofficial support for TypeScript, but TypeScript might be needed for better bug detection.
- The approach is based on rendering vector3 (xyz) arrays of data, allowing for the application of linear algebra and geometry to optimize time and space complexity.
- There are more efficient ways to traverse the graph nodes and edges, but these are skipped in this example since it's not a final version.

## Bibliography:

1. **Three.js Documentation**

   - [Three.js Documentation](https://threejs.org/docs)

2. **Advanced Octrees: 2-Node Representations**

   - [Advanced Octrees: 2-Node Representations](https://geidav.wordpress.com/2014/08/18/advanced-octrees-2-node-representations/)

3. **Three.js Octree GitHub Repository**

   - [Three.js Octree GitHub Repository](https://github.com/gkjohnson/threejs-octree/tree/master)

4. **Octree Insertion and Searching**

   - [Octree Insertion and Searching](https://www.geeksforgeeks.org/octree-insertion-and-searching/)

5. **What is a Finite State Machine?**

   - [What is a Finite State Machine?](https://medium.com/@mlbors/what-is-a-finite-state-machine-6d8dec727e2c)

6. **Automata, Computability, and Complexity (MIT OpenCourseWare)**

   - [Automata, Computability, and Complexity (MIT OpenCourseWare)](https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/)

7. **Finite State Machine - Middle Tennessee State University**

   - [Finite State Machine - Middle Tennessee State University](https://www.cs.mtsu.edu/~xyang/3080/fsm.html#:~:text=A%20finite%20state%20machine%20is,another%20is%20called%20a%20transition.)

8. **Data Structure and Algorithm Analysis, 3rd Edition (C++) by Mark Allen Weiss**
9. **Design Patterns: Elements of Reusable Object-Oriented Software by Erich Gamma (Author), Richard Helm (Author), Ralph Johnson (Author),**

10. **Introduction to Linear Algebra, 5th Edition (Howard Anton)**
