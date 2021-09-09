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

function getCurrentLevel() {
    if (localStorage['currentLevel'] === null) {
        localStorage['currentLevel'] = 'tutorial';
    }
    switch (localStorage['currentLevel']) {
        case 'one':
            return levels.one;
        case 'two':
            return levels.two;
        default:
            return levels.tutorial;
    }
}

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

function nextLevel(currentLvl) {
    switch(currentLvl) {
        case levels.tutorial:
            localStorage['currentLevel'] = 'one';
            return levels.one;
        case levels.one:
            localStorage['currentLevel'] = 'two';
            return levels.two;
    }
}

function loadLevel() { // #TODO
    problem = new Problem(problemArr);
    fillBoard(problemArr);
}

function fillBoard(problemArr) {
    board.clearRect(0, 0, canvas.width, canvas.height);
    splitBoard();
    problemArr.forEach( (row, idx) => {
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
        funcValue = "[Choose]";
    }
    if (!!selectedArr) {
        arrValue = selectedArr.value;
    } else {
        arrValue = "[Choose]";
    }
    if (!!selectedParams) {
        argValue = selectedParams.value;
    } else {
        argValue = "[Choose]";
    }
    board.fillText(`Method: ${funcValue}`, 10, 290);
    board.fillText(`Array: ${arrValue}`, 230, 290)
    board.fillText(`Argument: ${argValue}`, 435, 290)
    cards.drawButtons();
    let instrTxt = currentLvl.instructions;
    let instructions = document.querySelector('#instructions');
    instructions.innerHTML = instrTxt;
}

function splitBoard() {

    board.beginPath();
    board.strokeStyle = "lightpink";
    board.setLineDash([]);
    board.lineWidth = 2;
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
    if (selectedFunc !== null && 
        (selectedFunc.value === FUNCTIONS.shift || selectedFunc.value === 
        FUNCTIONS.pop) && selectedArr !== null && selectedParams === null && 
        selectedArr.value < problemArr.length) {
            switch(selectedFunc.value) {
                case FUNCTIONS.shift:
                    let shifted = problemArr[selectedArr.value].shift();
                    handParams.push(shifted);
                    removeCardsForShiftPop();
                    resetValues();
                    fillBoard(problemArr);
                    break;

                case FUNCTIONS.pop:
                    problemArr[selectedArr.value].pop();

                    break;
            }
        }
    if (selectedFunc !== null && selectedParams !== null && 
        selectedArr !== null) {
        switch(selectedFunc.value) {
            case FUNCTIONS.push: 
                problemArr[selectedArr.value].push(selectedParams.value);
                removeCards();
                resetValues();
                fillBoard(problemArr);
            break;

            case FUNCTIONS.unshift:

            break;
        }
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
        localStorage['currentLevel'] = 'tutorial';
        currentLvl = levels.tutorial;
        restart();
    }
}

function resetValues() {
    selectedParams = null;
    selectedArr = null;
    selectedFunc = null;
}

function getHowToPlay() {
    
}

instantLevel();
loadLevel();

// var gradient = board.createLinearGradient(0, 0, 200, 0);
//     gradient.addColorStop("0", "lightpink");
//     gradient.addColorStop("0.5", "skyblue");
//     gradient.addColorStop("1.0", "royalblue");