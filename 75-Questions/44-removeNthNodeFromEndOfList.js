/** QUESTION */
// Given the head of a linked list, remove the nth node from the end of the list and return its head


/** SOLUTION */
// make a fast/slow runner. Fast runner is ahead of slow runner by n steps

const removeNthNode = (head, n) => {
    if (n < 1) {
        return head;
    }

    let slow = head;
    let fast = head;

    let counter = 0;

    // move fast ahead by n
    while (counter < n) {
        counter++;
        if (!fast) {
            return head; // list isn't long enough to remove nth num
        }
        fast = fast.next;
    }
    if (!fast) {
        // if fast is null, that means we are supposed to remove the very first element in the list (aka head)
        return head.next;
    }

    // track both forward until we are at the last element
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    // remove the 1st element from the end means remove the last element. 
    // Which means when n=1, the slow runner will be behind by 1. So at the end of the while loop, fast runner is at the node BEFORE the node we are removing
    // so even if we are removing the 1st from the end of the list, slow.next(last node).next will be null, which is exactly what we want
    slow.next = slow.next.next;
    return head;
};


// 1,2,3,4,5
// s f   s f 

// 1 null
//   f
// s