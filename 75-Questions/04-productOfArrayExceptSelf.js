/* QUESTION */
// Given an integer array: nums, return an array: answer such that answer[i] is equal to the product of all elements of nums except nums[i]
// You must write an algorithm that runs in o(n) time and without using division

/* EXAMPLE *//*
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
*/

/* SOLUTION */
// Okay let's start with the brute force solution
// this definitely isn't o(n) but let's start there anyway
// the brute force way to do this is at each index, go through each index and multiply them. Insert that result into answers[i]
// time: o(n^2)

const productOfArrayBruteForce = (nums) => {
    let answers = [];

    for (let i = 0; i < nums.length; i++) {
        answers[i] = findProduct[i];
    }

    return answers;
};

const findProduct = (nums, index) => {
    let total = 1;

    for (let i = 0; i < nums.length; i++) {
        if (i !== index) {
            total *= nums[i];
        }
    }

    return total;
};


// We can also do this by initializing an answers array with all values of 1, then step through each element and contribute it to all OTHER cells other than itself
// I like this better, it feels more intuitive, but it still takes o(n^2) time

const aLittleBetterProductOfArray = (nums) => {
    let answers = Array(nums.length).fill(1);

    for (let i = 0; i < nums.length; i++) {
        // fill the rest of the array
        for (let j = 0; j < nums.length; j++) {
            if (j === i) { j++ }; // skip index

            answers[j] *= nums[i];
        }
    }

    return answers
};


// With division, we could just total up the entire product, then divide that by nums[i] to get our answer
const divisionSolution = (nums) => {
    let total = 1;
    for (let i = 0; i < nums.length; i++) {
        total *= nums[i];
    }

    let answers = Array(nums.length).fill(total);

    for (let i = 0; i < answers.length; i++) {
        answers[i] /= nums[i];
    }

    return answers;
};
// note: this does NOT work for any array containing a zero. We will end up with a total of 0, so we will end up dividing by zero at each digit