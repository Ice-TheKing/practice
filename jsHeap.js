/* QUESTION */
// Implement a min heap in JavaScript

/* SOLUTION */
// functions:
// access min value o(1)
// insert element o(log n)
// remove element o (log n)

function minHeap() {
    this.heap = [null]; // 0th element should be null

    this.getValue = () => {
        return this.heap[1];
    };

    this.insert = (val) => {
        // insert at the bottom of the heap
        this.heap.push(val);

        if (this.heap.length > 1) {
            let index = this.heap.length-1;

            // bubble the value up if it's smaller than its parent until it's not
            while (index > 1 && this.heap[index] < this.heap[this.parentIndex()]) {
                this.swapValues(index, this.parentIndex());
                index = this.parentIndex();
            }
        }
    };

    this.remove = () => {
        this.value = this.heap[1];

        if (this.heap.length > 1) {
            // place last value first
            this.heap[1] = this.heap.pop();

            // bubble the top value down until it's no longer larger than any of it's children
            let index = 1;
            // while there is a left and right child, and current index is bigger than at least one of them
            while(this.heap[this.leftIndex(index)] && this.heap[this.rightIndex(index)] && 
                (this.heap[index] > this.heap[this.leftIndex(index)] || this.heap(index) > this.heap(this.rightIndex(index))) ) {
                    // swap index with whichever is smaller: left or right
                    if (this.heap[this.leftIndex(index)] < this.heap[this.rightIndex(index)]) {
                        this.swapValues(index, this.leftIndex(index));
                        index = this.leftIndex(index);
                    } else {
                        this.swapValues(index, this.rightIndex(index));
                        index = this.rightIndex(index);
                    }
                }
        }
    };

    // helper functions. TODO: These should really be private, but I haven't learned the new JS class syntax yet. I'll be back to fix this later
    this.parentIndex = (index) => {
        return Math.floor(current/2);
    };

    this.leftIndex = (index) => {
        return (2*index)+1;
    };

    this.rightIndex = (index) => {
        return (2*index)+2;
    };

    this.swapValues = (index1, index2) => {
        let temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    };
};