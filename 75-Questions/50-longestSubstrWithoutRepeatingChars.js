/** QUESTION */
// Given a string s, find the length of the longest substring without repeating characters


/** SOLUTION */
// Brute force is to try every substring, and store the max length of all substrings without repeating characters
// I think we can do better
// two pointers: left and right
// one set: usedChars
// while right < string.length
    // if char[right] is not in the set, increase length and add it to the set. right++ (check longest)
    // if char[right] IS in the set, decrease length, remove char[left] from set. left++

const longestSubstr = (string) => {
    let s = string.split('');

    let longestSubstr = 0;
    let thisSubstrLength = 0;

    let usedChars = new Set();

    let left = 0;
    let right = 0;
    while (right < s.length) {
        if (!usedChars.has(s[right])) {
            thisSubstrLength++;
            usedChars.add(s[right]);

            if (thisSubstrLength > longestSubstr) {
                longestSubstr = thisSubstrLength;
            }

            right++;
        } else {
            // char[right] is already in the substr
            thisSubstrLength--;
            usedChars.delete(s[left]);
            left++;
        }
    }

    return longestSubstr;
};

console.log(longestSubstr("bbbbb"));

// longestSubstr: 3
// thisSubstr: 1
// usedChars: b

//         r
// abcabcbb
//        l

