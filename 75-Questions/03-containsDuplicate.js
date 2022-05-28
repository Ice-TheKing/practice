/* QUESTION */
// Given an integer array: nums, return true if any value appears at least twice in the array, and return false if every element is distinct

/* EXAMPLE *//*
Input: nums = [1,2,3,1]
Output: true

*/

/* SOLUTION */
// Step through the array, check if that value exists in our set. If it does, return false. If it doesn't, add it and keep going
// o(n) time
// o(n) space

const containsDuplicate = (nums) => {
    let numSet = new Set();

    for (let i = 0; i < nums.length; i++) {
        if (numSet.has(nums[i])) {
            return true;
        }

        numSet.add(nums[i]);
    }

    return false;
};