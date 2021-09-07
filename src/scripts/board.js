const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = currentLevel(); //# TODO
let cards = new Hand(board, currentLvl.handFuncs, currentLvl.handParams);

let problem = null;
let problemArr = currentLvl.boardArr;

let selectedFunc = null;
let selectedParams = null;
let selectedArray = null;

function currentLevel(level) {
    if (!level) {
        return levels.tutorial;
    }
}

function loadLevel() { // #TODO
    board.clearRect(0, 0, board.width, board.height);
    splitBoard();
    problem = new Problem(problemArr);
    fillBoard(problemArr, currentLvl);
}

function fillBoard(problemArr) {
    board.clearRect(0,0,board.width,board.height);
    problemArr.forEach( (row, idx) => {
        for (let i = 0; i < row.length; i++) {
            board.fillStyle = 'skyblue';
            board.fillRect(10 + (i * 80), 10 + (idx * 80), 75, 75);
            board.font = '24px Helvetica';
            board.fillStyle = 'royalblue';
            let number = row[i];
            board.fillText(number, 37.5 + (80 * i), 50 + (idx * 80));
        }
    });
    cards.drawButtons();
}

// function drawCurrentBoard(cards, problem) {
//     cards.forEach( (card, i) => {

//     })
// }

function splitBoard() {
    var gradient = board.createLinearGradient(0, 0, canvas.height, 0);
    gradient.addColorStop("0", "lightpink");
    gradient.addColorStop("0.5", "skyblue");
    gradient.addColorStop("1.0", "royalblue");

    board.beginPath();
    board.strokeStyle = gradient;
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
            console.log(`Clicked ${card.value}.`);
            console.log(card);
            selectCard(card);
        }
    });
    cards.funcCards.forEach((card) => {
        if (isInCard(pos, card)) {
            console.log(`Clicked ${card.value}.`);
            console.log(card);
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
        clearSelected(card);
        if (checkMethodCard(card)) {
            selectedFunc = null;
        } else if (checkArgumentCards) {
            selectedParams = null;
        }
    } else {
        card.selected = true;
        animateSelected(card);
        if (checkMethodCard(card)) {
            selectedFunc = card;
        } else if (checkArgumentCards) {
            selectedParams = card;
        }
    }
    submitMove();
    fillBoard(problemArr);
}

function animateSelected(card) {
    board.strokeStyle = "black";
    board.strokeRect(card.rectangle.x-1, card.rectangle.y-1,
        card.rectangle.width+2, card.rectangle.height+2);
}

function clearSelected(card) {
    board.strokeStyle = "#e0ffff";
    board.strokeRect(card.rectangle.x-1, card.rectangle.y-1,
        card.rectangle.width+2, card.rectangle.height+2);
}

function submitMove() {
    if (selectedFunc !== null && selectedParams !== null) {
        switch(selectedFunc.value) {
            case FUNCTIONS.push: 
                problemArr[selectedArray].push(selectedParams.value);
            break;
        }
    }
}

loadLevel();