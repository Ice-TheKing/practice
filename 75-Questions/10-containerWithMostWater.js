/* QUESTION */
// You are given an integer array heights of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.

/* EXAMPLE *//*
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49 (betweens index 2 and 8).
*/

/* SOLUTION */
// Brute force is to try every combination. o(n^2)

const findMostWaterBruteForce = (heights) => {
    let mostWater;

    for (let i = 0; i < heights.length; i++) {
        for (let j = i+1; j < heights.length; j++) {
            let distance = j - i;
            let height = Math.min(heights[i], heights[j]);
            let area = height * distance;

            if (mostWater == null || area > mostWater) {
                mostWater = area;
            }
        }
    }

    return mostWater;
};

// the goal is to find the tallest heights on each side and maximize difference
// we can do this by setting two pointers on either side and bringing whichever one is smaller inward (saving tallest area found at each step)
// this maximizes the distance AND height potential of the overall problem

const findMostWater = (heights) => {
    if (!isArray(heights)) {
        return null;
    }

    let left = 0;
    let right = height.length-1;

    let mostWater = null;

    while (left < right) {
        let area = calculateArea(heights, left, right);
        if (mostWater === null || area > mostWater) {
            mostWater = area
        }

        // update pointers
        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
        // note: if the heights are equal it doesn't matter which one we move
    }

    return mostWater;
};

const calculateArea = (heights, left, right) => {
    let distance = right-left;
    let height = Math.min(heights[left], heights[right]);
    return distance * height;
};