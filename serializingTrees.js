'use strict';

class node {
  constructor(val) {
    this.val = val;
    this.leftNode = null;
    this.rightNode = null;
  }
};

let binaryTree = new node(10);
console.dir(binaryTree);

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
}
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
  return `${root.val}${leftNode}${rightNode}`;
}

let serialized = serializeTree(binaryTree);
console.dir(serialized);