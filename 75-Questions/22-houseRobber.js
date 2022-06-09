/** QUESTION */
// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed
// the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will 
// automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array: nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police

/* EXAMPLE *//*
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.


Input: nums = [2,7,9,3,1,14]
*/

/** SOLUTION */
// going backward in the array, store the best we can do at each position. We do this by checking our best at i+2 and i+3 (since if we go to this space, we can't go to the next one)
// note: we check i+2 AND i+3 because skipping two might be adventageous. Like in this case: [2,7,9,3,1,14] our best combination is 2, 9, 14, but after 9 we skip two houses to reach 14
// however, we don't need to skip to i+4 or later, because in the case of [2,7,9,3,1,14,500] we might as well take the 1 between 9 and 500, and end up with 2, 9, 1, 500

// our anwer should be the max of index 0 or 1 in our table, so that is what we return

const houseRobber = (nums) => {
    // nums.length === 1 is a case where we will go out of bounds
    if (nums.length === 1) {
        return nums[0];
    }
    // nums.length === 2 will not go out of bounds, because we will skip the loop and return the max between them

    let table = Array(nums.length+1).fill(0); // length + 1 because we want our first check of i+2 and i+3 to be in bounds

    // the last two indexes are just their values, since we can't visit both
    table[nums.length-1] = nums[nums.length-1];
    table[nums.length-2] = nums[nums.length-2];

    // iterate from there to 0 filling elements
    for (let i = nums.length-3; i >= 0; i++) {
        let bestNext = math.Max(table[i+2], table[i+3]);
        table[i] = nums[i] + bestNext;
    }

    // our answer will be table[0] or table[1]
    return Math.max(table[0], table[1]);
};