/** QUESTION */
// You are given an n x n 2d matrix representing an image. Rotate the image by 90 degrees (clockwise).
// You have to rotate the image in place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.


/** SOLUTION */
// Do the rotation in-place by swapping 4 values at a time
// let i = 0+level; i < array.length -1 - level

const rotateImage = (matrix) => {
    let level = 0;
    for (let row = 0; row < matrix.length / 2; row++) {
        for (let col = level; col < matrix.length-1-level; col++) {
            rotateValues(matrix, row, col);
        }
        level++;
    }
};

const rotateValues = (matrix, row, col) => {
    const lastIndex = matrix.length-1;

    const temp = matrix[row][col];
    matrix[row][col] = matrix[lastIndex-col][row]; // top cell becomes the left cell
    matrix[lastIndex-col][row] = matrix[lastIndex-row][lastIndex-col]; // left cell becomes bottom cell
    matrix[lastIndex-row][lastIndex-col] = matrix[col][lastIndex-row]; // bottom cell becomes right cell
    matrix[col][lastIndex-row] = temp; // right cell becomes top cell
};

let array = [
    [5,1,9,11],
    [2,4,8,10],
    [13,3,6,7],
    [15,14,12,16]
];
rotateImage(array);
console.log(array);