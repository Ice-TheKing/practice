/** QUESTION */
// You are given the head of a singly linked-list. The list can be represented as:
// L0 -> L1 -> ... -> Ln-1 -> Ln
// Reorder the list to be in the following order:
// L0 -> Ln -> 


/** SOLUTION */
// Using the fast/slow runner approach, find the middle point of the list and break the connection between the two
// Reverse the second list
// Merge the two lists together (l1 first, then l2)

const reorderList = (head) => {
    if (!head) {
        return head;
    }
    let n = head;
    let fast = n;

    // use fast runner to stop at the middle of the linked list
    while (fast.next && fast.next.next) {
        fast = fast.next;
        if (fast) { // to make sure we don't access .next of null
            fast = fast.next;
        }

        n = n.next;
    }

    // split into two linkedLists
    let head2 = n.next;
    n.next = null;

    // reverse second list
    head2 = reverseList(head2)[1];

    // merge the two lists
    mergeLists(head, head2);

    return head;
};

const reverseList = (head) => {
    if (!head) {
        return [head, head];
    }

    let [nextNode, newHead] = reverseList(head.next);
    head.next = nextNode;

    return [head, newHead];
};

const mergeLists = (l1, l2) => {
    while(l1 && l2) {
        let temp = l1.next;
        let temp2 = l2.next;

        l1.next = l2;
        l2.next = temp;

        l1 = temp;
        l2 = temp2;
    }
};