/* QUESTION */
// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [a, b] indicates there is an edge between a and b in the graph.
// Return the number of connected components in the graph

/* EXAMPLE *//*
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

0 - 1    3
    |    |
    2    4

*/

/* SOLUTION */
// 1: Create an adjacency list for all nodes

// 2: iterate through each node in the adjacency list and do a DFS from it
    // base. if we visited this node, return 0
    // a. as we visit each node, mark it as visited.
    // b. traverse all neighbors in the adjacency list
    // c. return 1
// incriment count by our call of node

// 3: Add the difference between adjacencylist and n to our result 
// (if there's only 2 nodes in adjacency list, but theres 5 nodes total, that means 3 are off by themselves, but should still be counted)

const connectedComponents = (n, edges) => {
    let adjacencyList = createAdjacencyList(edges);
    let visitedNodes = new Set();
    let count = 0;
    
    // iterate all edges
    for (let [node, neighbors] of edges) {
        // dfs from node
        count += searchNeighbors(node, adjacencyList, visitedNodes);
    }

    // count all nodes with no neighbors
    let singleNodes = n - adjacencyList.size;

    return count + singleNodes;
};

const searchNeighbors = (node, adjacencyList, visitedNodes) => {
    if (visitedNodes.has(node)) { // we've already traversed this node
        return 0;
    }

    visitedNodes.add(node);

    let neighbors = adjacencyList.get(node);

    // search all neighbors
    for (let neighbor of neighbors) {
        searchNeighbors(neighbor, adjacencyList, visitedNodes);
    }

    // this is a connected segment
    return 1;
};

const createAdjacencyList = (edges) => {
    let adjacencyList = new Map();

    for (let i = 0; i < edges.length; i++) {
        let [nodeA, nodeB] = edges[i];
        createPair(adjacencyList, nodeA, nodeB);
    }

    return adjacencyList;
};

const createPair = (adjacencyList, nodeA, nodeB) => {
    if (!adjacencyList.has(nodeA)) {
        adjacencyList.set(nodeA, []);
    }
    if (!adjacencyList.has(nodeB)) {
        adjacencyList.set(nodeB, []);
    }
    adjacencyList.get(nodeA).push(nodeB);
    adjacencyList.get(nodeB).push(nodeA);
};