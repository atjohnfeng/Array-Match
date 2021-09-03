# Javascript Project Proposal: Array Match #

## Background: ##

**Array Match** is an educational puzzle game utilizing arrays and Javascript 
array methods. Players will manipulate a given board (2D Array) in order to 
solve puzzles by combining cards that include numbers and array methods. There 
are two types of cards which a player may use:

1) Method Cards (ie. slice, push, unshift, etc.)
2) Argument Cards (ie. 1, 2, 3, etc.)

By combining method and argument cards, a player will be able to manipulate the 
board and their hand. Combining a method and argument card will cause the method
to execute with the argument card passed in. Cards like pop and shift will allow
players to keep the card that was removed from the board, creating a more unique
and complicated layer to later levels.

## Functionality and MVPs ##

In **Array Match**, players will be able to:

1) Revisit any game level previously completed.
2) Restart any level in which the player made a mistake.
3) Combine method and argument cards to manipulate the board and solve puzzles.
4) Receive a score based on how quickly they completed the level.

In addition, this project will include:

1) An instructions guide on how to play the game..
2) A production README.

## Wireframes ##

![Wireframe](/wireframe.png)

* Nav Links will link to Github repo and LinkedIn.
* Players will be able to drag cards onto the board to combine and play them.
* Players will be able to navigate through previously completed levels with
Level Select.
* A timer and score will be updated as players complete levels.
* A player may restart a level at any time.

## Technologies, Libraries, and APIs ##

* Canvas API to render the game board and hand.
* Webpack and Babel to bundle and transpile code.
* npm to manage project dependancies.

## Implementation Timeline ##

1) **Labor Day Weekend**: Code out HTML and CSS elements.
2) **Monday**: Create board and card logic.
3) **Tuesday**: Implement and design levels.
4) **Wednesday**: Complete implementation of user controls, and interface design. 
Squash bugs.
5) **Thursday**: Deploy to Github pages, and rewrite proposal as production README.

## Bonus Features ##

* Additional bonus levels.
* Display options that change board and card design.
* Randomly generated levels.
* Additional animations and sound effects.