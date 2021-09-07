const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = currentLevel(); //# TODO

function currentLevel(level) {
    if (!level) {
        return levels.tutorial;
    }
}

function loadLevel(level) { // #TODO
    board.clearRect(0, 0, 10, 10);
    splitBoard();
    let boardCards = getCurrentBoard();
    let width = boardCards[0].length;
    let height = boardCards.length;
    fillBoard(height, width);
    fillCards();
    play();
}

function fillBoard(height) {
    switch(height) {
        case 1:
            board.font = '24px Helvetica';
            board.strokeText('0', 50, 90, 140)
            for (let i = 0; i < 5; i++) {
                board.fillStyle = 'royalblue';
                board.fillRect(112.5 + (i * 76), 36.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 112.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 188.5, 75, 75);
            }
            break;
        case 2:
            board.font = '24px Lobster';
            board.fillText('0', 50, 90, 140)
            for (let i = 0; i < 5; i++) {
                board.fillStyle = 'lightgreen';
                board.fillRect(112.5 + (i * 76), 36.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 112.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 188.5, 75, 75);
            }
            break;
        case 3:
            board.font = '24px Arial';
            board.fillText('0', 50, 90, 140)
            for (let i = 0; i < 5; i++) {
                board.fillStyle = 'lightgreen';
                board.fillRect(112.5 + (i * 76), 36.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 112.5, 75, 75);
                board.fillRect(112.5 + (i * 76), 188.5, 75, 75);
            }
            break;
    }
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

loadLevel(currentLvl);