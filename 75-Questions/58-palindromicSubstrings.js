/** QUESTION */
// Given a string s, return the longest palindromic substring in s

/** EXAMPLE *//*
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
*/

/** SOLUTION */
// for every character in s - o(n) - check palindromes with that character as a center character o(n)
// o(n^2)

const getNumPalindromes = (s) => {
    let palindromes = 0;

    // for every substring o(n)
    for (let i = 0; i < s.length; i++) {
        let left = i;
        let right = i;

        // odd number palindromes
        while (left >= 0 && right < s.length && s.charAt(left).toLowerCase() === s.charAt(right).toLowerCase()) { // o(n)
            palindromes++;
            left--;
            right++;
        }

        // check even number palindromes
        left = i;
        right = i+1;
        while (left >= 0 && right < s.length && s.charAt(left).toLowerCase() === s.charAt(right).toLowerCase()) { // o(n)
            palindromes++;
            left--;
            right++;
        }
    }

    return palindromes;
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

console.log(getNumPalindromes("abc"));
console.log(getNumPalindromes("aaa"));