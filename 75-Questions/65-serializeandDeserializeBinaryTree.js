/** QUESTION */
// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer
// or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work
// You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure

// Clarification: the input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format
// so please be creative and come up with different approaches yourself


/** SOLUTION */
// DFS serialize/deserialize
function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}


const serializeTree = (root) => {
    let serial = recursivelyBuildSerial(root);
    return serial.join(',');
};

const recursivelyBuildSerial = (root, serial = []) => {
    if (!root) {
        serial.push('N');
        return serial;
    }

    serial.push(root.val);
    recursivelyBuildSerial(root.left, serial);
    recursivelyBuildSerial(root.right, serial);
    return serial;
};

const deserializeTree = (serialized) => {
    if (!serialized || serialized.length === 0) {
        return null;
    }
    const array = serialized.split(',');
    return recursivelyBuildTree(array)[0];
};

// takes an array and an index
// returns [node, newIndex]
const recursivelyBuildTree = (serialized, i = 0) => {
    if (serialized[i] === 'N') {
        return [null, i+1];
    }

    let thisNode = new Node(Number(serialized[i]));
    i++;

    [ thisNode.left, i ] = recursivelyBuildTree(serialized, i);
    [ thisNode.right, i ] = recursivelyBuildTree(serialized, i);

    return [ thisNode, i ]
};


let head = new Node(1);
head.right = new Node(3);
head.left = new Node(2);
head.right.right = new Node(5);
head.right.left = new Node(4);

let serialized = serializeTree(head);
let deserialized = deserializeTree(serialized);

console.log(serialized);
console.log(serializeTree(deserialized));
console.log(serializeTree(null));
console.log(deserializeTree([]));



// Okay so I started with this BFS solution, unfortunately I didn't realize this approach only works with balanced trees :(

const serializeTreeBFS = (root) => {
    if (!root) {
        return [];
    }

    let serial = [];
    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        // make a sublist of all values in the queue
        let node = queue.shift();
        if (node) {
            serial.push(node.val);

            queue.push(node.left);
            queue.push(node.right);
        } else {
            serial.push(node);
        }
    }

    return serial;
};

const deserializeTreeBFS = (serialized) => {
    let array = [...serialized];

    // turn all vals into nodes
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== null) { // don't turn null nodes into nodes
            array[i] = new Node(array[i]);
        }
    }

    // add a spacer so the math works out
    array.unshift(null);

    let index = 1;
    // link nodes
    for (let i = 1; i < array.length; i++) {
        // left = 2*i
        // right = 2*i+1
        if (array[index] !== null) {
            array[index].left = array[2*index] || null;
            array[index].right = array[(2*index)+1] || null;
            index++;
        }
    }

    return array[1] || null; // return root
};
/*
let head = new Node(1);
head.right = new Node(3);
head.left = new Node(2);
head.right.right = new Node(5);
head.right.left = new Node(4);


let serialized = serializeTree(head);
let deserialized = deserializeTree(serialized);

console.log('Tree');
console.log(head);
console.log(deserialized);
console.log('Serialized');
console.log(serialized);
console.log(serializeTreeBFS(deserialized));
console.log('Edge cases');
console.log(serializeTreeBFS(null));
console.log(deserializeTreeBFS([]));
*/