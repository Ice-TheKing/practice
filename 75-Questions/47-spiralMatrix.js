/** QUESTION */
// Given an m x n matrix, return all elements of the matrix in spiral order.


/** SOLUTION */
// Make a function that takes a direction (enum) and gives back a direction (num).
// Start with direction: right, keep going right until the next value is out of bounds OR in the set
// Change direction with our direction helper function
// base case: set.length is the same as m*n

const directionEnum = {
    right: 'right',
    down: 'down',
    left: 'left',
    up: 'up',
    invalid: 'invalid'
};

const matrixZeroes = (matrix) => {
    let results = [];
    let visited = new Set();

    let row = 0;
    let col = 0;
    let direction = directionEnum.right;

    // while we have a valid direction
    while (direction !== directionEnum.invalid) {
        // add current cell
        results.push(matrix[row][col]);
        visited.add(stringifyRowCol(row, col));

        // update row, col & direction
        [ row, col, direction ] = getMove(matrix, visited, row, col, direction);
    }

    return results;
};

// takes the matrix, visited set, ow, col and direction. 
// Returns the next row/col for the next valid move and the direction it's currently traveling
// Returns: [row, col, direction]
const getMove = (matrix, visited, row, col, direction, calls = 0) => {
    // if we check all directions and none give us an unvisited cell, we are done, no moves left
    if (calls > 3) { // this could technically be calls > 1, because if we do a 180 we are guarunteed to check a visited cell, since it's the cell we came from last call
        return [-1, -1, directionEnum.invalid];
    }

    switch (direction) {
        case directionEnum.right:
            if ( inBounds(matrix, row, col+1) && !visited.has(stringifyRowCol(row, col+1) )) {
                return [ row, col+1, direction.right ];
            }
        case directionEnum.down:
            if (inBounds(matrix, row+1, col) && !visited.has(stringifyRowCol(row+1, col) )) {
                return [ row+1, col, direction.down ];
            }
        case directionEnum.left:
            if (inBounds(matrix, row, col-1) && !visited.has(stringifyRowCol(row, col-1) )) {
                return [ row, col-1, direction.left ];
            }
        case directionEnum.up:
            if (inBounds(matrix, row-1, col) && !visited.has(stringifyRowCol(row-1, col) )) {
                return [ row-1, col, direction.up ];
            }
        default:
            // if the move is not valid, try with the next direction (all cases overflow here if they aren't in bounds)
            return move(matrix, row, col, changeDirection(direction), calls+1);
    }
};

const inBounds = (matrix, row, col) => {
    let rowInBounds = 0 <= row && row < matrix.length;
    let colInBounds = 0 <= col && col < matrix[0].length;

    return rowInBounds && colInBounds;
};

// takes a direction and returns the next direction
const changeDirection = (direction) => {
    switch (direction) {
        case directionEnum.right:
            direction = directionEnum.down;
            break;
        case directionEnum.down:
            direction = directionEnum.left;
            break;
        case directionEnum.left:
            direction = directionEnum.up;
            break;
        case directionEnum.up:
            direction = directionEnum.right;
            break;

    }

    return direction;
};

const stringifyRowCol = (row, col) => {
    return `${row},${col}`;
};