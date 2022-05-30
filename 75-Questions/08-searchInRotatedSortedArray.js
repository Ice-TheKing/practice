/* QUESTION */
// There is an integer array: nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot. For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2]
// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums
// You must write an algorithm with O(log n) runtime complexity.

/* EXAMPLE *//*
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
*/

/* SOLUTION */
// is middle our target? If so, return it
// otherwise, are we in the left or right half of the rotated array (a non-rotated array is left half)
// if our middle value is greater than the right value, we are in the left
// for example: [3,4,5,1,2] middle is 5, left is 3. That means we are to the left of the pivot
// but in this example: [4,5,1,2,3] middle is 1, left is 4. So that means we are to the right of the pivot

// if we are in the left half (left <= middle)
    // is our target greater than middle. Search right
    // otherwise, if our target is smaller than the left most element, search right. If it's greater than the left most element, search left
// else we are in the right half
    // is our target less than the middle. Search left
    // otherwise, if our target is greater than the right most element, search left. If it's smaller than the right most element, search right

const searchRotated = (nums, target) => {
    let start = 0;
    let end = nums.length-1;

    while (start <= end) {
        let middle = Math.ceil((start+end) / 2);

        if (nums[middle] === target) {
            return middle;
        }

        // are we in the left half?
        if (nums[start] <= nums[middle]) {
            // is our target greater than the middle (or smaller than the left most element)
            if (target > nums[middle] || target < nums[start]) {
                // search right
                start = middle+1;
            } else {
                // search left
                end = middle-1;
            }
        } else {
            // we are in the right half
            // if our target is less than the middle (or greater than the right most element)
            if (target < nums[middle] || target > nums[end]) {
                // search left
                end = middle-1;
            } else {
                // search right
                start = middle+1;
            }
        }
    }

    return -1;
};