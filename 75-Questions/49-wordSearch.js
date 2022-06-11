/** QUESTION */
// Given an m x n grid of characters: board and a string: word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
// The same letter cell may not be used more than once


/** SOLUTION */
// Main function: for each cell, check if the cell matches the first character. If it does, start a dfs of the word from that cell.
// If that function returns true, return true, else keep searching
// If we search every cell and have no result, return false

// DFS:
// Backtracking
// Keep a set of visited cells
// Make a choice, explore. If that choice gives us true, return true
// Otherwise, undo that choice and make another choice
// Once we are out of choices, return false

// time: o(n*m*w) w = word.length
// space: o(w)

const wordSearch = (board, word) => {
    if (!word instanceof String) {
        return false;
    }

    let w = word.split('');

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            // DFS from cell
            if (searchForWord(board, word, visited, r, c)) {
                return true;
            }

        }
    }

    // exhausted all options, return false
    return false;
};


const searchForWord = (board, word, visited, r, c, index = 0) => {
    // check bounds
    if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) {
        return false;
    }
    // have we already used this char?
    if (visited.has(stringifyCell(row, col))) {
        return false;
    }
    // character does not match
    if (word[index] !== board[r][c]) {
        return false;
    }

    if (index === word.length-1) {
        // we found a solution
        return true;
    }

    // add this cell to the cells we're checking
    visited.add(stringifyCell(r,c));

    // check all neighbors
    if (searchForWord(board, word, visited, r-1, c, index+1)) return true; // up
    if (searchForWord(board, word, visited, r, c-1, index+1)) return true; // left
    if (searchForWord(board, word, visited, r, c+1, index+1)) return true; // down
    if (searchForWord(board, word, visited, r+1, c, index+1)) return true; // right

    // backtrack choice
    visited.delete(stringifyCell(r,c));

    // no path found
    return false;
};


const stringifyCell = (row, col) => {
    return `${row},${col}`;
};