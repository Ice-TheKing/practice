/* QUESTION */
// Given an m x n 2d binary grid: grid which represents a map of 1s (land) and 0s (water) return the number of islands
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or verrtically. You may assume all four edges of the grid are all surrounded by water

/* EXAMPLE *//*

*/

/* SOLUTION */
// Loop through each cell in the matrix. Call countIslands on each cell

// if the cell is out of bounds or a 0 it returns 0
// if the cell is a 1 and has been visited already, it also returns 0
// otherwise the cell adds itself as visited and calls countIslands on each neighboring cell
// returns 1


const numIslands = (grid) => {
    // count each cell
    let count = 0;
    let visitedLand = new Set();

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            count += countIslands(grid, r, c, visitedLand);
        }
    }

    return count;
};

const countIslands = (grid, r, c, visitedLand) => {
    // check bounds
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) {
        return 0;
    }
    // check if the cell is water
    if (grid[r][c] === 0) {
        return 0;
    }
    // has the cell already been checked?
    if (visitedLand.has(stringifyCell(r,c))) {
        return 0;
    }

    visitedLand.add(stringifyCell(r,c));

    // recurse on all neighbors
    countIslands(grid, r+1, c, visitedLand);
    countIslands(grid, r-1, c, visitedLand);
    countIslands(grid, r, c+1, visitedLand);
    countIslands(grid, r, c-1, visitedLand);

    // return 1, because we've found a land (all neighbors will be part of this same island, so we don't need to add them into our total)
    return 1;
};

const stringifyCell = (r, c) => {
    return `${r},${c}`;
};