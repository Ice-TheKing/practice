/* QUESTION */
// Given an integer array: nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

/* EXAMPLE *//*
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
*/

/* SOLUTION */
// Brute force, similar to the last problem, is to try every type of subarray
// The approach I took in the last problem was a bit overcomplicated, so I'll try to make it more readable this time around
// o(n^3)/o(n^2) time, depending on if you keep a running total or figure the product from scratch every time. I'll be doing o(n^2)

const maxProductBruteForce = (nums) => {
    let maxProduct;

    for (let i = 0; i < nums.length; i++) {
        let runningProduct = 1; // initialize it to 1

        for (let j = i; j < nums.length; j++) {
            runningProduct *= nums[j];
            if (maxProduct == null || runningProduct > maxProduct) {
                maxProduct = runningProduct;
            }
        }
    }

    return maxProduct;
};

// I think we can probably take what we learned last time and apply it here. The problem is, a very small negative number can quickly turn into a very large positive number quickly... 
// So that means, we should probably keep track of both the biggest number possible at each step AND the smallest number possible. Because if we get a large negative number next, the smallest number will quickly turn into the biggest

const maxProduct = (nums) => {
    let maxProduct = nums[0];
    let prevBiggest = nums[0];
    let prevSmallest = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let newBiggest = Math.max(nums[i], Math.max(prevSmallest*nums[i], prevBiggest*nums[i]));
        let newSmallest = Math.min(nums[i], Math.min(prevSmallest*nums[i], prevBiggest*nums[i]));
        prevBiggest = newBiggest;
        prevSmallest = newSmallest;

        maxProduct = Math.max(maxProduct, prevBiggest);
    }

    return maxProduct;
};
