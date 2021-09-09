const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = getCurrentLevel(); 
let completedLevels = [];

let cards = null;
let problem = null;
let problemArr = null;
let selectedFunc = null;
let selectedParams = null;
let selectedArr = null;
let handFuncs;
let handParams;

function instantLevel() {
    problem = null;
    problemArr = deepDup(currentLvl.boardArr);
    handFuncs = deepDup(currentLvl.handFuncs);
    handParams = deepDup(currentLvl.handParams);
    cards = new Hand(board, handFuncs, handParams);
    selectedFunc = null;
    selectedParams = null;
    selectedArr = null;
}

function deepDup(arr) {
    return arr.map((el) => el.constructor.name === 'Array' ? deepDup(el) : el);
}

function loadLevel() {
    problem = new Problem(problemArr);
    fillBoard(problemArr);
}

function splitBoard() {
    board.beginPath();
    board.strokeStyle = "skyblue";
    board.setLineDash([]);
    board.lineWidth = 3;
    board.moveTo(0, canvas.height * .6667);
    board.lineTo(canvas.width, canvas.height * .6667);
    board.stroke();
}

function grabMousePosition(canvas, event) {
    let rectangle = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rectangle.left,
        y: event.clientY - rectangle.top
    };
}

function isInCard(pos, card) {
    return pos.x > card.rectangle.x && 
    pos.x < card.rectangle.x + card.rectangle.width &&
        pos.y < card.rectangle.y + card.rectangle.height && pos.y > 
        card.rectangle.y
}

canvas.addEventListener('click', function (event) {
    let pos = grabMousePosition(canvas, event);
    cards.paramCards.forEach((card) => {
        if (isInCard(pos, card)) {
            selectCard(card);
        }
    });
    cards.funcCards.forEach((card) => {
        if (isInCard(pos, card)) {
            selectCard(card);
        }
    });
}, false);

function checkMethodCard(card) {
    return Object.values(FUNCTIONS).includes(card.value);
}

function checkArgumentCards(card) {
    return typeof card.value === 'number';
}

function selectCard(card) {
    if (card.selected === true) {
        card.selected = false;
        // clearSelected(card);
        if (checkMethodCard(card)) {
            selectedFunc = null;
        } else if (checkArgumentCards(card)) {
            if (selectedParams === card) selectedParams = null;
            if (selectedArr === card) selectedArr = null;
        }
    } else {
        // animateSelected(card);
        if (checkMethodCard(card) && selectedFunc === null) {
            card.selected = true;
            selectedFunc = card; 
        } else if (checkArgumentCards(card) && selectedArr === null) {
            card.selected = true;
            selectedArr = card;
        } else if (checkArgumentCards(card) && selectedParams === null) {
            card.selected = true;
            selectedParams = card;
        }
    }
    submitMove();
    fillBoard(problemArr);
    setTimeout(function () {
        winOrNot();
    }, 2000);
}

function animateSelected(card) {
    board.strokeStyle = "black";
    board.strokeRect(card.rectangle.x-1, card.rectangle.y-1,
        card.rectangle.width+2, card.rectangle.height+2);
}

// function clearSelected(card) {
//     board.strokeStyle = "#e0ffff";
//     board.strokeRect(card.rectangle.x-1, card.rectangle.y-1,
//         card.rectangle.width+2, card.rectangle.height+2);
// }

function submitMove() {
    if (selectedFunc !== null && selectedFunc.value === FUNCTIONS.start) {
        if (localStorage['currentLevel'] === 'start') {
            currentLvl = levels.tutorial;
            restart();
        } else {
            currentLvl = getCurrentLevel();
            restart();
        }
    } 

    let twoFuncs = [FUNCTIONS.shift, FUNCTIONS.pop, FUNCTIONS.sort];
    if (selectedFunc !== null && twoFuncs.includes(selectedFunc.value) && 
        selectedArr !== null && selectedParams === null && 
        selectedArr.value < problemArr.length) {
            switch(selectedFunc.value) {
                case FUNCTIONS.shift:
                    let shifted = problemArr[selectedArr.value].shift();
                    handParams.push(shifted);
                    removeResetFill('x');
                    break;

                case FUNCTIONS.pop:
                    let popped = problemArr[selectedArr.value].pop();
                    handParams.push(popped);
                    removeResetFill('x');
                    break;

                case FUNCTIONS.sort:
                    problemArr[selectedArr.value].sort();
                    removeResetFill('x');
                    break;
            }
        }

    if (selectedFunc !== null && selectedParams !== null && 
        selectedArr !== null) {
        switch(selectedFunc.value) {
            case FUNCTIONS.push: 
                problemArr[selectedArr.value].push(selectedParams.value);
                removeResetFill('y');
            break;

            case FUNCTIONS.unshift:
                problemArr[selectedArr.value].unshift(selectedParams.value);
                removeResetFill('y');
            break;

            case FUNCTIONS.sum:
                let sum = selectedArr.value + selectedParams.value;
                handParams.push(sum);
                removeResetFill('y');
            break;

            case FUNCTIONS.sub:
                let sub = selectedArr.value - selectedParams.value;
                handParams.push(sub);
                removeResetFill('y');
            break;

            case FUNCTIONS.mod:
                let mod = selectedArr.value % selectedParams.value;
                console.log(mod);
                handParams.push(mod);
                removeResetFill('y');
            break;

            case FUNCTIONS.mult:
                let mult = selectedArr.value * selectedParams.value;
                handParams.push(mult);
                removeResetFill('y');
                break;
        }
        fillBoard(problemArr);
    }
}

function removeResetFill(xory) {
    if (xory === 'y') {
        removeCards();
        resetValues();
        fillBoard(problemArr);
    } else if (xory === 'x') {
        removeCardsForShiftPop();
        resetValues();
        fillBoard(problemArr);
    }
}

function removeSelected() {
    let funcIdx = handFuncs.indexOf(selectedFunc.value);
    if (funcIdx !== -1) handFuncs.splice(funcIdx, 1);
    let arrIdx = handParams.indexOf(selectedArr.value);
    if (arrIdx !== -1) handParams.splice(arrIdx, 1);
}

function removeCards() {
    removeSelected();
    let paramIdx = handParams.indexOf(selectedParams.value);
    if (paramIdx !== -1) handParams.splice(paramIdx, 1);
    cards = new Hand(board, handFuncs,
        handParams);
}

function removeCardsForShiftPop() {
    removeSelected();
    cards = new Hand(board, handFuncs,
        handParams);
}

function winOrNot() {
    if (JSON.stringify(problemArr) === JSON.stringify(currentLvl.solution)) {
        completedLevels.concat(currentLvl);
        resetParams();
    }
}

function resetParams() {
    currentLvl = nextLevel(currentLvl);
    restart();
}

function restart() {
    instantLevel();
    loadLevel();
}

function restartGame() {
    if (confirm('This will reset your game progress. Are you sure?')) {
        localStorage['currentLevel'] = null;
        currentLvl = levels.start;
        restart();
    }
}

function resetValues() {
    selectedParams = null;
    selectedArr = null;
    selectedFunc = null;
}

function fillBoard(problemArr) {
    board.clearRect(0, 0, canvas.width, canvas.height);
    splitBoard();
    if (currentLvl === levels.start) {
        board.fillStyle = 'darkblue';
        board.font = '16px Arial';
        board.fillText(`Welcome to Array Match! Each level will require you to manipulate an array using METHOD and NUMBER cards.`, 3, 15, 590);
        board.fillText(`Combine METHOD and NUMBER cards to change the board and match the provided solution.`, 3, 30, 590);
        board.fillText(``, 3, 45, 590);

        board.fillText(`Each row of the board represents an ARRAY. The TOP array is ROW ZERO.`, 3, 60, 590);
        board.fillText(`The FIRST NUMBER card you select will be the ARRAY that will be affected.`, 3, 75, 590);
        board.fillText(`The SECOND NUMBER card you select will be the ARGUMENT that will be passed into the method.`, 3, 90, 590);

        board.fillText(`Here is an example: Say you want to add an ELEMENT of '1' to end of the FIRST ROW. You can do that`, 3, 120, 590);
        board.fillText(`by selecting a METHOD CARD called PUSH, a NUMBER card '0' to indicate the FIRST ROW, and a NUMBER card of '1'`, 3, 135, 590);
        board.fillText(`to PUSH 1 INTO ROW 0.`, 3, 150, 590);
        
        board.fillText(`METHOD CARDS like SORT, SHIFT, and POP only take in one number card to select the ARRAY you want to change.`, 3, 175, 590);
        board.fillText(`SHIFT and POP also allow you to add the removed cards to your hand.`, 3, 190, 590)

        board.fillText(`MATH CARDS are METHOD cards that allow you to manipulate multiple NUMBER cards.`, 3, 215, 590);
        board.fillText(`Select a MATH CARD like SUM and two NUMBER CARDS will combine the cards by adding them.`, 3, 230, 590);

        board.fillText(`Try out all the different combinations to learn more about them! Happy solving!`, 3, 255, 590);
    }
    problemArr.forEach((row, idx) => {
        for (let i = 0; i < row.length; i++) {
            board.fillStyle = 'skyblue';
            board.fillRect(10 + (i * 80), 10 + (idx * 80), 75, 75);
            board.font = 'bold 32px Helvetica';
            board.fillStyle = 'white';
            let number = row[i];
            board.fillText(number, 37.5 + (80 * i), 55 + (idx * 80));
        }
    });
    board.font = 'bold 16px Helvetica';
    board.fillStyle = 'royalblue';
    let funcValue;
    let arrValue;
    let argValue;
    if (!!selectedFunc) {
        funcValue = selectedFunc.value;
    } else {
        funcValue = "[Empty]";
    }
    if (!!selectedArr) {
        arrValue = selectedArr.value;
    } else {
        arrValue = "[Empty]";
    }
    if (!!selectedParams) {
        argValue = selectedParams.value;
    } else {
        argValue = "[Empty]";
    }
    board.fillText(`Method: ${funcValue}`, 10, 290);
    board.fillText(`Array: ${arrValue}`, 230, 290)
    board.fillText(`Argument: ${argValue}`, 435, 290)
    cards.drawButtons();
    let instrTxt = currentLvl.instructions;
    let instructions = document.querySelector('#instructions');
    instructions.innerHTML = instrTxt;
}

function getCurrentLevel() {
    if (localStorage['currentLevel'] === null) {
        localStorage['currentLevel'] = 'start';
    }
    switch (localStorage['currentLevel']) {
        case 'tutorial':
            return levels.tutorial;
        case 'one':
            return levels.one;
        case 'two':
            return levels.two;
        case 'three':
            return levels.three;
        case 'four':
            return levels.four;
        case 'five':
            return levels.five;
        case 'six':
            return levels.six;
        case 'seven':
            return levels.seven;
        case 'eight':
            return levels.eight;
        case 'nine':
            return levels.nine;
        case 'ten':
            return levels.ten;
        case 'last':
            return levels.last;
        default:
            return levels.tutorial;
    }
}

function nextLevel(currentLvl) {
    switch (currentLvl) {
        case levels.start:
            localStorage['currentLevel'] = 'tutorial';
            return levels.tutorial;
        case levels.tutorial:
            localStorage['currentLevel'] = 'one';
            return levels.one;
        case levels.one:
            localStorage['currentLevel'] = 'two';
            return levels.two;
        case levels.two:
            localStorage['currentLevel'] = 'three';
            return levels.three;
        case levels.three:
            localStorage['currentLevel'] = 'four';
            return levels.four;
        case levels.four:
            localStorage['currentLevel'] = 'five';
            return levels.five;
        case levels.five:
            // localStorage['currentLevel'] = 'six';
            localStorage['currentLevel'] = 'last';
            alert(`You've completed all levels!`);
            return levels.last;
            // return levels.six;
        // case levels.six:
        //     localStorage['currentLevel'] = 'seven';
        //     return levels.seven;
        // case levels.seven:
        //     localStorage['currentLevel'] = 'eight';
        //     return levels.eight;
        // case levels.eight:
        //     localStorage['currentLevel'] = 'nine';
        //     return levels.nine;
        // case levels.nine:
        //     localStorage['currentLevel'] = 'ten';
        //     return levels.ten;
        // case levels.ten:
        //     localStorage['currentLevel'] = 'ten';
        //     alert(`You've completed all levels!`)
        //     return levels.last;
    }
}

function getStart() {
    currentLvl = levels.start;
    restart();
}

instantLevel();
loadLevel();
