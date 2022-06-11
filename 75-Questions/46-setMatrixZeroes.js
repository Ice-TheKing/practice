/** QUESTION */
// Given an m x n integer matrix: matrix, if an element is 0, set its entire row and column to 0s
// You must do it in place


/** SOLUTION */
// 1) make two booleans for whether the first row & first column should be zeroed out, and two arrays
// 2) go through each cell, and if it's marked as 0, change that row's first column as 0 and that column's first row as 0
// 3) loop through each row (except the first) and zero out each row that starts with a zero
// 4) loop through each column (except the first) and zero out each column that starts with a zero
// 5) if zeroFirstRow, zero out the first row. Same with zeroFirstCol

const matrixZeroes = (matrix) => {
    let zeroFirstCol = false;
    // check first col of every row
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[i][0] === 0) {
            zeroFirstCol = true;
        }
    }

    let zeroFirstRow = false;
    // check first row of every col
    for (let col = 0; col < matrix[0].length; col++) {
        if (matrix[0][col] === 0) {
            zeroFirstRow = true;
        }
    }

    // loop through the rest of the matrix and superimpose zeroes on the top row/first column
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 1; col < matrix[0].length; col++) {
            if (matrix[row][col] === 0) {
                matrix[0][col] = 0;
                matrix[row][0] = 0;
            }
        }
    }

    // go through row/col again and zero out those columns (skip first row)
    for (let row = 1; row < matrix.length; row++) {
        if (matrix[row][0] === 0) {
            zeroRow(matrix, row, 1);
        }
    }

    for (let col = 1; col < matrix[0].length; col++) {
        if (matrix[0][col] === 0) {
            zeroColumn(matrix, col, 1);
        }
    }

    if (zeroFirstRow) {
        zeroRow(matrix, 0, 0);
    }

    if (zeroFirstCol) {
        zeroColumn(matrix, 0, 0);
    }

    return matrix;
};

const zeroColumn = (matrix, col, start) => {
    for (let row = start; row < matrix.length; row++) {
        matrix[row][col] = 0;
    }
};

const zeroRow = (matrix, row, start) => {
    for (let col = start; col < matrix[0].length; col++) {
        matrix[row][col] = 0;
    }
};