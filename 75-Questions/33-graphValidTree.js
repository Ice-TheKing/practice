/* QUESTION */
// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree

/* EXAMPLE *//*
n = 5, edges = [[0,1], [0,2], [0,3], [1,4]]
expected: true

        0
    1   3   2
 4

       4
       1
       0
     2   3

      1
    0   4
  2   3

       2
       0
     1   3
     4

      3
      0
    1   2
    4

in a valid tree, since it's undirected it won't actually matter which node we use as the head
*/

/* SOLUTION */
// Let's do a depth first search
// Each node should return True if it's a valid tree, and false if it isn't

// 0: create an adjacency list
// 1: find the root node (follow parents?)
// 2: do a post-order dfs from the parent to child nodes:
    // a: check base case (return true if null, return false if in the visited set)
    // b: check all children
    // c: if a child call returns false, return false
    // d: else if all children return true, return true

const isValidTree = (n, edges) => {
    // edge cases
    if (!edges || edges.length === 0 || edges[0].length !== 2) {
        return false;
    }

    let adjacencyList = createAdjacencyList(edges);

    // in a valid tree, since it's an undirected graph, and we don't re-check the node that called us (our parent) it won't actually matter which node we use as the head
    let head = edges[0][0]; // just grab the first node to use as head
    // we also want to make sure we traversed ALL nodes. If we didn't, that means there is a disconnected segment, aka it is not a valid tree
    return validateTree(head, adjacencyList) === n;
};

const validateTree = (head, adjacencyList, callingNode = null, visited = new Set()) => {
    if (!head) {
        return 0;
    }
    if (visited.has(head)) { // we've visited this node before (should not happen in a valid tree)
        return -1; // that means this tree is invalid
    }

    visited.add(head);

    // count the number of nodes we visit
    let count = 1; // right now we're visiting this node

    // check all neighbors and return false if any of them return false
    let neighbors = adjacencyList.get(head);

    for (let neighbor of neighbors) {
        // don't iterate on the node that called us
        if (neighbor === callingNode) {
            continue;
        }

        let result = validateTree(neighbor, adjacencyList, head)

        // if any return false, return false early
        if (result === -1) {
            return -1;
        }

        count += result;
    }

    // all neighbors returned true
    return count;
};

const createAdjacencyList = (edges) => {
    let adjacencyList = new Map();

    for (let [nodeA, nodeB] of edges) {
        createPair(nodeA, nodeB, adjacencyList);
    }

    return adjacencyList;
};

const createPair = (nodeA, nodeB, list) => {
    if (!list.has(nodeA)) {
        list.set(nodeA, []);
    }
    if (!list.has(nodeB)) {
        list.set(nodeB, []);
    }

    list.get(nodeA).push(nodeB);
    list.get(nodeB).push(nodeA);
};