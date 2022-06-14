/** QUESTION */
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m-1][n-1]). 
// The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner

/* EXAMPLE *//*
Input: m = 3, n = 7
Output: 28
*/

/** SOLUTION */
// Let's solve this recursively with DFS
// At any given cell, we return the number of ways we can reach the bottom right from the right cell, + num ways from the down cell
// This is o(2^n*m), but we can improve it to o(m*n) by memoizing it so we only calculate each cell once
// we also have o(m*n) space because we are storing every cell as a result in the memo, and there are m*n cells

const uniquePaths = (m, n, memo = new Map()) => {
    if (m < 1 || n < 1) {
        return 0; // out of bounds
    }
    if (m === 1 && n === 1) {
        // the number of ways we can find the path to the end in a 1x1 cell is 1
        return 1;
    }

    if (memo.has(stringifyTable(m,n))) {
        return memo.get(stringifyTable(m,n));
    }

    let down = uniquePaths(m-1, n, memo);
    let right = uniquePaths(m, n-1, memo);

    memo.set(stringifyTable(m,n), down+right);
    return down + right;
};

const stringifyTable = (m, n) => {
    return `${m},${n}`;
};

console.log(uniquePaths(3,2)); // expected: 3
console.log(uniquePaths(3,7)); // expectted: 28
console.log(uniquePaths(23,12)); // expected: 193536720

// 3,2 return 3
    // 2,2 return 2
        // 2,1 return 1
            // 1,1 return 1
        // 1,2 return 1
            // 1,1 return 1
    // 3,1 return 1
        // 2,1 return 1
            // 1,1 return 1