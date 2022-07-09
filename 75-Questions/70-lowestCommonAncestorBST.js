/** QUESTION */
// A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker

// Implement the Trie class:

// insert(word) inserts the string: word into the trie
// search(word) returns true if the string word is in the trie, and false otherwise
// startsWith returns true if there is a previously inserted string: word that has the prefix: prefix, and false otherwise


/** SOLUTION */
// 

function TrieNode(val) {
    this.val = val;
    this.terminator = false;
    this.neighbors = new Map();
}

function Trie() {
    this.root = new TrieNode(null);

    this.insert = (word, n = this.root, index = 0) => {
        if (index === word.length) {
            return;
        }

        let char = word.charAt(index).toLowerCase();

        if (!n.neighbors.has(char)) {
            // if child doesn't exist, create it
            n.neighbors.set(char, new TrieNode(char));
        }

        // if this is the last character, it becomes terminal
        if (index === word.length-1) {
            n.neighbors.get(char).terminator = true;
            return;
        }

        // recurse on child
        this.insert(word,
            n.neighbors.get(char) || null,
            index+1);
    };

    this.search = (word, n = this.root, index = 0) => {
        if (!n) {
            return false;
        }
        
        let char = word.charAt(index).toLowerCase();

        if (index === word.length) {
            return n.terminator; // needs to be a character marked as a terminator for a word
        }

        return this.search(word, n.neighbors.get(char), index+1);
    };

    this.startsWith = (word, n = this.root, index = 0) => {
        if (!n) {
            return false;
        }

        let char = word.charAt(index).toLowerCase();

        if (index === word.length-1) {
            return n.neighbors.has(char); // doesn't need to be marked as a word terminator
        }

        return this.startsWith(word, n.neighbors.get(char), index+1);
    };
}

let myTrie = new Trie();

myTrie.insert("apple");
console.log(myTrie.search("apple"));   // return True
console.log(myTrie.search("app"));     // return False
console.log(myTrie.startsWith("app")); // return True
myTrie.insert("app");
console.log(myTrie.search("app"));     // return True


console.log(myTrie.startsWith("b"));   // return false