/** QUESTION */
// Given the root of a binary tree, invert the tree and return its root


/** SOLUTION */
// DFS recursively invert the binary tree. We do DFS so that we flip the leaf nodes before the parent nodes

const invertTree = (root) => {
    if (!root) {
        return null;
    }

    let left = invertTree(root.left);
    let right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
};