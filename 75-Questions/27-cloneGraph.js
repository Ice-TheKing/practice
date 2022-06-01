/* QUESTION */
// Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
// Each node in the graph contains a value and a list of its neighbors

// function Node(val, neighbors) {
//     this.val = val === undefined ? 0 : val;
//     this.neighbors = neighbors || [];
// };

/* EXAMPLE *//*

*/

/* SOLUTION */
// Keep a map of all nodes we've traversed in the original. Key = old node, value = new node so we can quickly retrieve the old node's equivalent
// n = number of nodes in the graph
// o(n) time (cloning each node)
// o(n) space (storing each node in a hash map)


const cloneGraph = (oldNode, nodeMap = new Map()) => {
    // handles edge case where no node is passed at all
    if (!oldNode) {
        return null;
    }

    // if the node is already cloned, just return the node that was already created
    if (nodeMap.has(oldNode)) {
        return nodeMap.get(oldNode); 
    }

    let newNode = copyNode(oldNode);
    nodeMap.set(oldNode, newNode);

    let neighbors = [];

    // create all neighbors
    for (let i = 0; i < oldNode.neighbors.length; i++) {
        let neighbor = cloneGraph(oldNode.neighbors[i], nodeMap);
        // add to list of neighbors
        neighbors.push(neighbor);
    }

    newNode.neighbors = neighbors;

    return newNode;
};

// I'm not sure why I made this it's own function it's literally one line lmao. But here it is
const copyNode = (node) => {
    return new Node( node.val );
};