/* QUESTION */
// There are a total of numCourses courses you can take, labeled from 0 - numCourses -1. You are given an array: prerequisites [a,b] that indicates that you must take course b first if you want to take course a.
// return true if you cna finish all courses. Otherwise return false. 

/* EXAMPLE *//*

*/

/* SOLUTION */
// Loop through the course array
// Check if the course can be completed
    // if it has already been marked that it can, return true
    // else check it's prerequisite and return true/false depending on what it's prereq returns. If true, add it to the set of courses that can be completed
        // if we have an infinite loop, return false
// if we get a false early, we can return a false early, else continue on in the array

// o(n) time since we solve each course once
// o(n) space since we store a map of prerequisites, a set of courses that have been marked as possible, and a set of courses that are being checked so we don't end up in an infinite loop


const courseSchedule = (numCourses, prerequisites) => { // don't actually need numCourses in JavaScript. I'm assuming passed in for array size for languages like C++?
    // create a map of prerequisites
    let prereqMap = createPrerequisiteMap(prerequisites);
    let completableCourses = new Set(); // if a course is in here, it has already been solved as completable

    // check each course
    for (let i = 0; i < prerequisites; i++) {
        let course = prerequisites[i][0];

        if (!checkCourseCompletion(course, prereqMap, completableCourses)) {
            // if a course can't be completed, return false
            return false;
        }
    }

    // we've checked that all courses can be complete
    return true;
};

const checkCourseCompletion = (course, prereqMap, completableCourses, checked = new Set()) => {
    // it can be completed if it doesn't have a prereq
    if (!prereqMap.has(course)) {
        completableCourses.add(course);
        return true;
    }

    // can already be completed
    if (completableCourses.has(course)) {
        return true;
    }

    // check if it's been checked already
    if (checked.has(course)) {
        // infinite loop. Return false
        return false;
    }

    // check it's dependency
    let dependency = prereqMap.get(course);

    let result = checkCourseCompletion(dependency, prereqMap, completableCourses, checked);

    // if our prerequisite is completable, that means we are too
    if (result === true) {
        completableCourses.add(course);
    }

    return result;
};

const createPrerequisiteMap = (prerequisites) => {
    let map = new Map();

    for (let i = 0; i < prerequisites; i++) {
        let course = prerequisites[0];
        let dependency = prerequisites[1];
        map.set(course, dependency);
    }

    return map;
};