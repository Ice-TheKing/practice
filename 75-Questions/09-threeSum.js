/* QUESTION */
// Given an integer array: nums, return all the triplets ( nums[i], nums[j], nums[k] ) such that i != j, i != k and j != k, and the sum of all 3 nums == 0.
// Notice that the solution set must not contain duplicate triplets

/* EXAMPLE *//*
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Input: nums = []
Output: []
*/

/* SOLUTION */
// Brute force is to try each combination, let's do it recursively
// We'll store which nums we're using in a boolean array of length n (n = nums.length)

// for each digit, loop through and pick another one, then loop through and pick another
// if our sum is 3, (or our index === nums.length) return an empty array if our current sum doesn't equal 0, or return an array of those 3 numbers if it does

// time complexity = o(2^n * n) since we rebuild the results array at every step. That is a bottleneck so we can actually improve this to just o(2^n) by passing in a results array so we're only building it once
// time complexity = o(n)

const threeSum = (nums) => {
    return recursiveThreeNums(nums);
};

const recursiveThreeNums = (nums, sum = 0, index = 0, numsUsed = [], results = []) => {
    if (numsUsed.length === 3) {
        if (sum === 0) { // valid result
            results.push(...numsUsed);
            return results;
        } else {
            return results; // no result
        }
    }

    if (index >= nums.length) {
        // no more numbers to choose from, not a valid path
        return results;
    }

    numsUsed.push(nums[index]);
    recursiveThreeNums(nums, sum+=nums[index], index+1, numsUsed);
    numsUsed.pop();

    recursiveThreeNums(nums, sum, index+1, numsUsed);

    return results;
};

// wow I really overthought the s*** out of this, lol
// we can basically just do a 2sum for every value in nums. If we sort, we can easily skip over alike numbers so we avoid duplicate triplets
// sorting is o(n log n) time, then we do 2sum o(n) for every element o(n). o(n log n + n^2), so overall our time complexity is o(n^2)

const threeSumOptimized = (nums) => {
    if (nums.length < 3) {
        return [];
    }

    let sorted = nums.sort( (a,b) => { return a-b; } );

    let results = [];

    let previ;

    for (let i = 0; i < sorted.length-2; i++) {
        // skip duplicate numbers
        if (sorted[i] === previ) {
            continue;
        }
        previ = sorted[i];

        // run 2 sum
        let l = i+1;
        let r = sorted.length-1;

        while (l < r) {
            let sum = sorted[i] + sorted[l] + sorted[r]
            if (sum === 0) {
                results.push([sorted[i], sorted[l], sorted[r]]);

                // skip duplicates
                let prevl = sorted[l];
                l++;
                while (sorted[l] === prevl && l < r) {
                    l++;
                }
            } else if (sum > 0) {
                // number too large, move the right pointer in
                let prevr = sorted[r];
                r--;
            } else {
                let prevl = sorted[l];
                // num too small, move the left pointer in
                l++;
            }
        }

    }


    return results;
};