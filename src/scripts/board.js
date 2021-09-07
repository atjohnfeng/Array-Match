const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = currentLevel(); //# TODO
let cards;

function currentLevel(level) {
    if (!level) {
        return levels.tutorial;
    }
}

function loadLevel(level) { // #TODO
    board.clearRect(0, 0, 10, 10);
    splitBoard();
    fillBoard(currentLevel());
}

function fillBoard(level) {
    let problem = new Problem(level.boardArr)
    problem.problemArray.forEach( (row, idx) => {
        for (let i = 0; i < row.length; i++) {
            board.fillStyle = 'skyblue';
            board.fillRect(10 + (i * 80), 10 + (idx * 80), 75, 75);
            board.font = '24px Helvetica';
            board.fillStyle = 'royalblue';
            let number = row[i];
            board.fillText(number, 37.5 + (80 * i), 50 + (idx * 80));
        }
    });
    cards = new Hand(board, level.handFuncs, level.handParams);
    cards.drawButtons();
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
    return {
        x: event.clientX - rectangle.left,
        y: event.clientY - rectangle.top
    };
}

function isInCard(pos, card) {
    console.log(pos);
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
            selectCard(card);
            console.log(card.selected);
        } else {
            console.log('Clicked outside of card.');
        }
    });
}, false);

function selectCard(card) {
    if (card.selected === true) {
        card.selected = false;
        clearSelected(card);
    } else {
        card.selected = true;
        animateSelected(card);
    }
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

loadLevel(currentLvl);