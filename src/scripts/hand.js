let btnSize = 50;

class Hand {
    constructor(board, funcs, params) {
        this.board = board;
        this.functions = funcs;
        this.parameters = params;
        this.funcCards = [];
        this.paramCards = [];

        this.instantCards();
    }

    instantCards() {
        this.functions.forEach((func, i) => {
            let rectangle = new Rectangle(10 + (55 * i), 320, btnSize, btnSize);
            let textX = 12 + (55 * i);
            let textY = 365;
            let card = new Card(func, rectangle, textX, textY);
            this.funcCards.push(card);
        });

        this.parameters.forEach((param, i) => {
            let rectangle = new Rectangle(10 + (55 * i), 380, btnSize, btnSize);
            let textX = 12 + (55 * i);
            let textY = 425;
            let card = new Card(param, rectangle, textX, textY);
            this.paramCards.push(card);
        });
    }

    drawButtons() {
        this.funcCards.forEach( (card) => {
            this.drawCard(card);
            if (card.selected) {
                animateSelected(card) 
            }
        });

        this.paramCards.forEach( (card) => {
            this.drawCard(card);
            if (card.selected) {
                animateSelected(card) 
            }
        });
    }

    drawCard(card) {
        board.fillStyle = "royalblue";
        board.fillRect(card.rectangle.x, card.rectangle.y, card.rectangle.width, 
            card.rectangle.height);
        board.fillStyle = "white";
        board.font = 'bold 14px Helvetica';
        board.textAlign = "left";
        board.fillText(card.value, card.textX, card.textY);
    }
}