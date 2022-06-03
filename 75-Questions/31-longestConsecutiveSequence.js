/* QUESTION */
// Given an unsorted array of integers: nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in o(n) time

/* EXAMPLE *//*
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
*/

/* SOLUTION */
// One optimized solution is o(n log n): sort the array and then find the longest consecutive sequence

const longestConsecutiveSequence = (nums) => {
    nums = nums.sort((a,b) => {return a - b}); // base sort likes to think -20 is larger than 1

    longestConsecutive = 1;

    // loop through nums
    let thisSequence = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            thisSequence+=1;
        } else if (nums[i] - nums[i-1] === 1) {
            thisSequence += 1;
        } else {
            // is this sequence longest?
            if (thisSequence > longestConsecutive) {
                longestConsecutive = thisSequence;
            }

            // reset counter
            thisSequence = 1;
        }
    }

    return Math.max(longestConsecutive, thisSequence);
};

// brute force approach o(n^2)
// add each node to a set. For each element, check the set for a consecutive number (and keep checking)

const longestConsecutiveBrute = (nums) => {
    let numsSet = new Set();

    for (let i = 0; i < nums.length; i++) { // o(n)
        numSet.add(nums[i]);
    }

    let longestConsecutive = 0;

    for (let num of numsSet) { // o(n)
        let thisNum = num;
        let thisSequence = 1;
        while (numsSet.has(thisNum+1)) { // o(n)
            thisSequence += 1;
            thisNum = numSet.get(thisNum);
        }
        if (thisSequence > longestConsecutive) {
            longestConsecutive = thisSequence;
        }
    };

    return longestConsecutive;
};

// optimized: what if we kept a hash map with a running total of how many consecutive numbers we've found so far? We'll basically be creating chains
// then if we find one that collides we'll merge the counts together

const longestConsecutiveOptimized = (nums) => {
    let numsMap = new Map();

    for (let i = 0; i < nums.length; i++) { // o(n)
        numsMap.set(nums[i], [i,i]); // start, end
    }

    let longestConsecutive = 0;

    for (let [num, [start, end]] of numsMap) { // o(n)

        // check consecutive number above us
        let above = numsMap.get(end+1); // [start, end]
        let below = numsMap.get(start-1); // [start, end]

        let newStartEnd = [start, end];

        // If we have both above and below, we need to stitch them together
        if (above && below) {
            newStart = below[0]; // take below's start
            newEnd = above[1]; // take above's end
            newStartEnd[0] = below[0];
            newStartEnd[1] = above[1];
            numsMap.set(newStart, newStartEnd); // update the values on either end to the new range
            numsMap.set(newEnd, newStartEnd); // update the values on either end to the new range
        } else if (above) {
            newStart = start;
            newEnd = below[1]; // take above's end
            numsMap.set(newEnd, newStartEnd); // update the top most value to the new range
        } else if (below) {
            newStart = below[0]; // take below's start
            newEnd = end;
            numsMap.set(newStart, newStartEnd); // update the bottom most value to the new range
        }

        numsMap.set(num, [newStart, newEnd]);

        // calculate the new consecutiveSequence length
        if (newEnd - newStart+1 > longestConsecutive) { // element is included in its own sequence, so we add 1 (100 - 100 is an increasing subsequence of 1)
            longestConsecutive = newEnd - newStart+1;
        }
    };

    return longestConsecutive;
};

/* Test *//*
Input: nums = [100,4,200,1,3,2]
Expected: 4

longestSequence = 4

above = [1,2]
below = null
newStart = 1
newEnd = 4

numsMap: 
100 = [100, 100]
4   = [1, 4]
200 = [200, 200]
1   = [1, 4]
3   = [1, 4]
2   = [1, 4]

return 4

*/