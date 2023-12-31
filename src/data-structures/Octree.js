import OctreeNode from "../shapes/octree-nodes/OctreeNode";
import * as THREE from "three";
const X_FLAG = 1 << 0;
const Y_FLAG = 1 << 1;
const Z_FLAG = 1 << 2;
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
class Octree {
  root; // : OctreeNode;
  _options; // : Object : { width: number, maxObjects: number };
  _objectMap; // : Map<Object, Points>;
  _objectActionMap; // : Map<Object, string>;
  _objectActionArr; // : Array<Object>;
  constructor(options = {}) {
    options = Object.assign(options, {
      width: 64,
      maxObjects: 6,
    });

    this.root = new OctreeNode(this, null, 0);
    this.root._width = options.width;
    this.root._updateBounds();

    this._options = options;

    // Store references from obj => prevous sphere
    // so we can dirty check it
    this._objectMap = new Map();

    this._objectActionMap = new Map();
    this._objectActionArr = [];
  }
  frustumCast( ...args ) {

	this._runObjectActions();

	return this.root.frustumCast( ...args );

}
  /* Object Updates */
  add(o) {
    this._addObjectAction(o, "add");
  }

  update(o) {
    this._addObjectAction(o, "update");
  }

  remove(o) {
    this._addObjectAction(o, "remove");
  }

  /* Jobs */
  _addObjectAction(object, action) {
    let prevAction = this._objectActionMap.get(object);
    if (!prevAction) {
      const alreadyAdded = this._objectMap.get(object);
      if (alreadyAdded || (!alreadyAdded && action === "add")) {
        this._objectActionMap.set(object, action);
      }
    } else if (prevAction === "add" && action === "remove") {
      this._objectActionMap.delete(object);
    }
  }
  _runAction(o, ac) {
    const add = (o) => {
      const sp = o.boundingSphere.clone();
      this._objectMap.set(o, sp);
      this._addAndTryGrow(o, sp);
    };

    const remove = (o) => {
      const sp = this._objectMap.get(o);

      // TODO: This is pretty slow at the moment
      this.root._search(sp, (n) => n._remove(o));
      this._objectMap.delete(o);
      this._tryShrink();
    };

    const update = (o) => {
      const sp = this._objectMap.get(o);
      if (sp.equals(o.boundingSphere)) return;

      remove(o);

      // TODO: We need to see if the bounding sphere is _outside_ the current
      // root and expand if it is. In add, too
      add(o);
    };

    if (ac === "add") add(o);
    if (ac === "remove") remove(o);
    if (ac === "update") update(o);
  }

  _runObjectActions() {
    this._objectActionMap.forEach((ac, o) => this._runAction(o, ac));
    this._objectActionMap.clear();
  }

  /* Root Grow and Shrink */
  _addAndTryGrow(o, sp) {
    const box = sp.getBoundingBox(new THREE.Box3());

    if (!this.root._bounds.containsBox(box)) {
      // Try to grow back towards zero
      const growDir = this.root._center.clone().multiplyScalar(-1);
      growDir.x = Math.sign(growDir.x) || 1;
      growDir.y = Math.sign(growDir.y) || 1;
      growDir.z = Math.sign(growDir.z) || 1;

      const octant =
        (growDir.x < 0 ? X_FLAG : 0) |
        (growDir.y < 0 ? Y_FLAG : 0) |
        (growDir.z < 0 ? Z_FLAG : 0);

      growDir.multiplyScalar(this.root._width / 2).add(this.root._center);

      const oldRoot = this.root;

      this.root = new OctreeNode(this);
      this.root._width = oldRoot._width * 2;
      this.root._center.copy(growDir);
      this.root._updateBounds();

      // TODO: If the original root is empty it could
      // just be repurposed to fit the first object
      if (
        oldRoot._octantCount > 0 ||
        oldRoot._objects.length > 0 ||
        oldRoot._pendingInserts.length > 0
      ) {
        this.root._nodes[octant] = oldRoot;
        this.root._octantCount++;
        oldRoot._octant = octant;
        oldRoot._parent = this.root;
      }

      this._addAndTryGrow(o, sp);
    } else {
      this.root._addPending(o);
    }
  }


}
export default Octree;
