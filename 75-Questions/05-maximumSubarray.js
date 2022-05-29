/* QUESTION */
// Given an integer array: nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
// A subarray is a contiguous part of an array

/* EXAMPLE *//*
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

-2,-1,-4,0,-1,1,2,-3,1
*/

/* SOLUTION */
// Brute force: check every subarray
// o(n^3)

const maximumSubarrayBruteForce = (nums) => {
    let end = nums.length-1;

    let greatestSum;

    while (end >= 0) {

        let start = 0;
        while (start <= end) {
            // total up the sum
            let thisSum = getSumByIndices(nums, start, end);

            if (!greatestSum || thisSum > greatestSum) {
                greatestSum = thisSum;
            }

            start++;
        }
        end--;
    }
    
    return greatestSum;
};

const getSumByIndices = (nums, start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum+= nums[i];
    }
    return sum;
};


// we can optimize this a bit by making a total sum in one pass, and then we don't have to keep counting up the sum. This will reduce our time complexity to o(n^2)
// time: o(n^2)
// space: o(1)

const maximumSubarrayBruteForceOptimized = (nums) => {
    let totalSum = 0;
    for (let i = 0; i < nums.length; i++) {
        totalSum += nums[i];
    }

    let end = nums.length-1;

    let greatestSum;

    while (end >= 0) {
        let start = 0;
        let runningSum = totalSum;

        while (start <= end) {
            if (!greatestSum || runningSum > greatestSum) {
                greatestSum = runningSum;
            }

            runningSum -= nums[start];
            start++;
        }
        totalSum -= nums[end];
        end--;
    }
    
    return greatestSum;
};

// [-1,0]
// expected: 0
// totalSum = -1;

/*
[-1, 0] Total sum: -1
    [-1, 0] Running sum: -1 -> best
    [0] Running sum: 0 -> best
[-1] Total sum: -1
    [-1] Running sum: -1
*/


// nums = [-2,1,-3,4,-1,2,1,-5,4]
// Expected: 6

/*
[-2,1,-3,4,-1,2,1,-5,4] Total sum: 1
    [-2,1,-3,4,-1,2,1,-5,4] Running sum: 1 -> best
    [1,-3,4,-1,2,1,-5,4] Running sum: 3 -> best
    [-3,4,-1,2,1,-5,4] Running sum: 2
    [4,-1,2,1,-5,4] Running sum: 5 -> best
    [-1,2,1,-5,4] Running sum: 1
    [2,1,-5,4] Running sum: 2
    [1,-5,4] Running sum: 0
    [-5,4] Running sum: -1
    [4] Running sum: 4

[-2,1,-3,4,-1,2,1,-5] Total sum: -3
    [-2,1,-3,4,-1,2,1,-5] Running sum: -3
    [1,-3,4,-1,2,1,-5] Running sum: -1
    [-3,4,-1,2,1,-5] Running sum: -2
    [4,-1,2,1,-5] Running sum: 1
    [-1,2,1,-5] Running sum: -3
    [2,1,-5] Running sum: -2
    [1,-5] Running sum: -4
    [-5] Running sum: -5


[-2,1,-3,4,-1,2,1] Total sum: 2
    [-2,1,-3,4,-1,2,1] Running sum: 2
    [1,-3,4,-1,2,1] Running sum: 4
    [-3,4,-1,2,1] Running sum: 3
    [4,-1,2,1] Running sum: 6 -> best
    [-1,2,1] Running sum: 2
    [2,1] Running sum: 3
    [1] Running sum: 1


[-2,1,-3,4,-1,2] Total sum: 1
    [-2,1,-3,4,-1,2] Running sum: 1
    [1,-3,4,-1,2] Running sum: 3
    [-3,4,-1,2] Running sum: 2
    [4,-1,2] Running sum: 5
    [-1,2] Running sum: 1
    [2] Running sum: 2


[-2,1,-3,4,-1] Total sum: -1
    [-2,1,-3,4,-1] Running sum: -1
    [1,-3,4,-1] Running sum: 1
    [-3,4,-1] Running sum: 0
    [4,-1] Running sum: 3
    [-1] Running sum: -1


[-2,1,-3,4] Total sum: 0
    [-2,1,-3,4] Running sum: 0
    [1,-3,4] Running sum: 2
    [-3,4] Running sum: 1
    [4] Running sum: 4


[-2,1,-3] Total sum: -4
    [-2,1,-3] Running sum: -4
    [1,-3] Running sum: -2
    [-3] Running sum: -3


[-2,1] Total sum: -1
    [-2,1] Running sum: -1
    [1] Running sum: 1


[-2] Total sum: -2
    [-2] Running sum: -2

return 6

*/


// Dynamic programming solution
// if we know the best contiguous subarray answer to the previos index, we can figure out if it's better to use that and add the current index, or only use the current index
// o(n) time
// o(n) space (if you use an array) o(1) (if you only store the previous and best value. I'll be doing this in this problem)

const maximumSubarray = (nums) => {
    let bestSum = nums[0];
    let prevBest = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // do I add onto the last best? Or is it better to only use this value
        prevBest = Math.max(prevBest + nums[i], nums[i]);
        
        if (prevBest > bestSum) {
            bestSum = prevBest;
        }
    }

    return bestSum;
};