/** QUESTION */
// Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).


/** SOLUTION */
// Question is basically asking us to do a breadth first search?

const levelOrder = (root) => {
    if (!root) {
        return [];
    }

    let result = [];
    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        // make a sublist of all values in the queue
        let levelList = [];
        while (queue.length > 0) {
            levelList.push(queue.shift());
        }
        result.push(levelList);

        // fill the queue again
        for (let i = 0; i < levelList; i++) {
            let thisNode = levelList[i];
            if (thisNode.left) {
                queue.push(thisNode.left);
            }
            if (thisNode.right) {
                queue.push(thisNode.right);
            }
        }
    }

    return result;
};