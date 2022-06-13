/** QUESTION */
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
// Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise

/** EXAMPLE *//*
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
*/

/** SOLUTION */
// make a pointer at the end of the word and at the beginning and step inward, comparing valid characters

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

console.log(validPalindrome("A man, a plan, a canal: Panama"));
console.log(validPalindrome("racecar"));
console.log(validPalindrome("0P"));