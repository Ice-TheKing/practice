/** QUESTION */
// Given two strings: text1 and text2, treturn the length of their longest common subsequence. If there is no common subsequence, return 0.
// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
// A common subsequence of two strings is a subsequence that is common to both strings.

/* EXAMPLE *//*
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Input: text1 = "abcdefg", text2 = "aztfeg" 
Output: 3  
Explanation: The longest common subsequence is "afg" and its length is 3.
*/

/** SOLUTION */
// Brute force: try every subsequence of text1 compared to every subsequence of text2
// for each element in text1 and text2 we have two options: take the element or don't
// this gives us a time complexity of o(2^n) and o(2^m) for each text. And since we're trying every combination of one for each combination of the other, our time complexity is (4^max(m,n)) (plus checking if one is a subsequence of the other which is o(n+m))
// so really we have 4 choices at each step: 
// 1) take the current element from text1 and not from text2
// 2) take the current element from text2 and not from text1
// 3) take both elements
// 4) take neither elements

const longestCommonSubsequence = (text1, text2, index = 0, t1Choices = [], t2Choices = []) => {
    if (index === text1.length && index === text2.length) {
        // return whether our choices are subsequences or not
        if (isSubsequence(text1, text2, t1Choices, t2Choices)) {
            return buildText(text1, text1Choioces) || false; // if we get an empty string, return false
        } else {
            return false;
        }
    }

    let longest = false;

    // check if this is a subsequence
    if (!isSubsequence(text1, text2, t1Choices, t2Choices)) {
        return false;
    }

    if (index !== text1.length) {
        // 1) take the current element from text1 and not from text2
        let result = longestCommonSubsequence(text1, text2, index, t1Choices.push(true), t2Choices.push(false));
        t1Choices.pop();
        t2Choices.pop();

        if (result && (!longest || result.length > longest.length)) {
            longest = result;
        }
    }

    else if (index !== text2.length) {
        // 2) take the current element from text2 and not from text1
        let result = longestCommonSubsequence(text1, text2, index, t1Choices.push(false), t2Choices.push(true));
        t1Choices.pop();
        t2Choices.pop();

        if (result && (!longest || result.length > longest.length)) {
            longest = result;
        }
    }

    else if (index !== text1.length && index !== text2.length) {
        // 3) take both elements
        let result = longestCommonSubsequence(text1, text2, index, t1Choices.push(true), t2Choices.push(true));
        t1Choices.pop();
        t2Choices.pop();

        if (result && (!longest || result.length > longest.length)) {
            longest = result;
        }
    }

    else {
        // 4) take neither elements
        let result = longestCommonSubsequence(text1, text2, index, t1Choices.push(false), t2Choices.push(false));
        t1Choices.pop();
        t2Choices.pop();

        if (result && (!longest || result.length > longest.length)) {
            longest = result;
        }
    }

    return longest;
};

const isSubsequence = (text1, text2, t1Choices, t2Choices) => {
    return (buildText(text1, t1Choices) === buildText(text2, t2Choices));
};

const buildText = (text, choices) => {
    let word = [];

    for (let i = 0; i < text.length; i++) {
        if (choices[i]) {
            word1.push(text[i]);
        }
    }

    return word.join('');
};



// how can we optimize this? I think we can probably 2d tabulate this
/*
  s2  a   b   c   d   e 
s1    
a     a   a   a   a   a
b     a   ab  ab  ab  ab
c     a   ab abc abc abc


  s2  b   c   d   e 
s1    
a     ''  ''  ''  ''
b     b   b   b   b
c     b   bc  bc  bc


  s2  b   b   c   d   e 
s1    
a     ''  ''  ''  ''  ''
b     b   b   b   b   b
b     b   bb  bb  bb  bb
c     b   bb  bbc bbc bbc


*/

// this would be an o(m*n) time complexity. most likely o(m*n*min(m,n)) because of string rebuilding at each step

// at each step we're: 
// 1) bringing in the previous best array
// 2) asking: does this new character we're adding exist in our comparison string? (text1/row is comparison string)
// 3) if it is, add it to our previous best (without current row & column) and recurse, if not, recurse without adding anything (take whichever best we have: without row's character or without col's character)
// at the end our answer will be in cell [n,m]

const longestCommonSubsequenceOptimized = (text1, text2) => {
    // create arrays for both so we can iterate
    let t1Array = text1.split(''); // o(m)
    let t2Array = text2.split(''); // o(n)

    // fill our text1.length x text2.length table with empty strings
    let table = Array(text1.length+1)
    .fill()
    .map(() => Array(text2.length+1).fill('')); // o(m*n)

    buildTable(t1Array, t2Array, table);

    return table[text1.length][text2.length];
};

const buildTable = (text1, text2, table, r = 1, c = 1) => { // o(m*n)
    if (c > text2.length) {
        row += 1;
        if (r > text1.length) {
            return substr;
        }
        c = 1;
    }

    // our best so far is a copy of what we've calculated above us (empty string if we are in the first row)
    let substr;

    // compare
    if (text1[r] === text2[c]) { // o(min(m,n))
        // match. Add it to our the best substr found without taking either character (left & up)
        substr = `${table[r-1][c-1]}${text1[r]}`;
    } else {
        // max between substr without one character vs the other (represented by the up or left column in the table)
        if (table[r-1][c].length > table[r][c-1].length) {
            substr = `${table[r-1][c]}${text[r]}`;
        } else {
            subStr = `${table[r][c-1]}${text[r]}}`;
        }
    }

    // fill cell in table
    table[r][c] = substr;

    // call again on the next cell
    buildTable(text1, text2, table, r, c+1);
};

// now we have the issue of repeated characters. With this implementation they'll continue to be used.
// we will probably have to change how we are getting our substr for the current cell. That should fix our repeated character issue
// no because then we have this issue:
/*
  s2  b   b   c   d   e 
s1    ''  ''  ''  ''  ''
a ''  ''  ''  ''  ''  ''
b ''  b   b   b   b   b
b ''  b   bb  bb  bb  bb
c ''  b   bb  bbc bbc bbc
*/