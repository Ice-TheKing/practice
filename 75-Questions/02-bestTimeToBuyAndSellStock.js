/* QUESTION */
// You are given an array: prices, where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

/* EXAMPLE *//*
Input: prices = [7,1,5,3,6,4]
Output: 5

Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

*/

/* SOLUTION */
// Have a pointer on each side and walk inward at each step (the step is whichever of the two options gives us the best return), totaling the profit, and storing it if it's greater than what we've stored before

const buyAndSell = (prices) => {
    let largestProfit = 0;

    let pointer1 = 0;
    let pointer2 = 1;

    while (pointer2 < prices.length) {
        // are we better than the largest profit?
        let profit = prices[pointer2] - prices[pointer1];

        if (profit > largestProfit) {
            largestProfit = profit;
        }

        // if our profit is negative, that means pointer2 is at a lower point than pointer1. move pointer1 to that location and keep going
        if (profit < 0) {
            pointer1 = pointer2;
        }

        pointer2++;
    }

    return largestProfit;
};