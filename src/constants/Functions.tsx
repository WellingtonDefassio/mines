export interface Board {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
}

function createBoard(rows: number, columns: number): Board[][] {
  return Array(rows)
    .fill(0)
    .map((_, rowIndex) => {
      return Array(columns)
        .fill(0)
        .map((_, columIndex) => {
          return {
            row: rowIndex,
            column: columIndex,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0
          };
        });
    });
}

function spreadMines(board: Board[][], minesAmount: number) {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;
  while (minesPlanted < minesAmount) {
    const rowCell = parseInt(`${Math.random() * rows}`);
    const columCell = parseInt(`${Math.random() * columns}`);
    if (!board[rowCell][columCell].mined) {
      board[rowCell][columCell].mined = true;
      minesPlanted++;
    }
  }

}

export function createMinedBoard(rows: number, columns: number, minesAmount: number) {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
}

export function cloneBoard(board: Board[][]): Board[][] {
  return board.map(rows => {
    return rows.map(field => {
      return { ...field };
    });
  });
}

export function getNeighbors(board: Board[][], row: number, column: number) {
  const neighbors: Board[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];

  rows.forEach(r => {
    columns.forEach(c => {
      const diff = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diff && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
}

export function safeNeighborhood(board: Board[][], row: number, column: number): boolean {
  const safes = (result: boolean, neighbor: Board) => result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
}

export function openField(board: Board[][], row: number, column: number) {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column)
        .forEach(n => openField(board, n.row, n.column));
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
}

export function fields(board: Board[][]) {
  let items: Board[] = [];
  return items.concat(...board);
}

export function hasExplosion(board: Board[][]) {
  return fields(board).filter(field => field.exploded).length > 0;
}

export function hasPending(field: Board) {
  return (field.mined && !field.flagged) || (!field.mined && field.opened);
}

export function wonGame(board: Board[][]) {
  return fields(board).filter(hasPending).length === 0;
}

export function showMines(board: Board[][]) {
  fields(board).filter(f => f.mined).forEach(field => field.opened = true);
}

export function invertFlag(board: Board[][], row: number, column: number) {
  const field = board[row][column];
  field.flagged = !field.flagged;
}
