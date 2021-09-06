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
    let arrEls = getArrayEl();
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
    board.lineWidth = 3;
    board.moveTo(0, canvas.height * .666);
    board.lineTo(canvas.width, canvas.height * .666);
    board.stroke();
}

loadLevel(currentLvl);