/** QUESTION */
// An exercise to implement quicksort in JS

/** EXAMPLE *//*
Input: [
    [a,b],
    [b,c],
    [x,y],
    [y,z],
    [y,b]
]

Output: Map {
    a: [b]
    b: [c, y]
    c: [b]
    x: [y]
    y: [z, b]
}
*/


/** SOLUTION */
let array = [5, 2, 8, 9, 3, 4, 1, 7, 6, 0];
let array2 = [54, 70, 71, 76, 86, 74, 30, 21, 13, 49, 72, 87, 61, 37, 98, 52, 24, 36, 34, 73, 65, 20, 39, 78, 82, 43, 93, 88, 12, 68, 84];
// edge cases
let array3 = [6];
let array4 = [];

// pick a pivot (we'll use the middle of the array)
// if j === pivot index, skip
// i = -1
// j = i + 1
// if element[j] is smaller than the pivot, incriment the pivot and swap i and j
// once j loop ends, pivot will go to position i+1 (this will be in sorted order)
// recurse on the segments to the left and right of the pivot (i = -1 and end = i+1 for the left half, i = i+1 and end = end for the second half)
// base case: i is >= end (right half base case) or j is >= end (left half base case) 
//  s e
// [2]

const quickSort = (array, start = 0, end = array.length) => {
    // initialize our starting pointers
    let i = start-1;
    let j = start;

    if (start >= end-1 || start >= array.length) {
        return array; // out of bounds, or only 1 element left
    }

    let pivot = Math.floor((j + end) / 2);
    // splice the pivot out and decriment the end counter
    pivot = array.splice(pivot, 1)[0];
    end--;

    while (j < end) {
        // if element[j] is smaller than the pivot, incriment the pivot and swap i and j
        if (array[j] < pivot) {
            i++;
            swapValues(array, i, j);
        }
        // continue on
        j++;
    }

    let insertionPoint = i+1;

    // put the pivot back at i+1
    array.splice(i+1, 0, pivot);
    end++;

    // recurse on left and right half
    quickSort(array, start, insertionPoint); // i+1 becomes our new end (end is exclusive)
    quickSort(array, insertionPoint+1, end); // insertionPoint+1 becomes our start, because the value we just inserted is supposed to be our new "-1" index

    // return array;
    return array;
};

const swapValues = (array, i, j) => {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
};

console.log(quickSort(array));
console.log(quickSort(array2));
console.log(quickSort(array3));
console.log(quickSort(array4));




// MANUAL TEST before I run the console.log lines
// let array = [5, 2, 8, 9, 3, 4, 1, 7, 6, 0];

// [5, 2, 8, 9, 3, 4, 1, 7, 6, 0]
// j = 0, end = 10. j+end (10) / 2 = 5
// Element at index 5 = 4. 
// 4 gets spliced out and saved to pivot
// End gets decrimented to 9

//i j
// [5, 2, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e

//i j
// [5, 2, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e
// 5 is not less than 4

//i    j
// [5, 2, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e
// 2 is less than 4, incriment i and swap i and j
//  i  j
// [2, 5, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e

//  i     j
// [2, 5, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e
// 8 is not less than 4

//  i        j
// [2, 5, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e
// 9 is not less than 4

//  i           j           
// [2, 5, 8, 9, 3, 1, 7, 6, 0] pivot: 4
//  s                         e
// 3 is less than 4, incriment i and swap i and j
//     i        j           
// [2, 3, 8, 9, 5, 1, 7, 6, 0] pivot: 4
//  s                         e

//     i           j         
// [2, 3, 8, 9, 5, 1, 7, 6, 0] pivot: 4
//  s                         e
// 1 is less than 4, incriment i and swap i and j
//        i        j         
// [2, 3, 1, 9, 5, 8, 7, 6, 0] pivot: 4
//  s                         e

//        i           j         
// [2, 3, 1, 9, 5, 8, 7, 6, 0] pivot: 4
//  s                         e
// 7 is not less than 4

//        i              j        
// [2, 3, 1, 9, 5, 8, 7, 6, 0] pivot: 4
//  s                         e
// 6 is not less than 4

//        i                 j      
// [2, 3, 1, 9, 5, 8, 7, 6, 0] pivot: 4
//  s                         e
// 0 is less than 4, incriment i and swap i and j
//           i              j      
// [2, 3, 1, 0, 5, 8, 7, 6, 9] pivot: 4
//  s                         e

// done. splice 4 back into array at i+1 and continue
//           i              j      
// [2, 3, 1, 0, 4, 5, 8, 7, 6, 9]



    // LEFT HALF, i+1 (index 4) is our new end
    // start stays the same
    // [2, 3, 1, 0, 4, 5, 8, 7, 6, 9]
    //  s           e                

    // j = 0, end = 5. j+end (15) / 2 = 2.5. Floored = index 2 is now our pivot
    // Element at index 2 = 1. 
    // 1 gets spliced out and saved to pivot
    // End gets decrimented to 3
    //i j
    // [2, 3, 0, 4, 5, 8, 7, 6, 9] pivot: 1
    //  s        e                 

    //i j
    // [2, 3, 0, 4, 5, 8, 7, 6, 9] pivot: 1
    //  s        e                 
    // 2 is not less than 1

    //i    j
    // [2, 3, 0, 4, 5, 8, 7, 6, 9] pivot: 1
    //  s        e                 
    // 3 is not less than 1

    //i       j
    // [2, 3, 0, 4, 5, 8, 7, 6, 9] pivot: 1
    //  s        e                 
    // 0 is less than 1, incriment i and swap i and j
    //  i     j
    // [0, 3, 2, 4, 5, 8, 7, 6, 9] pivot: 1
    //  s        e                 

    // done. splice 1 back into array at i+1 and continue
    //  i     j
    // [0, 1, 3, 2, 4, 5, 8, 7, 6, 9]

        // LEFT HALF
        // start = 0
        // end = 1
        // j = 0, i = -1
        // we hit a base case because j >= end-1 === true


        // RIGHT HALF
        // start = 2
        // end = 4
        //     i  j 
        // [0, 1, 3, 2, 4, 5, 8, 7, 6, 9]
        //        s     e
        // i = 1
        // j = 2
        // pivot = (2 + 4) / 2 = 3. array[pivot] = 2
        // 2 gets spliced out and saved to pivot
        // end gets decrimented

        //     i  j 
        // [0, 1, 3, 4, 5, 8, 7, 6, 9] pivot = 2
        //        s  e

        //     i  j 
        // [0, 1, 3, 4, 5, 8, 7, 6, 9] pivot = 2
        //        s  e
        // 3 is not smaller than 2

        // done. splice 2 back into array at i+1 (index 2) and continue
        //     i  j 
        // [0, 1, 2, 3, 4, 5, 8, 7, 6, 9] pivot = 2

            // both left and right calls from here will hit a base case



    // RIGHT HALF, i+1 (index 4) is our new start, end stays the same (index 10)
    // [2, 3, 1, 0, 4, 5, 8, 7, 6, 9]
    //              s                e

    // j = 5, end = 10. j+end (15) / 2 = 7.5. Floored = index 7 is now our pivot
    // Element at index 7 = 7. 
    // 7 gets spliced out and saved to pivot
    // End gets decrimented to 9

    //              i  j            
    // [2, 3, 1, 0, 4, 5, 8, 6, 9] pivot: 7
    //              s             e

    // ... okay you get the idea, it works lol