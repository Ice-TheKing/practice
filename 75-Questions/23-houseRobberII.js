/** QUESTION */
// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. 
// That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if
// two adjacent houses were broken into in the same night.

// Given an integer array: nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

/* EXAMPLE *//*
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
*/

/** SOLUTION */
// I'm thinking we might be able to make each node keep a running total of how much it can make in two cases:
// If it includes the first index
// If it doesn't include the first index

// Then when calculating the final index, we find the best value we can select of the ones that don't include the first index


// also last time I did the table in reverse order. I think it makes more sense to do it in forwards order, so let's do that here

const houseRobberII = (nums) => {
    if (!nums) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0]
    }
    if (nums.length === 2) {
        // we might skip both the first and last index here, so we need to check for the case where there's only two here
        return Math.max(nums[0], nums[1]);
    }

    let table = Array(nums.length).fill(0);

    // prefill the best cases in nums[0] and nums[1]
    table[0] = { withFirst: nums[0], withoutFirst: 0 };
    table[1] = { withFirst: 0, withoutFirst: nums[1] };
    
    for (let i = 2; i < nums.length-1; i++) {
        // we can look two behind or three behind
        let withFirst;
        let withoutFirst;

        if (table[i-3]) {
            withFirst = nums[i] + Math.max(table[i-2].withFirst, table[i-3].withFirst || 0);
            withoutFirst = nums[i] + Math.max(table[i-2].withoutFirst, table[i-3].withoutFirst || 0);
        } else {
            withFirst = nums[i] + table[i-2].withFirst;
            withoutFirst = nums[i] + table[i-2].withoutFirst;
        }
        
        table[i] = { withFirst, withoutFirst };
    }

    // calculate the final cell
    if (nums.length > 3) {
        table[nums.length-1] = nums[nums.length-1] + Math.max(table[nums.length-3].withoutFirst, table[nums.length-4].withoutFirst);
    } else {
        table[nums.length-1] = nums[nums.length-1] + table[nums.length-3].withoutFirst;
    }
    

    // collapse all cells into the best value at each index
    for (let i = 0; i < nums.length-1; i++) {
        table[i] = Math.max(table[i].withFirst, table[i].withoutFirst);
    }

    // return the highest value of the last 3 elements in the array. 
    // Why the last 3? because it might be adventageous to skip 2 houses in a row 
    // for example: [1400, 1, 1, 1400, 1, 1, 1400, 1, 1] our answer would be stored in the 3rd from the last index
    return Math.max(table[table.length-1], Math.max(table[table.length-2], table[table.length-3]));
};

console.log(houseRobberII([2,2,3])); // expected: 3
console.log(houseRobberII([1,2,3,1])); // expected: 4
console.log(houseRobberII([1,2,3,1,7])); // expected: 10
console.log(houseRobberII([1400,1,1,1400,1,1])); // expected: 2800



/* MANUAL TESTING *//*
[1,2,3,1]
Expected: 4

with: 1, without: 0
with: 0, without: 2
with: 4, without: 3
3

collapse:
[1,2,4,3]
return the max of the final 3 indices: 4. Passed


[1,2,3,1,7]
Expected: 10

with: 1, without: 0
with: 0, without: 2
with: 4, without: 3
with: 2, without: 3
10

collapse:
[1,2,4,3,10]
return the max of the final 3 indices: 10. Passed


[1400, 1, 1, 1400, 1, 1]
expected: 2800

with: 1400, without: 0
with: 0, without: 1
with: 1401, without: 1
with: 2800, without: 1401
with: 1402, without: 2
1402

[1400, 1, 1401, 2800, 1401, 1402]
return the max of the final 3 indices: 2800. Passed
*/