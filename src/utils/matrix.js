import Dot from "../shapes/Dot";
import scene from "../Scene";
import * as THREE from "three";

const maximumCommonDivisor = ({ number }) => {
  let divisor = 1;
  for (let i = 1; i < number; i++) {
    if (number % i === 0) {
      divisor = i;
    }
  }
  return divisor;
};


export const matrixFromArray = ({ origin: { array } }) => {
  if (array.length / 2 != 0) {
    array.pop();
    console.log("array length after pop", array.length)
  }

  if (array.length === 0) {
    console.log("empty");
    return;
  }

  console.log("array length", array.length)
  let rowsCount = maximumCommonDivisor({ number: array.length }) / 2 ;
  console.log("rowsCount", rowsCount)
  rowsCount = rowsCount;
  console.log("rowsCount", rowsCount)
  const columnsCount = array.length / rowsCount;
  console.log("columnsCount", columnsCount)
  const matrix = [];
  for (let i = 0; i < rowsCount; i++) {
    const row = [];
    for (let j = 0; j < columnsCount; j++) {
      row.push(array[i * columnsCount + j]);
    }
    matrix.push(row);
  }
  return matrix;
};

export const check = ({
  matrix,
  selector: { previous, next },
  limit: { left, right },
  color,
  result,
}) => {
  if (previous <= next) {
    for (let i = left; i >= right; i--) {
      const object = new Dot(result, i, matrix[result][i],  color).points;

      scene.add(object);
    }
  }
};

export const movement = ({
  matrix,
  color,
  boundaries: { left, right },
  direction,
  sense = 1,
}) => {
  let value;
  for (let i = left; i < right; i++) {
    if (sense === 1) {
      value = matrix[direction][i];
      if (!value) {

      }
    }
    if (sense === -1) {
      value = matrix[i][direction];

    }

    let object = new Dot(direction, i, value, color).points;

    scene.add(object);
  }
};
