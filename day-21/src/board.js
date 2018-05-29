//export the board class

//When a user creates an instance of a board (using the constructor), they will need to specify the size
//of the board as well as the number of bombs on the board (which is what the parameters represent).
export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //create a getter method for playerBoard
  get playerBoard() {
    return this._playerBoard;
  }


  //add the flipTile() function to the Board class.

  // check if tile is already flipped, if so, return
  // check if tile is bomb, if so, place bomb on player Board
  // if tile is not a bomb, place number of surrounding bombs on player board

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }


  //add the getNumberOfNeighborBombs() function to the Board class.
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
  // check to see if row and column are valid tile values on the board
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };


  //add a method called hasSafeTiles - will need to check the numberOfTileson the board versus the numberOfBombs on the board.
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }




  //  const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  //    let board = [];
  //       for loop iterating through numberOfRows
  //         Create an empty row array
  //         for loop iterating through numberOfColumns
  //           Push the empty spaces onto the row array
  //         Push the row onto the board array
  //       Return the board array
  //  };
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return(board);
  };



  //  while (numberOfBombsPlaced < numberOfBombs) {
  //     Generate a random row index
  //     Generate a random column index
  //     if the board[randomRowIndex][randomColumnIndex] does not have a bomb
  //     Place the bomb at that row and columns
  //     Increment numberOfBombsPlaced
  //   };
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }


    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      // This code has the potential to place bombs on top of bombs, this will be fixed with control flow.
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return(board);
  };
}
