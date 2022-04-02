let mySet = new Set();

mySet.add(5);
mySet.add(1);
mySet.add(4);
mySet.add(5);

console.dir(mySet);
console.dir(mySet.has(1));
console.dir(mySet.has(2));
mySet.delete(4);
console.dir(mySet.has(4));


let myMap = new Map();
myMap.set('a', 1);
myMap.set(5, [1,2,3,4]);
console.dir(myMap);
console.dir(myMap.get('a'));
myMap.set(0, 'zero');
myMap.delete(0);
console.dir(myMap.get(0));