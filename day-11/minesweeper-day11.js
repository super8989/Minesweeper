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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return(board);
};



//  while (numberOfBombsPlaced < numberOfBombs) {
//     Generate a random row index
//     Generate a random column index
//     Place the bomb at that row and columns
//     Increment numberOfBombsPlaced
//   };


const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}


let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
