/** QUESTION */
// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values in the nodes in the tree


/** SOLUTION */
// do an in-order traversal while keeping a count of how many nodes we've visited.
// at each recursive call, if we have a result, return it up the stack

const kthSmallestInBST = (root, k) => {
    return recursivelySearchKthSmallest(node, k)[1];
};

// takes a node, k and the count of the previous node
// returns [count of this node, the result] 
const recursivelySearchKthSmallest = (node, k, count = 0) => {
    if (!node) {
        return [count, -1];
    }

    let result = -1;
    // check left
    [count, result] = recursivelySearchKthSmallest(node, k, count);
    // return early?
    if (result >= 0) {
        return [count, result];
    }

    // check this node
    count++;
    if (count === k) {
        return [count, node.val];
    }

    // check right
    [count, result] = recursivelySearchKthSmallest(node, k, count);
    return [count, result];
};
