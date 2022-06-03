/** QUESTION */
// Given an integer array: nums, return the length of the longest strictly increasing subsequence.

/* EXAMPLE *//*
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
*/

/** SOLUTION */
// We can start from the left and figure out the longest subsequence at each position. 
// For each index after, we simply check over all previous elements and see what the longest increasing subsequence we can fit into is
// then our index become the length of that subsequence + 1 (for our number)

// o(n^2) time
// o(n) space

const longestIncreasingSubsequence = (nums) => {
    if (!nums) {
        return null;
    }

    let bestSequence = 1;
    let longestSequence = []; // all sequences can at least have 1 because it in itself is an increasing subsequence
    longestSequence[0] = 1;

    for (let i = 1; i < nums.length; i++) {
        let longestSequence = 0;

        for (let j = i-1; j > 0; j--) {
            // if this number nums[i] can fit over the previous number nums[j], we can figure out the length of that sequence
            if (nums[i] > nums[j]) {
                let length = longestSequence[j];
                // if that is now the longest sequence, then  update our longest sequence
                if (length > longestSequence) {
                    longestSequence = length;
                }
            } 
        }

        // update the longestSequence at i
        longestSequence[i] = longestSequence + 1;

        // is this higher than our best?
        if (longestSequence[i] > bestSequence) {
            bestSequence = longestSequence[i];
        }
    }

    return bestSequence;
};

// Input: nums = [10,9,2,5,3,7,101,18, 9...]
// longestSeq =  [1, 1,1,2,2,3,4,  4]
// return 4

// num: 18, longestSeq: 4