const FUNCTIONS = {
    shift: 'shift',
    unshift: 'unshift',
    pop: 'pop',
    push: 'push',
    slice: 'slice'
}
Object.freeze(FUNCTIONS);

/* submitMove(str: methodCard, str[]: argumentCards) { 
       if methodCard.value === 'shift' {
           argumentCards.forEach(arg) => {
            this.shift(arg)
           }
       }
       ...
}*/

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Card {
    constructor(value, rectangle, textX, textY) {
        this.value = value;
        this.rectangle = rectangle;
        this.textX = textX;
        this.textY = textY;
        this.selected = false;
    }

}