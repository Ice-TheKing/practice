/** QUESTION */
/**
 * Given two strings str1 and str2 and below operations that can be performed on str1. Find minimum number of edits (operations) required to convert ‘str1’ into ‘str2’.  
 * Insert
 * Remove
 * ReplaceRemove
 */


/** SOLUTION */
// Insert and remove are the same, just flip the strings being added to

const editDistance = (str1, str2) => {
    // find the most amount of similar characters between str1 and str2 (in order)
    let sharedChars = chooseAlikeChars(str1.split(''), str2.split('')).join('');
    let str1Arr = str1.split('');
    let str2Arr = str2.split('');

    let edits = 0;
    let pointer1 = 0;
    let pointer2 = 0;

    for (let i = 0; i < str1Arr.length + str2Arr.length; i++) {
        if (pointer1 === str1Arr.length-1) {
            // insert step
            edits++;
        } else if (pointer2 === str2Arr.length-1) {
            // remove step
            edits++;
        } else if (str1Arr[pointer1] !== sharedChars[0] && str2Arr[pointer2 !== sharedChars[0]]) {
            // replace step
            pointer1++;
            pointer2++;
        } else if (str2Arr[pointer2] !== sharedChars[0]) {
            // str1Arr equals the shared character, but not str2. Insert step
            pointer2++;
            edits++;
        } else if (str1Arr[pointer1] !== sharedChars[0]) {
            // str2Arr equals shared character, but not str1. Remove step
            pointer1++;
            edits++;
        } else if (str1Arr[i] === str2Arr[i] === sharedChars[0]) {
            // all line up. We have one of our shared characters. Remove it and continue on to the next one. No edits needed
            sharedChars.shift();
            pointer1++;
            pointer2++;
        }
    }

    return edits;
};


// sunday
// saturday

// day
// day
// day
// edits: 3

// saturday
// sunday
// day
// day
// 
// edits: 3

const recursiveChooseAlikeChars = (str1, str2, builtStr) => {
    if (str1.length === 0 || str2.length === 0) {
        return '';
    }

    let newStr = [];
    let possibilities = [];

    // while characters match, add them to our string
    while (str1[0] === str2[0]) {
        newStr.push(s1.shift());
        str2.shift();
    }

    if (str1.length === 0 || str2.length === 0) {
        return newStr;
    }

    // mismatch. Branch path: check what happens when we remove character and what happens when we continue on
    // check where this string exists next
    let pointer = 0;
    while (pointer2 !== s2.length-1 && s1[0] !== s2[pointer2]) {
        pointer2++;
    }
    if (s1[0] === s2[pointer2]) {
        // found a match. Recurse from here
        possibilities.push(recursiveChooseAlikeChars(str1, str2.slice(pointer2, str2.length)));
    }

    // second path:
    // find all possibilities of str1 and str2 if we removed first character from str1
    if (pointer1 < str1.length && pointer2 < str2.length) {
        possibilities.push(recursiveChooseAlikeChars(str1.shift(), str2));
    }
    
    // of the recursed possibilities, find the largest
    let largestPossibility;

    for (let i = 0; i < possibilities.length; i++) {
        if (!largestPossibility || possibilities[i].length > largestStr.length) {
            largestStr = possibilities[i];
        }
    }

    // append our matching characters (newStr) to the largest possibility of characters found from child recursive calls
    newStr = [...newStr, ...largestPossibility];

    // return back up the stack
    return newStr;
};

// sunday
// satrdayu
// expected: sday


// unday
// atrdayu
// newStr = [s]
// possibilities = ['u', 'day'] return 'sday'
    // unday
    // u
    // possibilities = ['', 'u'] return 'u'
        // nday...day...ay...y
        // u...u...u...u
        // all return ''

    // nday
    // atrdayu
    // newStr = []
    // possibilities = ['', 'day'] return 'day'
        // no match for 'n' return ''

        // day
        // atrdayu
        // newStr = []
        // possibilities = ['day', 'y'] return 'day'
            // day
            // dayu
            // newStr = [day]
            // possibilities = [] return 'day'

            // ay
            // atrdayu
            // newStr = [a]
            // possibilities = ['y', ''] return 'y'
                // y
                // trdayu
                // newStr = []
                // possibilities = ['y', ''] return 'y'
                    // y
                    // yu
                    // newStr = [y]
                    // return y

                    // return ''

                // return ''