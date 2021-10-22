var levels = {

    start: {
        instructions: `Press Start when ready.`,
        boardArr: [[]],
        handFuncs: [FUNCTIONS.start],
        handParams: [],
        solution: [[FUNCTIONS.start]]
    },

    tutorial: {
        instructions: `Level Zero: Manipulate the array to match the solution: 
        [1,1,1].`,
        boardArr: [[1,1], []],
        handFuncs: [FUNCTIONS.push],
        handParams: [1, 0],
        solution: [[1,1,1], []]
    },

    one: {
        instructions: `Level One: Manipulate the array to match the solution: 
        [1,2,3], [].`,
        boardArr: [[1, 2], [3]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.push],
        handParams: [0, 1],
        solution: [[1, 2, 3], []]
    },

    two: {
        instructions: `Level Two: Manipulate the array to match the solution: 
        [1,1,1], [1,1,1], [1,1,1].`,
        boardArr: [[1], [1,1,1], [1,1,1,1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push],
        handParams: [0, 0, 1, 2],
        solution: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    },

    three: {
        instructions: `Level Three: Manipulate the array to match the 
        solution: [1, 1, 1], [1, 2, 3], [1, 1, 1].`,
        boardArr: [[1], [3, 2, 1], [1, 1, 1, 1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push, 
            FUNCTIONS.sort],
        handParams: [0, 0, 1, 1, 2],
        solution: [[1, 1, 1], [1, 2, 3], [1, 1, 1]]
    },

    four: {
        instructions: `Level Four: Manipulate the array to match the 
        solution: [1, 2, 3], [1, 2, 3], [1, 2, 5].`,
        boardArr: [[1, 2, 3], [1, 2, 3], [1, 2]],
        handFuncs: [FUNCTIONS.sum, FUNCTIONS.sum, FUNCTIONS.sum, FUNCTIONS.push],
        handParams: [1, 1, 1, 2, 2],
        solution: [[1, 2, 3], [1, 2, 3], [1, 2, 5]]
    },

    five: {
        instructions: `Level Five: Manipulate the array to match the 
        solution: [0, 1, 3, 8].`,
        boardArr: [[9]],
        handFuncs: [FUNCTIONS.sub, FUNCTIONS.sub, FUNCTIONS.push, FUNCTIONS.push, 
            FUNCTIONS.unshift, FUNCTIONS.unshift, FUNCTIONS.pop],
        handParams: [0, 0, 0, 0, 0, 0, 1, 1, 4, 7],
        solution: [[0, 1, 3, 8]]
    },

    // six: {
    //     instructions: `Level 0/10: Manipulate the array to match the solution: 
    //     [1,1,1].`,
    //     boardArr: [[1, 1], []],
    //     handFuncs: [FUNCTIONS.push],
    //     handParams: [1, 0],
    //     solution: [[1, 1, 1], []]
    // },

    // seven: {
    //     instructions: `Level 0/10: Manipulate the array to match the solution: 
    //     [1,1,1].`,
    //     boardArr: [[1, 1], []],
    //     handFuncs: [FUNCTIONS.push],
    //     handParams: [1, 0],
    //     solution: [[1, 1, 1], []]
    // },

    // eight: {
    //     instructions: `Level 0/10: Manipulate the array to match the solution: 
    //     [1,1,1].`,
    //     boardArr: [[1, 1], []],
    //     handFuncs: [FUNCTIONS.push],
    //     handParams: [1, 0],
    //     solution: [[1, 1, 1], []]
    // },

    // nine: {
    //     instructions: `Level 0/10: Manipulate the array to match the solution: 
    //     [1,1,1].`,
    //     boardArr: [[1, 1], []],
    //     handFuncs: [FUNCTIONS.push],
    //     handParams: [1, 0],
    //     solution: [[1, 1, 1], []]
    // },

    // ten: {
    //     instructions: `Level 0/10: Manipulate the array to match the solution: 
    //     [1,1,1].`,
    //     boardArr: [[1, 1], []],
    //     handFuncs: [FUNCTIONS.push],
    //     handParams: [1, 0],
    //     solution: [[1, 1, 1], []]
    // },

    last: {
        instructions: `Congratulations on completing ArrayMatch!`,
        boardArr: [],
        handFuncs: [],
        handParams: ['C', 'O', 'N', 'G', 'R', 'A', 'T', 'S'],
        solution: [[1, 1, 1], []]
    }

};
