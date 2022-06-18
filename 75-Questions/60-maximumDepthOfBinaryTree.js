/** QUESTION */
// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node


/** SOLUTION */
// Let's solve this recursively
// base case: root is null. return 0 (empty tree has a depth of 0 obviously)
// else, return 1 + the max of height(left, right)
// that's it!

const maxTreeDepth = (root) => {
    if (!root) {
        return 0;
    }

    let leftDepth = maxTreeDepth(root.left);
    let rightDepth = maxTreeDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
};

// solved in 1 minute and 44 seconds lmao