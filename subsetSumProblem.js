/** QUESTION */
// Given a set of non-negative integers, and a value sum, determine if there is a subset of the given set with sum equal to given sum. 

/** EXAMPLE *//*
Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
Output: True  
There is a subset (4, 5) with sum 9.
*/


/** SOLUTION */
// first thing that comes to mind - we can delete any item from the set that is greater than sum (because all numbers are garunteed to be non-negative)
// this probably won't change our time complexity, but it is an optimization nonetheless

const trimSet = (set, sum) => {
    let numSet = [];

    for (let i = 0; i < set; i++) {
        if (set[i] < sum) {
            numSet.push(set[i]);
        }
        if (set[i] === sum) {
            return true;
        }
    }

    return numSet;
};

/** EXAMPLE *//*
Input: set[] = {3, 4, 5, 2}, sum = 9
Output: True  
There is a subset (4, 5) with sum 9.
*/

// One potential solution is to essentially try different permutations of numbers in the set and see if they equal sum
// this will be o(n!) where n = the number of elements in the set that are less than sum
// it will actually be a bit faster because we can stop checking the permutation when running total > sum, but the time complexity is still o(n!)


// recursive
// o(n!) time complexity
// o(n) space complexity (call stack)

const subsetSumProblem = (set, sum) => {
    let numSet = trimSet(set, sum);

    if (numSet === true) {
        return true;
    }

    return recursePermutations(0, set, sum);
};

const recursePermutations = (runningTotal, set, sum) => {
    if (set.length === 0) {
        return false;
    }
    if (runningTotal > sum) {
        return false;
    }
    if (runningTotal === sum) {
        return true;
    }

    for (let i = 0; i < set.length; i++) {
        let thisNum = set.splice(i, 1);
        
        if (recursePermutations(runningTotal+thisNum, set, sum)) {
            return true;
        }

        // backtrack
        set.splice(i, 0, thisNum);
    }

    // nothing found
    return false;
};



// we can do a bit better. We don't need to generate EVERY permutation... 3, 4, 2 is the same as 4, 3, 2 in this case
// we can just test recursive solutions for 2 cases: whether the current digit is used or unused
// since every element (n) has two choices - used or not used, the time complexity will be o(n^2).

// recursive improved
// o(2^n) time
// o(n) space

const subsetSumProblemImproved = (set, sum) => {
    let numSet = trimSet(set);

    if (numset === true) {
        return true;
    }

    return recursivePermutationsImproved(0, 0, set, sum);
};

const recursivePermutationsImproved = (runningTotal, index, set, sum) => {
    if (index === set.length) {
        return false;
    }
    if (runningTotal > sum) {
        return false;
    }
    if (runningTotal === sum) {
        return true;
    }

    // test the set of numbers with the current number and without. If either path gives us true, return true
    if (recursivePermutationsImproved(runningTotal+set[index], index+1, set, sum) ) {
        return true;
    }
    if (recursivePermutationsImproved(runningTotal, index+1, set, sum) ) {
        return true;
    }

    return false;
};