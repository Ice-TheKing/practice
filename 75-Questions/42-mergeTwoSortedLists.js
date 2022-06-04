/** QUESTION */
// You are given the heads of two sorted linked lists: list1 and list2

// merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// return the head of th merged linked list.


/** SOLUTION */
// 

const mergeSortedLists = (list1, list2) => {
    if (!list1 || !list2) {
        return list1 || list2;
    }
    
    let head = null;

    if (list1.val < list2.val) {
        head = list1;
        list1 = list1.next;
    } else {
        head = list2;
        list2 = list2.next;
    }

    let lastNode = head;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            lastNode.next = list1;
            lastNode = list1;
            list1 = list1.next;
        } else {
            lastNode.next = list2;
            lastNode = list2;
            list2 = list2.next;
        }
    }

    while (list1) {
        lastNode.next = list1;
        lastNode = list1;
        list1 = list1.next;
    }

    while(list2) {
        lastNode.next = list2;
        lastNode = list2;
        list2 = list2.next;
    }

    return head;
};