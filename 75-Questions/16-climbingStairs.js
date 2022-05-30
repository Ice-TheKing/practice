/* QUESTION */
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

/* EXAMPLE *//*
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
*/

/* SOLUTION */
// We can solve this by starting at the top and pre-filling results, then backing down the stairs adding the number of ways at the next two steps

const climbingStairs = (n) => {
    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 2;
    }

    let nextStep = 1; // n-1
    let secondStep = 1; // n-2

    for (let i = n-2; i > 0; i--) {
        let thisStep = nextStep + secondStep;
        secondStep = nextStep;
        nextStep = thisStep;
    }

    return nextStep + secondStep;
};