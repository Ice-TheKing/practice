/** QUESTION */
// Given an array of distinct integers: nums and a target integer: target, return the number of possible combinations that add up to target.

/* EXAMPLE *//*
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.

Input: nums = [9], target = 3
Output: 0
*/

/** SOLUTION */
// Memoized solution

const comboSumMemoized = (nums, target, memo = new Map()) => {
    if (target = 0) {
        return 1; // one way to find 0: choose no numbers
    }
    if (target < 0) {
        return 0; // overshot our target
    }
    if (memo.has(target)) {
        return memo.get(target); // we've already solved this before
    }

    let numWays = 0;

    // try each num
    for (let num of nums) {
        numWays += comboSumMemoized(nums, target-num, memo);
    }

    memo.add(target, numWays);
    return numWays;
};

// Tabulated solution

const comboSumTabulated = (nums, target) => {
    let table = Array(target+1).fill(0); // table[target] === our solution
    table[0] = 1; // one way to generate zero: by choosing no nums

    for (let i = 0; i <= target; i++) {
        // if we can generate this sum
        if (table[i] > 0) {
            for (let num of nums) {
                table[i+num] += table[i]; // if we have 2 ways to get here, we have 2 ways to get to the next num too
            }
        }
    }

    return table[target];
};

// time: o(n*m) | n = target, m = nums.length
// space: o(n)