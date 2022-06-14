/** QUESTION */
// You are given ana integer array: nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.

/* EXAMPLE *//*
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
*/

/** SOLUTION */
// Let's solve this recursively with DFS
// We can memoize each cell to improve the runtime complexity to o(n)
// Space complexity will also be o(n) since we are storing a set of each cell
// Recursion happens as following:
// if index > nums.length, return false
// else, for (let i = 0; i < nums[index]; i++) check cell at nums[index+i]
// if any of those return true, return true
// else return false

const canJump = (nums, index = 0, memo = new Map()) => {
    if (index >= nums.length) {
        return false;
    }
    if (index === nums.length-1) {
        
        return true;
    }
    if (memo.has(index)) {
        return memo.get(index);
    }

    // make every jump from this cell
    for (let i = Math.min(nums.length, nums[index]); i > 0; i--) { // small optimization - if we have an array of length 3, [100000000,1000000,1000000] we don't need to check all 100000000 steps. The most we ever have to check is the length of the array
        if (canJump(nums, index+i, memo)) {
            memo.set(index, true);
            return true;
        }
    }

    // no paths returned a result
    memo.set(index, false);
    return false;
};

console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false