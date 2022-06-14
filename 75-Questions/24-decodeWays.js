/** QUESTION */
/* A message containing letters from A-Z can be encoded into numbers using the following mapping:
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). 
For example, "11106" can be mapped into:
"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into F since "6" is different from "06".
Given a string s containing only digits, return the number of ways to decode it.
*/

/* EXAMPLE *//*
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
*/

/** SOLUTION */
// 226
// 123

// for each character, if this character+the previous can be encoded an additional way (other than just being a standalone digit), add 1 to our running total
// If we have a zero, check the previous digit. It needs to be a 1 or a 2 otherwise it's an invalid placement

const decodeWaysTabulated = (s) => {
    let numWays = Array(s);
    s = toNumArray(s);
    numWays[0] = 1;

    // no leading zeroes
    if (s[0] === 0) {
        return 0;
    }

    // loop through each character, check the previous character and see if there is a second way we can decode it
    for (let i = 1; i < s.length; i++) {
        // if we have a 0, the prev character better be a 1 or 2
        if (s[i] === 0) {
            if (s[i-1] != 1 || s[i-1] != 2) {
                return 0; // illegal character
            }
            numWays[i] = numWays[i-1];
        }

        // check if the previous character is a 1 or 2. if it is, there is an additional way we can encode the string
        // and if the previous character is a 2, this number can only be decoded multiple ways if this character is less than 7
        // Because if it's 27, that can only be decoded one way: 2 and 7. There is no 27th letter
        else if (s[i-1] === 1 || (s[i-1] === 2 && s[i] < 7)) { 
            numWays[i] = i > 1 ? numWays[i-1] + numWays[i-2] : numWays[i-1] + 1;
        }
        // otherwise just carry over the last value in the table
        else {
            numWays[i] = numWays[i-1];
        }
    }

    return numWays[s.length-1];
};

// and actually we can optimize further. We can simplify the space to o(1) because we only ever reference the past two values
const decodeWays = (s) => {
    let prev = 1;
    let prevPrev = 1;
    let numWays = 1;
    s = toNumArray(s);

    // no leading zeroes
    if (s[0] === 0) {
        return 0;
    }

    // loop through each character, check the previous character and see if there is a second way we can decode it
    for (let i = 1; i < s.length; i++) {
        // if we have a 0, the prev character better be a 1 or 2
        if (s[i] === 0) {
            if (s[i-1] !== 1 && s[i-1] !== 2) {
                console.log('died');
                return 0; // illegal character
            }
            numWays = prevPrev;
        }

        // check if the previous character is a 1 or 2. if it is, there is an additional way we can encode the string
        // and if the previous character is a 2, this number can only be decoded multiple ways if this character is less than 7
        // Because if it's 27, that can only be decoded one way: 2 and 7. There is no 27th letter
        else if (s[i-1] === 1 || (s[i-1] === 2 && s[i] < 7)) { 
            numWays = prev + prevPrev;
        }
        // otherwise just carry over the last value in the table
        else {
            numWays = prev;
        }

        // update our prev values
        prevPrev = prev;
        prev = numWays;
    }

    return numWays;
};

const toNumArray = (s) => {
    let array = [];
    for (let i = 0; i < s.length; i++) {
        array[i] = Number(s.charAt(i));
    }
    return array;
};

/* THINKING SPACE */
// : 1
// 2: 1
// 22: 2
// 222: 3
// 2222: 5
// 22222: 8
// 22226: 8


// 2: 1
// 22: 2
// 226: 3
// 2262: 3
// 22622: 6

// pattern: if the current character is a confusing way to encode the numbers, table[i] = table[i-1] + table[i-2] 

console.log(decodeWays("226"));
console.log(decodeWays("12"));
console.log(decodeWays("10"));
console.log(decodeWays("2101"));
console.log(decodeWays("06"));
console.log(decodeWays("22226"));
console.log(decodeWays("22622"));