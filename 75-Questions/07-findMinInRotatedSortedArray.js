/* QUESTION */
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array: nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Given the sorted rotated array nums of unique elements, return the minimum element of this array.
// You must write an algorithm that runs in O(log n) time.

/* EXAMPLE *//*
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
*/

/* SOLUTION */
// The brute force approach is obviously to just loop through the array and return the min value
// o(log n) time tells me that we should be performing some kind of binary search on the array.
// The tricky part is, we have no idea what we're looking for or where in the array it might be. For all we know, it could be the middle element!

// in our example:
// nums = [3,4,5,1,2]

// we notice that the right element of the array is actually less than the left element of the array. That should indicate that the lowest value is in the right of the array
// nums = [5,1,2,3,4]
// [4,5,6,7,0,1,2]
// [2,4,5,6,7,0,1]
// [5,6,7,0,1,2,4]
// [0,1,2,4,5,6,7]


// left should be smaller, right should be bigger

// if the middle element is greater than the right most element, our target is in the right half (exclusive of the middle element)
// otherwise the target is in the left half (inclusive of the middle element)

// if we have one element left, return it
// if we have two elements, return the smallest

const findMin = (nums) => {
    let start = 0;
    let end = nums.length-1;

    while (end - start > 1) {
        let middleIndex = Math.ceil((start+end)/2);
        if (nums[middleIndex] > nums[end]) {
            // target is in right half (exclusive of middle)
            start = middleIndex+1;
        } else {
            // target is in the left half (inclusive of middle)
            end = middleIndex;
        }
    }

    if (end - start === 1) {
        // two elements left in the array (end == 1, start == 0 gives us end - start === 1, which means theres two elements left)
        // return the minimum
        return nums[start] < nums[end] ? nums[start] : nums[end];
    }

    return nums[start];
};
//  0 1 2 3 4 5 6
// [0,1,2,4,5,6,7]
//  s           e
//        


// 
// [5,6,7,0,1,2,4]
// [0,1,2,4,5,6,7]