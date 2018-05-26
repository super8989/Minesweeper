const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

//  const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
//    let board = [];
//       for loop iterating through numberOfRows
//         Create an empty row array
//         for loop iterating through numberOfColumns
//           Push the empty spaces onto the row array
//         Push the row onto the board array
//       Return the board array
//  };


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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


//  while (numberOfBombsPlaced < numberOfBombs) {
//     Generate a random row index
//     Generate a random column index
//     if the board[randomRowIndex][randomColumnIndex] does not have a bomb
//     Place the bomb at that row and columns
//     Increment numberOfBombsPlaced
//   };


const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
// check to see if row and column are valid tile values on the board
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};


const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}


// check if tile is already flipped, if so, return
// check if tile is bomb, if so, place bomb on player Board
// if tile is not a bomb, place number of surrounding bombs on player board





const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}


let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: \n');
printBoard(playerBoard);
console.log('\n');


console.log('Bomb Board: \n');
printBoard(bombBoard);
console.log('\n');

// printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.

flipTile(playerBoard, bombBoard, 0, 0); // Flip different tiles based on bombBoard to see if neighbors work.

console.log('Updated Player Board: \n');
printBoard(playerBoard);
