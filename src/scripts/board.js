const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = currentLevel(); //# TODO
let cards;

function currentLevel(level) {
    if (!level) {
        return levels.one;
    }
}

function loadLevel(level) { // #TODO
    board.clearRect(0, 0, 10, 10);
    splitBoard();
    let boardCards = getCurrentBoard();
    let width = boardCards[0].length;
    let height = boardCards.length;
    fillBoard(currentLevel());
}

function fillBoard(level) {
    level.boardArr.forEach( (row, idx) => {
        for (let i = 0; i < row.length; i++) {
            board.fillStyle = 'skyblue';
            board.fillRect(180 + (i * 80), 112.5 + (idx * 80), 75, 75);
            board.font = '24px Helvetica';
            board.fillStyle = 'royalblue';
            let number = row[i];
            board.fillText(number, 212.50 + (80 * i), 155 + (idx * 80));
        }
    });
    cards = new Hand(board, level.handFuncs, level.handParams);
    cards.drawButtons();
}

function getCurrentBoard() {
    return currentLvl.boardArr;
}

function getSolution() {
    return currentLvl.solution;
}

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
    // console.log(rectangle);
    // console.log(event);
    return {
        x: event.clientX - rectangle.left,
        y: event.clientY - rectangle.top
    };
}

function isInCard(pos, card) {
    console.log(pos);
    console.log(card.rectangle);
    return pos.x > card.rectangle.x && 
    pos.x < card.rectangle.x + card.rectangle.width &&
        pos.y < card.rectangle.y + card.rectangle.height && pos.y > 
        card.rectangle.y
}

canvas.addEventListener('click', function (event) {
    let pos = grabMousePosition(canvas, event);
    cards.cardsArray.forEach((card) => {
        if (isInCard(pos, card)) {
            console.log(`Clicked ${card.value}.`);
        } else {
            console.log('Clicked outside of card.');
        }
    });
}, false);

loadLevel(currentLvl);