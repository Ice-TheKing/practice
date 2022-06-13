/** QUESTION */
// Given a string s, return the longest palindromic substring in s

/** EXAMPLE *//*
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
*/

/** SOLUTION */
// Check every substring
// o(s^3)

const longestPalindromeSubstr = (s) => {
    if (!s) {
        return 0;
    }

    let longest = 1; // we can always have at least one character palindrome
    let longestStr = s.charAt(0);

    // for every substring o(n^2)
    for (let left = 0; left < s.length; left++) {
        for (let right = left+1; right < s.length; right++) {
            // check if it's a palindrome o(n)
            if (validPalindrome(s.slice(left, right+1))) {
                if (right+1 - left > longest) {
                    longest = right+1 - left;
                    longestStr = s.slice(left, right+1);
                }
            }
        }
    }

    return longestStr;
};

const validPalindrome = (s) => {
    let left = 0;
    let right = s.length-1;

    // skip non-alphanumeric characters
    [ left, right ] = skipInvalidChars(s, left, right);

    while (left < right) {
        // compare characters
        if (s.charAt(left).toLowerCase() !==  s.charAt(right).toLowerCase()) {
            return false;
        }

        left++
        right--;
        // skip non-alphanumeric characters
        [ left, right ] = skipInvalidChars(s, left, right);
    }

    // no mismatches found
    return true;
};

const skipInvalidChars = (s, left, right) => {
    while (left < right && !s.charAt(left).toLowerCase().match(/[a-z0-9]/i)) {
        left++;
    }
    while (left < right && !s.charAt(right).toLowerCase().match(/[a-z0-9]/i)) {
        right--;
    }
    return [left, right];
};

console.log(longestPalindromeSubstr("babad"));
console.log(longestPalindromeSubstr("cbbd"));