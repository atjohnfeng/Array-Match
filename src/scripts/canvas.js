const canvas = document.getElementById('board');
const board = canvas.getContext('2d');

let currentLvl = levels.tutorial; //# TODO
//let completedLvls = [];

function loadLevel(level) { // #TODO
    board.clear();
    let arrEls = level.getArrayEl();
}

loadLevel(currentLvl);

// board.fillStyle = "blue";
// board.fillRect(100, 100, 50, 50);