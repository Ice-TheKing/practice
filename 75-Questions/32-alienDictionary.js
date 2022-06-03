/* QUESTION */
// There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.
// You are given a list of strings: words from the alien language's dictionary, whrer the strings in words are sorted lexicographically by the rules of this new language.

// Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them

// A string: s is lexicographically smaller than a string: t if at the first letter where they differ, the letter in s comes before the letter t in the alien language. 
// If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length

/* EXAMPLE *//*
Input: words = ["wrt", "wrf", "er", "ett", "rftt"]
Output: "wertf"
*/

/* SOLUTION */
/* THINKING SPACE *//*
t -> f
w -> e
r -> t -> f
e -> r
w -> e -> r -> t -> f


*/

// create a graph of nodes and characters that come after them
// go through each word pair creating ordered relationships between characters
// keep a hash map to the node keyed by it's character so we can quickly access it

// after going through each word, (somehow??) find the first node and print out the graph while checking for cycles. Return "" if there is a cycle, or if not all characters are connected (Aka if our final result isn't the same length as our hash map)

function Node (char) {
    this.nextNodes = new Set();
    this.char = char;
};

// let w = new Node('w');

const alienDictionary = (words) => {
    let wordMap = new Map();

    // fill the map and get the first word in the graph
    let firstWord = fillWordMap(words, wordMap);
    if (firstWord === false) {
        return "";
    }

    // build a string of characters recursively (post-order traversal so we don't have duplicates)
    let str = buildString(firstWord).join('');

    // if there is a cycle or not all characters are connected
    if (str === false || str.length !== wordMap.length) {
        return "";
    }
    
    return str;
};

const fillWordMap = (words, wordMap, index = 0) => {
    if (index === words.length-1) { // checking index with index+1, so we need to make sure we skip the last word
        return true;
    }

    let word = words[index];
    let nextWord = words[index+1];
    let index = 0;

    while (index < Math.min(word.length, nextWord.length) && word.getCharAt(index) === nextWord.getCharAt(index)) {
        index++;
    }

    // TODO: check if one is a substr of another, etc words and wor
    if (word.getCharAt(index) === nextWord.getCharAt(index)) {
        // one is a substr of the other, that tells us nothing
        // but if word is longer than nextWord (word comes before) that means we have an invalid dictionary
        if (word.length > nextWord.length) {
            return false;
        }

        // recurse on next word
        return fillWordMap(words, wordMap, index+1);
    }

    // add the character relation
    let wordObj = wordMap.get(word.charAt(index));
    let nextWordObj = wordMap.get(nextWord.charAt(index));

    // word[index]'s next node is nextWord[index]
    if (!wordObj) {
        wordObj = new Node(word.charAt(index));
    }
    if (!nextWordObj) {
        nextWordObj = new Node(nextWord.charAt(index));
    }

    wordObj.nextNodes.add(nextWordObj);

    // recurse on next word
    fillWordMap(words, wordMap, index+1);

    // return the first character relationship so we can build the string from the first character in the map
    return wordObj;
};

const buildString = (word, string = [], checking = new Set(), checked = new Set()) => {
    if (checking.has(word.val)) {
        // there is a cycle in our graph. Not a valid dictionary
        return false;
    }

    if (checked.has(word.val)) {
        // just return the string, we don't need to do anything since we already added ourselves
        return string;
    }

    // we are now checking this word
    checking.add(word.val);
    
    // print each next word
    for (let nextWord of word.nextNodes) {
        buildString(nextWord, string, checking, checked);
    }

    // we finished checking this word
    checking.delete(word.val);

    // done checking this word
    checked.add(word.val);

    // add this word to the string (in the first position since we are post-order traversing)
    string.unshift(word.val);

    // return word
    return string;
};