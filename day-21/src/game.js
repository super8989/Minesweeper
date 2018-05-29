// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`




//import Board class
import {Board} from './board';



//When a user creates an instance of a board (using the constructor), they will need to specify the size
//of the board as well as the number of bombs on the board (which is what the parameters represent).
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //Add a method called playMove to the Game class
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('The game is over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('Congratulations!');
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}
