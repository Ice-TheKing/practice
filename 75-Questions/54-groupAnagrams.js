/** QUESTION */
// Given an array of strings strs, group the anagrams together. You can return the answer in any order


/** EXAMPLE *//*
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
*/

/** SOLUTION */
// If we used the same isAnagram function we used last time, we could check every word against every word ahead of it in the array of strings
// that would be o(m*n*n) time where n is the shoretst character in each of the m comparisons

const groupAnagrams = (strs) => {
    let groups = [];
    let anagramMap = new Map();
    for (let i = 0; i < strs.length; i++) {
        let hasAnagram = false;
        for (let j = i+1; j < strs.length; j++) {
            if (isAnagram(strs[i], strs[j])) {
                addAnagramToGroup(anagramMap, strs[i], strs[j]);
            }
        }
        if (!hasAnagram && !anagramMap.has(strs[i])) {
            // has no anagram
            groups.push([strs[i]]);
        }
    }

    // add all of the anagram map objects to the group
    // first compress all groups
    let groupSet = new Set();
    for (let [char, group] of anagramMap) {
        groupSet.add(group);
    }
    // then add each one to the results array
    for (let group of groupSet) {
        groups.push([...group]);
    }

    return groups;
};

const addAnagramToGroup = (map, a, b) => {
    let group;
    if (map.has(a)) {
        group = map.get(a);
        group.add(b);
    } else if (map.has(b)) {
        group = map.get(b);
        group.add(a);
    } else {
        group = new Set();
        group.add(a);
        group.add(b);
    }

    map.set(a, group);
    map.set(b, group);
};

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

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));