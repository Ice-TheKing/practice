/** QUESTION */
// Given two strings: s and t of lengths m and n respectively, return the minimum window of substring of s such that every character in t (including duplicates) is included in the window. 
// If there is no such substring, return the empty string
// A substring is a contiguous sequence of characters within the string


/** SOLUTION */
// Sliding window: left/right pointer: left = 0, right = string.length-1
// at each step, if (canMoveLeft), left++, if (canMoveRight), right++
// if we can't move either, return right-left+1

// canMoveLeft takes s, t, left, right, and loops from l to r and validates that every character in abc is in the string

// o(n*(m+n)) time

const minWindowSubstr = (s, t) => {
    if (t.length > s.length) {
        return '';
    }

    let shortestSubstr = "";
    s = s.split('');
    t = t.split('');
    left = 0;
    right = 0;

    while (right < s.length) { // o(n)
        if (isValidSubstr(s,t,left, right)) {
            left++;
            if (!shortestSubstr || right - left+1 < shortestSubstr.length) { // update our shortest substring if necessary
                shortestSubstr = getSubstr(s, left, right);
            }
            // make sure left can never be ahead of right
            right = Math.max(right, left);
        } else {
            // search a wider window
            right++;
        }
    }

    return shortestSubstr;
};

const isValidSubstr = (s, t, left, right) => { // o(m+n)
    if (right-left+1 > t.length) {
        return false;
    }

    // fill map with chars from t
    let tMap = new Map();
    for (let i = 0; i < t.length; i++) {
        incrimentChar(tMap, t[i]);
    }
    for (let i = left; i <= right; i++) {
        decrimentChar(tMap, s[i]);
    }
    return isMapEmpty(tMap);
};

const incrimentChar = (map, char) => {
    if (!map.has(char)) {
        map.set(char, 0);
    }
    map.set(char, map.get(char)+1)
};

const decrimentChar = (map, char) => {
    if (map.has(char) && map.get(char) > 0) {
        map.set(char, map.get(char)-1);
    }
};

const isMapEmpty = (map) => {
    for (let [char, count] of map) {
        if (count > 0) {
            return false;
        }
    }
    return true;
};

const getSubstr = (s, left, right) => {
    let string = [];
    for (let i = left; i <= right; i++) {
        string.push(s[i]);
    }
    return string.join('');
};


// improved to o(n) time by using a hash map for t's conditions and a hash map for met conditons of the current substring
const minWindowSubstrImproved = (s, t) => {
    if (t.length > s.length) {
        return '';
    }
    s = s.split('');
    t = t.split('');
    let shortestSubstr = "";
    left = 0;
    right = 0;

    let metConditions = 0;
    let conditionMap = getConditionMap(t);
    let substrMap = new Map();

    while (right < s.length) { // o(n)
        // if we have all conditions met, try to make the window smaller
        if (metConditions === t.length) {
            metConditions = removeChar(s[left], substrMap, conditionMap, metConditions); // o(1)
            left++;
        } else {
            // otherwise, make the window bigger
            right++;
            metConditions = addChar(s[right], substrMap, conditionMap, metConditions); // o(1)
        }
    }

    return shortestSubstr;
};

const addChar = (char, substrMap, conditionMap, metConditions) => {
    if (!conditionMap.has(char)) {
        return metConditions;
    }
    substrMap.incrimentChar(char);
    if (substrMap.get(char) === conditionMap.get(char)) {
        return metConditions+1;
    }
    return metConditions;
};

const removeChar = (char, substrMap, conditionMap, metConditions) => {
    if (!conditionMap.has(char)) {
        return metConditions;
    }
    substrMap.decrimentChar(char);
    if (substrMap.get(char) < conditionMap.get(char)) {
        return metConditions-1;
    }
    return metConditions;
};

const getConditionMap = (t) => {
    let conditionMap = new Map();
    for (let i = 0; i < t.length; i++) {
        incrimentChar(conditionMap, t[i]);
    }
    return conditionMap;
};