import IState from "./IState";

class FlexState extends IState {
  dataStructure3D;
  currentIndex;
  currentEdge;

  constructor() {
    super();
  }
  enter({ dataStructure3D }) {
    this.dataStructure3D = dataStructure3D;
  }

  next() {
    this.currentEdge = this.dataStructure3D.next();
    console.log(this.currentEdge);
    // console.log(this.dataStructure3D.contraryEdge(this.currentEdge));
  }

  prev() {
    this.currentEdge = this.dataStructure3D.prev();
    console.log(this.currentEdge);
  }

  open() {
    const node1Position =
      this.currentEdge.node1.geometry.attributes.position.array;
    const node2Position =
      this.currentEdge.node2.geometry.attributes.position.array;
    console.log(node1Position);
    console.log(node2Position);

    // Create a copy of node1Position
    const newPos = [...node1Position];
    const newPos2 = [...node2Position];
    // Loop through the elements of newPos and modify them
    for (let i = 0; i < newPos.length; i++) {
      if (newPos[i] === 1) {
        newPos[i] += 1; // Increment by 1
      } else if (newPos[i] === 2) {
        newPos[i] -= 1; // Decrement by 1
      }
    }
    for (let i = 0; i < newPos2.length; i++) {
      if (newPos2[i] === 1) {
        newPos2[i] += 1;
      } else if (newPos2[i] === 2) {
        newPos2[i] -= 1;
      }
    }
    for (const edge of this.dataStructure3D._edges) {
      if (
        edge.node1.geometry.attributes.position.array === newPos &&
        edge.node2.geometry.attributes.position.array === newPos2
      ) {
        console.log(edge.node1.geometry.attributes.position.array);
        console.log(edge.node2.geometry.attributes.position.array);
      }
    }
  }
}
export default FlexState;
