var levels = {

    start: {
        instructions: `Press Start when ready or select a level.<br /> 
            Instructions will appear here.`,
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
        [1, 2, 3].`,
        boardArr: [[1, 2]],
        handFuncs: [FUNCTIONS.sum, FUNCTIONS.push],
        handParams: [1, 2, 0],
        solution: [[1, 2, 3]]
    },

    three: {
        instructions: `Level Three: Manipulate the array to match the solution: 
        [1, 2, 3].`,
        boardArr: [[2, 3]],
        handFuncs: [FUNCTIONS.mod, FUNCTIONS.unshift],
        handParams: [3, 2, 0],
        solution: [[1, 2, 3]]
    },

    four: {
        instructions: `Level Four: Manipulate the array to match the solution: 
        [1, 2, 3], [1, 2, 3]`,
        boardArr: [[3, 2, 1], [3, 2, 1]],
        handFuncs: [FUNCTIONS.sort, FUNCTIONS.sort],
        handParams: [0, 1],
        solution: [[1, 2, 3], [1, 2, 3]]
    },

    five: {
        instructions: `Level Five: Manipulate the array to match the solution: 
        [2, 2, 2]`,
        boardArr: [[2], [], []],
        handFuncs: [FUNCTIONS.sub, FUNCTIONS.push, FUNCTIONS.unshift],
        handParams: [0, 0, 2, 8, 10],
        solution: [[2, 2, 2], [], []]
    },

    six: {
        instructions: `Level Six: Manipulate the array to match the solution: 
        [-9]`,
        boardArr: [[], [], []],
        handFuncs: [FUNCTIONS.sub, FUNCTIONS.mult, FUNCTIONS.unshift],
        handParams: [0, 8, 9, 9],
        solution: [[-9], [], []]
    },

    seven: {
        instructions: `Level Seven: Manipulate the array to match the solution: 
        [1,1,1], [1,1,1], [1,1,1].`,
        boardArr: [[1], [1,1,1], [1,1,1,1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push],
        handParams: [0, 0, 1, 2],
        solution: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    },

    eight: {
        instructions: `Level Eight: Manipulate the array to match the 
        solution: [1, 1, 1], [1, 2, 3], [1, 1, 1].`,
        boardArr: [[1], [3, 2, 1], [1, 1, 1, 1]],
        handFuncs: [FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.push, 
            FUNCTIONS.sort],
        handParams: [0, 0, 1, 1, 2],
        solution: [[1, 1, 1], [1, 2, 3], [1, 1, 1]]
    },

    nine: {
        instructions: `Level Nine: Manipulate the array to match the 
        solution: [1, 2, 3], [1, 2, 3], [1, 2, 5].`,
        boardArr: [[1, 2, 3], [1, 2, 3], [1, 2]],
        handFuncs: [FUNCTIONS.sum, FUNCTIONS.sum, FUNCTIONS.sum, FUNCTIONS.push],
        handParams: [1, 1, 1, 2, 2],
        solution: [[1, 2, 3], [1, 2, 3], [1, 2, 5]]
    },

    ten: {
        instructions: `Level Ten: Manipulate the array to match the solution: 
        [9, 0, 0], [], []`,
        boardArr: [[], [0], [0]],
        handFuncs: [FUNCTIONS.pop, FUNCTIONS.pop, FUNCTIONS.mult, FUNCTIONS.unshift, FUNCTIONS.unshift, FUNCTIONS.push],
        handParams: [0, 0, 0, 1, 2, 3, 3],
        solution: [[9, 0, 0], [], []]
    },

    eleven: {
        instructions: `Level Eleven: Manipulate the array to match the 
        solution: [0, 1, 3, 8].`,
        boardArr: [[9], [], []],
        handFuncs: [FUNCTIONS.sub, FUNCTIONS.sub, FUNCTIONS.push, FUNCTIONS.push,
        FUNCTIONS.unshift, FUNCTIONS.unshift, FUNCTIONS.pop],
        handParams: [0, 0, 0, 0, 0, 0, 1, 1, 4, 7],
        solution: [[0, 1, 3, 8], [], []]
    },
    
    twelve: {
            instructions: `Level Twelve: Manipulate the array to match the solution:
            [], [], []`,
            boardArr: [[1], [1], [3]],
            handFuncs: [FUNCTIONS.sub, FUNCTIONS.sub, FUNCTIONS.mult, FUNCTIONS.pop, FUNCTIONS.pop, FUNCTIONS.pop],
            handParams: [0, 1, 1, 1, -2],
            solution: [[], [], []]
    },

    thirteen: {
        instructions: `Level Thirteen: Manipulate the array to match the solution: 
        [1, 2, 3, 4, 5], [] ,[5]`,
        boardArr: [[1, 2, 3], [2], [5, 3, 2]],
        handFuncs: [FUNCTIONS.sort, FUNCTIONS.sub, FUNCTIONS.mult, FUNCTIONS.sub, FUNCTIONS.shift, FUNCTIONS.shift, FUNCTIONS.shift, FUNCTIONS.push, FUNCTIONS.push],
        handParams: [-5, 0, 0, 1, 2, 2, 3, 7],
        solution: [[1, 2, 3, 4, 5], [], [5]]
    },
    
    fourteen: {
        instructions: `Level Fourteen: Manipulate the array to match the 
        solution: [1, 3, 4, 6, 7, 9, 8].`,
        boardArr: [[7, 4, 3, 6], [9], [1]], //missing 1, 2, 5
        handFuncs: [FUNCTIONS.sort, FUNCTIONS.pop, FUNCTIONS.shift, FUNCTIONS.push, FUNCTIONS.push, FUNCTIONS.push, FUNCTIONS.mult],
        handParams: [0, 0, 0, 0, 1, 2, 2, 4], // 9 1
        solution: [[1, 3, 4, 6, 7, 9, 8], [], []]
    },

    fifteen: {
        instructions: `Level Fifteen: Manipulate the array to match the solution: 
        [5, 3, 1], [1, 3, 5], [3, 1, 5]`,
        boardArr: [[1, 2, 3], [5, 3, 1], [1, 0, 5]],
        handFuncs: [FUNCTIONS.pop, FUNCTIONS.pop, FUNCTIONS.shift, FUNCTIONS.unshift, FUNCTIONS.unshift, FUNCTIONS.unshift, FUNCTIONS.sort, FUNCTIONS.sort, FUNCTIONS.sum],
        handParams: [0, 0, 0, 1, 2, 2, 2, 3, 3],
        solution: [[5, 3, 1], [1, 3, 5], [3, 1, 5]]
    },
    
    last: {
        instructions: `You did it! Barky knows all about arrays now!`,
        boardArr: [],
        handFuncs: [],
        handParams: ['C', 'O', 'N', 'G', 'R', 'A', 'T', 'S'],
        solution: [[1, 1, 1], []]
    }

};
