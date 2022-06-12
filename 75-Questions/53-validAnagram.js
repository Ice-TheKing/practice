/** QUESTION */
// Given two strings: s and t, return true if t is an anagram of s, and false otherwise.
// An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once


/** SOLUTION */
// use a hash map to store all the values of s and their counts
// step through t and decriment values in the hash map (if there is a character that does not exist, return false)
// if the hash map is empty at the end, return true

// o(n) time where n === the smaller of m,n (this is because if they are not the same length, we solve in o(1) time)
// o(n) space for the same reason

const isAnagram = (s, t) => {
    if (s.length !== t.length) {
        return false;
    }

    s = s.split('');
    t = t.split('');
    let sMap = getStringMap(s);

    for (let i = 0; i < t.length; i++) {
        if (!decrimentChar(sMap, t[i])) { // if the character is not in the map
            return false;
        }
    }

    return isMapEmpty(sMap);
};

const getStringMap = (s) => {
    let map = new Map();

    for (let i = 0; i < s.length; i++) {
        incrimentChar(map, s[i]);
    }

    return map;
};

const incrimentChar = (map, char) => {
    if (!map.has(char)) {
        map.set(char, 0);
    }

    map.set(char, map.get(char)+1);
};

const decrimentChar = (map, char) => {
    if (!map.has(char) || map.get(char) === 0) {
        return false;
    }
    map.set(char, map.get(char)-1);
    return true;
};

const isMapEmpty = (map) => {
    for (let [char, count] of map) {
        if (count > 0) {
            return false;
        }
    }
    return true;
};

console.log(isAnagram("rat", "car"));