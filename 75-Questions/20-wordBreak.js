/** QUESTION */
// Given a string: s and a dcictionary of strings: wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.

/* EXAMPLE *//*
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
*/

/** SOLUTION */
// First let's do a memoized solution

const wordBreakMemoized = (s, dictionary, memo = new Map()) => {
    // base case
    if (s === '') {
        return true;
    }
    // have we computed this before?
    if (memo.has(s)) {
        return memo.get(s);
    }

    // check every word in the dicitonary
    for (let word of dictionary) {
        let index = s.indexOf(word);
        if (index) {
            // remove the word and recurse
            if (wordBreakRecurse(stringRemoveSegment(s, index, word.length), dictionary)) {
                memo.set(s, true);
                return true;
            }
        }
    }

    // tried every word, none returned a valid path
    memo.set(s, false);
    return false;
};

const stringRemoveSegment = (s, index, length) => {
    // want everything from 0 to index
    let prefix = s.slice(0, index);
    // and everything after index+length
    let suffix = s.slice(index+length, index.length);

    return `${prefix}${suffix}`;
};


// Then let's do a tabular solution

// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// word  =  [c,a,t,s,a,n,d,o,g]
// table =  [t,f,f,f,f,f,f,f,f,f]
//          [ ,c,a,t,s,a,n,d,o,g]
// table[s.length] will give us our answer
// table[n] represents whether or not we can build the string up to position n-1
// so table[0] represents whether we can build the empty string, the answer is yes

// at each step: if cell === true AND getIndexOf each dictionary word === word[index], table[index+word.length] = true

const wordBreakTabulated = (s, dictionary) => {
    let table = Array(s.length+1).fill(false);
    table[0] = true; // we can always build the empty string

    for (let i = 0; i <= s.length; i++) {
        // if we can build this word, check every word
        if (table[i] === true) {
            for (let word of dictionary) {
                // check if the word fits at this location
                if (s.getIndexOf(word, i) === i) {
                    table[i+word.length] = true;
                }
            }
        }
    }

    return table[s.length];
};