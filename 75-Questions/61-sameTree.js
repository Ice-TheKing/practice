/** QUESTION */
// Given the roots of two binary trees: p and q, write a function to check if they are the same or not.
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value


/** SOLUTION */
// We can solve this early by using two queues that compares the values of each node in the binary tree. Make sure to include nulls! Don't push their children, but include them so the structure is the same
// If at any point, we do not have an equality, return false
// If we make it through both queues without finding a mismatch, we can say they are equal 

const sameTree = (root1, root2) => {
    let queue1 = [];
    let queue2 = [];

    // push the roots
    queue1.push(root1);
    queue2.push(root2);

    while (queue1.length > 0 && queue2.length > 0) {
        let n1 = queue1.shift();
        let n2 = queue2.shift();

        if (n1 !== n2) {
            return false;
        }

        // push children
        if (n1) {
            queue1.push(n1.left);
            queue1.push(n1.right);
        }
        if (n2) {
            queue2.push(n2.left);
            queue2.push(n2.right);
        }
    }

    return true;
};