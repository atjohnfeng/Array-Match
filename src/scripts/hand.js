let btnSize = 50;

class Hand {
    constructor(board, funcs, params) {
        this.board = board;
        this.functions = funcs;
        this.parameters = params;
        this.cardsArray = [];
    } 

    drawButtons() {
        this.functions.forEach( (func, i) => {
            let rectangle = new Rectangle(10 + (55 * i), 320, btnSize, btnSize);
            let textX = 12 + (55 * i);
            let textY = 365;
            let card = new Card(func, rectangle, textX, textY);
            this.drawCard(card);
            this.cardsArray.push(card);
        });

        this.parameters.forEach((param, i) => {
            let rectangle = new Rectangle(10 + (55 * i), 380, btnSize, btnSize);
            let textX = 12 + (55 * i);
            let textY = 425;
            let card = new Card(param, rectangle, textX, textY);
            this.drawCard(card);
            this.cardsArray.push(card);
        });
    }

    drawCard(card) {
        board.fillStyle = "lightpink";
        board.fillRect(card.rectangle.x, card.rectangle.y, card.rectangle.width, card.rectangle.height);
        board.fillStyle = "royalblue";
        board.font = '12px Helvetica';
        board.textAlign = "left";
        board.fillText(card.value, card.textX, card.textY);
    }
}