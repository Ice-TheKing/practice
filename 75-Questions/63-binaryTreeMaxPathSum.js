/** QUESTION */
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
// A node can appear in the sequence at most once.
// Note that the path does not need to pass through the root.

// The path sum of a path is the sum of the node's values in the path

// Given the root of a binary tree, return the maximum path sum of any non-empty path;


/** SOLUTION */
// Store a global maxPathSum variable (initialized to 0)
// DFS recursively invert the binary tree
// At each node, store left/right result (return 0 if no node)
// Do 2 things:
    // calculate left + node.val + right (maximum we can get if the path goes through this node). Check that against longestPathSum
    // return node.val + max(left, right), because the node above us can only take ONE path through this node: left or right, not both
// once we are done recursing, return maxPathSum


let maxSum = 0; // if we have one node: -1, the best path we can get is by taking no nodes

const maxPathSum = (root) => {
    recursivelyFindMaxPath(root);
    return maxSum;
};

const recursivelyFindMaxPath = (root) => {
    if (!root) {
        return 0;
    }

    let left = recursivelyFindMaxPath(root.left);
    let right = recursivelyFindMaxPath(root.right);

    // maximum we can get if the path goes through this node
    let thisPathSum = left + root.val + right;
    thisPathSum = Math.max(thisPathSum, left+root.val);
    thisPathSum = Math.max(thisPathSum, right+root.val);
    thisPathSum = Math.max(thisPathSum, root.val);
    if (thisPathSum > maxSum) {
        maxSum = thisPathSum;
    }

    // the node above us can only go through ONE of our paths: left or right. So let's pass the best path (if both children give negative numbers, just skip them both)
    return root.val + Math.max(0, Math.max(left, right));
};
