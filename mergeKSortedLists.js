/* QUESTION */
// Merge k sorted linked lists and return it as one sorted list.
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// Output: 1->1->2->3->4->4->5->6

/* SOLUTION */

// at each step, look through the first element in each list and select the smallest element
// o(m * n) time where m = number of lists and n = elements in the longest list

const mergeSorted = (lists) => {
    let mergedSorted = [];

    while(lists.length > 0)  {
        let smallestList;

        for (i = 0; i < lists.length; i++) {
            // remove list if empty
            if (lists[i].length === 0) {
                lists.splice(i, 1);
                i--;
                continue;
            }

            if (!smallest || lists[i][0] < lists[smallestList][0]) {
                smallestList = i;
            }
        }

        mergeSorted.push(lists[smallest].shift());
    }

    return mergeSorted;
};

// So... does that mean in this case it's actually faster to just concat the arrays and then merge sort them? Since merge sort has an o(n log n) run time?