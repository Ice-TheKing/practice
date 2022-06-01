/* QUESTION */
// There is an m x n rectangular island that borders both the pacific ocean and atlantic ocean. 
// The pacific ocean touches the island's left and top edges and the atlantic ocean touches the island's right and bottom edges

// The island is partitioned into a grid of square cells. you are given an m x n integer matrix: heights where heights[r][c] represents the height above sea level at the coordinate (r, c)

// The island recieves a lot of rain, and the rain water can flow to neighboring cells directly north, south east and west if the neighboring cell's height is less than or equal to the current cell's height.
// Water can flow from any cell adjacent to an  ocean into the ocean

// Return a 2d list of grid coordinates: result where result[i] = [r, c] denotes that rain water can flow from cell [r, c]to both the pacific and atlantic oceans.

/* EXAMPLE *//*

*/

/* SOLUTION */
// Dear God what a wordy problem
// Okay so basically I think we're just doing a pathfinding algorithm and seeing if we can make it to both the pacific and atlantic
// We can keep 2 maps: pacific and atlantic and solve each grid cell. If a cell finds out it can make it to the atlantic or pacific, store it in the map as true. If it finds out it can't, store it as false
// at the end we can iterate through one of the hash maps and for each true value, search the other hash map. If it's true in that one too, then add it to results array
// since we store if they can go to atlantic/pacific, we are calcultaing each cell only once. From that point forward they'll just return their value
// time: o(n * m)
// space: o(n * m)


const waterFlow = (heights) => {
    let pacificMap = new Map();
    let atlanticMap = new Map();

    // fill maps
    for (let r = 0; r < heights.length; r++) {
        for (let c = 0; c < heights[0].length; c++) {
            calculateRainfall(heights, r, c, atlanticMap, pacificMap);
        }
    }

    // iterate one map and see if it's in the other. If so, add it to results
    let result = [];

    // we could optimize this by iterating over the smaller map, but I'm just going to leave it like this right now. The code is already pretty long
    for (let cell of pacificMap) {
        if (cell === true && atlanticMap.get(cell) === true) {
            result.push(destringifyCell(cell));
        }
    }

    return result;
};

// store cells in the map as `${r},${c}` or 'r,c'
const calculateRainfall = (heights, r, c, atlanticMap, pacificMap, checking = new Set()) => {
    // are we already in the maps?
    if (pacificMap.has(stringifyCell(r,c)) && atlanticMap.has(stringifyCell(r,c))) {
        return;
    }

    // if we're already checking a cell, we don't need to check it again
    if (checking.has(stringifyCell(r,c))) {
        return;
    }

    checking.add(stringifyCell(r,c));

    let touchesPacific = false;
    let touchesAtlantic = false;
    

    // check if we touch pacific or atlantic
    if (touchesPacific(heights, r, c)) {
        pacificMap.set(stringifyCell(r,c), true);
        touchesPacific = true;
    }
    if (touchesAtlantic(heights, r, c)) {
        atlanticMap.set(stringifyCell(r,c), true);
        touchesAtlantic = true;
    }

    // recurse on all valid neighbors and check to see if they touch atlantic and pacific
    // up
    if (c-1 > 0 && heights[r][c] >= heights[r][c-1]) {
        calculateRainfall(heights, r, c-1, atlanticMap, pacificMap);
    }

    // left
    if (r-1 > 0 && heights[r][c] >= heights[r-1][c]) {
        calculateRainfall(heights, r-1, c, atlanticMap, pacificMap);
    }

    // right
    if (r+1 < heights.length && heights[r][c] >= heights[r+1][c]) {
        calculateRainfall(heights, r+1, c, atlanticMap, pacificMap);
    }
    
    // down
    if (c+1 < heights[0].length && heights[r][c] >= heights[r][c+1]) {
        calculateRainfall(heights, r, c+1, atlanticMap, pacificMap);
    }

    // check to see if neighbors touch
    // up
    if (atlanticMap.get(stringifyCell(r,c-1)) === true) {
        touchesAtlantic = true;
    }
    if (pacificMap.get(stringifyCell(r,c-1)) === true) {
        touchesPacific = true;
    }

    // left
    if (atlanticMap.get(stringifyCell(r-1,c)) === true) {
        touchesAtlantic = true;
    }
    if (pacificMap.get(stringifyCell(r-1,c)) === true) {
        touchesPacific = true;
    }

    // down
    if (atlanticMap.get(stringifyCell(r+1,c)) === true) {
        touchesAtlantic = true;
    }
    if (pacificMap.get(stringifyCell(r+1,c)) === true) {
        touchesPacific = true;
    }

    // up
    if (atlanticMap.get(stringifyCell(r,c+1)) === true) {
        touchesAtlantic = true;
    }
    if (pacificMap.get(stringifyCell(r,c+1)) === true) {
        touchesPacific = true;
    }

    pacificMap.set(stringifyCell(r,c), touchesPacific);
    atlanticMap.set(stringifyCell(r,c), touchesAtlantic);
};

// touches pacific if r = 0 or c = 0
const touchesPacific = (matrix, r, c) => {
    if (r === 0 || c === 0) {
        return true;
    }

    return false;
};

// touches atlantic of r == matrix.length-1 or c == matrix[0].length-1
const touchesAtlantic = (matrix, r, c) => {
    if (r === matrix.length-1 || c === matrix[0].length-1) {
        return true;
    }

    return false;
};

const destringifyCell = (cell) => {
    // 'r,c'
    return cell.split(',');
};

const stringifyCell = (r, c) => {
    return `${r},${c}`;
};