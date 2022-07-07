/** QUESTION */
// Given the root of a binary tree, determine if it is a valid binary search tree (BST)


/** SOLUTION */
// DFS keep track of each node's min and max val in the tree
// At each node:
// 1. check if the left child's max node is smaller than this node
// 2. check if the right child's min node is greater than this node
// 3. return { min: left.min, max: right.max }; (or false if invalid)


const validateBST = (root) => {
    let result = validateBSTRecursive(root);
    if (result === null || result) { // an empty tree is technically a BST. An object is a truthy value
        return true;
    } else {
        return false;
    }
};

const validateBSTRecursive = (root) => {
    if (!root) {
        return null;
    }

    let left = validateBSTRecursive(root.left);
    let right = validateBSTRecursive(root.right);

    if (left === false || right === false) {
        return false;
    }

    let result = { min: root.val, max: root.val };

    if (left) {
        if (left.max > root.val) {
            return false;
        }
        result.min = left.min;
    }

    if (right) {
        if (right.min < root.val) {
            return false;
        }
        result.max = right.max;
    }

    return result;
};