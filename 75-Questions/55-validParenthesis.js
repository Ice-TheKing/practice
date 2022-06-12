/** QUESTION */
// Given a string s containing just the characters '(', ')', '[', ']', '{' and '}', determine if the input string is valid.
// An input string is valid if:
    // 1. Open brackets must be closed by the same type of brackets
    // 2. Open brackets must be closed in the correct order


/** EXAMPLE *//*
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
*/

/** SOLUTION */
// We can use a stack. At every index, if it's an opening bracket, push it. Otherwise check if the first value in the stack matches. If it does, pop. If it doesn't, return false
// At the end of our loop, return stack.length === 0 (we need to close all parenthesis so there should be nothing left in the stack)

const validParenthesis = (s) => {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (getParenthType(char) === parenthEnum.opening) {
            stack.push(char);
        } else {
            if (stack.length > 0 && checkMatchingOpeningParenthesis(char) === stack[stack.length-1]) {
                stack.pop();
            } else {
                // invalid parenth, return false
                return false;
            }
        }
    }

    // if we have parenthesis left on the stack, return false
    return stack.length === 0;
};

const parenthEnum = {
    opening: 'opening',
    closing: 'closing'
};

// takes a closing parenth
// returns a matching opening parenth
const checkMatchingOpeningParenthesis = (char) => {
    switch(char) {
        case ')':
            return '(';
        case ']':
            return '[';
        case '}':
            return '{';
        default:
            return '';
    }
};

const getParenthType = (char) => {
    if (char === '(' || char === '[' || char === '{') {
        return parenthEnum.opening;
    }
    if (char === ')' || char === ']' || char === '}') {
        return parenthEnum.closing;
    }
    else return '';
};

console.log(validParenthesis('{(){()}[]}'));