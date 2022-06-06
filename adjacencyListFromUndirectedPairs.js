/** QUESTION */
// Just a quick exercise to turn an array of undirected node pairs into an adjacency list we can iterate through

/** EXAMPLE *//*
Input: [
    [a,b],
    [b,c],
    [x,y],
    [y,z],
    [y,b]
]

Output: Map {
    a: [b]
    b: [c, y]
    c: [b]
    x: [y]
    y: [z, b]
}
*/


/** SOLUTION */
// 

const createAdjacencyList = (pairs) => {
    let adjacencyList = new Map();

    for (let i = 0; i < pairs; i++) {
        let [ nodeA, nodeB ] = pairs[i];
        if (!adjacencyList.has(nodeA)) {
            adjacencyList.set(nodeA, []);
        }
        if (!adjacencyList.has(nodeB)) {
            adjacencyList.set(nodeB, []);
        }

        adjacencyList.get(nodeA).push(nodeB);
        adjacencyList.get(nodeB).push(nodeA);
    }

    return adjacencyList;
};