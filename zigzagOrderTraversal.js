/** QUESTION */
// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).


/** SOLUTION */
// first let's do a BFS, because we're essentially doing a BFS that goes left to right then right to left, etc

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

const DIRECTION_ENUM = {
    right: false,
    left: true
};

const zigzagTraversal = (root) => {
    if (!root) {
        return [];
    }

    let traversal = [];
    let queue = [];
    let direction = DIRECTION_ENUM.right;

    // add root to the queue
    queue.push(root);

    while (queue.length > 0) {
        queue = processTreeLevel(queue, traversal, direction);

        // change direction
        direction = !direction;
    }


    return traversal;
};

// takes a queue, traversal and direction
// returns the new queue for the next level traversal
const processTreeLevel = (queue, traversal, direction) => {
    let newQueue = [];

    while (queue.length > 0) {
        let node;

        if (direction === DIRECTION_ENUM.right) {
            node = queue.shift();
        } else {
            node = queue.pop();
        }

        // add to traversal
        traversal.push(node.val);

        // push children
        if (direction === DIRECTION_ENUM.right) {
            if (node.left) {
                newQueue.push(node.left);
            }
            if (node.right) {
                newQueue.push(node.right);
            }
        } else {
            if (node.right) {
                newQueue.unshift(node.right);
            }
            if (node.left) {
                newQueue.unshift(node.left);
            }
        }
        
    }
    
    return newQueue;
};


const root = new Node(3);
root.left = new Node(9);
root.right = new Node(20);
root.right.left = new Node(15);
root.right.right = new Node(7);
/*
     3
   9  20
     15 7
     
Expected: 3, 20, 9, 15, 7
*/
console.log(zigzagTraversal(root));

root.left.left = new Node(2);
root.left.right = new Node(4);
root.left.left.left = new Node(12);
root.right.left.right = new Node(13);

/*
        3
     9     20
   2  4  15   7
 12       13

Expected: 3, 20, 9, 2, 4, 15, 7, 13, 12
*/
console.log(zigzagTraversal(root));