/** QUESTION */
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer

// Return true if there is a cycle in th elinked list. Otherwise return false


/** SOLUTION */
// Two solutions here. Both o(n) time

// we can use a set to see if we've already visited a node before (by reference, not value). If we have then there must be a cycle

// o(n) time
// o(n) space
const detectCycle = (head) => {
    let set = new Set();

    while (head) {
        if (set.has(head)) {
            return true;
        }
        set.add(head);
        head = head.next;
    }

    return false;
};


// if we don't want to use extra memory, we can also use a fast/slow runner approach. If there is a cycle, at some point fast and slow runner will be equal
// o(n) time
// o(1) space

const detectCycleRunner = (head) => {
    let fastRunner = head;
    let slowRunner = head;

    while (slowRunner) {
        if (slowRunner === fastRunner) {
            return true;
        }

        slowRunner = slowRunner.next;
        if (fastRunner && fastRunner.next) {
            fastRunner = fastRunner.next.next;
        }
    }

    return false;
};