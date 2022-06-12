/** QUESTION */
// You are given a string: s and an integer: k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.
// Return the length of the longest substring containing the same letter you can get after performing the above operations


/** SOLUTION */
// Brute force: for each k, choose each character and change it to one of the adjacent characters, then check the longest repeating character count from that character
// o (k * n^2)

// Sliding window: left/right pointer
// For each character in the right pointer, store it in a hash map.
// Check for the max used character in the hash map, and if right-left+1 (size of our substr) - max used character is <= k, all characters can be the same
// For example, for the substring:
// AAABBA
// right-left+1 = 6, max character is A with a count of 4
// If k = 1, 6 - 4 is not <= 1 so we cannot make them all the same.
// But if k = 2, 6 - 4 is <= 2, so we can make them all the same character

// If we cannot fulfil the condition, we delete 1 count of the character at left pointer and slide our left pointer up 1


const longestReplacement = (word, k) => {
    let s = word.split('');
    let longest = 0;
    let left = 0;
    let right = 0;
    let chars = new Map();

    while (right < s.length) {
        if (validateSubstring(k, chars, left, right)) { // we have a valid window, expand it
            if (right-left+1 > longest) { // update longest if necessary
                longest = right-left+1;
            }
            right++;
            incrimentChar(s[right]);
        } else { // not a valid window, shrink it
            decrimentChar(s[left]);
            left++;
        }
    }

    return longest;
};

const incrimentChar = (map, char) => {
    if (!map.has(char)) {
        map.set(char, 0);
    }

    map.set(char, map.get(char)+1);
};

const decrimentChar = (map, char) => {
    map.set(char, map.get(char)-1);
};

const validateSubstring = (k, chars, left, right) => {
    let maxChar = getMaxCharCount(chars);

    if ((right-left+1) - maxChar <= k) {
        return true;
    }

    return false;
};

const getMaxCharCount = (chars) => {
    let longest = 0;
    for (let [char, count] of chars) {
        if (count > longest) {
            longest = count;
        }
    }
    return longest;
};