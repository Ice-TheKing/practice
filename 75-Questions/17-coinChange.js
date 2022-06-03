/** QUESTION */
// You are given an integer array: coins representing coins of different denominations and an integer: amount representing a total amount of money.
// Return the feewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin


/** SOLUTION */
// Starting with the biggest coin, add as many as fit into the amount, then recurse with a smaller coin.
// if we get an answer other than -1 back from the recursive call, return it back up the stack.
// else, try with one less large coin (until there are 0 of that type of coin used)
// if all paths return -1, return -1;

const coinChange = (coins, amount) => {
    // sort the coins in descending order
    let sortedCoins = coins.sort((a,b) => {b - a});

    return changeHelper(coins, amount);
};

const changeHelper = (coins, amount, coin = 0, coinsUsed = 0, amountsMap = new Map()) => {
    if (amount === 0) {
        return 0;
    }
    if (amountsMap.has(amount)) {
        return amountsMap.get(amount);
    }
    if (!coins[coin]) {
        return -1;
    }

    let additionalCents = 0;
    let minCoinsUsed = -1;

    while (additionalCents+coins[coin] <= amount) {
        // recurse with a smaller coin
        let result = changeHelper(coins, amount-additionalCents, coin+1);

        if (minCoinsUsed === -1 || coinsUsed + result < minCoinsUsed) {
            minCoinsUsed = coinsUsed + result;
        }

        additionalCents+=coins[coin];
        coinsUsed++;
    }

    // if we get here we found no combination

    // add the amount to the invalid set
    amountsMap.set(amount, minCoinsUsed);
    return minCoinsUsed;    
};

// coins = [25,null]
// amount = 22
// expected: -1

// coins = [25, 1] coin = 0
// amount = 24
// expected: 24
    // coins = [25, 1] coin = 1
    // amount = 24
    // 24, coins used = 24
        // coins = [25, 1, null] coin = 2
        // amount === 0, return 0
    // return 24 + 0
// return 0 + 24
// main function returns 24


// we could potentially make this faster for very large cases by including a set of amounts we know for sure don't return a valid result so we don't end up testing the same totals more than once
// adding that now...