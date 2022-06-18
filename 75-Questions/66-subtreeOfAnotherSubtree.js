/** QUESTION */
// Given the roots of two binary trees: root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.
// A subtree of a binary tree: tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself


/** SOLUTION */
// We can print out the in-order traversal of both trees, and if subRoot's in-order traversal is included as a substring of root's in-order traversal, return true. Else return false

const isSubtree = (root, subroot) => {
    let rootTraversal = getInOrder(root);
    let subrootTraversal = getInOrder(subroot);

    return rootTraversal.indexOf(subrootTraversal) > 0; // I think getIndexOf returns -1 if it's not found in the string
};

const getInOrder = (root, traversal = []) => { // make sure to include nulls as bonus characters
    if (!root) {
        traversal.push('X');
    }

    getInOrder(root.left, traversal);
    // push self
    traversal.push(root.val);
    getInOrder(root.right, traversal);

    return traversal;
};

/* TESTING *//*
root:
     3
  4     5
1   2

subroot:
  4
1   2


root traversal:    [x,1,x,4,x,2,x,3,x,5,x]
subroot traversal: [x,1,x,4,x,2,x]
return true, because subroot traversal exists in traversal


root:
     3
  4     5
1   2
   0

subroot:
  4
1   2

root traversal:    [x,1,x,4,0,2,x,3,x,5,x]
subroot traversal: [x,1,x,4,x,2,x]
return false, because subroot traversal does not exist in traversal

*/