/** QUESTION */
// Reverse a linked list


/** SOLUTION */
// if node.next is null, return [node, node] // [node, node]
// else Recursively call on node.next
// set the return value from the recursive call's next node (returnVal[0].next) to this node, then return [thisNode, returnVal[1])
// once you get back up to the driver function, set returnVal[0].next to null and return returnVal[1]

// o(n) time
// o(n) space (call stack)

const reverseLinkedList = (head) => {
    if (!head) {
        return null;
    }

    let result = recursiveReverse(head);
    result[0].next = null;
    return result[1];
};

const recursiveReverse = (node) => {
    if (!node.next) {
        return [node, node];
    }

    let result = recursiveReverse(node.next);
    result[0].next = node;

    return [node, result[1]];
};