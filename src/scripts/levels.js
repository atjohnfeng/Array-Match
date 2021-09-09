var levels = {

    tutorial: {
        instructions: `Level 0/10: Manipulate the array to match the solution: 
        [1,1,1].`,
        boardArr: [[1,1],[]],
        handFuncs: [FUNCTIONS.push],
        handParams: [1, 0],
        solution: [[1,1,1],[]]
    },

    one: {
        instructions: `Level One/10: Manipulate the array to match the solution: [1,2,3], 
        [].`,
        boardArr: [[1, 2], [3]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.push],
        handParams: [0, 1, 2],
        solution: [[1, 2, 3], []]
    },

    two: {
        instructions: `Level Two/10: Manipulate the array to match the solution: [1,1,1], 
        [1,1,1], [1,1,1].`,
        boardArr: [[1], [1,1,1], [1,1,1,1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push],
        handParams: [0, 0, 1, 2],
        solution: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    },

    three: {
        instructions: `Level Three/10: Manipulate the array to match the solution: [1,1,1], 
        [1,1,1], [1,1,1].`,
        boardArr: [[1], [3, 2, 1], [1, 1, 1, 1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push, FUNCTIONS.sort],
        handParams: [0, 1, 2],
        solution: [[1, 1, 1], [1, 2, 3], [1, 1, 1]]
    }

};
