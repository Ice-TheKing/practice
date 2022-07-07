/** QUESTION */
// Given two integer arrays pre-order and in-order where pre-order is the preorder traversal of a binary tree and in-order is the in-order traversal of the same tree,
// construct and return the binary tree


/** SOLUTION */
// Basically we want to build the tree recursively. We can garuntee that the first node in the pre-order traversal is our root, so we can work from there
// We look for the same root val in the in-order traversal. In the in-order traversal list that splits our left/right subtree arrays in half
// Then we can get the left/right subtree halves in our pre-order by using the lengths of the left/right subtree arrays from our in-order traversals



function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

const createTreeFromTraversals = (inorder, preorder) => {
    // base cases
    if (inorder.length === 0 || preorder.length === 0) {
        return null;
    }

    // create our root node
    let root = new Node(preorder.unshift());

    // get our middle index (middle index is exclusive for both arrays)
    let midIndex = searchIndex(inorder, root.val);

    let leftInorder = inorder.slice(0, midIndex); // exclude mid index
    let rightInOrder = inorder.slice(midIndex+1, midIndex.length); // exclude mid index
    let leftPreorder = preorder.slice(0, leftInorder.length); // want to match lengths
    let rightPreorder = preorder.slice(leftInorder.length, preorder.length+1); // grab the rest of the array (including the end)

    root.left = createTreeFromTraversals(leftInorder, leftPreorder);
    root.right = createTreeFromTraversals(rightInOrder, rightPreorder);

    return root;
};

const searchIndex = (inorder, val) => {
    for (let i = 0; i < inorder.length; i++) {
        if (inorder[i] === val) {
            return i;
        }
    }
    return -1;
};


// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]

// leftIn  = [9]
// rightIn = [15,20,7]

// leftPre = [9]
// rightPre= [20,15,7]


// rightPre= [20,15,7]
// rightIn = [15,20,7]

// leftIn [15]
// rightIn [7]

// leftPre [15]
// rightPre [7]

//            3
//          9   20
//        n n 15  7
//           n  nn  n

// o(n^2) time (searching for mid and rebuilding the arrays with splice for each element in the tree)