/* QUESTION */
// Given an array iof integers: nums and an integer: taret, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order


/* SOLUTION */
// brute force, for each element, check every other element (forward). o(n^2) time, o(1) space
// hash map: for each element, add it to a set and check to see if the target-current is already in the set. If it is, return both indices

const twoSum = (integers, target) => {
    let map = new Map();

    for (let i = 0; i < integers.length; i++) {
        let compliment = target - integers[i];
        if (map.has(compliment)) {
            return [i, map.get(compliment)];
        }

        // store in the map. Key = number, val = index
        map.set(integers[i], i);
    }

    return false;
};