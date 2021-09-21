'use strict';

class node {
  constructor(val, left, right) {
    this.val = Number(val);
    this.leftNode = left || null;
    this.rightNode = right || null;
    
    this.insert = (val) => {
      if (this.val === val || isNaN(val)) {
        return;
      }
      
      if (val >= this.val) {
        this.rightNode ?
          this.rightNode.insert(val):
          this.rightNode = new node(val);
      }
      else {
        this.leftNode ?
          this.leftNode.insert(val) :
          this.leftNode = new node(val);
      }
    };
    
    /// sorts all nodes below this node
    this.sort = () => {
      // serialize the rest of the tree
      let serialized = serializeTree(this).split(",");
      
      // clear child nodes
      this.leftNode = this.rightNode = null;
      
      // re-insert nodes (insert function sorts them)
      for(let i = 0; i < serialized.length; i++) {
        this.insert(Number(serialized[i]));
      }
    };
    
    /// balances and sorts the BST
    this.balance = () => {
      let treeArray = serializeTree(this).split(',');
      
      // remove empty children
      for(let i = 0; i < treeArray.length; i++) {
        if (treeArray[i] === 'X') {
          treeArray.splice(i, 1);
          i--;
        } else {
          // make sure it's a number for sorting
          treeArray[i] = Number(treeArray[i]);
        }
      }
      
      // sort the array
      treeArray = treeArray.sort( (a, b) => {return a-b} );
      
      // recursively create nodes from the middle of each array
      // replace this node with the new tree built from balanceBuild
      const rootNode = this.balanceBuild(treeArray);
      // I can't just reassign 'this' object from a function within this object (that I know of), so I have to do it manually
      this.val = rootNode.val;
      this.leftNode = rootNode.leftNode;
      this.rightNode = rootNode.rightNode;
    };
    
    /// takes an array, returns a node
    this.balanceBuild = (array) => {
      if (array.length === 0) {
        return null;
      }
      
      // create middle node
      const middleIndex = Math.floor(array.length / 2);
      const leftHalf = array.slice(0, middleIndex);
      const rightHalf = array.slice(middleIndex, array.length);
      let newNode = new node( rightHalf.shift() );
      
      // recursively run left half of array, assign it as left child
      newNode.leftNode = this.balanceBuild(leftHalf);
      
      // recursively run right half of array, assign it as right child
      newNode.rightNode = this.balanceBuild(rightHalf);
      
      // return newNode
      return newNode;
    };
    
  }
}

let binaryTree = new node(10);
const fillTree = () => {
  let n0 = new node(0);
  let n1 = new node(1);
  let n2 = new node(2);
  let n3 = new node(3);
  let n4 = new node(4);
  let n5 = new node(5);
  let n6 = new node(6);
  let n7 = new node(7);
  let n8 = new node(8);
  let n9 = new node(9);
  
  binaryTree.leftNode = n3;
  n3.leftNode = n5;
  n5.leftNode = n6;
  n5.rightNode = n7;
  n7.leftNode = n4;
  n7.rightNode = n0;
  binaryTree.rightNode = n2;
  n2.leftNode = n1;
  n2.rightNode = n8;
  n8.rightNode = n9;
};
fillTree();

const serializeTree = (root) => {
  // if this is a null node, return X
  if (root === null) {
    return 'X';
  }
  
  // get left node
  let leftNode = serializeTree(root.leftNode);
  // get right node
  let rightNode = serializeTree(root.rightNode);
  
  // return this value + left node + right node up the call stack
  return `${root.val},${leftNode},${rightNode}`;
};

const deserializeTree = (array) => {
  const thisVal = array.shift();
  
  if (thisVal === 'X') {
    return null;
  }
  
  // create left node
  let leftNode = deserializeTree(array);
  
  // create right node
  let rightNode = deserializeTree(array);
  
  // return self node with link to left/right
  return new node(thisVal, leftNode, rightNode);
};

console.dir('unfortunately console runs asyncronously in JS, so a lot of the objects in console are probably going to look the same, or appear out of order from the state they should be syncronously.');
console.dir('comment out some of the steps if you want to focus in on a certain area and see what its doing.');

console.dir(binaryTree);
console.dir('serializing');
let serialized = serializeTree(binaryTree);
console.dir(serialized);

console.dir('deserializing');
let deserialized = deserializeTree(serialized.split(","));
console.dir(Object.assign(deserialized));


const insertVal = 14;
console.dir(`inserting ${insertVal}`);

deserialized.insert(insertVal);

console.dir(deserialized);

console.dir(`sorting tree`);
deserialized.sort();
console.dir(deserialized);

console.dir('serialized:');
console.dir(serializeTree(deserialized));

console.dir(`balancing tree`);
deserialized.balance();
console.dir(deserialized);

console.dir(`serializing balanced tree`);
const sortedSerialized = serializeTree(deserialized);
console.dir(sortedSerialized);

// images

const img1 = document.createElement("img");
img1.src = "resources/unbalancedUnsortedBST.png";
img1.width = 640;

const img2 = document.createElement("img");
img2.src = "resources/sortedBST.png";
img2.width = 480;

const img3 = document.createElement("img");
img3.src = "resources/balancedBST.png";
img3.width = 900;

document.body.appendChild(img1);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(img2);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(img3);